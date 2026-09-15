import React, { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    question: "How do I book a self-drive car online with RentoCar?",
    answer:
      "Select your city, trip start and end time, and pickup area to see available cars. Compare the vehicle details and booking terms, complete verification and payment, and use the booking screen for pickup, access and return instructions.",
  },
  {
    question: "What is a self-drive car rental?",
    answer:
      "A self-drive car rental lets you book and drive the car yourself, without a driver, for the duration of your trip.",
  },
  {
    question: "Where is RentoCar available in India?",
    answer:
      "RentoCar is available across major Indian cities including Bangalore, Delhi NCR, Mumbai, Pune, Hyderabad, Chennai, and more.",
  },
  {
    question: "Can I book a car for a few hours, a day or longer?",
    answer:
      "Yes, you can book cars for a few hours, a full day, multiple days, or even longer durations depending on your needs.",
  },
  {
    question: "What documents are required to book a RentoCar?",
    answer:
      "You'll need a valid driving license, a government-issued ID proof, and a registered mobile number to complete your booking.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="faq-section">
      <h2 className="faq-heading">Got questions? We've got answers.</h2>

      <div className="faq-list">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              className={`faq-item ${isOpen ? "open" : ""}`}
              key={index}
            >
              <button
                type="button"
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>

                <span className="faq-icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <div className="faq-answer-wrapper">
                <p className="faq-answer">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}