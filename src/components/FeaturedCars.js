import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, limit, query } from "firebase/firestore";

import { db } from "../firebase";
import sampleCars from "../data/sampleCars";

import "./FeaturedCars.css";

// =====================================================
// FEATURED CARS SECTION
// Pulls up to `count` cars from Firestore ("cars"
// collection). Falls back to sampleCars if Firestore is
// empty, unreachable, or a doc is missing fields.
// Clicking a card (or its button) opens /cars/:id, the
// same route CarDetails.jsx reads its `id` param from.
// =====================================================

export default function FeaturedCars({ count = 4 }) {
  const navigate = useNavigate();
  const trackRef = useRef(null);

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const carsQuery = query(collection(db, "cars"), limit(count));
        const snapshot = await getDocs(carsQuery);

        if (!snapshot.empty) {
          setCars(
            snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data(),
            }))
          );
        } else {
          setCars(sampleCars.slice(0, count));
        }
      } catch (error) {
        console.error("Error fetching featured cars:", error);
        setCars(sampleCars.slice(0, count));
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, [count]);

  const openCar = (carId) => {
    navigate(`/cars/${carId}`);
  };

  const getCardStep = () => {
    const track = trackRef.current;
    if (!track || !track.firstChild) return 300;

    return track.firstChild.getBoundingClientRect().width + 20;
  };

  const scrollTrack = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollBy({
      left: direction * getCardStep() * 2,
      behavior: "smooth",
    });
  };

  const goToCard = (index) => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollTo({
      left: index * getCardStep(),
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  /* =======================================================
     TRACK ACTIVE DOT WHILE SCROLLING/SWIPING
  ======================================================= */

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const step = getCardStep();
      if (!step) return;

      const index = Math.round(track.scrollLeft / step);
      const clamped = Math.max(0, Math.min(index, cars.length - 1));

      setActiveIndex(clamped);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [cars.length]);

  if (loading) {
    return (
      <section className="featured-cars">
        <div className="featured-cars-head">
          <div>
            <h2>Featured cars</h2>
            <p>Handpicked rides, ready when you are.</p>
          </div>
        </div>

        <div className="featured-cars-track">
          {Array.from({ length: count }).map((_, index) => (
            <div className="featured-card featured-card-skeleton" key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (cars.length === 0) {
    return null;
  }

  return (
    <section className="featured-cars">
      <div className="featured-cars-head">
        <div>
          <h2>Featured cars</h2>
          <p>Handpicked rides, ready when you are.</p>
        </div>
      </div>

      <div className="featured-cars-track" ref={trackRef}>
        {cars.map((car) => {
          const carName = car.name || "Car";
          const carType = car.type || "Car";
          const carLocation = car.location || "Pune";
          const seats = car.seats || 5;
          const fuel = car.fuel || "Petrol";
          const price = car.pricePerDay || 0;
          const rating = car.rating || 0;
          const image = car.image || "/logo.png";
          const features = Array.isArray(car.features) ? car.features : [];

          return (
            <article
              className="featured-card"
              key={car.id}
              role="link"
              tabIndex={0}
              onClick={() => openCar(car.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openCar(car.id);
                }
              }}
            >
              <div className="featured-card-media">
                <img src={image} alt={`${carName} for rent in ${carLocation}`} loading="lazy" />

                <span className="featured-card-rating">
                  ★ {rating}
                </span>

                <span className="featured-card-price">
                  ₹{price}<small>/day</small>
                </span>
              </div>

              <div className="featured-card-body">
                <h3>{carName}</h3>

                <div className="featured-card-meta">
                  <span>{carType}</span>
                  <span>{seats} seats</span>
                  <span>{fuel}</span>
                </div>

                <div className="featured-card-location">
                  📍 {carLocation}
                </div>

                {features.length > 0 && (
                  <div className="featured-card-features">
                    {features.slice(0, 3).map((feature, index) => (
                      <span key={`${feature}-${index}`}>{feature}</span>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  className="featured-card-cta"
                  onClick={(event) => {
                    event.stopPropagation();
                    openCar(car.id);
                  }}
                >
                  View details
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* =================================================
          BOTTOM CONTROLS — left/right arrows with the
          auto-swiper dots centered between them
      ================================================= */}

      <div className="featured-cars-controls">
        <button
          type="button"
          className="featured-cars-arrow featured-cars-arrow-left"
          aria-label="Scroll left"
          onClick={() => scrollTrack(-1)}
        >
          ‹
        </button>

        <div className="featured-cars-dots" role="tablist" aria-label="Featured cars">
          {cars.map((car, index) => (
            <button
              key={`${car.id}-dot`}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Show ${car.name || "car"} ${index + 1}`}
              className={`featured-cars-dot ${
                index === activeIndex ? "featured-cars-dot-active" : ""
              }`}
              onClick={() => goToCard(index)}
            />
          ))}
        </div>

        <button
          type="button"
          className="featured-cars-arrow featured-cars-arrow-right"
          aria-label="Scroll right"
          onClick={() => scrollTrack(1)}
        >
          ›
        </button>
      </div>
    </section>
  );
}
