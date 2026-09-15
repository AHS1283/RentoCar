
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";
import "./Booking.css";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  const state = location.state || {};

  /* =====================================================
     NORMALIZE INCOMING STATE
     Different "Book this car" buttons across the app may
     pass slightly different key names (startDate vs
     pickupDate, endDate vs dropDate, etc). We accept the
     common variants here so the checkout page always picks
     up the right dates regardless of which screen sent us
     here.
  ===================================================== */

  const car = state.car;

  const normalizeDate = (value) => {
    if (!value) return "";

    if (typeof value === "string") {
      if (/^\\d{4}-\\d{2}-\\d{2}$/.test(value)) {
        return value;
      }

      const parsed = new Date(value);
      if (Number.isNaN(parsed.getTime())) return "";

      const year = parsed.getFullYear();
      const month = String(parsed.getMonth() + 1).padStart(2, "0");
      const day = String(parsed.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    if (value instanceof Date) {
      if (Number.isNaN(value.getTime())) return "";

      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, "0");
      const day = String(value.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    return "";
  };

  const kmPackage = state.kmPackage || "unlimited";
  const paymentOption = state.paymentOption || "later";

  const pickupDate = normalizeDate(
    state.pickupDate ||
      state.pickUpDate ||
      state.startDate ||
      state.fromDate ||
      state.checkIn ||
      state.checkInDate ||
      ""
  );

  const dropDate = normalizeDate(
    state.dropDate ||
      state.dropOffDate ||
      state.endDate ||
      state.toDate ||
      state.checkOut ||
      state.checkOutDate ||
      ""
  );

  const pickupTime =
    state.pickupTime ||
    state.pickUpTime ||
    state.startTime ||
    state.fromTime ||
    "10:00";

  const dropTime =
    state.dropTime ||
    state.dropOffTime ||
    state.endTime ||
    state.toTime ||
    "10:00";

  const deposit =
    state.deposit !== undefined && state.deposit !== null
      ? state.deposit
      : 500;

  /* =====================================================
     DEV WARNING
     If a car was passed but no usable date was found on
     any of the known keys, log the raw state once so it's
     easy to see the actual key names being sent and wire
     them into the list above.
  ===================================================== */

  if (
    process.env.NODE_ENV !== "production" &&
    car &&
    (!pickupDate || !dropDate)
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      "[Booking] pickupDate/dropDate missing from navigation state. Raw state received:",
      state
    );
  }

  /* =====================================================
     SEO
  ===================================================== */

  const bookingSeoTitle = car
    ? `Book ${car.name} | RentoCar`
    : "Confirm Your Booking | RentoCar";

  const bookingSeoDescription = car
    ? `Confirm your ${car.name} self-drive car rental booking with RentoCar. Review your trip details, pricing and booking information.`
    : "Review and confirm your self-drive car rental booking with RentoCar.";

  /* =====================================================
     LOGIN USER PHONE NUMBER
  ===================================================== */

  const getLoggedInPhone = () => {
    if (!currentUser?.phoneNumber) {
      return "";
    }

    const firebasePhone = currentUser.phoneNumber.trim();

    if (firebasePhone.startsWith("+91")) {
      return firebasePhone.slice(3);
    }

    return firebasePhone.replace(/\D/g, "").slice(-10);
  };

  /* =====================================================
     USER DETAILS
  ===================================================== */

  const [name, setName] = useState(
    currentUser?.displayName || ""
  );

  const [phone] = useState(getLoggedInPhone());

  const [email, setEmail] = useState(
    currentUser?.email || ""
  );

  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");

  /* =====================================================
     TRIP DAYS
  ===================================================== */

  const tripDays = useMemo(() => {
    if (!pickupDate || !dropDate) return 1;

    const start = new Date(`${pickupDate}T00:00:00`);
    const end = new Date(`${dropDate}T00:00:00`);

    const diff = Math.ceil(
      (end - start) / (1000 * 60 * 60 * 24)
    );

    return diff > 0 ? diff : 1;
  }, [pickupDate, dropDate]);

  /* =====================================================
     KM PACKAGE PRICE
  ===================================================== */

  const kmPricePerDay = useMemo(() => {
    if (!car) return 0;

    const basePrice = Number(car.pricePerDay || 0);

    if (kmPackage === "limited") {
      return Math.round(basePrice * 0.83);
    }

    return basePrice;
  }, [car, kmPackage]);

  const rentalPrice = kmPricePerDay * tripDays;

  /* =====================================================
     CONFIDENCE FEE
  ===================================================== */

  const confidencePricePerDay = useMemo(() => {
    if (!car) return 0;

    return Math.round(
      Number(car.pricePerDay || 0) * 0.22
    );
  }, [car]);

  const confidencePrice =
    confidencePricePerDay * tripDays;

  /* =====================================================
     TOTAL
  ===================================================== */

  const bookingTotal =
    rentalPrice + confidencePrice;

  const amountPayableNow =
    paymentOption === "now"
      ? bookingTotal
      : 0;

  /* =====================================================
     LABELS
  ===================================================== */

  const kmLabel =
    kmPackage === "limited"
      ? "48 Kms Included"
      : "Unlimited Kms Included";

  /* =====================================================
     CAR IMAGE
  ===================================================== */

  const carImage = car
    ? (Array.isArray(car.images) && car.images[0]) ||
      car.image
    : null;

  /* =====================================================
     DATE FORMAT
  ===================================================== */

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "Not selected";

    const date = new Date(`${dateStr}T00:00:00`);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* =====================================================
     VALIDATION
  ===================================================== */

  const validate = () => {
    const nextErrors = {};

    if (!currentUser) {
      nextErrors.auth =
        "Please log in to complete your booking.";
    }

    if (!name.trim()) {
      nextErrors.name =
        "Please enter your full name.";
    }

    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      nextErrors.phone =
        "Your login phone number is not available. Please login again using your phone number.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim()
      )
    ) {
      nextErrors.email =
        "Enter a valid email address.";
    }

    if (!pickupDate) {
      nextErrors.pickupDate =
        "Pickup date is missing.";
    }

    if (!dropDate) {
      nextErrors.dropDate =
        "Drop date is missing.";
    }

    if (!agreed) {
      nextErrors.agreed =
        "Please accept the terms to continue.";
    }

    setErrors(nextErrors);

    return nextErrors;
  };

  /* =====================================================
     CONFIRM BOOKING
  ===================================================== */

  const handleConfirmBooking = async (event) => {
    event.preventDefault();

    if (!car) return;

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn(
          "[Booking] Confirm blocked — validation failed:",
          validationErrors
        );
      }

      // Scroll the form back into view so whichever error
      // fired becomes visible, even if the sticky mobile
      // button was clicked from the bottom of the screen.
      const formEl = document.querySelector(
        ".booking-form-card"
      );

      if (formEl) {
        formEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const pickup = `${pickupDate}T${
        pickupTime || "10:00"
      }:00`;

      const drop = `${dropDate}T${
        dropTime || "10:00"
      }:00`;

      const docRef = await addDoc(
        collection(db, "bookings"),
        {
          userId: currentUser.uid,
          carId: car.id,
          carName: car.name,
          carImage: carImage || null,

          pickup,
          drop,

          pickupDate,
          pickupTime,
          dropDate,
          dropTime,

          days: tripDays,

          guest: {
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
          },

          phoneNumber:
            currentUser.phoneNumber || phone.trim(),

          kmPackage,
          kmLabel,
          kmPricePerDay,

          rentalPrice,

          confidencePricePerDay,
          confidencePrice,

          deposit,

          paymentOption,

          totalPrice: bookingTotal,
          amountPaid: amountPayableNow,

          status: "confirmed",

          createdAt: serverTimestamp(),
        }
      );

      setBookingId(docRef.id);
      setSuccess(true);
    } catch (error) {
      console.error("Booking failed:", error);

      setSubmitError(
        "Couldn't confirm your booking right now. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =====================================================
     NO CAR
  ===================================================== */

  if (!car) {
    return (
      <>
        <SEO
          title="Booking Details Not Found | RentoCar"
          description="The requested RentoCar booking details could not be found."
          canonical="/booking"
          noIndex={true}
        />

        <div className="booking-empty">
          <div className="booking-empty-card">
            <div className="booking-empty-icon">
              🚗
            </div>

            <h2>
              We couldn't find your trip details
            </h2>

            <p>
              Please go back and select a car to
              book again.
            </p>

            <button
              className="booking-primary-btn"
              onClick={() =>
                navigate(`/cars/${id || ""}`)
              }
            >
              ← Back to car
            </button>
          </div>
        </div>
      </>
    );
  }

  /* =====================================================
     SUCCESS SCREEN
  ===================================================== */

  if (success) {
    return (
      <>
        <SEO
          title={`Booking Confirmed - ${car.name} | RentoCar`}
          description={`Your ${car.name} booking has been confirmed with RentoCar.`}
          canonical="/booking"
          noIndex={true}
        />

        <div className="booking-success-page">
          <div className="booking-success-card">

            <div className="success-check">
              ✓
            </div>

            <div className="success-badge">
              BOOKING CONFIRMED
            </div>

            <h1>
              Your trip is confirmed!
            </h1>

            <p className="success-description">
              Your {car.name} has been successfully
              booked.
            </p>

            <div className="success-id">
              <span>Booking ID</span>
              <strong>{bookingId}</strong>
            </div>

            <div className="success-car">
              {carImage ? (
                <img
                  src={carImage}
                  alt={car.name}
                />
              ) : null}

              <div>
                <h3>{car.name}</h3>

                <p>
                  {car.transmission ||
                    "Automatic"}{" "}
                  · {car.fuel || "Petrol"} ·{" "}
                  {car.seats || 5} seats
                </p>
              </div>
            </div>

            <div className="success-summary">

              <div className="success-row">
                <span>Pickup</span>

                <strong>
                  {formatDisplayDate(
                    pickupDate
                  )}{" "}
                  · {pickupTime}
                </strong>
              </div>

              <div className="success-row">
                <span>Drop</span>

                <strong>
                  {formatDisplayDate(
                    dropDate
                  )}{" "}
                  · {dropTime}
                </strong>
              </div>

              <div className="success-row">
                <span>Duration</span>

                <strong>
                  {tripDays} day
                  {tripDays > 1 ? "s" : ""}
                </strong>
              </div>

              <div className="success-row">
                <span>KM Package</span>

                <strong>
                  {kmLabel}
                </strong>
              </div>

              <div className="success-row">
                <span>Phone</span>

                <strong>
                  +91 {phone}
                </strong>
              </div>

              <div className="success-row total">
                <span>Total</span>

                <strong>
                  ₹{bookingTotal}
                </strong>
              </div>

            </div>

            <div className="success-actions">

              <button
                className="booking-primary-btn"
                onClick={() =>
                  navigate("/my-bookings")
                }
              >
                View My Bookings
              </button>

              <button
                className="booking-secondary-btn"
                onClick={() =>
                  navigate("/cars")
                }
              >
                Browse More Cars
              </button>

            </div>

          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={bookingSeoTitle}
        description={bookingSeoDescription}
        canonical="/booking"
        noIndex={true}
      />

      <div className="booking-page">

        {/* =================================================
            TOP HEADER
        ================================================= */}

        <div className="booking-topbar">

          <button
            className="booking-back-btn"
            onClick={() => navigate(-1)}
          >
            ←
          </button>

          <div>
            <h1>Confirm your trip</h1>

            <p>
              Review your booking before continuing
            </p>
          </div>

        </div>

        {/* =================================================
            PROGRESS
        ================================================= */}

        <div className="booking-progress">

          <div className="progress-step active">
            <span>1</span>
            <p>Trip details</p>
          </div>

          <div className="progress-line active" />

          <div className="progress-step active">
            <span>2</span>
            <p>Confirm</p>
          </div>

          <div className="progress-line" />

          <div className="progress-step">
            <span>3</span>
            <p>Done</p>
          </div>

        </div>

        <div className="booking-layout">

          {/* =================================================
              LEFT
          ================================================= */}

          <form
            className="booking-form-card"
            onSubmit={handleConfirmBooking}
          >

            {!currentUser && (
              <div className="booking-login-banner">

                <div>
                  <strong>
                    Login required
                  </strong>

                  <span>
                    Please login to complete
                    your booking.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/login", {
                      state: {
                        redirectTo:
                          location.pathname,
                        bookingState: state,
                      },
                    })
                  }
                >
                  Log in
                </button>

              </div>
            )}

            {/* =================================================
                TRIP DETAILS
            ================================================= */}

            <section className="booking-section">

              <div className="section-heading">

                <div className="section-number">
                  1
                </div>

                <div>
                  <h2>
                    Your trip
                  </h2>

                  <p>
                    Selected pickup and drop
                    details
                  </p>
                </div>

              </div>

              <div className="trip-details-box">

                <div className="trip-detail">

                  <div className="trip-icon">
                    📅
                  </div>

                  <div>
                    <span>PICKUP</span>

                    <strong>
                      {formatDisplayDate(
                        pickupDate
                      )}
                    </strong>

                    <small>
                      {pickupTime}
                    </small>
                  </div>

                </div>

                <div className="trip-divider" />

                <div className="trip-detail">

                  <div className="trip-icon">
                    📅
                  </div>

                  <div>
                    <span>DROP</span>

                    <strong>
                      {formatDisplayDate(
                        dropDate
                      )}
                    </strong>

                    <small>
                      {dropTime}
                    </small>
                  </div>

                </div>

              </div>

              <div className="trip-duration">
                {tripDays} day
                {tripDays > 1 ? "s" : ""} trip
              </div>

            </section>

            {/* =================================================
                GUEST
            ================================================= */}

            <section className="booking-section">

              <div className="section-heading">

                <div className="section-number">
                  2
                </div>

                <div>
                  <h2>
                    Guest details
                  </h2>

                  <p>
                    Enter your details exactly
                    as on your driving licence
                  </p>
                </div>

              </div>

              <div className="booking-field">

                <label>
                  Full name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

                {errors.name && (
                  <span className="field-error">
                    {errors.name}
                  </span>
                )}

              </div>

              <div className="booking-field-row">

                <div className="booking-field">

                  <label>
                    Mobile number
                  </label>

                  <div className="phone-input-wrapper">

                    <span className="phone-country">
                      +91
                    </span>

                    <input
                      type="tel"
                      value={phone}
                      readOnly
                      disabled
                      className="fixed-phone-input"
                      placeholder="Login phone number"
                    />

                    <span className="phone-verified">
                      ✓
                    </span>

                  </div>

                  <small className="phone-fixed-note">
                    This number is linked to your
                    login account and cannot be changed.
                  </small>

                  {errors.phone && (
                    <span className="field-error">
                      {errors.phone}
                    </span>
                  )}

                </div>

                <div className="booking-field">

                  <label>
                    Email address
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />

                  {errors.email && (
                    <span className="field-error">
                      {errors.email}
                    </span>
                  )}

                </div>

              </div>

            </section>

            {/* =================================================
                TERMS
            ================================================= */}

            <section className="booking-section terms-section">

              <label className="booking-terms">

                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) =>
                    setAgreed(
                      e.target.checked
                    )
                  }
                />

                <span>
                  I agree to RentoCar's
                  Terms of Service,
                  Cancellation Policy and
                  Rental Agreement.
                </span>

              </label>

              {errors.agreed && (
                <span className="field-error">
                  {errors.agreed}
                </span>
              )}

              {errors.auth && (
                <p className="booking-submit-error">
                  {errors.auth}
                </p>
              )}

              {submitError && (
                <p className="booking-submit-error">
                  {submitError}
                </p>
              )}

              {Object.keys(errors).length > 0 && (
                <div className="booking-submit-error">
                  <strong>
                    Please fix the following before continuing:
                  </strong>
                  <ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
                    {Object.values(errors).map(
                      (message, index) => (
                        <li key={index}>{message}</li>
                      )
                    )}
                  </ul>
                </div>
              )}

            </section>

            {/* =================================================
                DESKTOP BUTTON
            ================================================= */}

            <button
              type="submit"
              className="booking-primary-btn full-width confirm-btn"
              disabled={submitting}
            >
              {submitting
                ? "Confirming your booking..."
                : paymentOption === "now"
                ? `Pay & Confirm — ₹${bookingTotal}`
                : `Confirm Booking — ₹${bookingTotal}`}
            </button>

            <div className="booking-secure-note">
              🔒 Your information is secure.
              This is a demo payment flow.
            </div>

          </form>

          {/* =================================================
              RIGHT SUMMARY
          ================================================= */}

          <aside className="booking-summary-card">

            <div className="summary-header">

              <h2>
                Booking summary
              </h2>

              <span>
                {tripDays} day
                {tripDays > 1 ? "s" : ""}
              </span>

            </div>

            {/* CAR */}

            <div className="summary-car">

              {carImage ? (
                <img
                  src={carImage}
                  alt={car.name}
                />
              ) : (
                <div className="summary-car-noimg">
                  🚗
                </div>
              )}

              <div>

                <h3>
                  {car.name}
                </h3>

                <p>
                  {car.transmission ||
                    "Automatic"}{" "}
                  ·{" "}
                  {car.fuel ||
                    "Petrol"}{" "}
                  ·{" "}
                  {car.seats || 5} seats
                </p>

                {car.rating && (
                  <span className="summary-rating">
                    ★ {car.rating}
                  </span>
                )}

              </div>

            </div>

            {/* TRIP */}

            <div className="summary-trip">

              <div className="summary-trip-row">

                <div>
                  <span>
                    Pickup
                  </span>

                  <small>
                    {formatDisplayDate(
                      pickupDate
                    )}
                  </small>
                </div>

                <strong>
                  {pickupTime}
                </strong>

              </div>

              <div className="summary-trip-row">

                <div>
                  <span>
                    Drop
                  </span>

                  <small>
                    {formatDisplayDate(
                      dropDate
                    )}
                  </small>
                </div>

                <strong>
                  {dropTime}
                </strong>

              </div>

              <div className="summary-trip-row">

                <div>
                  <span>
                    Location
                  </span>
                </div>

                <strong>
                  {car.location ||
                    "Your location"}
                </strong>

              </div>

              <div className="summary-trip-row">

                <div>
                  <span>
                    KM package
                  </span>
                </div>

                <strong>
                  {kmLabel}
                </strong>

              </div>

              <div className="summary-trip-row">

                <div>
                  <span>
                    Phone
                  </span>
                </div>

                <strong>
                  +91 {phone}
                </strong>

              </div>

            </div>

            {/* PRICE */}

            <div className="summary-price">

              <div className="summary-price-row">

                <span>
                  Rental
                </span>

                <span>
                  ₹{rentalPrice}
                </span>

              </div>

              <small className="price-description">
                ₹{kmPricePerDay} ×{" "}
                {tripDays} day
                {tripDays > 1
                  ? "s"
                  : ""}
              </small>

              <div className="summary-price-row">

                <span>
                  Travel confidence fee
                </span>

                <span>
                  ₹{confidencePrice}
                </span>

              </div>

              <div className="summary-price-row muted">

                <span>
                  Refundable deposit
                </span>

                <span>
                  ₹{deposit}
                </span>

              </div>

              <div className="price-separator" />

              <div className="summary-price-row total">

                <div>
                  <span>
                    Total
                  </span>

                  <small>
                    Taxes included where
                    applicable
                  </small>
                </div>

                <strong>
                  ₹{bookingTotal}
                </strong>

              </div>

            </div>

            <div className="summary-trust">

              <div>
                ✓
              </div>

              <span>
                Free cancellation according
                to the applicable policy
              </span>

            </div>

          </aside>

        </div>

        {/* =================================================
            MOBILE STICKY BAR
        ================================================= */}

        <div className="booking-sticky-bar">

          <div>
            <span>
              Total
            </span>

            <strong>
              ₹{bookingTotal}
            </strong>
          </div>

          <button
            type="button"
            className="booking-primary-btn"
            disabled={submitting}
            onClick={handleConfirmBooking}
          >
            {submitting
              ? "Confirming..."
              : paymentOption === "now"
              ? "Pay & Confirm"
              : "Confirm Booking"}
          </button>

        </div>

      </div>
    </>
  );
}
