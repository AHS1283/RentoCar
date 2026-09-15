import React from "react";
import "./Reviews.css";

const GOOGLE_REVIEW_URL =
  "https://www.google.com/maps/search/?api=1&query=RENTocar%20Self%20Drive%20Cars%2C%20Wagholi%2C%20Pune&query_place_id=ChIJh8Z0QpTDwjsRv4MWN_7XgRA";

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Pune",
    rating: 5,
    text: "Excellent car rental experience. The car was clean, well maintained and the booking process was very smooth.",
    date: "Recently",
  },
  {
    id: 2,
    name: "Priya Patil",
    location: "Wagholi, Pune",
    rating: 5,
    text: "Very good service and supportive staff. The car was in great condition and the entire process was hassle-free.",
    date: "Recently",
  },
  {
    id: 3,
    name: "Amit Deshmukh",
    location: "Pune",
    rating: 5,
    text: "Had a great experience with RentoCar. Affordable pricing, clean cars and quick response from the team.",
    date: "Recently",
  },
];

function StarRating({ rating }) {
  return (
    <div className="review-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={index < rating ? "star active" : "star"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const openGoogleReviews = () => {
    window.open(
      GOOGLE_REVIEW_URL,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="reviews-section">
      <div className="reviews-container">

        {/* Header */}
        <div className="reviews-header">

          <div className="reviews-heading-content">
            <span className="reviews-small-title">
              CUSTOMER REVIEWS
            </span>

            <h2>
              What Our Customers
              <br />
              <span>Say About RentoCar</span>
            </h2>

            <p>
              Real experiences from customers who trusted RentoCar
              for their journeys.
            </p>
          </div>

          <div className="reviews-summary">

            <div className="rating-number">
              4.8
            </div>

            <StarRating rating={5} />

            <p>
              Based on customer reviews
            </p>

            <button
              type="button"
              className="google-review-button"
              onClick={openGoogleReviews}
            >
              <span className="google-icon">G</span>
              Write a Review
            </button>

          </div>
        </div>

        {/* Review Cards */}
        <div className="reviews-grid">

          {reviews.map((review) => (
            <article
              className="review-card"
              key={review.id}
            >
              <div className="review-card-top">

                <div className="review-user">

                  <div className="review-avatar">
                    {review.name.charAt(0)}
                  </div>

                  <div>
                    <h3>{review.name}</h3>

                    <span>
                      {review.location}
                    </span>
                  </div>

                </div>

                <div className="google-badge">
                  G
                </div>

              </div>

              <div className="review-rating-row">
                <StarRating rating={review.rating} />

                <span className="review-date">
                  {review.date}
                </span>
              </div>

              <p className="review-text">
                “{review.text}”
              </p>

              <div className="verified-review">
                <span className="verified-icon">
                  ✓
                </span>

                <span>
                  Customer Review
                </span>
              </div>

            </article>
          ))}

        </div>

        {/* Bottom CTA */}
        <div className="reviews-bottom">

          <div>
            <h3>
              Had a great experience with <span className="highlight-brand">RentoCar</span>?
            </h3>

            <p>
              Share your experience and help other customers
              choose RentoCar.
            </p>
          </div>

          <button
            type="button"
            className="all-reviews-button"
            onClick={openGoogleReviews}
          >
            Write / View All Reviews
            <span>→</span>
          </button>

        </div>

      </div>
    </section>
  );
}