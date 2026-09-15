
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SEO from "../components/SEO";
import "./Leadership.css";

export default function Leadership() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setNewsOpen(false);
  };

  const leaders = [
    {
      initials: "CEO",
      name: "Leadership Team",
      role: "Chief Executive Leadership",
      description:
        "Driving RentoCar's vision, strategy and long-term growth.",
    },
    {
      initials: "CTO",
      name: "Technology Team",
      role: "Technology & Product",
      description:
        "Building technology that makes vehicle discovery and booking simple.",
    },
    {
      initials: "COO",
      name: "Operations Team",
      role: "Operations & Mobility",
      description:
        "Creating a reliable and seamless experience across every journey.",
    },
    {
      initials: "CFO",
      name: "Finance Team",
      role: "Finance & Strategy",
      description:
        "Supporting sustainable growth through disciplined financial planning.",
    },
  ];

  return (
    <div className="rc-leadership-page">

      {/* =====================================================
          SEO
      ===================================================== */}

      <SEO
        title="Leadership Team | RentoCar"
        description="Meet the RentoCar leadership and technology, operations and finance teams building the future of simple, flexible and reliable self-drive mobility."
        canonical="/company-profile/leadership"
        image="/logo.png"
      />

      {/* ================= HEADER ================= */}

      <header className="rc-leadership-header">

        <div className="rc-leadership-header-inner">

          <button
            type="button"
            className={`rc-leadership-menu ${
              menuOpen ? "active" : ""
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <Link
            to="/company-profile"
            className="rc-leadership-logo"
            onClick={closeMenu}
          >
            <span className="rc-leadership-logo-mark">R</span>

            <span>
              Rento<span>car</span>
            </span>
          </Link>

          <nav
            className={`rc-leadership-nav ${
              menuOpen ? "open" : ""
            }`}
          >

            <Link
              to="/company-profile"
              className={
                location.pathname === "/company-profile"
                  ? "active"
                  : ""
              }
              onClick={closeMenu}
            >
              Home
            </Link>

            <Link
              to="/company-profile/financials"
              className={
                location.pathname.includes("financials")
                  ? "active"
                  : ""
              }
              onClick={closeMenu}
            >
              Financials
            </Link>

            <Link
              to="/company-profile/sec-filings"
              className={
                location.pathname.includes("sec-filings")
                  ? "active"
                  : ""
              }
              onClick={closeMenu}
            >
              SEC Filings & Governance
            </Link>

            <div className="rc-leadership-dropdown">

              <button
                type="button"
                className={
                  location.pathname.includes("news-events")
                    ? "active"
                    : ""
                }
                onClick={() => setNewsOpen(!newsOpen)}
                aria-expanded={newsOpen}
              >
                News & Events <span>▼</span>
              </button>

              <div
                className={`rc-leadership-dropdown-menu ${
                  newsOpen ? "show" : ""
                }`}
              >
                <Link
                  to="/company-profile/news-events"
                  onClick={closeMenu}
                >
                  All Announcements
                </Link>

                <Link
                  to="/company-profile/news-events"
                  onClick={closeMenu}
                >
                  Press Releases
                </Link>

                <Link
                  to="/company-profile/news-events"
                  onClick={closeMenu}
                >
                  Events
                </Link>
              </div>

            </div>

            <Link
              to="/company-profile/leadership"
              className={
                location.pathname.includes("leadership")
                  ? "active"
                  : ""
              }
              onClick={closeMenu}
            >
              Leadership
            </Link>

          </nav>

          <div className="rc-leadership-stores">

            <div className="rc-leadership-store">
              <small>GET IT ON</small>
              <strong>Google Play</strong>
            </div>

            <div className="rc-leadership-store">
              <small>Download on the</small>
              <strong>App Store</strong>
            </div>

          </div>

        </div>

      </header>

      {/* ================= HERO ================= */}

      <section className="rc-leadership-hero">

        <div className="rc-leadership-container">

          <span>INVESTOR RELATIONS</span>

          <h1>
            Our
            <strong>Leadership</strong>
          </h1>

          <p>
            Meet the people and teams shaping the future
            of RentoCar and connected mobility.
          </p>

        </div>

      </section>

      {/* ================= INTRO ================= */}

      <section className="rc-leadership-intro">

        <div className="rc-leadership-container">

          <div className="rc-leadership-intro-grid">

            <div>
              <span>LEADERSHIP</span>

              <h2>
                Building the future
                <strong> of mobility.</strong>
              </h2>
            </div>

            <div>

              <p>
                RentoCar is built around a simple belief:
                mobility should be convenient, accessible
                and designed around people.
              </p>

              <p>
                Our leadership team brings together expertise
                across technology, operations, finance and
                customer experience to build a scalable
                mobility platform.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= LEADERS ================= */}

      <section className="rc-leaders-section">

        <div className="rc-leadership-container">

          <div className="rc-leaders-heading">

            <span>LEADERSHIP TEAM</span>

            <h2>
              People behind
              <strong> RentoCar.</strong>
            </h2>

            <p>
              A multidisciplinary team focused on creating
              better journeys for customers and hosts.
            </p>

          </div>

          <div className="rc-leaders-grid">

            {leaders.map((leader, index) => (

              <article
                className="rc-leader-card"
                key={index}
              >

                <div className="rc-leader-photo">

                  <div className="rc-leader-initials">
                    {leader.initials}
                  </div>

                  <div className="rc-leader-index">
                    0{index + 1}
                  </div>

                </div>

                <div className="rc-leader-content">

                  <span>{leader.role}</span>

                  <h3>{leader.name}</h3>

                  <p>{leader.description}</p>

                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    LinkedIn ↗
                  </a>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* ================= VALUES ================= */}

      <section className="rc-leadership-values">

        <div className="rc-leadership-container">

          <div className="rc-values-grid">

            <div className="rc-values-title">

              <span>OUR VALUES</span>

              <h2>
                How we
                <strong> lead.</strong>
              </h2>

            </div>

            <div className="rc-value">

              <strong>01</strong>

              <h3>Customer First</h3>

              <p>
                Every decision starts with creating
                a better customer experience.
              </p>

            </div>

            <div className="rc-value">

              <strong>02</strong>

              <h3>Move Fast</h3>

              <p>
                We continuously improve our technology,
                operations and products.
              </p>

            </div>

            <div className="rc-value">

              <strong>03</strong>

              <h3>Build Responsibly</h3>

              <p>
                Sustainable growth requires accountability,
                transparency and trust.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="rc-leadership-cta">

        <div className="rc-leadership-container">

          <div>

            <span>EXPLORE RENTOCAR</span>

            <h2>
              Discover the journey
              <strong> we're building.</strong>
            </h2>

          </div>

          <div className="rc-leadership-buttons">

            <Link to="/company-profile">
              Company Profile
            </Link>

            <Link to="/company-profile/financials">
              Financials
            </Link>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="rc-leadership-footer">

        <div className="rc-leadership-container">

          <div className="rc-leadership-footer-grid">

            <div>

              <Link
                to="/company-profile"
                className="rc-leadership-footer-logo"
              >
                <span>R</span>
                Rento<span>car</span>
              </Link>

              <p>
                Smart, flexible and reliable self-drive
                mobility for every journey.
              </p>

            </div>

            <div>

              <h4>Investors</h4>

              <Link to="/company-profile/financials">
                Financials
              </Link>

              <Link to="/company-profile/sec-filings">
                SEC Filings
              </Link>

              <Link to="/company-profile/news-events">
                News & Events
              </Link>

            </div>

            <div>

              <h4>Company</h4>

              <Link to="/company-profile">
                Company Profile
              </Link>

              <Link to="/company-profile/leadership">
                Leadership
              </Link>

              <Link to="/become-host">
                Become a Host
              </Link>

            </div>

          </div>

          <div className="rc-leadership-footer-bottom">

            <span>
              © {new Date().getFullYear()} RentoCar
            </span>

            <span>
              Investor Relations
            </span>

          </div>

        </div>

      </footer>

    </div>
  );
}

