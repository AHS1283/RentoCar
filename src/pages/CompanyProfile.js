import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./CompanyProfile.css";

/* =====================================================
   SEO CONTENT
   RentoCar is positioned as a Pune-based
   self-drive car rental business.
===================================================== */

const SEO_TITLE =
  "Rentocar | Self-Drive Car Rental Company in Pune";

const SEO_DESCRIPTION =
  "Rentocar is a Pune-based self-drive car rental company offering convenient cars for city travel, road trips, business travel and more.";

const SEO_KEYWORDS = [
  "Rentocar Pune",
  "self drive car rental Pune",
  "car rental Pune",
  "rent a car in Pune",
  "self drive cars Pune",
  "Pune car rental",
  "cars for rent in Pune",
  "car rental company Pune",
].join(", ");

/* =====================================================
   META TAG HELPER
   Returns an undo function that restores the previous
   state when the page unmounts.
===================================================== */

function setMeta(attr, key, content) {
  if (!content) return () => {};

  let tag = document.head.querySelector(
    `meta[${attr}="${key}"]`
  );

  const existed = !!tag;
  const prevContent = existed
    ? tag.getAttribute("content")
    : null;

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);

  return () => {
    if (!existed) {
      if (tag.parentNode) tag.parentNode.removeChild(tag);
    } else if (prevContent === null) {
      tag.removeAttribute("content");
    } else {
      tag.setAttribute("content", prevContent);
    }
  };
}

/* =====================================================
   CANONICAL URL
===================================================== */

function setCanonical(url) {
  let link = document.head.querySelector(
    'link[rel="canonical"]'
  );

  const existed = !!link;
  const prevHref = existed ? link.getAttribute("href") : null;

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", url);

  return () => {
    if (!existed) {
      if (link.parentNode) link.parentNode.removeChild(link);
    } else if (prevHref === null) {
      link.removeAttribute("href");
    } else {
      link.setAttribute("href", prevHref);
    }
  };
}

/* =====================================================
   COMPANY PROFILE
===================================================== */

export default function CompanyProfile() {
  useEffect(() => {
    /*
      Use your real production domain here.

      Replace this URL if your actual live domain is different.
    */
    const siteUrl = "https://www.rentocar.in";
    const pageUrl = `${siteUrl}/company-profile`;

    const undos = [];
    const meta = (...args) => undos.push(setMeta(...args));

    const prevTitle = document.title;

    /* =========================
       BASIC SEO
    ========================= */

    document.title = SEO_TITLE;

    meta("name", "description", SEO_DESCRIPTION);
    meta("name", "keywords", SEO_KEYWORDS);
    meta("name", "robots", "index, follow");
    meta("name", "author", "Rentocar");

    undos.push(setCanonical(pageUrl));

    /* =========================
       OPEN GRAPH
    ========================= */

    meta("property", "og:title", SEO_TITLE);
    meta("property", "og:description", SEO_DESCRIPTION);
    meta("property", "og:type", "website");
    meta("property", "og:url", pageUrl);
    meta("property", "og:site_name", "Rentocar");
    meta("property", "og:locale", "en_IN");

    /*
      Add your actual company/profile image here
      inside public/images/.
    */
    meta(
      "property",
      "og:image",
      `${siteUrl}/images/rentocar-company.jpg`
    );

    /* =========================
       TWITTER
    ========================= */

    meta("name", "twitter:card", "summary_large_image");
    meta("name", "twitter:title", SEO_TITLE);
    meta("name", "twitter:description", SEO_DESCRIPTION);
    meta(
      "name",
      "twitter:image",
      `${siteUrl}/images/rentocar-company.jpg`
    );

    /* =========================
       JSON-LD
    ========================= */

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: "Rentocar",
          url: siteUrl,
          description:
            "Rentocar is a Pune-based self-drive car rental company offering cars for city travel, road trips and business travel.",
          areaServed: {
            "@type": "City",
            name: "Pune",
            containedInPlace: {
              "@type": "State",
              name: "Maharashtra",
              containedInPlace: {
                "@type": "Country",
                name: "India",
              },
            },
          },
        },
        {
          "@type": "AboutPage",
          "@id": `${pageUrl}#aboutpage`,
          name: SEO_TITLE,
          description: SEO_DESCRIPTION,
          url: pageUrl,
          mainEntity: {
            "@id": `${siteUrl}/#organization`,
          },
          inLanguage: "en-IN",
        },
        {
          "@type": "LocalBusiness",
          "@id": `${siteUrl}/#localbusiness`,
          name: "Rentocar",
          url: siteUrl,
          description:
            "Self-drive car rental company based in Pune, Maharashtra.",
          areaServed: {
            "@type": "City",
            name: "Pune",
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Pune",
            addressRegion: "Maharashtra",
            addressCountry: "IN",
          },
        },
      ],
    };

    const script = document.createElement("script");

    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);

    document.head.appendChild(script);

    /* =========================
       CLEANUP
       Restore everything this page changed so the
       next page starts with clean meta tags.
    ========================= */

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }

      undos.reverse().forEach((undo) => undo());

      document.title = prevTitle;
    };
  }, []);

  return (
    <main className="rc-company-main">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="rc-company-hero">

        {/* LEFT CONTENT */}

        <div className="rc-hero-content">

          <span className="rc-eyebrow">
            PUNE'S SELF-DRIVE CAR RENTAL
          </span>

          <h1>
            Self-drive car rental
            <span> made simpler in Pune.</span>
          </h1>

          <p>
            RentoCar is a Pune-based self-drive car rental
            company helping people find convenient cars for
            city travel, weekend road trips, business journeys
            and everyday mobility.
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
              aria-label="Rentocar self-drive car rental company video"
            >
              <source
                src="/videos/rentocar-company.mp4"
                type="video/mp4"
              />

              Your browser does not support the video.
            </video>

            <div className="rc-video-label">
              RentoCar — Pune
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
              A simpler way to
              <strong> rent a car in Pune.</strong>
            </h2>

          </div>


          <div className="rc-about-grid">

            {/* LEFT */}

            <div>

              <p>
                RentoCar is a Pune-based car rental platform
                focused on making self-drive car rental simple,
                convenient and accessible.
              </p>

              <p>
                From exploring Pune and nearby destinations to
                planning weekend road trips or managing business
                travel, customers can choose a car that fits
                their journey.
              </p>

              <p>
                Our focus is on providing a straightforward
                rental experience where customers can discover
                cars, choose their rental dates and start their
                journey with greater flexibility.
              </p>

            </div>


            {/* RIGHT */}

            <div className="rc-about-points">

              <div>

                <b>01</b>

                <strong>
                  Easy Car Rental
                </strong>

                <p>
                  Discover and book cars for your next journey
                  through a simple rental experience.
                </p>

              </div>


              <div>

                <b>02</b>

                <strong>
                  Self-Drive Freedom
                </strong>

                <p>
                  Choose your car and enjoy the flexibility of
                  travelling on your own schedule.
                </p>

              </div>


              <div>

                <b>03</b>

                <strong>
                  Pune Focused
                </strong>

                <p>
                  Built around the needs of customers looking
                  for car rentals in Pune and nearby destinations.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY RENTOCAR
      ===================================================== */}

      <section className="rc-numbers-section">

        <div className="rc-section-container">

          <div className="rc-section-heading center">

            <span>
              WHY RENTOCAR
            </span>

            <h2>
              Built around
              <strong> your journey.</strong>
            </h2>

            <p>
              Whether you are travelling within Pune or
              planning a road trip, Rentocar aims to make
              self-drive car rental straightforward.
            </p>

          </div>


          <div className="rc-number-grid">

            <div className="rc-number-card">

              <strong>
                Pune
              </strong>

              <span>
                Local car rental focus
              </span>

            </div>


            <div className="rc-number-card">

              <strong>
                Self-Drive
              </strong>

              <span>
                Flexible travel experience
              </span>

            </div>


            <div className="rc-number-card">

              <strong>
                Easy
              </strong>

              <span>
                Simple booking experience
              </span>

            </div>


            <div className="rc-number-card">

              <strong>
                Flexible
              </strong>

              <span>
                Cars for different journeys
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PUNE TRAVEL SECTION
      ===================================================== */}

      <section className="rc-quick-section">

        <div className="rc-section-container">

          <div className="rc-section-heading">

            <span>
              CAR RENTAL IN PUNE
            </span>

            <h2>
              One car,
              <strong> many journeys.</strong>
            </h2>

          </div>


          <div className="rc-quick-grid">

            {/* CARD 01 */}

            <div className="rc-quick-card">

              <span>
                01
              </span>

              <h3>
                Explore Pune
              </h3>

              <p>
                Rent a self-drive car for exploring Pune,
                local destinations and everyday travel.
              </p>

              <Link to="/cars">
                Find a Car →
              </Link>

            </div>


            {/* CARD 02 */}

            <div className="rc-quick-card">

              <span>
                02
              </span>

              <h3>
                Weekend Road Trips
              </h3>

              <p>
                Choose a rental car for weekend getaways and
                road trips from Pune to nearby destinations.
              </p>

              <Link to="/cars">
                Explore Cars →
              </Link>

            </div>


            {/* CARD 03 */}

            <div className="rc-quick-card">

              <span>
                03
              </span>

              <h3>
                Business Travel
              </h3>

              <p>
                Get a convenient self-drive car for meetings,
                work travel and longer business journeys.
              </p>

              <Link to="/cars">
                Rent a Car →
              </Link>

            </div>


            {/* CARD 04 */}

            <Link
              to="/become-host"
              className="rc-quick-card"
            >

              <span>
                04
              </span>

              <h3>
                Become a Host
              </h3>

              <p>
                Vehicle owners can learn more about joining
                the Rentocar host community.
              </p>

              <b>
                Become a Host →
              </b>

            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          COMPANY INFORMATION
      ===================================================== */}

      <section className="rc-quick-section">

        <div className="rc-section-container">

          <div className="rc-section-heading">

            <span>
              COMPANY INFORMATION
            </span>

            <h2>
              Explore Rentocar
              <strong> company information.</strong>
            </h2>

          </div>


          <div className="rc-quick-grid">

            {/* NEWS */}

            <Link
              to="/company-profile/news-events"
              className="rc-quick-card"
            >

              <span>
                01
              </span>

              <h3>
                Rentocar News &amp; Events
              </h3>

              <p>
                Read company announcements, news and
                upcoming Rentocar events.
              </p>

              <b>
                View News →
              </b>

            </Link>


            {/* LEADERSHIP */}

            <Link
              to="/company-profile/leadership"
              className="rc-quick-card"
            >

              <span>
                02
              </span>

              <h3>
                Rentocar Leadership Team
              </h3>

              <p>
                Learn more about the people and team
                working behind Rentocar.
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
            RENT A CAR IN PUNE
          </span>

          <h2>
            Your next self-drive
            <strong> journey starts here.</strong>
          </h2>

        </div>

        <Link to="/cars">
          Explore Cars →
        </Link>

      </section>

    </main>
  );
}