import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Terms.css";

/* =====================================================
   SEO CONTENT
===================================================== */

const SITE_URL = "https://www.rentocar.in";
const PAGE_URL = `${SITE_URL}/terms`;

const SEO_TITLE =
  "Terms & Conditions | Self Drive Car Rental in Pune | RentoCar";

const SEO_DESCRIPTION =
  "Read RentoCar's terms and conditions for self-drive car rental in Pune: eligibility, booking, vehicle usage, payments, late return and cancellation.";

const SEO_KEYWORDS =
  "RentoCar terms and conditions, self drive car rental terms Pune, car rental rules Pune, car rental eligibility Pune, rent a car in Pune terms";

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

export default function Terms() {
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
    <main className="legal-page">
      <section className="legal-hero">
        <div className="legal-hero-content">
          <span className="legal-eyebrow">RENTOCAR SUPPORT</span>

          <h1>Terms & Conditions for Self-Drive Car Rental in Pune</h1>

          <p>
            Please read these terms carefully before using RentoCar's
            self-drive car rental services in Pune.
          </p>

          <div className="legal-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Terms & Conditions</span>
          </div>
        </div>
      </section>

      <section className="legal-content">
        <div className="legal-container">
          <div className="legal-intro">
            <span className="section-label">TERMS OF SERVICE</span>

            <h2>
              Simple and transparent rental terms
            </h2>

            <p>
              By accessing or using RentoCar's website, platform, or
              self-drive rental services, you agree to follow the terms
              described below.
            </p>
          </div>

          <article className="legal-card">
            <section>
              <h3>1. About RentoCar</h3>
              <p>
                RentoCar provides self-drive car rental services that allow
                eligible customers to reserve and use vehicles for a selected
                period. Vehicle availability, pricing, rental duration and
                other conditions may vary depending on the selected vehicle
                and location.
              </p>
            </section>

            <section>
              <h3>2. Eligibility</h3>
              <p>
                Customers must meet the applicable age, driving licence,
                identity verification and other eligibility requirements
                before a vehicle can be provided.
              </p>
              <p>
                RentoCar may request valid documents and additional
                verification information before confirming or releasing a
                booking.
              </p>
            </section>

            <section>
              <h3>3. Booking</h3>
              <p>
                A booking is considered confirmed only after the required
                booking information and applicable payment or confirmation
                requirements have been completed.
              </p>
              <p>
                Customers are responsible for checking the selected vehicle,
                pickup location, rental period, pricing and booking details
                before confirming their reservation.
              </p>
            </section>

            <section>
              <h3>4. Vehicle Usage</h3>
              <p>
                The rented vehicle must be used responsibly and only for
                lawful purposes. The customer is responsible for following
                applicable traffic laws and regulations during the rental
                period.
              </p>
              <p>
                Customers must not use the vehicle for illegal activities,
                racing, unauthorized commercial activities or any activity
                that may damage the vehicle or endanger others.
              </p>
            </section>

            <section>
              <h3>5. Customer Responsibilities</h3>
              <p>
                Customers are responsible for taking reasonable care of the
                vehicle throughout the rental period and returning it in the
                condition required under the applicable booking terms.
              </p>
              <ul>
                <li>Keep the vehicle secure when unattended.</li>
                <li>Follow all applicable traffic rules.</li>
                <li>Do not allow unauthorized persons to drive the vehicle.</li>
                <li>Report accidents, damage or major issues promptly.</li>
                <li>Return the vehicle within the agreed rental period.</li>
              </ul>
            </section>

            <section>
              <h3>6. Payments and Charges</h3>
              <p>
                Rental charges, deposits, additional fees, taxes, penalties
                or other applicable charges may depend on the vehicle,
                location, rental duration and booking conditions.
              </p>
              <p>
                Any applicable additional charges may be communicated to the
                customer according to the booking terms.
              </p>
            </section>

            <section>
              <h3>7. Late Return</h3>
              <p>
                Vehicles should be returned at the agreed date and time.
                Additional charges may apply when a vehicle is returned late,
                subject to the applicable booking policy.
              </p>
            </section>

            <section>
              <h3>8. Cancellation</h3>
              <p>
                Cancellation eligibility and refund amounts may depend on the
                timing of the cancellation and the conditions applicable to
                the booking.
              </p>

              <p>
                Please review our{" "}
                <Link to="/refund">Cancellation & Refund Policy</Link> before
                cancelling a booking.
              </p>
            </section>

            <section>
              <h3>9. Vehicle Availability</h3>
              <p>
                Vehicle availability is subject to location, booking demand,
                maintenance requirements and other operational factors.
                RentoCar may need to provide an alternative vehicle or modify
                a booking when the originally selected vehicle becomes
                unavailable.
              </p>
            </section>

            <section>
              <h3>10. Website and Platform Usage</h3>
              <p>
                Users agree not to misuse the RentoCar website or platform,
                attempt unauthorized access, interfere with platform
                operations, or submit inaccurate information.
              </p>
            </section>

            <section>
              <h3>11. Limitation of Responsibility</h3>
              <p>
                RentoCar will make reasonable efforts to provide reliable
                services and accurate information. However, service
                availability may be affected by circumstances beyond
                reasonable operational control.
              </p>
            </section>

            <section>
              <h3>12. Changes to These Terms</h3>
              <p>
                RentoCar may update these terms from time to time to reflect
                changes in services, operations, legal requirements or
                business practices.
              </p>
            </section>

            <section>
              <h3>13. Contact Us</h3>
              <p>
                If you have questions regarding these terms or your booking,
                please contact the RentoCar support team.
              </p>

              <div className="legal-contact">
                <strong>RentoCar Support</strong>
                <span>support@rentocarpune.com</span>
                <span>+91 7020148417</span>
                <span>Pune, Maharashtra, India</span>
              </div>
            </section>
          </article>

          <div className="legal-navigation">
            <Link to="/faq">← FAQs</Link>
            <Link to="/privacy">Privacy Policy →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}