
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SEO from "../components/SEO";
import "./NewsEvents.css";

export default function NewsEvents() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const closeMenu = () => {
    setMenuOpen(false);
    setNewsOpen(false);
  };

  const news = [
    {
      type: "Announcement",
      date: "15 Aug 2025",
      title: "RentoCar expands its self-drive mobility network",
      description:
        "RentoCar continues to expand its vehicle network and make self-drive mobility more accessible.",
    },
    {
      type: "Press Release",
      date: "02 Aug 2025",
      title: "RentoCar strengthens its customer-first mobility platform",
      description:
        "New initiatives focus on creating simpler and more convenient rental experiences.",
    },
    {
      type: "Announcement",
      date: "18 Jul 2025",
      title: "New city expansion announced",
      description:
        "RentoCar continues its expansion into new markets to serve more customers.",
    },
    {
      type: "Event",
      date: "10 Jul 2025",
      title: "RentoCar investor and partner interaction",
      description:
        "Company leadership shares business updates and the long-term vision for mobility.",
    },
    {
      type: "Press Release",
      date: "25 Jun 2025",
      title: "Technology-led mobility experience",
      description:
        "RentoCar continues investing in technology to improve booking and vehicle discovery.",
    },
    {
      type: "Announcement",
      date: "11 Jun 2025",
      title: "Growing the RentoCar host community",
      description:
        "The platform continues to onboard vehicle hosts across multiple markets.",
    },
  ];

  const filteredNews =
    activeFilter === "All"
      ? news
      : news.filter((item) => item.type === activeFilter);

  return (
    <div className="rc-news-page">

      {/* =====================================================
          SEO
      ===================================================== */}

      <SEO
        title="RentoCar News & Events | Latest Company Updates"
        description="Stay updated with the latest RentoCar news, company announcements, press releases, investor events, business updates and self-drive mobility developments."
        canonical="/company-profile/news-events"
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="rc-news-header">

        <div className="rc-news-header-inner">

          <button
            type="button"
            className={`rc-news-menu ${menuOpen ? "active" : ""}`}
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
            className="rc-news-logo"
            onClick={closeMenu}
          >
            <span className="rc-news-logo-mark">
              R
            </span>

            <span>
              Rento<span>car</span>
            </span>
          </Link>

          <nav
            className={`rc-news-nav ${menuOpen ? "open" : ""}`}
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
              onClick={closeMenu}
            >
              Financials
            </Link>

            <Link
              to="/company-profile/sec-filings"
              onClick={closeMenu}
            >
              SEC Filings &amp; Governance
            </Link>

            <div className="rc-news-dropdown">

              <button
                type="button"
                className="active"
                onClick={() => setNewsOpen(!newsOpen)}
                aria-expanded={newsOpen}
              >
                News &amp; Events <span>▼</span>
              </button>

              <div
                className={`rc-news-dropdown-menu ${
                  newsOpen ? "show" : ""
                }`}
              >

                <a
                  href="#announcements"
                  onClick={closeMenu}
                >
                  All Announcements
                </a>

                <a
                  href="#press-releases"
                  onClick={closeMenu}
                >
                  Press Releases
                </a>

                <a
                  href="#events"
                  onClick={closeMenu}
                >
                  Events
                </a>

              </div>

            </div>

            <Link
              to="/company-profile/leadership"
              onClick={closeMenu}
            >
              Leadership
            </Link>

          </nav>

          <div className="rc-news-stores">

            <div className="rc-news-store">
              <small>GET IT ON</small>
              <strong>Google Play</strong>
            </div>

            <div className="rc-news-store">
              <small>Download on the</small>
              <strong>App Store</strong>
            </div>

          </div>

        </div>

      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="rc-news-hero">

        <div className="rc-news-container">

          <span>
            INVESTOR RELATIONS
          </span>

          <h1>
            News
            <strong>
              &amp; Events
            </strong>
          </h1>

          <p>
            Stay updated with RentoCar announcements,
            press releases, events and company updates.
          </p>

        </div>

      </section>

      {/* =====================================================
          NEWS
      ===================================================== */}

      <section
        className="rc-news-content"
        id="announcements"
      >

        <div className="rc-news-container">

          <div className="rc-news-heading">

            <div>

              <span>
                LATEST UPDATES
              </span>

              <h2>
                All
                <strong>
                  {" "}Announcements
                </strong>
              </h2>

            </div>

            <p>
              Explore the latest news and updates from RentoCar.
            </p>

          </div>

          {/* =================================================
              FILTERS
          ================================================= */}

          <div className="rc-news-filters">

            {[
              "All",
              "Announcement",
              "Press Release",
              "Event",
            ].map((filter) => (

              <button
                type="button"
                key={filter}
                className={
                  activeFilter === filter
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveFilter(filter)
                }
              >
                {filter}
              </button>

            ))}

          </div>

          {/* =================================================
              NEWS GRID
          ================================================= */}

          <div className="rc-news-grid">

            {filteredNews.map((item, index) => (

              <article
                className="rc-news-card"
                key={index}
                id={
                  item.type === "Press Release"
                    ? "press-releases"
                    : item.type === "Event"
                    ? "events"
                    : undefined
                }
              >

                <div className="rc-news-card-top">

                  <span className="rc-news-type">
                    {item.type}
                  </span>

                  <span className="rc-news-date">
                    {item.date}
                  </span>

                </div>

                <div className="rc-news-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.description}
                </p>

                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Read More
                  <span>↗</span>
                </a>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          EVENTS
      ===================================================== */}

      <section className="rc-events-section">

        <div className="rc-news-container">

          <div className="rc-events-heading">

            <span>
              UPCOMING
            </span>

            <h2>
              Events &amp;
              <strong>
                {" "}Meetings
              </strong>
            </h2>

          </div>

          <div
            className="rc-event-card"
            id="events"
          >

            <div className="rc-event-date">

              <strong>
                20
              </strong>

              <span>
                SEP
              </span>

            </div>

            <div className="rc-event-info">

              <span>
                INVESTOR EVENT
              </span>

              <h3>
                RentoCar Investor &amp; Partner Meet
              </h3>

              <p>
                Business updates, growth strategy and discussion
                around the future of self-drive mobility.
              </p>

            </div>

            <div className="rc-event-arrow">
              ↗
            </div>

          </div>

          <div className="rc-event-card">

            <div className="rc-event-date">

              <strong>
                12
              </strong>

              <span>
                OCT
              </span>

            </div>

            <div className="rc-event-info">

              <span>
                BUSINESS EVENT
              </span>

              <h3>
                Mobility &amp; Technology Discussion
              </h3>

              <p>
                Exploring technology, customer experience and
                the future of connected mobility.
              </p>

            </div>

            <div className="rc-event-arrow">
              ↗
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="rc-news-cta">

        <div className="rc-news-container">

          <div>

            <span>
              KEEP EXPLORING
            </span>

            <h2>
              Discover RentoCar
              <strong>
                {" "}beyond the news.
              </strong>
            </h2>

          </div>

          <div className="rc-news-cta-buttons">

            <Link to="/company-profile/financials">
              Financials
            </Link>

            <Link to="/company-profile/leadership">
              Leadership
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="rc-news-footer">

        <div className="rc-news-container">

          <div className="rc-news-footer-grid">

            <div>

              <Link
                to="/company-profile"
                className="rc-news-footer-logo"
              >

                <span>
                  R
                </span>

                Rento<span>car</span>

              </Link>

              <p>
                Smart mobility for every journey.
              </p>

            </div>

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

          <div className="rc-news-footer-bottom">

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

