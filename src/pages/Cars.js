import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";
import CarCard from "../components/CarCard";
import sampleCars from "../data/sampleCars";
import SEO from "../components/SEO";

import "./Cars.css";

export default function Cars() {
  const [searchParams] = useSearchParams();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [locationFilter, setLocationFilter] = useState(
    searchParams.get("location") || "All"
  );

  const [typeFilter, setTypeFilter] = useState(
    searchParams.get("type") || "All"
  );

  const [sortBy, setSortBy] = useState("popular");

  // =====================================================
  // FETCH CARS
  // =====================================================

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const snap = await getDocs(
          collection(db, "cars")
        );

        const data = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        setCars(
          data.length
            ? data
            : sampleCars
        );
      } catch (err) {
        console.log(
          "Firebase cars unavailable:",
          err
        );

        setCars(sampleCars);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // =====================================================
  // LOCATIONS
  // =====================================================

  const locations = useMemo(
    () => [
      "All",
      ...new Set(
        cars
          .map((c) => c.location)
          .filter(Boolean)
      ),
    ],
    [cars]
  );

  // =====================================================
  // CAR TYPES
  // =====================================================

  const types = useMemo(
    () => [
      "All",
      ...new Set(
        cars
          .map((c) => c.type)
          .filter(Boolean)
      ),
    ],
    [cars]
  );

  // =====================================================
  // FILTER + SORT
  // =====================================================

  const filtered = useMemo(() => {
    let result = cars.filter((c) => {
      const matchLocation =
        locationFilter === "All" ||
        c.location === locationFilter;

      const matchType =
        typeFilter === "All" ||
        c.type === typeFilter;

      return matchLocation && matchType;
    });

    if (sortBy === "price-low") {
      result = [...result].sort(
        (a, b) =>
          (Number(a.pricePerDay) || 0) -
          (Number(b.pricePerDay) || 0)
      );
    }

    if (sortBy === "price-high") {
      result = [...result].sort(
        (a, b) =>
          (Number(b.pricePerDay) || 0) -
          (Number(a.pricePerDay) || 0)
      );
    }

    if (sortBy === "rating") {
      result = [...result].sort(
        (a, b) =>
          (Number(b.rating) || 0) -
          (Number(a.rating) || 0)
      );
    }

    return result;
  }, [
    cars,
    locationFilter,
    typeFilter,
    sortBy,
  ]);

  // =====================================================
  // JSX
  // =====================================================

  return (
    <div className="cars-page container section">

      {/* =================================================
          SEO
      ================================================= */}

      <SEO
        title="Cars for Rent in Pune | Self Drive Cars | RentoCar"
        description="Explore cars for rent in Pune with RentoCar. Choose from reliable self-drive cars, compare prices, filter by car type and find the right car for your journey."
        canonical="/cars"
      />

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="cars-header">
        <div>
          <span className="eyebrow">
            Browse cars
          </span>

          <h1>
            Find your next ride
          </h1>
        </div>
      </div>

      {/* =================================================
          FILTERS
      ================================================= */}

      <div className="cars-filters">

        {/* CITY */}

        <div className="field">
          <label>
            City
          </label>

          <select
            value={locationFilter}
            onChange={(e) =>
              setLocationFilter(
                e.target.value
              )
            }
          >
            {locations.map((loc) => (
              <option
                key={loc}
                value={loc}
              >
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* CAR TYPE */}

        <div className="field">
          <label>
            Car type
          </label>

          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(
                e.target.value
              )
            }
          >
            {types.map((t) => (
              <option
                key={t}
                value={t}
              >
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* SORT */}

        <div className="field">
          <label>
            Sort by
          </label>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }
          >
            <option value="popular">
              Popular
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="rating">
              Top Rated
            </option>
          </select>
        </div>

      </div>

      {/* =================================================
          CAR RESULTS
      ================================================= */}

      {loading ? (
        <p className="cars-loading">
          Loading cars…
        </p>
      ) : filtered.length ? (

        <div className="car-grid">

          {filtered.map((car) => (
            <CarCard
              key={car.id}
              car={car}
            />
          ))}

        </div>

      ) : (

        <div className="cars-empty">

          <h3>
            No cars match these filters
          </h3>

          <p>
            Try changing the city or car type.
          </p>

        </div>

      )}

    </div>
  );
}
