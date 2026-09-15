
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";
import "./MyBookings.css";

export default function MyBookings() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const q = query(
          collection(db, "bookings"),
          where("userId", "==", currentUser.uid)
        );

        const snap = await getDocs(q);

        const list = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        list.sort((a, b) => {
          const aTime = a.createdAt?.seconds || 0;
          const bTime = b.createdAt?.seconds || 0;
          return bTime - aTime;
        });

        setBookings(list);
      } catch (err) {
        console.error("Failed to load bookings:", err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  /* =====================================================
     NOT LOGGED IN
  ===================================================== */

  if (!currentUser) {
    return (
      <div className="bookings-page container section">

        <SEO
          title="My Bookings | RentoCar"
          description="View and manage your RentoCar self-drive car rental bookings and trips."
          canonical="/my-bookings"
          image="/logo.png"
          noIndex={true}
        />

        <span className="eyebrow">Your trips</span>

        <h1>My Bookings</h1>

        <div className="bookings-empty card">

          <h3>Log in to see your bookings</h3>

          <p>
            Once you sign in, all your trips will show up here.
          </p>

          <button
            type="button"
            className="bookings-login-btn"
            onClick={() =>
              navigate("/login", {
                state: {
                  redirectTo: "/my-bookings",
                },
              })
            }
          >
            Log in
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="bookings-page container section">

      {/* =====================================================
          SEO
      ===================================================== */}

      <SEO
        title="My Bookings | RentoCar"
        description="View and manage your RentoCar self-drive car rental bookings and upcoming trips."
        canonical="/my-bookings"
        image="/logo.png"
        noIndex={true}
      />

      <span className="eyebrow">
        Your trips
      </span>

      <h1>
        My Bookings
      </h1>

      {loading ? (

        <p className="bookings-loading">
          Loading…
        </p>

      ) : bookings.length === 0 ? (

        <div className="bookings-empty card">

          <h3>
            No bookings yet
          </h3>

          <p>
            Once you book a car, it'll show up here.
          </p>

          <button
            type="button"
            className="bookings-login-btn"
            onClick={() => navigate("/cars")}
          >
            Browse cars
          </button>

        </div>

      ) : (

        <div className="bookings-list">

          {bookings.map((b) => (

            <div
              key={b.id}
              className="booking-item card"
              onClick={() => navigate(`/cars/${b.carId}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  navigate(`/cars/${b.carId}`);
                }
              }}
            >

              {/* ================= IMAGE ================= */}

              {b.carImage ? (

                <img
                  src={b.carImage}
                  alt={b.carName || "RentoCar rental car"}
                />

              ) : (

                <div className="booking-item-noimg">
                  No image
                </div>

              )}

              {/* ================= BOOKING INFO ================= */}

              <div className="booking-item-info">

                <h4>
                  {b.carName}
                </h4>

                <p>

                  {new Date(b.pickup).toLocaleString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}

                  {" → "}

                  {new Date(b.drop).toLocaleString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}

                </p>

                <p>
                  {b.days} day
                  {b.days > 1 ? "s" : ""}
                </p>

              </div>

              {/* ================= PRICE / STATUS ================= */}

              <div className="booking-item-right">

                <span
                  className={`booking-status ${b.status}`}
                >
                  {b.status}
                </span>

                <span className="booking-item-price">
                  ₹{b.totalPrice}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

