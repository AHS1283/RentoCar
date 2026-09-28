import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import FAQ from "../components/FAQ";
import "./FAQPage.css";

/* =====================================================
   SEO CONTENT
===================================================== */

const SITE_URL = "https://www.rentocar.in";
const PAGE_URL = `${SITE_URL}/faq`;

const SEO_TITLE =
  "FAQs | Self Drive Car Rental in Pune | RentoCar";

const SEO_DESCRIPTION =
  "Find answers to common questions about self-drive car rental in Pune with RentoCar: booking, documents, payments, deposits and your trip.";

const SEO_KEYWORDS =
  "RentoCar FAQ, self drive car rental Pune FAQ, car rental documents required Pune, car rental booking questions, rent a car in Pune, car rental deposit Pune";

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

export default function FAQPage() {
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
    <main className="faqpage-page">
      <section className="faqpage-hero">
        <div className="faqpage-hero-content">
          <span className="faqpage-eyebrow">RENTOCAR SUPPORT</span>

          <h1>Self-Drive Car Rental in Pune: FAQs</h1>

          <p>
            Everything you need to know about booking, documents, payments
            and your self-drive car rental trip in Pune with RentoCar.
          </p>

          <div className="faqpage-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>FAQs</span>
          </div>
        </div>
      </section>

      <section className="faqpage-content">
        <FAQ />
      </section>

      <div className="faqpage-navigation">
        <Link to="/terms">← Terms & Conditions</Link>
        <Link to="/privacy">Privacy Policy →</Link>
      </div>
    </main>
  );
}