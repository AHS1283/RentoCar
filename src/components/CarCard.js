import React from "react";
import { Link } from "react-router-dom";
import "./CarCard.css";

export default function CarCard({ car }) {
  // =====================================================
  // SAFE CAR DATA
  // Same fallback logic as FeaturedCars / CarDetails so
  // any car coming from the admin panel (Firestore) shows
  // up consistently here, regardless of which fields were
  // actually filled in when it was added.
  // =====================================================

  const carName =
    car?.name ||
    car?.title ||
    car?.model ||
    "Car";

  const carType =
    car?.type ||
    car?.category ||
    "Car";

  const carLocation =
    car?.location ||
    car?.city ||
    "Pune";

  const transmission =
    car?.transmission ||
    "Manual";

  const fuel =
    car?.fuel ||
    car?.fuelType ||
    "Petrol";

  const seats =
    Number(car?.seats) ||
    5;

  const price =
    Number(
      car?.pricePerDay ??
        car?.price ??
        car?.dailyPrice ??
        0
    ) || 0;

  const rating =
    Number(car?.rating) ||
    0;

  // Same image-resolution order as CarDetails.jsx:
  // images[] / imageUrls[] / photos[] / image / imageUrl
  const carImage =
    car?.image ||
    car?.imageUrl ||
    (Array.isArray(car?.images) && car.images[0]) ||
    (Array.isArray(car?.imageUrls) && car.imageUrls[0]) ||
    (Array.isArray(car?.photos) && car.photos[0]) ||
    "/logo.png";

  return (
    <Link to={`/cars/${car.id}`} className="car-card card">
      <div className="car-card-image">
        <img
          src={carImage}
          alt={`${carName} for rent in ${carLocation}`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/logo.png";
          }}
        />
        <span className="car-card-badge">{carType}</span>
      </div>

      <div className="car-card-body">
        <div className="car-card-top">
          <h4>{carName}</h4>
          <div className="car-card-rating">
            ★ {rating > 0 ? rating.toFixed(1) : "New"}
          </div>
        </div>

        <p className="car-card-meta">
          {transmission} · {fuel} · {seats} seats
        </p>

        <div className="car-card-bottom">
          <div>
            <span className="car-card-price">
              ₹{price.toLocaleString("en-IN")}
            </span>
            <span className="car-card-unit">/day</span>
          </div>
          <span className="car-card-cta">View →</span>
        </div>
      </div>
    </Link>
  );
}
