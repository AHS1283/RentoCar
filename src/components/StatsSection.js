import React, { useEffect, useRef, useState } from "react";
import "./StatsSection.css";

const stats = [
  {
    value: 100,
    suffix: "+",
    label: "Cities",
    description:
      "Reliable self-drive rentals available across major destinations in India.",
  },
  {
    value: 25,
    suffix: "M+",
    label: "Happy Journeys",
    description:
      "Thousands of travellers choose flexible cars for everyday and weekend drives.",
  },
  {
    value: 40,
    suffix: "K+",
    label: "Cars",
    description:
      "A growing collection of cars across hatchbacks, SUVs, sedans and premium rides.",
  },
  {
    value: 20,
    suffix: "K+",
    label: "Hosts",
    description:
      "Independent hosts helping travellers find the right car for every journey.",
  },
];

function Counter({ target, suffix, startCounting }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Section left the viewport — reset so the count animates
    // from zero again the next time the user scrolls back to it.
    if (!startCounting) {
      setCount(0);
      return;
    }

    let animationFrame;
    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out
      const eased =
        1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [target, startCounting]);

  return (
    <div className="stats-number">
      <span>{count}</span>
      <small>{suffix}</small>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef(null);
  const [startCounting, setStartCounting] =
    useState(false);

  /* =======================================================
     RE-TRIGGER THE COUNT EVERY TIME THE SECTION SCROLLS
     BACK INTO VIEW (no more one-shot + disconnect — the
     observer keeps watching for the whole page lifetime)
  ======================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          setStartCounting(entry.isIntersecting);
        },
        {
          threshold: 0.25,
        }
      );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-outer">
      <section
        className="stats-section"
        ref={sectionRef}
      >
        <div className="stats-container">

          {/* TOP INTRO */}
          <div className="stats-intro">
            <div className="stats-kicker">
              RENTO CAR / BY THE NUMBERS
            </div>

            <div className="stats-intro-content">
              <h2>
                More roads.
                <br />
                <span>More freedom.</span>
              </h2>

              <p>
                From quick city rides to long
                weekend escapes, our growing
                network is built around making
                every drive simpler.
              </p>
            </div>
          </div>

          {/* STATS */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <article
                className="stat-card"
                key={stat.label}
              >
                <div className="stat-top">
                  <span className="stat-index">
                    0{index + 1}
                  </span>

                  <span className="stat-label">
                    {stat.label}
                  </span>
                </div>

                <Counter
                  target={stat.value}
                  suffix={stat.suffix}
                  startCounting={startCounting}
                />

                <div className="stat-line">
                  <span />
                </div>

                <p>{stat.description}</p>
              </article>
            ))}
          </div>

          {/* BOTTOM STATEMENT */}
          <div className="stats-bottom">
            <span className="stats-bottom-line" />

            <p>
              Your destination changes.
              <strong>
                {" "}Your freedom doesn't.
              </strong>
            </p>

            <span className="stats-bottom-line" />
          </div>

        </div>
      </section>
    </section>
  );
}
