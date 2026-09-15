import React from "react";
import { Link } from "react-router-dom";
import FAQ from "../components/FAQ";
import "./FAQPage.css";

export default function FAQPage() {
  return (
    <main className="faqpage-page">
      <section className="faqpage-hero">
        <div className="faqpage-hero-content">
          <span className="faqpage-eyebrow">RENTOCAR SUPPORT</span>

          <h1>Frequently Asked Questions</h1>

          <p>
            Everything you need to know about booking, documents, payments
            and your trip with RentoCar.
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
