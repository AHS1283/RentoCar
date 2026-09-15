import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import "./CompanyProfile.css";

export default function CompanyProfile() {
  return (
    <main className="rc-company-main">

      {/* =====================================================
          SEO
      ===================================================== */}

      <SEO
        title="RentoCar Company Profile | Self Drive Car Rental Company"
        description="Learn about RentoCar, a technology-driven self-drive car rental platform connecting customers and vehicle hosts with simple, flexible and transparent mobility solutions."
        canonical="/company-profile"
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="rc-company-hero">

        {/* LEFT CONTENT */}
        <div className="rc-hero-content">

          <span className="rc-eyebrow">
            COMPANY PROFILE
          </span>

          <h1>
            Moving India forward,
            <span> one journey at a time.</span>
          </h1>

          <p>
            RentoCar is building a simpler, smarter and more
            flexible way for people to experience self-drive
            mobility.
          </p>

          <div className="rc-hero-buttons">

            <Link
              to="/cars"
              className="rc-primary-btn"
            >
              Explore Cars
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              to="/become-host"
              className="rc-secondary-btn"
            >
              Become a Host
            </Link>

          </div>

        </div>

        {/* RIGHT VIDEO */}
        <div className="rc-hero-video">

          <div className="rc-video-card">

            <video
              controls
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="RentoCar company story video"
            >
              <source
                src="/videos/rentocar-company.mp4"
                type="video/mp4"
              />

              Your browser does not support the video.
            </video>

            <div className="rc-video-label">
              RentoCar Story
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          ABOUT RENTOCAR
      ===================================================== */}

      <section className="rc-about-section">

        <div className="rc-section-container">

          <div className="rc-section-heading">

            <span>
              ABOUT RENTOCAR
            </span>

            <h2>
              Making mobility
              <strong> simpler for everyone.</strong>
            </h2>

          </div>

          <div className="rc-about-grid">

            {/* LEFT */}
            <div>

              <p>
                RentoCar brings customers and vehicle hosts
                together through a technology-driven car rental
                platform.
              </p>

              <p>
                Whether it is a weekend road trip, a business
                journey or an everyday city drive, our goal is
                to make renting a car simple, convenient and
                transparent.
              </p>

            </div>

            {/* RIGHT */}
            <div className="rc-about-points">

              <div>
                <b>01</b>

                <strong>
                  Customer First
                </strong>

                <p>
                  Experiences designed around customer needs.
                </p>
              </div>

              <div>
                <b>02</b>

                <strong>
                  Flexible Mobility
                </strong>

                <p>
                  Cars for short drives and long journeys.
                </p>
              </div>

              <div>
                <b>03</b>

                <strong>
                  Host Community
                </strong>

                <p>
                  Helping vehicle owners unlock new opportunities.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          BY THE NUMBERS
      ===================================================== */}

      <section className="rc-numbers-section">

        <div className="rc-section-container">

          <div className="rc-section-heading center">

            <span>
              RENTOCAR BY THE NUMBERS
            </span>

            <h2>
              Growing with
              <strong> every journey.</strong>
            </h2>

            <p>
              Every trip helps us create a better mobility
              experience.
            </p>

          </div>

          <div className="rc-number-grid">

            <div className="rc-number-card">
              <strong>12K+</strong>
              <span>Trips completed</span>
            </div>

            <div className="rc-number-card">
              <strong>8.5K+</strong>
              <span>Happy customers</span>
            </div>

            <div className="rc-number-card">
              <strong>4+</strong>
              <span>Cities covered</span>
            </div>

            <div className="rc-number-card">

              <strong>
                4.8 <small>★</small>
              </strong>

              <span>
                Average rating
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          QUICK LINKS
      ===================================================== */}

      <section className="rc-quick-section">

        <div className="rc-section-container">

          <div className="rc-section-heading">

            <span>
              COMPANY INFORMATION
            </span>

            <h2>
              Explore RentoCar
              <strong> information.</strong>
            </h2>

          </div>

          <div className="rc-quick-grid">

            {/* News */}
            <Link
              to="/company-profile/news-events"
              className="rc-quick-card"
            >

              <span>
                01
              </span>

              <h3>
                News &amp; Events
              </h3>

              <p>
                Latest announcements, press releases and
                upcoming company events.
              </p>

              <b>
                View News →
              </b>

            </Link>

            {/* Leadership */}
            <Link
              to="/company-profile/leadership"
              className="rc-quick-card"
            >

              <span>
                02
              </span>

              <h3>
                Leadership
              </h3>

              <p>
                Meet the people building the next generation
                of mobility.
              </p>

              <b>
                Meet Our Team →
              </b>

            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="rc-company-cta">

        <div>

          <span>
            THE RENTOCAR JOURNEY
          </span>

          <h2>
            Your next journey
            <strong> starts here.</strong>
          </h2>

        </div>

        <Link to="/cars">
          Explore Cars →
        </Link>

      </section>

    </main>
  );
}