
import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Clock3,
  CarFront,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./Contact.css";

/* =====================================================
   SEO CONTENT
===================================================== */

const SITE_URL = "https://www.rentocar.in";
const PAGE_URL = `${SITE_URL}/contact`;

const SEO_TITLE =
  "Contact RentoCar | Self Drive Car Rental Support in Pune";

const SEO_DESCRIPTION =
  "Get in touch with RentoCar for booking help, car availability or general questions. Call, email or send us a message. Our Pune team is here to help.";

const SEO_KEYWORDS =
  "contact RentoCar, RentoCar Pune contact, self drive car rental Pune, car rental support Pune, rent a car in Pune, car rental customer care Pune";

/* =====================================================
   HEAD HELPERS
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

  tags.forEach((tag) => {
    tag.setAttribute("content", content);
  });

  return () => {
    tags.forEach((tag, index) => {
      if (created) {
        if (tag.parentNode) {
          tag.parentNode.removeChild(tag);
        }
      } else if (previous[index] === null) {
        tag.removeAttribute("content");
      } else {
        tag.setAttribute("content", previous[index]);
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

  links.forEach((link) => {
    link.setAttribute("href", url);
  });

  return () => {
    links.forEach((link, index) => {
      if (created) {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      } else if (previous[index] === null) {
        link.removeAttribute("href");
      } else {
        link.setAttribute("href", previous[index]);
      }
    });
  };
}

/* =====================================================
   CONTACT PAGE
===================================================== */

export default function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  /* =====================================================
     SEO
  ===================================================== */

  useEffect(() => {
    const undos = [];
    const previousTitle = document.title;

    document.title = SEO_TITLE;

    undos.push(
      setMeta("name", "description", SEO_DESCRIPTION)
    );

    undos.push(
      setMeta("name", "keywords", SEO_KEYWORDS)
    );

    undos.push(
      setMeta("name", "robots", "index, follow")
    );

    undos.push(
      setMeta("name", "author", "RentoCar")
    );

    undos.push(
      setCanonical(PAGE_URL)
    );

    undos.push(
      setMeta("property", "og:title", SEO_TITLE)
    );

    undos.push(
      setMeta("property", "og:description", SEO_DESCRIPTION)
    );

    undos.push(
      setMeta("property", "og:url", PAGE_URL)
    );

    undos.push(
      setMeta("property", "og:type", "website")
    );

    undos.push(
      setMeta("property", "og:site_name", "RentoCar")
    );

    undos.push(
      setMeta("property", "og:locale", "en_IN")
    );

    undos.push(
      setMeta("name", "twitter:card", "summary")
    );

    undos.push(
      setMeta("name", "twitter:title", SEO_TITLE)
    );

    undos.push(
      setMeta("name", "twitter:description", SEO_DESCRIPTION)
    );

    return () => {
      undos.reverse().forEach((undo) => undo());
      document.title = previousTitle;
    };
  }, []);

  /* =====================================================
     FORM HANDLING
  ===================================================== */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <main className="contact-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="contact-hero"
        aria-labelledby="contact-page-title"
      >
        <div className="contact-hero-glow contact-glow-one"></div>

        <div className="contact-hero-glow contact-glow-two"></div>

        <div className="contact-container">

          <div className="contact-hero-content">

            <span className="contact-eyebrow">
              Contact RentoCar Pune
            </span>

            <h1 id="contact-page-title">
              Contact RentoCar,
              <span>
                {" "}
                your Pune self-drive car rental.
              </span>
            </h1>

            <p>
              Have a question about a car, booking or your
              next trip in Pune? Our team is here to help make
              your self-drive car rental experience simple and
              stress-free.
            </p>

            <div className="contact-hero-badge">

              <span
                className="contact-online-dot"
                aria-hidden="true"
              ></span>

              <span>
                We're here to help
              </span>

            </div>

          </div>

          <div
            className="contact-hero-mark"
            aria-hidden="true"
          >
            <div className="contact-mark-ring"></div>

            <div className="contact-mark-inner">

              <CarFront
                size={68}
                strokeWidth={1}
              />

              <span>
                RENTOCAR
              </span>

              <small>
                DRIVE YOUR WAY
              </small>

            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          CONTACT CONTENT
      ===================================================== */}

      <section
        className="contact-main"
        aria-labelledby="contact-help-title"
      >
        <div className="contact-container">

          <div className="contact-main-grid">

            {/* =================================================
                LEFT INFORMATION
            ================================================= */}

            <div className="contact-information">

              <div className="contact-section-label">

                <span>
                  01
                </span>

                <div></div>

                <p>
                  GET IN TOUCH
                </p>

              </div>

              <h2>
                We're always
                <span>
                  {" "}
                  happy to help.
                </span>
              </h2>

              <p className="contact-intro-text">
                Whether you need help choosing the right car,
                have a question about your booking or simply
                want to know more about RentoCar, reach out to us.
              </p>

              {/* =================================================
                  PHONE
              ================================================= */}

              <a
                href="tel:+917020148417"
                className="contact-info-card"
                aria-label="Call RentoCar at +91 7020148417"
              >

                <span className="contact-info-icon">
                  <Phone size={19} />
                </span>

                <span className="contact-info-content">

                  <small>
                    CALL US
                  </small>

                  <strong>
                    +91 7020148417
                  </strong>

                  <em>
                    Available for assistance
                  </em>

                </span>

                <ArrowUpRight size={18} />

              </a>

              {/* =================================================
                  EMAIL
              ================================================= */}

              <a
                href="mailto:support@rentocarpune.com"
                className="contact-info-card"
                aria-label="Email RentoCar support"
              >

                <span className="contact-info-icon">
                  <Mail size={19} />
                </span>

                <span className="contact-info-content">

                  <small>
                    EMAIL US
                  </small>

                  <strong>
                    support@rentocarpune.com
                  </strong>

                  <em>
                    We'll get back to you
                  </em>

                </span>

                <ArrowUpRight size={18} />

              </a>

              {/* =================================================
                  LOCATION
              ================================================= */}

              <div className="contact-info-card contact-info-static">

                <span className="contact-info-icon">
                  <MapPin size={19} />
                </span>

                <span className="contact-info-content">

                  <small>
                    FIND US
                  </small>

                  <strong>
                    Pune, Maharashtra
                  </strong>

                  <em>
                    Serving journeys across the city
                  </em>

                </span>

              </div>

              {/* =================================================
                  HOURS
              ================================================= */}

              <div className="contact-hours">

                <div className="contact-hours-icon">
                  <Clock3 size={18} />
                </div>

                <div>

                  <strong>
                    Support Hours
                  </strong>

                  <span>
                    Monday – Sunday
                  </span>

                  <small>
                    Customer assistance available 24/7
                  </small>

                </div>

              </div>

            </div>

            {/* =================================================
                CONTACT FORM
            ================================================= */}

            <div className="contact-form-wrapper">

              <div className="contact-form-header">

                <span>
                  SEND A MESSAGE
                </span>

                <h2 id="contact-help-title">
                  How can we
                  <em>
                    {" "}
                    help?
                  </em>
                </h2>

                <p>
                  Fill in the details below and our team
                  will get back to you.
                </p>

              </div>

              {submitted ? (

                <div
                  className="contact-success"
                  role="status"
                  aria-live="polite"
                >

                  <div className="contact-success-icon">
                    <CheckCircle2 size={35} />
                  </div>

                  <h3>
                    Message received.
                  </h3>

                  <p>
                    Thank you for reaching out to RentoCar.
                    Our team will get back to you soon.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </button>

                </div>

              ) : (

                <form
                  className="contact-form"
                  onSubmit={handleSubmit}
                >

                  {/* NAME + EMAIL */}

                  <div className="contact-form-row">

                    <div className="contact-field">

                      <label htmlFor="contact-name">
                        Your Name
                      </label>

                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                      />

                    </div>

                    <div className="contact-field">

                      <label htmlFor="contact-email">
                        Email Address
                      </label>

                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                      />

                    </div>

                  </div>

                  {/* PHONE + SUBJECT */}

                  <div className="contact-form-row">

                    <div className="contact-field">

                      <label htmlFor="contact-phone">
                        Phone Number
                      </label>

                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                      />

                    </div>

                    <div className="contact-field">

                      <label htmlFor="contact-subject">
                        Subject
                      </label>

                      <select
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >

                        <option value="">
                          Select a subject
                        </option>

                        <option value="car-booking">
                          Car Booking
                        </option>

                        <option value="car-availability">
                          Car Availability
                        </option>

                        <option value="existing-booking">
                          Existing Booking
                        </option>

                        <option value="general">
                          General Enquiry
                        </option>

                        <option value="other">
                          Other
                        </option>

                      </select>

                    </div>

                  </div>

                  {/* MESSAGE */}

                  <div className="contact-field">

                    <label htmlFor="contact-message">
                      Your Message
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      rows="6"
                      placeholder="Tell us how we can help..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className="contact-submit-btn"
                  >
                    <span>
                      Send Message
                    </span>

                    <ArrowUpRight size={18} />

                  </button>

                  <p className="contact-form-note">

                    <CheckCircle2 size={13} />

                    <span>
                      Your information is kept private and secure.
                    </span>

                  </p>

                </form>

              )}

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          QUICK HELP
      ===================================================== */}

      <section
        className="contact-help"
        aria-labelledby="quick-help-title"
      >
        <div className="contact-container">

          <div className="contact-help-heading">

            <div className="contact-section-label">

              <span>
                02
              </span>

              <div></div>

              <p>
                QUICK HELP
              </p>

            </div>

            <h2 id="quick-help-title">
              Looking for something
              <span>
                {" "}
                specific?
              </span>
            </h2>

          </div>

          <div className="contact-help-grid">

            {/* =================================================
                BOOKING
            ================================================= */}

            <button
              type="button"
              className="contact-help-card"
              onClick={() => navigate("/cars")}
            >

              <span className="contact-help-icon">
                <CarFront size={23} />
              </span>

              <span className="contact-help-content">

                <strong>
                  Looking for a car?
                </strong>

                <small>
                  Browse our available cars and
                  find one for your journey.
                </small>

              </span>

              <ArrowUpRight size={18} />

            </button>

            {/* =================================================
                MESSAGE
            ================================================= */}

            <a
              href="mailto:support@rentocarpune.com"
              className="contact-help-card"
              aria-label="Email RentoCar support"
            >

              <span className="contact-help-icon">
                <MessageCircle size={23} />
              </span>

              <span className="contact-help-content">

                <strong>
                  Need assistance?
                </strong>

                <small>
                  Send us an email and our team
                  will be happy to help.
                </small>

              </span>

              <ArrowUpRight size={18} />

            </a>

            {/* =================================================
                LOCATION
            ================================================= */}

            <div className="contact-help-card contact-help-static">

              <span className="contact-help-icon">
                <MapPin size={23} />
              </span>

              <span className="contact-help-content">

                <strong>
                  Based in Pune
                </strong>

                <small>
                  RentoCar is proudly serving
                  customers in Pune, Maharashtra.
                </small>

              </span>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="contact-final">

        <div className="contact-final-glow"></div>

        <div className="contact-container">

          <div className="contact-final-content">

            <span>
              READY TO HIT THE ROAD?
            </span>

            <h2>
              Let's get you
              <em>
                {" "}
                moving.
              </em>
            </h2>

            <p>
              Find your perfect car and start planning
              your next journey with RentoCar.
            </p>

            <button
              type="button"
              className="contact-final-btn"
              onClick={() => navigate("/cars")}
            >
              <span>
                Explore Cars
              </span>

              <ArrowUpRight size={18} />

            </button>

          </div>

        </div>

      </section>

    </main>
  );
}
