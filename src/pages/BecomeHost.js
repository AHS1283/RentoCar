
import React, {
  useEffect,
  useState,
} from "react";

import SEO from "../components/SEO";

import "./BecomeHost.css";

/* =====================================================
   BENEFITS
===================================================== */

const benefits = [
  {
    icon: "💰",
    title: "Earn Extra Income",
    text: "Turn your unused car into a reliable source of additional income.",
  },
  {
    icon: "🛡️",
    title: "Secure & Transparent",
    text: "Manage your car with transparent bookings, pricing and host support.",
  },
  {
    icon: "📅",
    title: "You Stay in Control",
    text: "Choose when your car is available and manage your hosting schedule.",
  },
  {
    icon: "🤝",
    title: "Dedicated Support",
    text: "Our team is here to help you throughout your hosting journey.",
  },
];

/* =====================================================
   TESTIMONIALS
===================================================== */

const testimonials = [
  {
    name: "Rahul Mehta",
    city: "Mumbai",
    text: "RentoCar helped me turn my second car into a steady source of extra income.",
    avatar: "RM",
  },
  {
    name: "Priya Shah",
    city: "Pune",
    text: "The process was simple and the support team made everything easy for me.",
    avatar: "PS",
  },
  {
    name: "Amit Verma",
    city: "Delhi",
    text: "I love being able to decide when I want to list my car and when I need it back.",
    avatar: "AV",
  },
];

/* =====================================================
   POLICIES
===================================================== */

const policies = [
  {
    icon: "🛡️",
    title: "Insurance & Damage Policy",
    text: "Every booking is covered under RentoCar's protection plan. Any damage during a trip is assessed and settled as per the applicable coverage terms.",
  },
  {
    icon: "❌",
    title: "Cancellation Policy",
    text: "Hosts and renters can cancel a booking within the allowed window. Cancellation charges, if any, depend on how close to the trip start time it is cancelled.",
  },
  {
    icon: "💳",
    title: "Payment & Payout Policy",
    text: "Renter payments are collected upfront through RentoCar. Host payouts are released as per the standard payout cycle after a completed trip.",
  },
  {
    icon: "📋",
    title: "Listing & Verification Policy",
    text: "All listed vehicles must pass document and safety verification before going live. Hosts must keep registration and insurance details up to date.",
  },
  {
    icon: "🔧",
    title: "Maintenance Responsibility",
    text: "Hosts are responsible for keeping their vehicle roadworthy, clean and serviced. Unsafe or poorly maintained vehicles can be delisted.",
  },
  {
    icon: "⏸️",
    title: "Availability Policy",
    text: "Hosts fully control when their car is open for bookings and can pause or resume their listing at any time from the host dashboard.",
  },
];

/* =====================================================
   FAQ
===================================================== */

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do I list my car on RentoCar?",
        a: "Click on Become a Host and submit your basic car and contact details. Our team will guide you through the verification and listing process.",
      },
      {
        q: "What documents are required to become a host?",
        a: "You may need valid vehicle registration, insurance and identity documents. Requirements can vary depending on your location and vehicle.",
      },
      {
        q: "How long does it take to get my car listed?",
        a: "Once your documents and vehicle details are verified, your listing can be prepared for bookings.",
      },
    ],
  },
  {
    category: "Earnings & Payments",
    questions: [
      {
        q: "How much can I earn by listing my car?",
        a: "Your potential earnings depend on your car model, location, demand, availability and the daily rental price.",
      },
      {
        q: "When will I receive my payments?",
        a: "Payments are processed according to the applicable RentoCar host payment schedule after a completed booking.",
      },
      {
        q: "Are there any charges for hosting?",
        a: "Applicable platform and service charges may vary. You will be shown the relevant details before accepting bookings.",
      },
    ],
  },
  {
    category: "Car Safety & Security",
    questions: [
      {
        q: "What safety measures are available for hosts?",
        a: "RentoCar uses verification and booking processes designed to make vehicle sharing safer and more transparent.",
      },
      {
        q: "Can I choose who rents my car?",
        a: "Bookings are subject to RentoCar's eligibility and verification requirements.",
      },
      {
        q: "What happens if my car is damaged?",
        a: "Damage handling depends on the booking terms, inspection information and applicable protection or insurance coverage.",
      },
    ],
  },
  {
    category: "Car Maintenance",
    questions: [
      {
        q: "Who is responsible for regular maintenance?",
        a: "Hosts remain responsible for keeping their vehicle roadworthy and properly maintained.",
      },
      {
        q: "Can I pause my car listing?",
        a: "Yes. Hosts can choose when their car should be available for bookings based on the platform's listing controls.",
      },
    ],
  },
  {
    category: "Legal & Compliance",
    questions: [
      {
        q: "What type of cars can be listed?",
        a: "Eligible vehicles must meet RentoCar's vehicle, documentation and safety requirements.",
      },
      {
        q: "Do I need valid insurance?",
        a: "Vehicles should have the legally required and applicable insurance documentation.",
      },
    ],
  },
];

/* =====================================================
   ANIMATED NUMBER
===================================================== */

function AnimatedNumber({
  value,
  suffix = "",
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const duration = 1200;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const ease =
        1 - Math.pow(1 - progress, 3);

      start = Math.floor(
        value * ease
      );

      setCount(start);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  );
}

/* =====================================================
   FAQ ITEM
===================================================== */

function FAQItem({
  question,
  answer,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`host-faq-item ${
        open ? "active" : ""
      }`}
    >
      <button
        type="button"
        className="host-faq-question"
        onClick={() =>
          setOpen(!open)
        }
        aria-expanded={open}
      >
        <span>
          {question}
        </span>

        <span className="host-faq-icon">
          {open ? "−" : "+"}
        </span>
      </button>

      <div className="host-faq-answer">
        <p>
          {answer}
        </p>
      </div>
    </div>
  );
}

/* =====================================================
   BECOME HOST PAGE
===================================================== */

export default function BecomeHost() {
  const [carModel, setCarModel] =
    useState("Maruti Swift");

  const [city, setCity] =
    useState("Pune");

  const [days, setDays] =
    useState(15);

  /* ===================================================
     RENTAL RATES
  =================================================== */

  const rates = {
    "Maruti Swift": 1450,
    "Hyundai Creta": 2200,
    "Tata Nexon": 1750,
    "Mahindra Scorpio": 2800,
    "Kia Seltos": 2300,
  };

  /* ===================================================
     CITY MULTIPLIER
  =================================================== */

  const cityMultiplier = {
    Mumbai: 1,
    Pune: 0.9,
    Delhi: 1.05,
    Bangalore: 1.1,
    Hyderabad: 0.9,
  };

  /* ===================================================
     ESTIMATED INCOME
  =================================================== */

  const estimatedIncome =
    Math.round(
      rates[carModel] *
        days *
        cityMultiplier[city]
    );

  return (
    <div className="become-host-page">

      {/* =================================================
          SEO
      ================================================= */}

      <SEO
        title="Become a Host | Earn Money by Renting Your Car | RentoCar"
        description="Become a RentoCar host and earn extra income by renting out your car. List your car, choose your availability and start earning from your vehicle."
        canonical="/become-host"
      />

      {/* =========================================
          HERO
      ========================================= */}

      <section className="host-hero">

        <div className="host-container host-hero-grid">

          <div className="host-hero-content">

            <span className="host-eyebrow">
              RENTOCAR HOST
            </span>

            <h1>
              Turn Your Car
              <br />
              Into{" "}
              <span>
                Extra Income.
              </span>
            </h1>

            <p className="host-hero-description">
              Your car can do more than sit in your
              parking spot. List it on RentoCar and
              earn when you're not using it.
            </p>

            <div className="host-hero-actions">

              <a
                href="#host-calculator"
                className="host-btn host-btn-primary"
              >
                Start Earning
                <span>→</span>
              </a>

              <a
                href="#host-benefits"
                className="host-btn host-btn-secondary"
              >
                Learn More
              </a>

            </div>

            <div className="host-trust-row">

              <div>
                <strong>
                  <AnimatedNumber
                    value={5000}
                    suffix="+"
                  />
                </strong>

                <span>
                  Cars listed
                </span>
              </div>

              <div>
                <strong>
                  <AnimatedNumber
                    value={50}
                    suffix="+"
                  />
                </strong>

                <span>
                  Cities
                </span>
              </div>

              <div>
                <strong>
                  <AnimatedNumber
                    value={4.8}
                    suffix="/5"
                  />
                </strong>

                <span>
                  Host rating
                </span>
              </div>

            </div>

          </div>

          <div className="host-hero-visual">

            <div className="host-hero-glow"></div>

            <div className="host-hero-card">

              <div className="host-card-badge">
                HOST WITH RENTOCAR
              </div>

              <div className="host-person">

                <div className="host-person-circle">
                  👨🏻
                </div>

              </div>

              <div className="host-car-illustration">
                🚗
              </div>

              <div className="host-income-card">

                <span>
                  Estimated monthly income
                </span>

                <strong>
                  ₹28,500
                </strong>

                <small>
                  Based on average availability
                </small>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================
          BENEFITS
      ========================================= */}

      <section
        className="host-benefits"
        id="host-benefits"
      >

        <div className="host-container">

          <div className="host-section-heading">

            <span className="host-eyebrow">
              WHY HOST WITH US
            </span>

            <h2>
              Unlock passive income
              <br />
              <span>
                without the hassle.
              </span>
            </h2>

            <p>
              RentoCar gives you the tools and
              support you need to turn your car
              into a smart earning asset.
            </p>

          </div>

          <div className="host-benefit-grid">

            {benefits.map(
              (benefit, index) => (
                <div
                  className="host-benefit-card"
                  key={benefit.title}
                  style={{
                    "--delay": `${index * 0.08}s`,
                  }}
                >

                  <div className="host-benefit-icon">
                    {benefit.icon}
                  </div>

                  <h3>
                    {benefit.title}
                  </h3>

                  <p>
                    {benefit.text}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </section>

      {/* =========================================
          CALCULATOR
      ========================================= */}

      <section
        className="host-calculator-section"
        id="host-calculator"
      >

        <div className="host-container">

          <div className="host-calculator">

            <div className="host-calculator-content">

              <span className="host-eyebrow">
                EARNINGS ESTIMATOR
              </span>

              <h2>
                See what your car
                <br />
                could earn.
              </h2>

              <p>
                Select your car, city and estimated
                availability to get an idea of your
                potential monthly earnings.
              </p>

              <div className="host-form-grid">

                <div className="host-field">

                  <label>
                    Car model
                  </label>

                  <select
                    value={carModel}
                    onChange={(e) =>
                      setCarModel(
                        e.target.value
                      )
                    }
                  >
                    {Object.keys(
                      rates
                    ).map((car) => (
                      <option
                        key={car}
                        value={car}
                      >
                        {car}
                      </option>
                    ))}
                  </select>

                </div>

                <div className="host-field">

                  <label>
                    City
                  </label>

                  <select
                    value={city}
                    onChange={(e) =>
                      setCity(
                        e.target.value
                      )
                    }
                  >
                    {Object.keys(
                      cityMultiplier
                    ).map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>

                </div>

                <div className="host-field host-field-full">

                  <label>
                    Available days per month

                    <strong>
                      {days} days
                    </strong>
                  </label>

                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={days}
                    onChange={(e) =>
                      setDays(
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />

                  <div className="host-range-labels">
                    <span>
                      5 days
                    </span>

                    <span>
                      30 days
                    </span>
                  </div>

                </div>

              </div>

            </div>

            <div className="host-earnings-card">

              <div className="host-earnings-icon">
                ₹
              </div>

              <span>
                Estimated monthly earnings
              </span>

              <strong>
                ₹
                {estimatedIncome.toLocaleString()}
              </strong>

              <p>
                Your actual earnings may vary
                depending on demand, pricing
                and bookings.
              </p>

              <a
                href="#host-cta"
                className="host-btn host-btn-primary"
              >
                List My Car
                <span>→</span>
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================
          TESTIMONIALS
      ========================================= */}

      <section className="host-testimonials">

        <div className="host-container">

          <div className="host-section-heading center">

            <span className="host-eyebrow">
              HOST STORIES
            </span>

            <h2>
              Real hosts.
              <br />
              <span>
                Real experiences.
              </span>
            </h2>

          </div>

          <div className="host-testimonial-grid">

            {testimonials.map(
              (item) => (
                <div
                  className="host-testimonial-card"
                  key={item.name}
                >

                  <div className="host-stars">
                    ★★★★★
                  </div>

                  <p>
                    "{item.text}"
                  </p>

                  <div className="host-testimonial-user">

                    <div className="host-testimonial-avatar">
                      {item.avatar}
                    </div>

                    <div>

                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        {item.city}
                      </span>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>

        </div>

      </section>

      {/* =========================================
          WHO CAN HOST
      ========================================= */}

      <section className="host-eligibility">

        <div className="host-container host-eligibility-grid">

          <div className="host-eligibility-visual">

            <div className="host-blue-card">

              <div className="host-car-icon">
                🚙
              </div>

              <h3>
                Who can become
                <br />
                a RentoCar Host?
              </h3>

              <p>
                Car owners who meet our vehicle
                and documentation requirements
                can apply.
              </p>

            </div>

          </div>

          <div className="host-eligibility-content">

            <span className="host-eyebrow">
              BECOME A HOST
            </span>

            <h2>
              Your car.
              <br />
              <span>
                Your rules.
              </span>
            </h2>

            <p>
              Whether you own one car or several,
              RentoCar helps you make better use
              of your vehicle when you're not
              driving it.
            </p>

            <ul className="host-check-list">

              <li>
                <span>✓</span>
                Valid vehicle documentation
              </li>

              <li>
                <span>✓</span>
                Safe and roadworthy vehicle
              </li>

              <li>
                <span>✓</span>
                Applicable insurance coverage
              </li>

              <li>
                <span>✓</span>
                Vehicle verification
              </li>

            </ul>

          </div>

        </div>

      </section>

      {/* =========================================
          POLICIES
      ========================================= */}

      <section
        className="host-policies-section"
        id="policies"
      >

        <div className="host-container">

          <div className="host-section-heading center">

            <span className="host-eyebrow">
              HOST POLICIES
            </span>

            <h2>
              Clear rules.
              <br />
              <span>
                No surprises.
              </span>
            </h2>

            <p>
              Everything you need to know about
              how hosting works on RentoCar.
            </p>

          </div>

          <div className="host-benefit-grid">

            {policies.map(
              (policy, index) => (
                <div
                  className="host-benefit-card"
                  key={policy.title}
                  style={{
                    "--delay": `${index * 0.08}s`,
                  }}
                >

                  <div className="host-benefit-icon">
                    {policy.icon}
                  </div>

                  <h3>
                    {policy.title}
                  </h3>

                  <p>
                    {policy.text}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

      </section>

      {/* =========================================
          FAQ
      ========================================= */}

      <section
        className="host-faq-section"
        id="faqs"
      >

        <div className="host-container">

          <div className="host-section-heading center">

            <span className="host-eyebrow">
              GOT QUESTIONS?
            </span>

            <h2>
              Everything you need
              <br />
              <span>
                to know.
              </span>
            </h2>

          </div>

          <div className="host-faq-list">

            {faqs.map(
              (group) => (
                <div
                  className="host-faq-group"
                  key={group.category}
                >

                  <h3>
                    {group.category}
                  </h3>

                  {group.questions.map(
                    (item) => (
                      <FAQItem
                        key={item.q}
                        question={item.q}
                        answer={item.a}
                      />
                    )
                  )}

                </div>
              )
            )}

          </div>

        </div>

      </section>

      {/* =========================================
          FINAL CTA
      ========================================= */}

      <section
        className="host-final-cta"
        id="host-cta"
      >

        <div className="host-container">

          <div className="host-final-card">

            <div>

              <span className="host-eyebrow">
                READY TO GET STARTED?
              </span>

              <h2>
                Your car could be
                <br />
                earning right now.
              </h2>

              <p>
                Join RentoCar and turn your idle
                car into an earning opportunity.
              </p>

            </div>

            <a
              href="#host-calculator"
              className="host-btn host-btn-white"
            >
              Become a Host
              <span>→</span>
            </a>

          </div>

        </div>

      </section>

    </div>
  );
}

