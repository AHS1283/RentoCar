import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  CalendarDays,
  KeyRound,
  RotateCcw,
  ArrowRight,
  Car,
  Check,
  Users,
  Fuel,
  Gauge,
} from "lucide-react";
import "./HowItWorks.css";

const steps = [
  {
    icon: Search,
    title: "Search Your Ride",
    badge: "Wide selection",
    description:
      "Browse verified cars near you — filter by city, price and body type to find the perfect match in seconds.",
  },
  {
    icon: CalendarDays,
    title: "Book Instantly",
    badge: "Instant confirmation",
    description:
      "Pick your pickup and drop dates, confirm the booking, and get an instant confirmation — no waiting, no calls.",
  },
  {
    icon: KeyRound,
    title: "Pick Up Your Car",
    badge: "Zero paperwork hassle",
    description:
      "Walk in, verify your ID, and unlock your car — the whole handover takes less than five minutes.",
  },
  {
    icon: RotateCcw,
    title: "Drive & Return",
    badge: "Flexible drop-off",
    description:
      "Enjoy the road on your terms, then return the car at the agreed time and location. That simple.",
  },
];

const nodePositions = [
  { x: 8, y: 72 },
  { x: 36, y: 22 },
  { x: 64, y: 72 },
  { x: 92, y: 22 },
];

const roadPath =
  "M 8 72 C 18 72, 26 22, 36 22 C 46 22, 54 72, 64 72 C 74 72, 82 22, 92 22";

const fleetCars = [
  {
    name: "Mahindra Thar",
    type: "Off-Road SUV",
    seats: "4",
    fuel: "Diesel",
    transmission: "Manual",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Maruti Swift",
    type: "Hatchback",
    seats: "5",
    fuel: "Petrol",
    transmission: "Manual",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Hyundai Creta",
    type: "Compact SUV",
    seats: "5",
    fuel: "Diesel",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Toyota Fortuner",
    type: "Premium SUV",
    seats: "7",
    fuel: "Diesel",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=80",
  },
];

export default function HowItWorksGameMap() {
  const sectionRef = useRef(null);
  const timerRef = useRef(null);
  const showcaseTimerRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selectedCar, setSelectedCar] = useState(0);
  const [showcasePaused, setShowcasePaused] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;

    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(timerRef.current);
  }, [paused]);

  /* =========================================
     AUTO-ROTATE THE FLEET CAR SHOWCASE
     Cycles the stacked deck on its own — pauses
     briefly whenever the person picks a card
     manually, then resumes.
  ========================================= */

  useEffect(() => {
    if (showcasePaused) return;

    showcaseTimerRef.current = setInterval(() => {
      setSelectedCar((prev) => (prev + 1) % fleetCars.length);
    }, 2600);

    return () => clearInterval(showcaseTimerRef.current);
  }, [showcasePaused]);

  const handleNodeClick = (index) => {
    setActive(index);
    setPaused(true);
  };

  const handleCardSelect = (index) => {
    setSelectedCar(index);
    setShowcasePaused(true);

    // Resume auto-rotation a little while after manual interaction
    window.clearTimeout(handleCardSelect.resumeTimer);
    handleCardSelect.resumeTimer = window.setTimeout(() => {
      setShowcasePaused(false);
    }, 5000);
  };

  const ActiveIcon = steps[active].icon;
  const progressFraction = active / (steps.length - 1);
  const carPos = nodePositions[active];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className={`gm-section ${visible ? "gm-visible" : ""}`}
    >
      <div className="gm-container">

        {/* HEADER */}

        <div className="gm-header">
          <div className="gm-label">
            <span className="gm-label-dot" />
            How it works
          </div>

          <h2 className="gm-heading">
            Your rental <span>quest</span> — 4 stops to the open road.
          </h2>
        </div>

        {/* LEVEL MAP */}

        <div className="gm-map">

          <svg
            className="gm-map-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path className="gm-road-base" d={roadPath} pathLength="100" />
            <path
              className="gm-road-progress"
              d={roadPath}
              pathLength="100"
              style={{
                strokeDashoffset: 100 - progressFraction * 100,
              }}
            />
          </svg>

          {nodePositions.map((pos, index) => {
            const StepIcon = steps[index].icon;
            const state =
              index < active
                ? "done"
                : index === active
                ? "active"
                : "upcoming";

            return (
              <button
                key={index}
                type="button"
                className={`gm-node gm-node-${state}`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onClick={() => handleNodeClick(index)}
              >
                <span className="gm-node-icon">
                  {state === "done" ? (
                    <Check size={18} strokeWidth={3} />
                  ) : (
                    <StepIcon size={18} strokeWidth={2.4} />
                  )}
                </span>
                <span className="gm-node-label">{steps[index].title}</span>
              </button>
            );
          })}

          <div
            className="gm-car"
            style={{ left: `${carPos.x}%`, top: `${carPos.y}%` }}
          >
            <Car size={22} strokeWidth={2.2} />
            <span className="gm-car-dust" />
          </div>

        </div>

        {/* REWARD TICKET */}

        <div className="gm-ticket">

          <div className="gm-ticket-left">

            <div className="gm-ticket-icon" key={active}>
              <ActiveIcon size={26} strokeWidth={2} />
            </div>

            <span className="gm-ticket-badge">{steps[active].badge}</span>

            <h3>{steps[active].title}</h3>
            <p>{steps[active].description}</p>

            <button type="button" className="gm-ticket-cta">
              Get Started
              <ArrowRight size={18} />
            </button>

          </div>

          <div className="gm-ticket-divider" />

          {/* CAR CARD SHOWCASE — auto-rotates on its own */}

          <div
            className="gm-showcase"
            onMouseEnter={() => setShowcasePaused(true)}
            onMouseLeave={() => setShowcasePaused(false)}
          >
            {fleetCars.map((car, index) => {
              const depth =
                (index - selectedCar + fleetCars.length) % fleetCars.length;

              return (
                <button
                  key={car.name}
                  type="button"
                  className={`gm-showcase-card gm-depth-${depth}`}
                  onClick={() => handleCardSelect(index)}
                >
                  <img src={car.image} alt={car.name} />
                  <span className="gm-card-overlay" />

                  <span className="gm-card-name">{car.name}</span>
                  <span className="gm-card-type">{car.type}</span>

                  {depth === 0 && (
                    <div className="gm-card-specs">
                      <span className="gm-spec-chip">
                        <Users size={13} strokeWidth={2.4} />
                        {car.seats}
                      </span>
                      <span className="gm-spec-chip">
                        <Fuel size={13} strokeWidth={2.4} />
                        {car.fuel}
                      </span>
                      <span className="gm-spec-chip">
                        <Gauge size={13} strokeWidth={2.4} />
                        {car.transmission}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}

            <div className="gm-showcase-dots" role="tablist" aria-label="Fleet cars">
              {fleetCars.map((car, index) => (
                <button
                  key={`${car.name}-dot`}
                  type="button"
                  role="tab"
                  aria-selected={index === selectedCar}
                  aria-label={`Show ${car.name}`}
                  className={`gm-showcase-dot ${
                    index === selectedCar ? "gm-showcase-dot-active" : ""
                  }`}
                  onClick={() => handleCardSelect(index)}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
