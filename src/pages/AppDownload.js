
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./AppDownload.css";

/*
 * Update these links when the real RentoCar apps
 * are published on Google Play and Apple App Store.
 */
const PLAY_STORE_URL =
  "https://play.google.com/store/apps";

const APP_STORE_URL =
  "https://apps.apple.com";


/* =====================================================
   SEO CONTENT
===================================================== */

const SITE_URL = "https://www.rentocar.in";

const PAGE_URL = `${SITE_URL}/get-app`;

const SEO_TITLE =
  "RentoCar App | Self-Drive Car Rental in Pune";

const SEO_DESCRIPTION =
  "Download the RentoCar app to find and book self-drive cars in Pune. Explore cars, manage bookings and plan your next journey from your phone.";

const SEO_KEYWORDS =
  "RentoCar app, RentoCar Pune app, self drive car rental app, car rental app Pune, download RentoCar, rent a car app, self drive cars Pune, car rental Pune";


/* =====================================================
   META TAG HELPER
===================================================== */

function setMeta(attr, key, content) {
  const tags = Array.from(
    document.head.querySelectorAll(
      `meta[${attr}="${key}"]`
    )
  );

  const created = tags.length === 0;

  let targetTags = tags;

  if (created) {
    const tag = document.createElement("meta");

    tag.setAttribute(attr, key);
    tag.setAttribute("content", content);

    document.head.appendChild(tag);

    targetTags = [tag];
  }

  const previous = targetTags.map((tag) =>
    tag.getAttribute("content")
  );

  targetTags.forEach((tag) => {
    tag.setAttribute("content", content);
  });

  return () => {
    targetTags.forEach((tag, index) => {
      if (created) {
        if (tag.parentNode) {
          tag.parentNode.removeChild(tag);
        }
      } else {
        const oldValue = previous[index];

        if (oldValue === null) {
          tag.removeAttribute("content");
        } else {
          tag.setAttribute(
            "content",
            oldValue
          );
        }
      }
    });
  };
}


/* =====================================================
   CANONICAL HELPER
===================================================== */

function setCanonical(url) {
  const links = Array.from(
    document.head.querySelectorAll(
      'link[rel="canonical"]'
    )
  );

  const created = links.length === 0;

  let targetLinks = links;

  if (created) {
    const link = document.createElement("link");

    link.setAttribute("rel", "canonical");
    link.setAttribute("href", url);

    document.head.appendChild(link);

    targetLinks = [link];
  }

  const previous = targetLinks.map((link) =>
    link.getAttribute("href")
  );

  targetLinks.forEach((link) => {
    link.setAttribute("href", url);
  });

  return () => {
    targetLinks.forEach((link, index) => {
      if (created) {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      } else {
        const oldValue = previous[index];

        if (oldValue === null) {
          link.removeAttribute("href");
        } else {
          link.setAttribute(
            "href",
            oldValue
          );
        }
      }
    });
  };
}


/* =====================================================
   APP DOWNLOAD PAGE
===================================================== */

export default function AppDownload() {

  useEffect(() => {

    const undoFunctions = [];

    const previousTitle =
      document.title;


    /* =========================
       PAGE TITLE
    ========================= */

    document.title = SEO_TITLE;


    /* =========================
       BASIC SEO
    ========================= */

    undoFunctions.push(
      setMeta(
        "name",
        "description",
        SEO_DESCRIPTION
      )
    );

    undoFunctions.push(
      setMeta(
        "name",
        "keywords",
        SEO_KEYWORDS
      )
    );

    undoFunctions.push(
      setMeta(
        "name",
        "robots",
        "index, follow"
      )
    );


    /* =========================
       CANONICAL
    ========================= */

    undoFunctions.push(
      setCanonical(PAGE_URL)
    );


    /* =========================
       OPEN GRAPH
    ========================= */

    undoFunctions.push(
      setMeta(
        "property",
        "og:title",
        SEO_TITLE
      )
    );

    undoFunctions.push(
      setMeta(
        "property",
        "og:description",
        SEO_DESCRIPTION
      )
    );

    undoFunctions.push(
      setMeta(
        "property",
        "og:url",
        PAGE_URL
      )
    );

    undoFunctions.push(
      setMeta(
        "property",
        "og:type",
        "website"
      )
    );

    undoFunctions.push(
      setMeta(
        "property",
        "og:site_name",
        "RentoCar"
      )
    );

    undoFunctions.push(
      setMeta(
        "property",
        "og:locale",
        "en_IN"
      )
    );


    /* =========================
       TWITTER
    ========================= */

    undoFunctions.push(
      setMeta(
        "name",
        "twitter:card",
        "summary"
      )
    );

    undoFunctions.push(
      setMeta(
        "name",
        "twitter:title",
        SEO_TITLE
      )
    );

    undoFunctions.push(
      setMeta(
        "name",
        "twitter:description",
        SEO_DESCRIPTION
      )
    );


    /* =========================
       CLEANUP
    ========================= */

    return () => {

      undoFunctions
        .reverse()
        .forEach((undo) => undo());

      document.title =
        previousTitle;

    };

  }, []);


  return (
    <main className="download-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="download-hero"
        aria-labelledby="download-title"
      >

        {/* =================================================
            TEXT SIDE
        ================================================= */}

        <div className="download-content">

          <span className="download-label">
            GET THE RENTOCAR APP
          </span>


          <h1 id="download-title">

            Book a car,
            <br />

            <span>
              right from your phone.
            </span>

          </h1>


          <p>
            Find and book self-drive cars in Pune,
            manage your rental and keep your booking
            details in one place with the RentoCar app.
          </p>


          {/* =================================================
              STORE BUTTONS
          ================================================= */}

          <div className="store-buttons">

            {/* APP STORE */}

            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="store-btn"
              aria-label="Download RentoCar on the Apple App Store"
            >

              <svg
                viewBox="0 0 24 24"
                width="26"
                height="26"
                aria-hidden="true"
              >

                <path
                  fill="currentColor"
                  d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8.65-.12 1.31-.53 2.09-.72 1.11-.28 2.18-.24 3.11.24-2.72 1.66-2.11 5.24.52 6.36-.6 1.62-1.35 3.09-2.8 4.29zM12.03 7.25c-.15-2.25 1.65-4.14 3.75-4.25.28 2.45-2.17 4.32-3.75 4.25z"
                />

              </svg>


              <span>

                <small>
                  Download on the
                </small>

                <strong>
                  App Store
                </strong>

              </span>

            </a>


            {/* GOOGLE PLAY */}

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="store-btn"
              aria-label="Get RentoCar on Google Play"
            >

              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                aria-hidden="true"
              >

                <path
                  fill="currentColor"
                  d="M3.6 2.6c-.4.3-.6.8-.6 1.4v16c0 .6.2 1.1.6 1.4l9.2-9.4-9.2-9.4zM14 12l2.5-2.5 3.3 1.9c.9.5.9 1.7 0 2.2l-3.3 1.9L14 12zm-1.2-1.2L4.3 2.3l10.3 6 8.5-8.5-1.2-1.2z"
                />

              </svg>


              <span>

                <small>
                  Get it on
                </small>

                <strong>
                  Google Play
                </strong>

              </span>

            </a>

          </div>


          {/* =================================================
              APP FEATURES
          ================================================= */}

          <div className="download-features">

            <div className="download-feature">

              <span aria-hidden="true">
                ✓
              </span>

              <p>
                Find and book a self-drive car easily
              </p>

            </div>


            <div className="download-feature">

              <span aria-hidden="true">
                ✓
              </span>

              <p>
                Manage your rental and booking details
              </p>

            </div>


            <div className="download-feature">

              <span aria-hidden="true">
                ✓
              </span>

              <p>
                Keep your journey information in one place
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            VISUAL SIDE
        ================================================= */}

        <div
          className="download-visual"
          aria-hidden="true"
        >

          <div className="download-circle circle-one"></div>

          <div className="download-circle circle-two"></div>


          {/* =================================================
              PHONE MOCKUP
          ================================================= */}

          <div className="phone-mockup">

            <div className="phone-notch"></div>


            <div className="phone-screen">

              {/* PHONE STATUS */}

              <div className="phone-status-row">

                <span>
                  9:41
                </span>

                <span>
                  ●●●●
                </span>

              </div>


              {/* MAP */}

              <div className="phone-map">

                <div className="phone-map-pin pin-a"></div>

                <div className="phone-map-pin pin-b"></div>

                <div className="phone-map-route"></div>

              </div>


              {/* CAR CARD */}

              <div className="phone-card">

                <div className="phone-car-row">

                  <div className="phone-car-icon">
                    🚗
                  </div>


                  <div>

                    <strong>
                      Hyundai i20
                    </strong>

                    <p>
                      Available now · 1.2 km away
                    </p>

                  </div>

                </div>


                <div className="phone-book-btn">
                  Book this car
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          BACK TO HOME
      ================================================= */}

      <Link
        to="/"
        className="download-back-button"
      >
        ← Back to Home
      </Link>

    </main>
  );
}
