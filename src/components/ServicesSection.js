import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Car,
  MapPin,
  IndianRupee,
  Building2,
  ArrowRight,
  ShieldCheck,
  Headphones,
  ThumbsUp,
  Star,
  ChevronRight,
  Sparkles,
  Zap,
  CalendarCheck,
} from "lucide-react";

import "./ServicesSection.css";

const services = [
  {
    icon: Car,
    title: "Self-drive freedom",
    description:
      "Pick a car, unlock it, and go — no driver, no limits.",
    featured: true,
    to: "/cars",
  },
  {
    icon: MapPin,
    title: "Car at your doorstep",
    description:
      "Get your ride delivered wherever your journey begins.",
    to: "/cars",
  },
  {
    icon: IndianRupee,
    title: "Drive longer, pay less",
    description:
      "Flexible rentals made smarter for longer journeys.",
    to: "/cars",
  },
  {
    icon: Building2,
    title: "Smart travel for teams",
    description:
      "Flexible and reliable mobility for work trips and teams.",
    to: "/cars",
  },
  {
    icon: Zap,
    title: "Instant booking",
    description:
      "Confirm your ride in minutes — no paperwork, no waiting.",
    to: "/cars",
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    text: "Your safety is our priority",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    text: "We're here whenever you need us",
  },
  {
    icon: ThumbsUp,
    title: "Best Prices",
    text: "Quality rides at fair prices",
  },
  {
    icon: Star,
    title: "Trusted by 25M+",
    text: "Happy customers nationwide",
  },
  {
    icon: CalendarCheck,
    title: "Free Cancellation",
    text: "Plans change? We've got you",
  },
];

const ServiceCard = React.forwardRef(function ServiceCard(
  {
    service,
    index,
    visible,
    isActive,
    onMouseMove,
    onMouseLeave,
    onOpen,
  },
  ref
) {
  const Icon = service.icon;

  return (
    <article
      ref={ref}
      className={[
        "service-card",
        visible ? "service-card-visible" : "",
        isActive ? "service-card-active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        "--card-delay": `${index * 100}ms`,
      }}
      tabIndex={0}
      role="link"
      onMouseMove={(event) => onMouseMove(event, index)}
      onMouseLeave={() => onMouseLeave(index)}
      onClick={() => onOpen(service.to)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(service.to);
        }
      }}
    >
      {service.featured && (
        <div className="service-card-ribbon">
          <Sparkles size={12} strokeWidth={2.4} />
          Most Popular
        </div>
      )}

      <div className="service-card-glow" />

      <span className="service-card-number">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="service-icon-wrap">
        <div className="service-icon">
          <Icon size={30} strokeWidth={1.7} />
        </div>

        <span className="spark spark-one">✦</span>
        <span className="spark spark-two">✦</span>
      </div>

      <div className="service-card-content">
        <h3>{service.title}</h3>

        <div className="service-divider" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>

        <p>{service.description}</p>
      </div>

      <button
        type="button"
        className="service-arrow"
        aria-label={`Explore ${service.title}`}
        onClick={(event) => {
          event.stopPropagation();
          onOpen(service.to);
        }}
      >
        <ArrowRight size={19} strokeWidth={2} />
      </button>
    </article>
  );
});

export default function ServicesSection() {
  const navigate = useNavigate();

  const sectionRef = useRef(null);
  const cardsWrapRef = useRef(null);
  const cardRefs = useRef([]);

  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);

  /* =========================================
     SECTION VISIBILITY
     ========================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.05,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* =========================================
     MOBILE CARD ACTIVE STATE
     ========================================= */

  useEffect(() => {
    const wrap = cardsWrapRef.current;

    if (!wrap) return;

    const handleScroll = () => {
      if (window.innerWidth > 650) return;

      const rect = wrap.getBoundingClientRect();
      const center = rect.left + rect.width / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const cardRect = card.getBoundingClientRect();
        const cardCenter =
          cardRect.left + cardRect.width / 2;

        const distance = Math.abs(cardCenter - center);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    wrap.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      wrap.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  /* =========================================
     SWIPE HINT
     ========================================= */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowHint(false);
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  /* =========================================
     MOBILE CARD SCROLL
     ========================================= */

  const scrollToCard = (index) => {
    const card = cardRefs.current[index];
    const wrap = cardsWrapRef.current;

    if (!card || !wrap) return;

    const left =
      card.offsetLeft -
      (wrap.clientWidth - card.clientWidth) / 2;

    wrap.scrollTo({
      left: Math.max(0, left),
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  /* =========================================
     DESKTOP CARD TILT
     ========================================= */

  const handleCardMouseMove = (event, index) => {
    if (window.innerWidth <= 1050) return;

    const card = cardRefs.current[index];

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY =
      ((x - centerX) / centerX) * 4;

    const rotateX =
      -((y - centerY) / centerY) * 4;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-8px)
      scale(1.015)
    `;
  };

  const handleCardMouseLeave = (index) => {
    const card = cardRefs.current[index];

    if (!card) return;

    card.style.transform = "";
  };

  const openService = (to) => {
    navigate(to || "/cars");
  };

  return (
    <section
      ref={sectionRef}
      className={`services-section ${
        visible ? "services-visible" : ""
      }`}
    >
      {/* Background */}
      <div
        className="services-grid-bg"
        aria-hidden="true"
      />

      <div
        className="services-orb services-orb-one"
        aria-hidden="true"
      />

      <div
        className="services-orb services-orb-two"
        aria-hidden="true"
      />

      <div className="services-container">

        {/* =====================================
            HEADER
        ===================================== */}

        <header className="services-header">

          <div className="services-label">
            <span>✦</span>
            WHAT WE OFFER
            <span>✦</span>
          </div>

          <h2>
            Services that keep you{" "}
            <span>moving.</span>
          </h2>

          <p>
            Smart, simple, and reliable car rental
            solutions for every kind of journey.
          </p>

          <div
            className="services-heading-line"
            aria-hidden="true"
          >
            <span />
            <Car size={19} strokeWidth={1.7} />
            <span />
          </div>

        </header>


        {/* =====================================
            MOVING ROAD
        ===================================== */}

        <div
          className="road-strip"
          aria-hidden="true"
        >

          <div className="road-strip-line" />

          <div className="road-strip-car">

            <div className="road-strip-glow" />

            <div className="road-strip-shadow" />

            <svg
              viewBox="0 0 100 52"
              className="road-strip-car-svg"
              xmlns="http://www.w3.org/2000/svg"
            >

              {/* Ground contact / lower skirt shading */}
              <path
                d="
                  M6 36.5
                  C6 32 10 29.5 16 29
                  L27 28
                  L38 14
                  L48 12.5
                  L58 13
                  L70 14.5
                  L83 26
                  L92 27.5
                  C96 28 98 31.5 98 36.5
                  L98 38.5
                  L6 38.5
                  Z
                "
                fill="#1E1F24"
                opacity="0.08"
              />

              {/* Main car body — sleek, low sports silhouette */}
              <path
                d="
                  M7 35
                  C7 30 11.5 27 18 26.3
                  L28 25.3
                  L37 12.5
                  C38.5 10.5 41 9.3 43.5 9.2
                  L61 8.6
                  C64 8.5 66.8 9.7 68.7 11.9
                  L79 23.5
                  L90 25
                  C95 25.6 97.5 29 97.5 33.8
                  L97.5 36
                  C97.5 37.4 96.4 38.5 95 38.5
                  L9 38.5
                  C7.9 38.5 7 37.6 7 36.5
                  Z
                "
                fill="#F2A93B"
                stroke="#D88F1F"
                strokeWidth="1.6"
              />

              {/* Roofline highlight (glossy sheen) */}
              <path
                d="
                  M40 13
                  C42 11 44.5 10 47 9.9
                  L60 9.5
                  C62.5 9.4 64.8 10.4 66.4 12.2
                  L73 19.5
                "
                fill="none"
                stroke="#FFD98A"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.75"
              />

              {/* Windshield + side windows */}
              <path
                d="
                  M39.5 24.5
                  L46 12.8
                  C46.9 11.2 48.6 10.2 50.4 10.2
                  L60.5 10.1
                  C62.3 10.1 64 11 65 12.5
                  L74.5 24.5
                  Z
                "
                fill="#1E1F24"
              />

              {/* Window divider (A-pillar) */}
              <path
                d="M50.5 11 L46 24.3"
                stroke="#F2A93B"
                strokeWidth="1"
                opacity="0.9"
              />

              {/* Window divider (B-pillar) */}
              <path
                d="M62 11.2 L67 24.3"
                stroke="#F2A93B"
                strokeWidth="1"
                opacity="0.9"
              />

              {/* Rear spoiler */}
              <path
                d="M83 21 L92 22.5 L92 25 L82.5 23.5 Z"
                fill="#1E1F24"
              />

              {/* Side accent stripe */}
              <path
                d="M18 33.5 L88 33.5"
                stroke="#4A3210"
                strokeWidth="1"
                opacity="0.35"
              />

              {/* Rear light strip */}
              <rect
                x="10"
                y="27.5"
                width="12"
                height="3.2"
                rx="1.6"
                fill="#FFF4D9"
              />

              {/* Front light strip */}
              <rect
                x="86"
                y="27.5"
                width="10"
                height="3.2"
                rx="1.6"
                fill="#FFF4D9"
              />

              {/* Front bumper accent */}
              <path
                d="M92 33 C95 33 97 34.3 97.5 36.2"
                fill="none"
                stroke="#4A3210"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.4"
              />

              {/* Rear wheel arch shadow */}
              <circle cx="26" cy="39" r="10.5" fill="#1E1F24" opacity="0.06" />

              {/* Rear wheel */}
              <circle cx="26" cy="39" r="8.2" fill="#1E1F24" />
              <circle cx="26" cy="39" r="5.2" fill="#2C2D34" />
              <circle cx="26" cy="39" r="2.6" fill="#EFEADE" />

              {/* Front wheel arch shadow */}
              <circle cx="79" cy="39" r="10.5" fill="#1E1F24" opacity="0.06" />

              {/* Front wheel */}
              <circle cx="79" cy="39" r="8.2" fill="#1E1F24" />
              <circle cx="79" cy="39" r="5.2" fill="#2C2D34" />
              <circle cx="79" cy="39" r="2.6" fill="#EFEADE" />

            </svg>

          </div>

        </div>


        {/* =====================================
            CARDS
        ===================================== */}

        <div className="services-cards-wrap">

          {/* Desktop connector */}
          <div
            className="services-connector"
            aria-hidden="true"
          >

            <span className="connector-line" />

            {[10, 30, 50, 70, 90].map(
              (position) => (
                <span
                  key={position}
                  className="connector-dot"
                  style={{
                    left: `${position}%`,
                  }}
                />
              )
            )}

            <span className="connector-pulse" />

          </div>


          <div
            ref={cardsWrapRef}
            className="services-cards"
          >

            {services.map(
              (service, index) => (
                <ServiceCard
                  key={`${service.title}-${index}`}
                  ref={(element) => {
                    cardRefs.current[index] =
                      element;
                  }}
                  service={service}
                  index={index}
                  visible={visible}
                  isActive={
                    index === activeIndex
                  }
                  onMouseMove={
                    handleCardMouseMove
                  }
                  onMouseLeave={
                    handleCardMouseLeave
                  }
                  onOpen={openService}
                />
              )
            )}

          </div>

        </div>


        {/* =====================================
            SWIPE HINT
        ===================================== */}

        <div
          className={`swipe-hint ${
            showHint
              ? ""
              : "swipe-hint-hidden"
          }`}
          aria-hidden="true"
        >

          <span>
            Swipe to explore
          </span>

          <ChevronRight
            size={16}
            strokeWidth={2.5}
          />

        </div>


        {/* =====================================
            DOTS
        ===================================== */}

        <div
          className="swiper-dots"
          role="tablist"
          aria-label="Service cards"
        >

          {services.map(
            (service, index) => (
              <button
                key={`${service.title}-dot`}
                type="button"
                role="tab"
                aria-selected={
                  index === activeIndex
                }
                aria-label={`Go to ${service.title}`}
                className={`swiper-dot ${
                  index === activeIndex
                    ? "swiper-dot-active"
                    : ""
                }`}
                onClick={() =>
                  scrollToCard(index)
                }
              />
            )
          )}

        </div>


        {/* =====================================
            FEATURES
        ===================================== */}

        <div
          className={`feature-strip ${
            visible
              ? "feature-strip-visible"
              : ""
          }`}
        >

          {features.map(
            (feature, index) => {
              const Icon = feature.icon;

              return (
                <React.Fragment
                  key={feature.title}
                >

                  <div className="feature-item">

                    <div className="feature-icon">
                      <Icon
                        size={21}
                        strokeWidth={1.9}
                      />
                    </div>

                    <div className="feature-text">

                      <strong>
                        {feature.title}
                      </strong>

                      <span>
                        {feature.text}
                      </span>

                    </div>

                  </div>

                  {index !==
                    features.length - 1 && (
                    <div
                      className="feature-separator"
                      aria-hidden="true"
                    />
                  )}

                </React.Fragment>
              );
            }
          )}

        </div>


        {/* =====================================
            CTA
        ===================================== */}

        <div
          className={`services-cta ${
            visible
              ? "services-cta-visible"
              : ""
          }`}
        >

          <div>

            <strong>
              Ready to hit the road?
            </strong>

            <span>
              Browse the full fleet and book
              in minutes.
            </span>

          </div>

          <button
            type="button"
            className="services-cta-btn"
            onClick={() =>
              navigate("/cars")
            }
          >

            Browse all cars

            <ArrowRight
              size={17}
              strokeWidth={2.2}
            />

          </button>

        </div>

      </div>
    </section>
  );
}