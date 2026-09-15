import React from "react";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  ChevronUp,
  CarFront,
  ShieldCheck,
  Headphones,
  Star,
} from "lucide-react";

import "./Footer.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goTo = (path) => {
    window.location.href = path;
  };

  return (
    <footer className="rd-footer">

      {/* =========================================
          TOP CTA
      ========================================= */}

      <section className="rd-footer-top">
        <div className="rd-footer-container">

          <div className="rd-footer-cta">

            <div className="rd-cta-decoration rd-decoration-one"></div>
            <div className="rd-cta-decoration rd-decoration-two"></div>

            <div className="rd-cta-content">

              <span className="rd-cta-label">
                RentoCar
              </span>

              <h2>
                Your journey starts
                <span> with a drive.</span>
              </h2>

              <p>
                Find the perfect car for your next
                city ride, weekend escape or
                unforgettable road trip.
              </p>

            </div>

            <button
              type="button"
              className="rd-cta-button"
              onClick={() => goTo("/cars")}
            >
              Explore Cars
              <ArrowUpRight size={17} />
            </button>

          </div>

        </div>
      </section>


      {/* =========================================
          MAIN FOOTER
      ========================================= */}

      <section className="rd-footer-main">

        <div className="rd-footer-container">

          <div className="rd-footer-grid">

            {/* =================================
                BRAND
            ================================= */}

            <div className="rd-footer-brand">

              {/* ACTUAL RENTOCAR LOGO */}
              <button
                type="button"
                className="rd-logo"
                onClick={() => goTo("/")}
                aria-label="RentoCar Home"
              >
                <img
                  src="/assets/footerlogo.png"
                  alt="RentoCar"
                  className="rd-logo-image"
                />
              </button>


              <p className="rd-brand-description">
                Simple, flexible and reliable
                self-drive car rentals made
                for every kind of journey.
              </p>


              {/* SOCIAL STYLE BUTTONS */}

              <div className="rd-socials">

                <a
                  href="#instagram"
                  aria-label="Instagram"
                  className="rd-social-instagram"
                >
                  <span>IG</span>
                </a>

                <a
                  href="#facebook"
                  aria-label="Facebook"
                  className="rd-social-facebook"
                >
                  <span>f</span>
                </a>

                <a
                  href="#twitter"
                  aria-label="Twitter"
                  className="rd-social-twitter"
                >
                  <span>𝕏</span>
                </a>

                <a
                  href="#youtube"
                  aria-label="YouTube"
                  className="rd-social-youtube"
                >
                  <span>YT</span>
                </a>

              </div>

            </div>


            {/* =================================
                COMPANY
            ================================= */}

            <div className="rd-footer-column">

              <h3>
                Company
              </h3>

              <button
                type="button"
                onClick={() => goTo("/about")}
              >
                About RentoCar
              </button>

              <button
                type="button"
                onClick={() => goTo("/cars")}
              >
                Our Cars
              </button>

              <button
                type="button"
                onClick={() => goTo("/contact")}
              >
                Contact Us
              </button>

             
            </div>


            {/* =================================
                SERVICES
            ================================= */}

            <div className="rd-footer-column">

              <h3>
                Our Services
              </h3>

              <button
                type="button"
                onClick={() => goTo("/cars")}
              >
                Daily Drives
              </button>

              <button
                type="button"
                onClick={() => goTo("/cars")}
              >
                Weekly Rentals
              </button>

              <button
                type="button"
                onClick={() => goTo("/cars")}
              >
                Outstation Trips
              </button>

              <button
                type="button"
                onClick={() => goTo("/cars")}
              >
                Airport Transfers
              </button>

            </div>


            {/* =================================
                SUPPORT
            ================================= */}

            <div className="rd-footer-column">

              <h3>
                Support
              </h3>

              <button
                type="button"
                onClick={() => goTo("/faq")}
              >
                FAQs
              </button>

              <button
                type="button"
                onClick={() => goTo("/terms")}
              >
                Terms & Conditions
              </button>

              <button
                type="button"
                onClick={() => goTo("/privacy")}
              >
                Privacy Policy
              </button>

              <button
                type="button"
                onClick={() => goTo("/refund")}
              >
                Cancellation & Refund
              </button>

            </div>


            {/* =================================
                CONTACT
            ================================= */}

            <div className="rd-footer-column rd-contact-column">

              <h3>
                Get in touch
              </h3>

              <a
                href="tel:+917020148417"
                className="rd-contact-item"
              >
                <span className="rd-contact-icon">
                  <Phone size={14} />
                </span>

                <span>
                  +91 7020148417
                </span>
              </a>


              <a
                href="mailto:support@rentocarpune.com"
                className="rd-contact-item"
              >
                <span className="rd-contact-icon">
                  <Mail size={14} />
                </span>

                <span>
                  support@rentocarpune.com
                </span>
              </a>


              <div className="rd-contact-item">

                <span className="rd-contact-icon">
                  <MapPin size={14} />
                </span>

                <span>
                  Pune, Maharashtra
                </span>

              </div>

            </div>

          </div>


          {/* =========================================
              TRUST STRIP
          ========================================= */}

          <div className="rd-trust-strip">

            <div className="rd-trust-item">

              <span className="rd-trust-icon">
                <CarFront size={17} />
              </span>

              <div>
                <strong>
                  Quality Cars
                </strong>

                <small>
                  Well maintained
                </small>
              </div>

            </div>


            <div className="rd-trust-item">

              <span className="rd-trust-icon">
                <ShieldCheck size={17} />
              </span>

              <div>
                <strong>
                  Safe & Secure
                </strong>

                <small>
                  Trusted rentals
                </small>
              </div>

            </div>


            <div className="rd-trust-item">

              <span className="rd-trust-icon">
                <Headphones size={17} />
              </span>

              <div>
                <strong>
                  24/7 Support
                </strong>

                <small>
                  We're here to help
                </small>
              </div>

            </div>


            <div className="rd-trust-item">

              <span className="rd-trust-icon">
                <Star size={17} />
              </span>

              <div>
                <strong>
                  4.8+ Rating
                </strong>

                <small>
                  Loved by customers
                </small>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          APP SECTION
      ========================================= */}

      <section className="rd-app-section">

        <div className="rd-footer-container">

          <div className="rd-app-card">

            <div className="rd-app-content">

              <div className="rd-app-icon">
                <CarFront size={25} />
              </div>

              <div>

                <span>
                  Rentocar App
                </span>

                <h3>
                  Your car rental,
                  right in your pocket.
                </h3>

              </div>

            </div>


            <div className="rd-app-buttons">

              <button type="button">

                <small>
                  COMING SOON
                </small>

                <strong>
                  Google Play
                </strong>

              </button>


              <button type="button">

                <small>
                  COMING SOON
                </small>

                <strong>
                  App Store
                </strong>

              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          BOTTOM FOOTER
      ========================================= */}

      <section className="rd-footer-bottom">

        <div className="rd-footer-container">

          <div className="rd-bottom-inner">

            <p>
              © {new Date().getFullYear()} RentoCar.
              All rights reserved.
            </p>


            <div className="rd-bottom-links">

              <button
                type="button"
                onClick={() => goTo("/terms")}
              >
                Terms
              </button>

              <button
                type="button"
                onClick={() => goTo("/privacy")}
              >
                Privacy
              </button>

              <button
                type="button"
                onClick={() => goTo("/faq")}
              >
                Help
              </button>

            </div>


            <button
              type="button"
              className="rd-back-top"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <ChevronUp size={17} />
            </button>

          </div>

        </div>

      </section>

    </footer>
  );
}