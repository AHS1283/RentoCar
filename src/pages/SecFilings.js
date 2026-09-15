
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SEO from "../components/SEO";
import "./SecFilings.css";

export default function SecFilings() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setNewsOpen(false);
  };

  const filings = [
    {
      type: "Annual Filing",
      title: "Annual Business & Corporate Filing",
      date: "2025",
      period: "FY 2024-25",
    },
    {
      type: "Quarterly Filing",
      title: "Quarterly Business Update",
      date: "2025",
      period: "Q4",
    },
    {
      type: "Corporate Governance",
      title: "Corporate Governance Report",
      date: "2025",
      period: "Annual",
    },
    {
      type: "Investor Document",
      title: "Investor Presentation",
      date: "2025",
      period: "FY 2024-25",
    },
    {
      type: "Board Information",
      title: "Board & Committee Information",
      date: "2025",
      period: "Current",
    },
  ];

  return (
    <div className="rc-sec-page">

      {/* =====================================================
          SEO
      ===================================================== */}

      <SEO
        title="RentoCar SEC Filings & Corporate Governance | Investor Relations"
        description="Explore RentoCar SEC filings, corporate governance information, annual and quarterly filings, investor documents, board information and company disclosures."
        canonical="/company-profile/sec-filings"
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="rc-sec-header">

        <div className="rc-sec-header-inner">

          <button
            type="button"
            className={`rc-sec-menu ${menuOpen ? "active" : ""}`}
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
            className="rc-sec-logo"
            onClick={closeMenu}
          >
            <span className="rc-sec-logo-mark">
              R
            </span>

            <span>
              Rento<span>car</span>
            </span>
          </Link>

          <nav
            className={`rc-sec-nav ${menuOpen ? "open" : ""}`}
            aria-label="Company navigation"
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
              SEC Filings &amp; Governance
            </Link>

            <div className="rc-sec-dropdown">

              <button
                type="button"
                onClick={() => setNewsOpen(!newsOpen)}
                className="rc-sec-dropdown-btn"
                aria-expanded={newsOpen}
              >
                News &amp; Events <span>▼</span>
              </button>

              <div
                className={`rc-sec-dropdown-menu ${
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

          <div className="rc-sec-stores">

            <div className="rc-sec-store">
              <small>GET IT ON</small>
              <strong>Google Play</strong>
            </div>

            <div className="rc-sec-store">
              <small>Download on the</small>
              <strong>App Store</strong>
            </div>

          </div>

        </div>

      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="rc-sec-hero">

        <div className="rc-sec-container">

          <span>
            INVESTOR RELATIONS
          </span>

          <h1>
            SEC Filings
            <strong>
              &amp; Governance
            </strong>
          </h1>

          <p>
            Access corporate filings, governance information,
            board details and important investor documents.
          </p>

        </div>

      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="rc-sec-content">

        <div className="rc-sec-container">

          <div className="rc-sec-heading">

            <span>
              FILINGS &amp; DISCLOSURES
            </span>

            <h2>
              Corporate transparency,
              <strong>
                built in.
              </strong>
            </h2>

            <p>
              RentoCar believes in maintaining transparent,
              responsible and accountable corporate practices.
            </p>

          </div>

          {/* =================================================
              FILTER
          ================================================= */}

          <div className="rc-sec-filter">

            <button
              type="button"
              className="active"
            >
              All Filings
            </button>

            <button type="button">
              Annual
            </button>

            <button type="button">
              Quarterly
            </button>

            <button type="button">
              Governance
            </button>

            <button type="button">
              Investor Documents
            </button>

          </div>

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="rc-sec-table-wrapper">

            <table className="rc-sec-table">

              <thead>

                <tr>
                  <th>DOCUMENT</th>
                  <th>TYPE</th>
                  <th>PERIOD</th>
                  <th>DATE</th>
                  <th></th>
                </tr>

              </thead>

              <tbody>

                {filings.map((filing, index) => (

                  <tr key={index}>

                    <td>

                      <div className="rc-filing-name">

                        <span className="rc-file-icon">
                          PDF
                        </span>

                        <div>

                          <strong>
                            {filing.title}
                          </strong>

                          <small>
                            {filing.type}
                          </small>

                        </div>

                      </div>

                    </td>

                    <td>
                      {filing.type}
                    </td>

                    <td>
                      {filing.period}
                    </td>

                    <td>
                      {filing.date}
                    </td>

                    <td>

                      <a
                        href="#"
                        className="rc-view-filing"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        View ↗
                      </a>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* =================================================
              GOVERNANCE
          ================================================= */}

          <div className="rc-governance">

            <div className="rc-governance-content">

              <span>
                GOVERNANCE
              </span>

              <h2>
                Responsible growth.
                <strong>
                  Transparent governance.
                </strong>
              </h2>

              <p>
                Our governance framework is designed to support
                responsible decision-making, accountability and
                long-term stakeholder value.
              </p>

              <div className="rc-governance-links">

                <Link to="/company-profile/leadership">
                  Board &amp; Leadership →
                </Link>

                <Link to="/company-profile/news-events">
                  Corporate Announcements →
                </Link>

              </div>

            </div>

            <div className="rc-governance-number">

              <span>
                01
              </span>

              <strong>
                GOVERNANCE
              </strong>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="rc-sec-footer">

        <div className="rc-sec-container">

          <div className="rc-sec-footer-grid">

            {/* Brand */}

            <div>

              <Link
                to="/company-profile"
                className="rc-sec-footer-logo"
              >

                <span>
                  R
                </span>

                Rento<span>car</span>

              </Link>

              <p>
                Making every journey simple, flexible and accessible.
              </p>

            </div>

            {/* Investors */}

            <div>

              <h4>
                Investors
              </h4>

              <Link to="/company-profile/financials">
                Financials
              </Link>

              <Link to="/company-profile/sec-filings">
                SEC Filings
              </Link>

              <Link to="/company-profile/news-events">
                News &amp; Events
              </Link>

            </div>

            {/* Company */}

            <div>

              <h4>
                Company
              </h4>

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

          <div className="rc-sec-footer-bottom">

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

