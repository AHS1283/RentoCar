import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";
import CarCard from "../components/CarCard";
import sampleCars from "../data/sampleCars";

import "./Cars.css";

/* =====================================================
   SEO CONTENT
===================================================== */

const SITE_URL = "https://www.rentocar.in";
const PAGE_URL = `${SITE_URL}/cars`;

const SEO_TITLE =
  "Cars for Rent in Pune | Self Drive Cars | RentoCar";

const SEO_DESCRIPTION =
  "Explore cars for rent in Pune with RentoCar. Choose from reliable self-drive cars, compare prices, filter by car type and find the right car for your journey.";

const SEO_KEYWORDS =
  "cars for rent in Pune, self drive cars Pune, car rental Pune, rent a car in Pune, self drive car rental Pune, RentoCar cars, hatchback SUV sedan rental Pune";

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
  // SEO
  // =====================================================

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
          PAGE HEADER
      ================================================= */}

      <div className="cars-header">
        <div>
          <span className="eyebrow">
            Browse cars for rent in Pune
          </span>

          <h1>
            Self-drive cars for rent in Pune
          </h1>

          <p className="cars-subtitle">
            Find your next ride. Compare prices, filter by
            car type and book the right self-drive car for
            your journey.
          </p>
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