import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Refund.css";

/* =====================================================
   SEO CONTENT
===================================================== */

const SITE_URL = "https://www.rentocar.in";
const PAGE_URL = `${SITE_URL}/refund`;

const SEO_TITLE =
  "Cancellation & Refund Policy | Self Drive Car Rental Pune | RentoCar";

const SEO_DESCRIPTION =
  "Understand RentoCar's cancellation and refund policy for self-drive car rental in Pune: cancellation before pickup, no-show, booking changes and refund processing.";

const SEO_KEYWORDS =
  "RentoCar cancellation policy, RentoCar refund policy, car rental cancellation Pune, self drive car rental refund Pune, car rental booking change Pune";

/* =====================================================
   HEAD HELPERS
   Update every matching tag (including static ones
   from index.html) and return an undo function.
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

  tags.forEach((tag) => tag.setAttribute("content", content));

  return () => {
    tags.forEach((tag, i) => {
      if (created) {
        if (tag.parentNode) tag.parentNode.removeChild(tag);
      } else if (previous[i] === null) {
        tag.removeAttribute("content");
      } else {
        tag.setAttribute("content", previous[i]);
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

  links.forEach((link) => link.setAttribute("href", url));

  return () => {
    links.forEach((link, i) => {
      if (created) {
        if (link.parentNode) link.parentNode.removeChild(link);
      } else if (previous[i] === null) {
        link.removeAttribute("href");
      } else {
        link.setAttribute("href", previous[i]);
      }
    });
  };
}

export default function Refund() {
  useEffect(() => {
    const undos = [];
    const prevTitle = document.title;

    document.title = SEO_TITLE;

    undos.push(setMeta("name", "description", SEO_DESCRIPTION));
    undos.push(setMeta("name", "keywords", SEO_KEYWORDS));
    undos.push(setMeta("name", "robots", "index, follow"));
    undos.push(setMeta("name", "author", "RentoCar"));
    undos.push(setCanonical(PAGE_URL));

    undos.push(setMeta("property", "og:title", SEO_TITLE));
    undos.push(setMeta("property", "og:description", SEO_DESCRIPTION));
    undos.push(setMeta("property", "og:url", PAGE_URL));
    undos.push(setMeta("property", "og:type", "website"));

    return () => {
      undos.reverse().forEach((undo) => undo());
      document.title = prevTitle;
    };
  }, []);

  return (
    <main className="refund-page">
      <section className="refund-hero">
        <div className="refund-hero-content">
          <span className="refund-eyebrow">RENTOCAR SUPPORT</span>

          <h1>Car Rental Cancellation & Refund Policy in Pune</h1>

          <p>
            Understand the general cancellation, refund and booking
            modification process for RentoCar self-drive car rentals
            in Pune.
          </p>

          <div className="refund-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Cancellation & Refund</span>
          </div>
        </div>
      </section>

      <section className="refund-content">
        <div className="refund-container">
          <div className="refund-intro">
            <span className="refund-label">BOOKING POLICY</span>

            <h2>
              Clear cancellation and refund information
            </h2>

            <p>
              Cancellation and refund eligibility may depend on the booking
              conditions, cancellation timing and payment status associated
              with your reservation.
            </p>
          </div>

          <article className="refund-card">
            <section>
              <h3>1. Cancellation Requests</h3>
              <p>
                Customers can request cancellation of a booking through the
                available booking or support channels. Cancellation should be
                requested as early as possible.
              </p>
            </section>

            <section>
              <h3>2. Refund Eligibility</h3>
              <p>
                Whether a refund is available and the amount of the refund may
                depend on the applicable booking terms, cancellation timing,
                vehicle category and other conditions associated with the
                reservation.
              </p>
            </section>

            <section>
              <h3>3. Cancellation Before Pickup</h3>
              <p>
                If a customer cancels before the scheduled pickup time, the
                applicable cancellation policy for that booking will determine
                whether the customer receives a full refund, partial refund
                or no refund.
              </p>
            </section>

            <section>
              <h3>4. Cancellation Close to Pickup</h3>
              <p>
                Cancellations made shortly before the scheduled pickup may be
                subject to additional cancellation charges or reduced refund
                eligibility because the vehicle has already been reserved for
                the customer.
              </p>
            </section>

            <section>
              <h3>5. No-Show</h3>
              <p>
                If a customer does not arrive for a confirmed booking and does
                not cancel according to the applicable cancellation process,
                the booking may be treated as a no-show and refund eligibility
                may be limited.
              </p>
            </section>

            <section>
              <h3>6. Booking Changes</h3>
              <p>
                Requests to change the rental date, time, vehicle or pickup
                location may be subject to vehicle availability and applicable
                charges.
              </p>
            </section>

            <section>
              <h3>7. RentoCar-Initiated Cancellation</h3>
              <p>
                In certain circumstances, RentoCar may need to cancel or
                modify a booking due to vehicle availability, maintenance,
                safety, operational issues or other circumstances.
              </p>
              <p>
                Where applicable, customers will be informed about the
                available resolution or refund process.
              </p>
            </section>

            <section>
              <h3>8. Refund Processing</h3>
              <p>
                Approved refunds will be processed according to the applicable
                payment method and payment service provider. The time required
                for the refund to appear in the customer's account may vary.
              </p>
            </section>

            <section>
              <h3>9. Additional Charges</h3>
              <p>
                Refunds do not necessarily include charges that have already
                been incurred for applicable services, damages, late returns,
                penalties or other valid charges under the booking terms.
              </p>
            </section>

            <section>
              <h3>10. Contact Support</h3>
              <p>
                If you need help cancelling a booking or understanding your
                refund status, contact RentoCar support with your booking
                details.
              </p>

              <div className="refund-contact">
                <strong>RentoCar Support</strong>
                <span>support@rentocarpune.com</span>
                <span>+91 7020148417</span>
                <span>Pune, Maharashtra, India</span>
              </div>
            </section>

            <section>
              <h3>11. Policy Updates</h3>
              <p>
                RentoCar may update this policy when service operations,
                booking processes or applicable requirements change. The
                latest version will be published on this page.
              </p>
            </section>
          </article>

          <div className="refund-navigation">
            <Link to="/privacy">← Privacy Policy</Link>
            <Link to="/faq">FAQs →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}