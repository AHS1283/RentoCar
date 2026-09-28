import React, { useEffect } from "react";
import {
  ArrowUpRight,
  CarFront,
  ShieldCheck,
  HeartHandshake,
  MapPin,
  Sparkles,
  Users,
  Target,
  CheckCircle2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./About.css";

/* =====================================================
   SEO CONTENT
===================================================== */

const SITE_URL = "https://www.rentocar.in";
const PAGE_URL = `${SITE_URL}/about`;

const SEO_TITLE =
  "About RentoCar | Self-Drive Car Rental in Pune";

const SEO_DESCRIPTION =
  "RentoCar is a Pune-based self-drive car rental service. Learn about our mission, our values and how we make renting a car simple, flexible and reliable.";

const SEO_KEYWORDS =
  "about RentoCar, RentoCar Pune, self drive car rental Pune, car rental company Pune, rent a car in Pune, self drive cars Pune";

/* =====================================================
   HEAD HELPERS
   Update every matching tag (including static ones
   from index.html) and return an undo function.
===================================================== */

function setMeta(attr, key, content) {
  let tags = Array.from(
    document.head.querySelectorAll(`meta[${attr}="${key}"]`)
  );

  const created = tags.length === 0;

  if (created) {
    const tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
    tags = [tag];
  }

  const previous = tags.map((tag) => tag.getAttribute("content"));

  tags.forEach((tag) => tag.setAttribute("content", content));

  return () => {
    tags.forEach((tag, i) => {
      if (created) {
        if (tag.parentNode) tag.parentNode.removeChild(tag);
      } else if (previous[i] === null) {
        tag.removeAttribute("content");
      } else {
        tag.setAttribute("content", previous[i]);
      }
    });
  };
}

function setCanonical(url) {
  let links = Array.from(
    document.head.querySelectorAll('link[rel="canonical"]')
  );

  const created = links.length === 0;

  if (created) {
    const link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
    links = [link];
  }

  const previous = links.map((link) => link.getAttribute("href"));

  links.forEach((link) => link.setAttribute("href", url));

  return () => {
    links.forEach((link, i) => {
      if (created) {
        if (link.parentNode) link.parentNode.removeChild(link);
      } else if (previous[i] === null) {
        link.removeAttribute("href");
      } else {
        link.setAttribute("href", previous[i]);
      }
    });
  };
}

export default function About() {
  const navigate = useNavigate();

  useEffect(() => {
    const undos = [];
    const prevTitle = document.title;

    document.title = SEO_TITLE;

    undos.push(setMeta("name", "description", SEO_DESCRIPTION));
    undos.push(setMeta("name", "keywords", SEO_KEYWORDS));
    undos.push(setMeta("name", "robots", "index, follow"));
    undos.push(setMeta("name", "author", "RentoCar"));
    undos.push(setCanonical(PAGE_URL));

    undos.push(setMeta("property", "og:title", SEO_TITLE));
    undos.push(setMeta("property", "og:description", SEO_DESCRIPTION));
    undos.push(setMeta("property", "og:url", PAGE_URL));
    undos.push(setMeta("property", "og:type", "website"));

    return () => {
      undos.reverse().forEach((undo) => undo());
      document.title = prevTitle;
    };
  }, []);

  const goToCars = () => {
    navigate("/cars");
  };

  const goToContact = () => {
    navigate("/contact");
  };

  return (
    <div className="about-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="about-hero">

        <div className="about-hero-glow about-glow-one"></div>
        <div className="about-hero-glow about-glow-two"></div>

        <div className="about-container">

          <div className="about-hero-content">

            <span className="about-eyebrow">
              About RentoCar
            </span>

            <h1>
              More than a rental.
              <span> A better way to move.</span>
            </h1>

            <p>
              RentoCar is a Pune-based self-drive car rental
              service built to make renting simple, flexible
              and reliable. Whether it is a quick city drive,
              a weekend escape or a long road trip, we make
              getting behind the wheel easy.
            </p>

            <div className="about-hero-actions">

              <button
                type="button"
                className="about-primary-btn"
                onClick={goToCars}
              >
                Explore Our Cars
                <ArrowUpRight size={17} />
              </button>

              <button
                type="button"
                className="about-secondary-btn"
                onClick={goToContact}
              >
                Get in Touch
              </button>

            </div>

          </div>

          <div className="about-hero-visual">

            <div className="about-visual-ring"></div>

            <div className="about-car-card">

              <div className="about-car-card-top">

                <span>
                  RENTOCAR
                </span>

                <Sparkles size={16} />

              </div>

              <div className="about-car-icon">
                <CarFront size={82} strokeWidth={1.1} />
              </div>

              <div className="about-car-card-bottom">

                <div>
                  <small>
                    THE JOURNEY
                  </small>

                  <strong>
                    Starts Here
                  </strong>
                </div>

                <ArrowUpRight size={20} />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="about-intro">

        <div className="about-container">

          <div className="about-intro-grid">

            <div className="about-section-label">
              <span>
                01
              </span>

              <div></div>

              <p>
                WHO WE ARE
              </p>
            </div>


            <div className="about-intro-content">

              <h2>
                Freedom should feel
                <span> effortless.</span>
              </h2>

              <p>
                At RentoCar, we believe renting a car should be
                as enjoyable as driving one. No unnecessary
                complexity. No confusing process. Just a reliable
                car, a straightforward booking experience and
                the freedom to travel on your own terms.
              </p>

              <p>
                We are creating a modern self-drive experience
                focused on convenience, quality and trust.
                From choosing your car to completing your
                journey, every part of the experience is designed
                around you.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="about-stats">

        <div className="about-container">

          <div className="about-stats-grid">

            <div className="about-stat">

              <strong>
                4.8<span>+</span>
              </strong>

              <small>
                Customer Rating
              </small>

            </div>


            <div className="about-stat">

              <strong>
                24<span>/7</span>
              </strong>

              <small>
                Customer Support
              </small>

            </div>


            <div className="about-stat">

              <strong>
                100<span>%</span>
              </strong>

              <small>
                Journey Focused
              </small>

            </div>


            <div className="about-stat">

              <strong>
                01
              </strong>

              <small>
                Simple Promise
              </small>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MISSION
      ===================================================== */}

      <section className="about-mission">

        <div className="about-container">

          <div className="about-mission-card">

            <div className="about-mission-decoration"></div>

            <div className="about-mission-number">
              02
            </div>

            <div className="about-mission-content">

              <span>
                OUR MISSION
              </span>

              <h2>
                Making every journey
                <em> feel yours.</em>
              </h2>

              <p>
                Our mission is simple: give people the freedom
                to explore without making car rental complicated.
                We want every RentoCar journey to feel personal,
                dependable and effortless.
              </p>

            </div>

            <div className="about-mission-icon">
              <Target size={55} strokeWidth={1.1} />
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          VALUES
      ===================================================== */}

      <section className="about-values">

        <div className="about-container">

          <div className="about-heading">

            <div className="about-heading-label">
              <span>
                03
              </span>

              <p>
                WHAT MATTERS TO US
              </p>
            </div>

            <h2>
              Built around
              <span> trust.</span>
            </h2>

            <p>
              Everything we do comes back to creating a better
              experience for the people behind the wheel.
            </p>

          </div>


          <div className="about-values-grid">

            {/* VALUE 1 */}

            <article className="about-value-card">

              <div className="about-value-icon">
                <ShieldCheck size={25} />
              </div>

              <span className="about-value-number">
                01
              </span>

              <h3>
                Trust First
              </h3>

              <p>
                Clear communication, dependable service and
                an experience you can feel confident about.
              </p>

            </article>


            {/* VALUE 2 */}

            <article className="about-value-card">

              <div className="about-value-icon">
                <CarFront size={25} />
              </div>

              <span className="about-value-number">
                02
              </span>

              <h3>
                Quality Cars
              </h3>

              <p>
                We believe the car you choose should be
                comfortable, reliable and ready for the road.
              </p>

            </article>


            {/* VALUE 3 */}

            <article className="about-value-card">

              <div className="about-value-icon">
                <HeartHandshake size={25} />
              </div>

              <span className="about-value-number">
                03
              </span>

              <h3>
                Customer First
              </h3>

              <p>
                Your convenience matters at every step,
                from booking to returning the car.
              </p>

            </article>


            {/* VALUE 4 */}

            <article className="about-value-card">

              <div className="about-value-icon">
                <Sparkles size={25} />
              </div>

              <span className="about-value-number">
                04
              </span>

              <h3>
                Keep It Simple
              </h3>

              <p>
                We remove unnecessary complexity so you can
                focus on the road and the experience.
              </p>

            </article>

          </div>

        </div>

      </section>


      {/* =====================================================
          EXPERIENCE
      ===================================================== */}

      <section className="about-experience">

        <div className="about-container">

          <div className="about-experience-grid">

            <div className="about-experience-visual">

              <div className="about-experience-box">

                <div className="about-experience-top">
                  <span>
                    R
                  </span>

                  <span>
                    EST. FOR THE ROAD
                  </span>
                </div>

                <div className="about-experience-center">

                  <MapPin
                    size={48}
                    strokeWidth={1}
                  />

                  <strong>
                    Pune
                  </strong>

                  <small>
                    Maharashtra
                  </small>

                </div>

                <div className="about-experience-bottom">

                  <span>
                    CITY
                  </span>

                  <span>
                    ROAD
                  </span>

                  <span>
                    JOURNEY
                  </span>

                </div>

              </div>

            </div>


            <div className="about-experience-content">

              <div className="about-section-label">

                <span>
                  04
                </span>

                <div></div>

                <p>
                  THE EXPERIENCE
                </p>

              </div>

              <h2>
                Your plans.
                <span> Your route.</span>
              </h2>

              <p>
                Every journey is different. Some are planned
                weeks ahead, while others begin with a simple
                decision to get out and drive.
              </p>

              <p>
                RentoCar gives you the flexibility to choose
                the vehicle that fits your plans and enjoy the
                freedom of travelling at your own pace.
              </p>


              <div className="about-check-list">

                <div>
                  <CheckCircle2 size={18} />
                  <span>
                    Flexible self-drive rentals
                  </span>
                </div>

                <div>
                  <CheckCircle2 size={18} />
                  <span>
                    Carefully selected vehicles
                  </span>
                </div>

                <div>
                  <CheckCircle2 size={18} />
                  <span>
                    Simple booking experience
                  </span>
                </div>

                <div>
                  <CheckCircle2 size={18} />
                  <span>
                    Dedicated customer support
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PEOPLE
      ===================================================== */}

      <section className="about-people">

        <div className="about-container">

          <div className="about-people-card">

            <div className="about-people-icon">
              <Users size={34} strokeWidth={1.2} />
            </div>

            <div>

              <span>
                MADE FOR PEOPLE
              </span>

              <h2>
                Because every
                <em> journey</em> has a story.
              </h2>

              <p>
                Whether you're heading to work, meeting friends,
                exploring a new place or simply taking the long
                way home, RentoCar is here to make the journey
                easier.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="about-final-cta">

        <div className="about-final-glow"></div>

        <div className="about-container">

          <div className="about-final-content">

            <span>
              READY TO DRIVE?
            </span>

            <h2>
              Your next journey
              <em> starts here.</em>
            </h2>

            <p>
              Choose your car, plan your route and enjoy
              the freedom of driving your way.
            </p>

            <button
              type="button"
              className="about-primary-btn"
              onClick={goToCars}
            >
              Find Your Car
              <ArrowUpRight size={18} />
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}