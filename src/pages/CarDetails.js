
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase";
import sampleCars from "../data/sampleCars";
import SEO from "../components/SEO";

import "./CarDetails.css";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // =====================================================
  // STATE
  // =====================================================

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  const [pickupDate, setPickupDate] = useState("");
  const [dropDate, setDropDate] = useState("");

  const [pickupTime, setPickupTime] = useState("10:00");
  const [dropTime, setDropTime] = useState("18:00");

  const [bookingDateError, setBookingDateError] = useState("");

  // =====================================================
  // FETCH CAR
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const fetchCar = async () => {
      if (!id) {
        if (mounted) {
          setCar(null);
          setLoading(false);
        }
        return;
      }

      try {
        const carRef = doc(db, "cars", id);
        const carSnap = await getDoc(carRef);

        if (!mounted) {
          return;
        }

        if (carSnap.exists()) {
          setCar({
            id: carSnap.id,
            ...carSnap.data(),
          });
        } else {
          const fallbackCar = sampleCars.find(
            (item) => String(item.id) === String(id)
          );

          setCar(fallbackCar || null);
        }
      } catch (error) {
        console.error("Error fetching car details:", error);

        if (!mounted) {
          return;
        }

        const fallbackCar = sampleCars.find(
          (item) => String(item.id) === String(id)
        );

        setCar(fallbackCar || null);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchCar();

    return () => {
      mounted = false;
    };
  }, [id]);

  // =====================================================
  // TODAY
  // =====================================================

  const today = useMemo(() => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }, []);

  // =====================================================
  // SAFE CAR DATA
  // =====================================================

  const carName =
    car?.name ||
    car?.title ||
    car?.model ||
    "Car";

  const carLocation =
    car?.location ||
    car?.city ||
    "Pune";

  const carType =
    car?.type ||
    car?.category ||
    "Car";

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

  const trips =
    Number(car?.trips) ||
    Number(car?.totalTrips) ||
    0;

  const description =
    car?.description ||
    `Rent ${carName} in ${carLocation} with RentoCar. Enjoy a convenient self-drive car rental experience.`;

  // =====================================================
  // FEATURES
  // =====================================================

  const features = Array.isArray(car?.features)
    ? car.features.filter(
        (feature) =>
          feature !== null &&
          feature !== undefined &&
          String(feature).trim() !== ""
      )
    : [];

  // =====================================================
  // IMAGES
  // IMPORTANT:
  // This hook MUST remain above all conditional returns.
  // =====================================================

  const carImages = useMemo(() => {
    if (!car) {
      return ["/logo.png"];
    }

    const images = [];

    if (Array.isArray(car.images)) {
      images.push(...car.images);
    }

    if (Array.isArray(car.imageUrls)) {
      images.push(...car.imageUrls);
    }

    if (Array.isArray(car.photos)) {
      images.push(...car.photos);
    }

    if (car.image) {
      images.unshift(car.image);
    }

    if (car.imageUrl) {
      images.unshift(car.imageUrl);
    }

    const cleanImages = images
      .filter(
        (image) =>
          typeof image === "string" &&
          image.trim() !== ""
      )
      .map((image) => image.trim())
      .filter(
        (image, index, array) =>
          array.indexOf(image) === index
      );

    if (cleanImages.length === 0) {
      return ["/logo.png"];
    }

    return cleanImages;
  }, [
    car?.images,
    car?.imageUrls,
    car?.photos,
    car?.image,
    car?.imageUrl,
  ]);

  // =====================================================
  // SAFE IMAGE INDEX
  // =====================================================

  const safeActiveImage =
    activeImage >= 0 &&
    activeImage < carImages.length
      ? activeImage
      : 0;

  const currentImage =
    carImages[safeActiveImage] ||
    carImages[0] ||
    "/logo.png";

  // =====================================================
  // SEO DATA
  // =====================================================

  const seoTitle =
    `${carName} for Rent in ${carLocation} | RentoCar`;

  const seoDescription =
    `Rent ${carName} in ${carLocation} with RentoCar. ` +
    `${carType}, ${transmission}, ${fuel}, ${seats} seats. ` +
    `Starting from ₹${price} per day. ` +
    `Book your self-drive car today.`;

  // =====================================================
  // IMAGE NAVIGATION
  // =====================================================

  const showPreviousImage = () => {
    if (carImages.length <= 1) {
      return;
    }

    setActiveImage((current) =>
      current === 0
        ? carImages.length - 1
        : current - 1
    );
  };

  const showNextImage = () => {
    if (carImages.length <= 1) {
      return;
    }

    setActiveImage((current) =>
      current === carImages.length - 1
        ? 0
        : current + 1
    );
  };

  // =====================================================
  // BOOKING
  // =====================================================

  const handleBookNow = () => {
    setBookingDateError("");

    if (!pickupDate) {
      setBookingDateError(
        "Please select a pickup date."
      );
      return;
    }

    if (!dropDate) {
      setBookingDateError(
        "Please select a return date."
      );
      return;
    }

    if (pickupDate < today) {
      setBookingDateError(
        "Pickup date cannot be in the past."
      );
      return;
    }

    if (dropDate < today) {
      setBookingDateError(
        "Return date cannot be in the past."
      );
      return;
    }

    if (dropDate < pickupDate) {
      setBookingDateError(
        "Return date cannot be earlier than pickup date."
      );
      return;
    }

    if (!car?.id) {
      setBookingDateError(
        "Car information is unavailable."
      );
      return;
    }

    navigate(`/booking/${car.id}`, {
      state: {
        car,

        pickupDate,
        dropDate,

        pickupTime,
        dropTime,

        startDate: pickupDate,
        endDate: dropDate,

        startTime: pickupTime,
        endTime: dropTime,
      },
    });
  };

  // =====================================================
  // DATE HANDLERS
  // =====================================================

  const handlePickupDateChange = (event) => {
    const value = event.target.value;

    setPickupDate(value);
    setBookingDateError("");

    if (dropDate && value > dropDate) {
      setDropDate(value);
    }
  };

  const handleDropDateChange = (event) => {
    const value = event.target.value;

    setDropDate(value);
    setBookingDateError("");
  };

  // =====================================================
  // LOADING
  // IMPORTANT:
  // All hooks are already executed before this return.
  // =====================================================

  if (loading) {
    return (
      <main className="car-detail-page">
        <div className="car-detail-loading">
          <div className="car-loading-spinner" />

          <h2>Loading car details...</h2>

          <p>Please wait a moment.</p>
        </div>
      </main>
    );
  }

  // =====================================================
  // CAR NOT FOUND
  // =====================================================

  if (!car) {
    return (
      <main className="car-detail-page">
        <SEO
          title="Car Not Found | RentoCar"
          description="The requested car could not be found on RentoCar."
          canonical={`/cars/${id || ""}`}
          noIndex
        />

        <div className="car-not-found">
          <h1>Car not found</h1>

          <p>
            Sorry, the car you are looking for is not available.
          </p>

          <button
            type="button"
            onClick={() => navigate("/cars")}
          >
            Browse Cars
          </button>
        </div>
      </main>
    );
  }

  // =====================================================
  // JSX
  // =====================================================

  return (
    <main className="car-detail-page">

      {/* =================================================
          SEO
      ================================================= */}

      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={`/cars/${car.id}`}
        image={currentImage}
      />

      {/* =================================================
          BACK BUTTON
      ================================================= */}

      <button
        type="button"
        className="car-detail-back"
        onClick={() => navigate("/cars")}
      >
        ← Back to Cars
      </button>

      {/* =================================================
          MAIN LAYOUT
      ================================================= */}

      <div className="car-detail-layout">

        {/* =================================================
            LEFT
        ================================================= */}

        <div className="car-detail-left">

          {/* =================================================
              GALLERY
          ================================================= */}

          <div className="car-detail-gallery">

            <div className="car-detail-main-image">

              <img
                src={currentImage}
                alt={`${carName} for rent in ${carLocation}`}
                loading="eager"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = "/logo.png";
                }}
              />

              {carImages.length > 1 && (
                <>
                  <button
                    type="button"
                    className="gallery-arrow left"
                    onClick={showPreviousImage}
                    aria-label="Previous car image"
                  >
                    ‹
                  </button>

                  <button
                    type="button"
                    className="gallery-arrow right"
                    onClick={showNextImage}
                    aria-label="Next car image"
                  >
                    ›
                  </button>

                  <div className="gallery-counter">
                    {safeActiveImage + 1} /{" "}
                    {carImages.length}
                  </div>
                </>
              )}

            </div>

            {/* =================================================
                THUMBNAILS
            ================================================= */}

            {carImages.length > 1 && (
              <div className="car-name-thumbs">

                {carImages.map((imageUrl, index) => (
                  <button
                    type="button"
                    key={`${imageUrl}-${index}`}
                    className={`thumb ${
                      index === safeActiveImage
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setActiveImage(index)
                    }
                    aria-label={`View car image ${
                      index + 1
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt={`${carName} thumbnail ${
                        index + 1
                      }`}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror =
                          null;

                        event.currentTarget.src =
                          "/logo.png";
                      }}
                    />
                  </button>
                ))}

              </div>
            )}

          </div>

          {/* =================================================
              CAR INFORMATION
          ================================================= */}

          <div className="car-detail-info">

            <div className="car-detail-title-row">

              <div>

                <h1>
                  {carName}
                </h1>

                <div className="car-detail-meta">

                  <span>
                    {carType}
                  </span>

                  <span>
                    •
                  </span>

                  <span>
                    {transmission}
                  </span>

                  <span>
                    •
                  </span>

                  <span>
                    {fuel}
                  </span>

                  <span>
                    •
                  </span>

                  <span>
                    {seats} Seats
                  </span>

                </div>

                <div className="car-location">
                  📍 {carLocation}
                </div>

              </div>

              {/* =================================================
                  RATING
              ================================================= */}

              <div className="car-detail-rating-box">

                <div className="rating-star">
                  ★
                </div>

                <div>

                  <strong>
                    {rating > 0
                      ? rating.toFixed(1)
                      : "New"}
                  </strong>

                  <span>
                    {trips > 0
                      ? `${trips} trips`
                      : "Available now"}
                  </span>

                </div>

              </div>

            </div>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <div className="car-detail-description">

              <p>
                {description}
              </p>

            </div>

            {/* =================================================
                FEATURES
            ================================================= */}

            {features.length > 0 && (
              <div className="car-detail-features">

                {features.map((feature, index) => (
                  <span
                    className="feature-chip"
                    key={`${String(feature)}-${index}`}
                  >
                    ✓ {String(feature)}
                  </span>
                ))}

              </div>
            )}

            {/* =================================================
                SPECIFICATIONS
            ================================================= */}

            <section className="car-spec-section">

              <div className="section-heading">

                <div>

                  <span className="section-eyebrow">
                    CAR DETAILS
                  </span>

                  <h2>
                    Specifications
                  </h2>

                </div>

                <span className="photo-count">
                  {carImages.length}{" "}
                  {carImages.length === 1
                    ? "Photo"
                    : "Photos"}
                </span>

              </div>

              <div className="car-spec-grid">

                <div className="spec-item">

                  <span>
                    ⚙️
                  </span>

                  <div>

                    <small>
                      Transmission
                    </small>

                    <strong>
                      {transmission}
                    </strong>

                  </div>

                </div>

                <div className="spec-item">

                  <span>
                    ⛽
                  </span>

                  <div>

                    <small>
                      Fuel
                    </small>

                    <strong>
                      {fuel}
                    </strong>

                  </div>

                </div>

                <div className="spec-item">

                  <span>
                    👥
                  </span>

                  <div>

                    <small>
                      Seats
                    </small>

                    <strong>
                      {seats} People
                    </strong>

                  </div>

                </div>

                <div className="spec-item">

                  <span>
                    🚗
                  </span>

                  <div>

                    <small>
                      Car Type
                    </small>

                    <strong>
                      {carType}
                    </strong>

                  </div>

                </div>

              </div>

            </section>

          </div>

        </div>

        {/* =================================================
            RIGHT BOOKING PANEL
        ================================================= */}

        <aside className="car-detail-panel">

          {/* =================================================
              TRIP CARD
          ================================================= */}

          <div className="trip-card">

            <div className="trip-card-header">

              <div>

                <span className="trip-eyebrow">
                  YOUR TRIP
                </span>

                <h3>
                  Plan your journey
                </h3>

              </div>

              <span className="edit-badge">
                Flexible
              </span>

            </div>

            {/* =================================================
                START DATE / TIME
            ================================================= */}

            <div className="date-time-row">

              <div className="date-time-icon">
                📅
              </div>

              <div className="date-time-content">

                <span>
                  START DATE &amp; TIME
                </span>

                <div className="date-time-inputs">

                  <input
                    type="date"
                    aria-label="Start date"
                    value={pickupDate}
                    min={today}
                    onChange={
                      handlePickupDateChange
                    }
                  />

                  <select
                    value={pickupTime}
                    aria-label="Start time"
                    onChange={(event) =>
                      setPickupTime(
                        event.target.value
                      )
                    }
                  >
                    <option value="08:00">
                      08:00 AM
                    </option>

                    <option value="10:00">
                      10:00 AM
                    </option>

                    <option value="12:00">
                      12:00 PM
                    </option>

                    <option value="14:00">
                      02:00 PM
                    </option>

                    <option value="16:00">
                      04:00 PM
                    </option>

                    <option value="18:00">
                      06:00 PM
                    </option>

                    <option value="20:00">
                      08:00 PM
                    </option>
                  </select>

                </div>

              </div>

            </div>

            {/* =================================================
                RETURN DIVIDER
            ================================================= */}

            <div className="trip-divider">

              <span />

              RETURN

              <span />

            </div>

            {/* =================================================
                RETURN DATE / TIME
            ================================================= */}

            <div className="date-time-row">

              <div className="date-time-icon">
                📅
              </div>

              <div className="date-time-content">

                <span>
                  RETURN DATE &amp; TIME
                </span>

                <div className="date-time-inputs">

                  <input
                    type="date"
                    aria-label="Return date"
                    value={dropDate}
                    min={pickupDate || today}
                    onChange={
                      handleDropDateChange
                    }
                  />

                  <select
                    value={dropTime}
                    aria-label="Return time"
                    onChange={(event) =>
                      setDropTime(
                        event.target.value
                      )
                    }
                  >
                    <option value="08:00">
                      08:00 AM
                    </option>

                    <option value="10:00">
                      10:00 AM
                    </option>

                    <option value="12:00">
                      12:00 PM
                    </option>

                    <option value="14:00">
                      02:00 PM
                    </option>

                    <option value="16:00">
                      04:00 PM
                    </option>

                    <option value="18:00">
                      06:00 PM
                    </option>

                    <option value="20:00">
                      08:00 PM
                    </option>
                  </select>

                </div>

              </div>

            </div>

            {/* =================================================
                PICKUP LOCATION
            ================================================= */}

            <div className="trip-location">

              <span>
                📍
              </span>

              <div>

                <small>
                  PICKUP LOCATION
                </small>

                <strong>
                  {carLocation}
                </strong>

              </div>

            </div>

            {/* =================================================
                BOOKING ERROR
            ================================================= */}

            {bookingDateError && (
              <p
                role="alert"
                className="booking-date-error"
              >
                {bookingDateError}
              </p>
            )}

          </div>

          {/* =================================================
              RENTAL OPTION
          ================================================= */}

          <div className="panel-card">

            <div className="panel-row panel-row-header">

              <h3>
                Rental option
              </h3>

              <span className="panel-price">
                ₹{price.toLocaleString("en-IN")}/day
              </span>

            </div>

            <label className="panel-option selected">

              <input
                type="radio"
                name="rental-option"
                value="self-drive"
                defaultChecked
              />

              <div className="panel-option-text">

                <strong>
                  Self-drive rental
                </strong>

                <p>
                  Drive the car yourself and
                  enjoy complete flexibility.
                </p>

              </div>

              <span className="panel-option-price">
                ₹{price.toLocaleString("en-IN")}
              </span>

            </label>

            <p className="panel-subtext">
              Fuel and additional charges may
              apply according to the rental terms.
            </p>

            <button
              type="button"
              className="panel-link"
              onClick={() => {
                const policyElement =
                  document.getElementById(
                    "policies"
                  );

                if (policyElement) {
                  policyElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                } else {
                  navigate("/#policies");
                }
              }}
            >
              View rental policies
            </button>

            <p className="panel-footnote">
              ✓ Check the booking terms before
              confirming your trip.
            </p>

          </div>

          {/* =================================================
              PRICE SUMMARY
          ================================================= */}

          <div className="panel-total">

            <div>

              <span>
                Starting price
              </span>

              <small>
                Per day • Taxes may apply
              </small>

            </div>

            <strong>
              ₹{price.toLocaleString("en-IN")}
            </strong>

          </div>

          {/* =================================================
              BOOK BUTTON
          ================================================= */}

          <button
            type="button"
            className="panel-book-btn"
            onClick={handleBookNow}
          >
            Book This Car

            <span>
              →
            </span>
          </button>

          <p className="secure-booking">
            🔒 Secure booking • RentoCar
          </p>

        </aside>

      </div>

      {/* =================================================
          SEO CONTENT
      ================================================= */}

      <section className="car-seo-content">

        <div className="section-heading">

          <div>

            <span className="section-eyebrow">
              RENTOCAR
            </span>

            <h2>
              {carName} for Rent in{" "}
              {carLocation}
            </h2>

          </div>

        </div>

        <p>
          Looking to rent a{" "}
          {carType.toLowerCase()} in{" "}
          {carLocation}? Book the{" "}
          {carName} with RentoCar and enjoy
          a convenient self-drive rental
          experience.
        </p>

        <p>
          This {carName} comes with{" "}
          {transmission.toLowerCase()}{" "}
          transmission,{" "}
          {fuel.toLowerCase()} fuel and{" "}
          {seats} seats. The car is available
          for self-drive rental starting from{" "}
          <strong>
            ₹{price.toLocaleString("en-IN")} per day
          </strong>.
        </p>

        {features.length > 0 && (
          <p>
            Available features include{" "}
            {features.map((feature, index) => (
              <React.Fragment
                key={`${String(feature)}-${index}`}
              >
                <strong>
                  {String(feature)}
                </strong>
                {index < features.length - 1
                  ? ", "
                  : "."}
              </React.Fragment>
            ))}
          </p>
        )}

      </section>

    </main>
  );
}

