import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import "./Financials.css";

export default function Financials() {
  const handleReportClick = (reportName) => {
    // Replace this later with your actual PDF/file URL.
    // Keeping it as a button avoids invalid href warnings.
    console.log(`${reportName} is not available yet.`);
  };

  return (
    <div className="rc-financials-page">

      {/* =====================================================
          SEO
      ===================================================== */}

      <SEO
        title="RentoCar Financials & Reports | Investor Relations"
        description="Explore RentoCar financial information, annual reports, quarterly results, investor presentations, business updates and ESG information."
        canonical="/company-profile/financials"
      />

      {/* ================= HERO ================= */}

      <section className="rc-financial-hero">

        <div className="rc-financial-hero-content">

          <div className="rc-hero-badge">
            <span className="rc-hero-dot"></span>
            INVESTOR RELATIONS
          </div>

          <h1>
            Financials
            <span>&amp; Reports</span>
          </h1>

          <p>
            Explore RentoCar's financial performance, reports,
            investor presentations and business updates.
          </p>

          <div className="rc-hero-actions">

            <a
              href="#financial-reports"
              className="rc-hero-primary"
            >
              Explore Reports
              <span>↓</span>
            </a>

            <Link
              to="/company-profile/sec-filings"
              className="rc-hero-secondary"
            >
              SEC Filings
              <span>↗</span>
            </Link>

          </div>

        </div>

        <div
          className="rc-hero-decoration"
          aria-hidden="true"
        >

          <div className="rc-hero-circle circle-one"></div>

          <div className="rc-hero-circle circle-two"></div>

          <div className="rc-hero-card">

            <span>
              RentoCar
            </span>

            <strong>
              Investor Relations
            </strong>

            <small>
              Financial Information
            </small>

          </div>

        </div>

      </section>

      {/* ================= OVERVIEW ================= */}

      <section className="rc-financial-overview">

        <div className="rc-container">

          <div className="rc-section-heading">

            <span>
              FINANCIAL INFORMATION
            </span>

            <h2>
              Performance built on
              <strong> every journey.</strong>
            </h2>

            <p>
              Access our financial reports and investor resources
              to understand RentoCar's business performance and growth.
            </p>

          </div>

          {/* Financial Highlights */}

          <div className="rc-financial-stats">

            <article className="rc-financial-stat">

              <div className="stat-icon">
                ₹
              </div>

              <div className="stat-content">

                <span className="stat-number">
                  01
                </span>

                <h3>
                  Growing Business
                </h3>

                <p>
                  Building a scalable self-drive mobility platform
                  designed for modern travellers.
                </p>

              </div>

            </article>

            <article className="rc-financial-stat">

              <div className="stat-icon">
                ↗
              </div>

              <div className="stat-content">

                <span className="stat-number">
                  02
                </span>

                <h3>
                  Expanding Network
                </h3>

                <p>
                  Increasing presence across cities and destinations
                  to make mobility more accessible.
                </p>

              </div>

            </article>

            <article className="rc-financial-stat">

              <div className="stat-icon">
                ◎
              </div>

              <div className="stat-content">

                <span className="stat-number">
                  03
                </span>

                <h3>
                  Customer Focus
                </h3>

                <p>
                  Creating convenient, transparent and reliable
                  rental experiences for every journey.
                </p>

              </div>

            </article>

          </div>

        </div>

      </section>

      {/* ================= REPORTS ================= */}

      <section
        className="rc-reports-section"
        id="financial-reports"
      >

        <div className="rc-container">

          <div className="rc-section-heading centered">

            <span>
              REPORTS &amp; DOCUMENTS
            </span>

            <h2>
              Financial Reports
            </h2>

            <p>
              Important financial and investor documents from RentoCar.
            </p>

          </div>

          <div className="rc-report-grid">

            {/* Annual Report */}

            <article className="rc-report-card">

              <div className="rc-report-top">

                <div className="rc-report-meta">

                  <span className="rc-report-icon">
                    ▤
                  </span>

                  <span className="rc-report-year">
                    2025
                  </span>

                </div>

                <span className="rc-pdf-icon">
                  PDF
                </span>

              </div>

              <div className="rc-report-content">

                <h3>
                  Annual Report
                </h3>

                <p>
                  Business overview, performance highlights and
                  key company information.
                </p>

              </div>

              <button
                type="button"
                className="rc-download"
                onClick={() =>
                  handleReportClick("Annual Report")
                }
              >
                View Report
                <span>↗</span>
              </button>

            </article>

            {/* Quarterly Results */}

            <article className="rc-report-card">

              <div className="rc-report-top">

                <div className="rc-report-meta">

                  <span className="rc-report-icon">
                    ◫
                  </span>

                  <span className="rc-report-year">
                    Q4
                  </span>

                </div>

                <span className="rc-pdf-icon">
                  PDF
                </span>

              </div>

              <div className="rc-report-content">

                <h3>
                  Quarterly Results
                </h3>

                <p>
                  Quarterly business performance and operational
                  highlights.
                </p>

              </div>

              <button
                type="button"
                className="rc-download"
                onClick={() =>
                  handleReportClick("Quarterly Results")
                }
              >
                View Report
                <span>↗</span>
              </button>

            </article>

            {/* Investor Presentation */}

            <article className="rc-report-card">

              <div className="rc-report-top">

                <div className="rc-report-meta">

                  <span className="rc-report-icon">
                    ▥
                  </span>

                  <span className="rc-report-year">
                    2025
                  </span>

                </div>

                <span className="rc-pdf-icon">
                  PDF
                </span>

              </div>

              <div className="rc-report-content">

                <h3>
                  Investor Presentation
                </h3>

                <p>
                  Company strategy, market opportunity and
                  growth plans.
                </p>

              </div>

              <button
                type="button"
                className="rc-download"
                onClick={() =>
                  handleReportClick(
                    "Investor Presentation"
                  )
                }
              >
                View Presentation
                <span>↗</span>
              </button>

            </article>

            {/* ESG Overview */}

            <article className="rc-report-card">

              <div className="rc-report-top">

                <div className="rc-report-meta">

                  <span className="rc-report-icon">
                    ◇
                  </span>

                  <span className="rc-report-year">
                    ESG
                  </span>

                </div>

                <span className="rc-pdf-icon">
                  PDF
                </span>

              </div>

              <div className="rc-report-content">

                <h3>
                  Business &amp; ESG Overview
                </h3>

                <p>
                  Our approach towards responsible and
                  sustainable mobility.
                </p>

              </div>

              <button
                type="button"
                className="rc-download"
                onClick={() =>
                  handleReportClick(
                    "Business & ESG Overview"
                  )
                }
              >
                View Document
                <span>↗</span>
              </button>

            </article>

          </div>

        </div>

      </section>

      {/* ================= INVESTOR CTA ================= */}

      <section className="rc-investor-cta">

        <div className="rc-container">

          <div className="rc-investor-cta-inner">

            <div className="rc-cta-content">

              <span>
                INVESTOR INFORMATION
              </span>

              <h2>
                Looking for more information?
              </h2>

              <p>
                Explore our announcements, governance information
                and leadership team.
              </p>

            </div>

            <div className="rc-cta-buttons">

              <Link
                to="/company-profile/sec-filings"
                className="rc-cta-primary"
              >
                SEC Filings
                <span>↗</span>
              </Link>

              <Link
                to="/company-profile/news-events"
                className="rc-cta-secondary"
              >
                News &amp; Events
                <span>↗</span>
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="rc-ir-footer">

        <div className="rc-container">

          <div className="rc-footer-grid">

            {/* Brand */}

            <div className="rc-footer-brand">

              <Link
                to="/company-profile"
                className="rc-footer-logo"
              >

                <span className="rc-footer-logo-mark">
                  R
                </span>

                <span className="rc-footer-logo-text">
                  Rento<span>car</span>
                </span>

              </Link>

              <p>
                Smart, flexible and reliable self-drive mobility
                for every journey.
              </p>

              <Link
                to="/company-profile"
                className="rc-footer-back"
              >
                ← Back to Company Profile
              </Link>

            </div>

            {/* Company */}

            <div className="rc-footer-column">

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

            {/* Investors */}

            <div className="rc-footer-column">

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
                Announcements
              </Link>

            </div>

          </div>

          <div className="rc-footer-bottom">

            <span>
              © {new Date().getFullYear()} RentoCar.
              All rights reserved.
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