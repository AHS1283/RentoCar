import React, { useState } from "react";
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
import SEO from "../components/SEO";
import "./Contact.css";

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
    <div className="contact-page">

      {/* =====================================================
          SEO
      ===================================================== */}

      <SEO
        title="Contact RentoCar | Self Drive Car Rental Support in Pune"
        description="Get in touch with RentoCar for booking help, car availability or general questions. Call, email or send us a message — our team is here to help."
        canonical="/contact"
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="contact-hero">

        <div className="contact-hero-glow contact-glow-one"></div>
        <div className="contact-hero-glow contact-glow-two"></div>

        <div className="contact-container">

          <div className="contact-hero-content">

            <span className="contact-eyebrow">
              Contact RentoCar
            </span>

            <h1>
              Let's talk about
              <span> your journey.</span>
            </h1>

            <p>
              Have a question about a car, booking or your
              next trip? Our team is here to help make your
              RentoCar experience simple and stress-free.
            </p>

            <div className="contact-hero-badge">

              <span className="contact-online-dot"></span>

              <span>
                We're here to help
              </span>

            </div>

          </div>

          <div className="contact-hero-mark">

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

      <section className="contact-main">

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
                <span> happy to help.</span>
              </h2>

              <p className="contact-intro-text">
                Whether you need help choosing the right car,
                have a question about your booking or simply
                want to know more about RentoCar, reach out to us.
              </p>


              {/* PHONE */}

              <a
                href="tel:+917020148417"
                className="contact-info-card"
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


              {/* EMAIL */}

              <a
                href="mailto:support@rentocarpune.com"
                className="contact-info-card"
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


              {/* LOCATION */}

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


              {/* HOURS */}

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

                <h2>
                  How can we
                  <em> help?</em>
                </h2>

                <p>
                  Fill in the details below and our team
                  will get back to you.
                </p>

              </div>


              {submitted ? (

                <div className="contact-success">

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

                  {/* NAME */}

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
                        required
                      />

                    </div>


                    {/* EMAIL */}

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
                        required
                      />

                    </div>

                  </div>


                  {/* PHONE */}

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
                      />

                    </div>


                    {/* SUBJECT */}

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
                    Send Message
                    <ArrowUpRight size={18} />
                  </button>


                  <p className="contact-form-note">
                    <CheckCircle2 size={13} />
                    Your information is kept private and secure.
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

      <section className="contact-help">

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

            <h2>
              Looking for something
              <span> specific?</span>
            </h2>

          </div>


          <div className="contact-help-grid">

            {/* BOOKING */}

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


            {/* MESSAGE */}

            <a
              href="mailto:support@rentocarpune.com"
              className="contact-help-card"
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


            {/* LOCATION */}

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
              <em> moving.</em>
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
              Explore Cars
              <ArrowUpRight size={18} />
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}