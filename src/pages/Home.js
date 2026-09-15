import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
// ^ adjust this import to match wherever your Firebase app/db is
//   initialized in the project (e.g. "../firebaseConfig")
import "./Home.css";
// ^ adjust this path if Home.css lives in a different folder
//   than this component

const cars = [
  {
    id: 1,
    name: "Toyota Innova",
    type: "Premium MPV",
    price: "₹2,499",
    image:
      "https://images.unsplash.com/photo-1622791905066-0fe6af17ad80?auto=format&fit=crop&w=1400&q=90",
    bookedDates: [
      "2026-09-12",
      "2026-09-13",
      "2026-09-14",
    ],
  },
  {
    id: 2,
    name: "Kia Seltos",
    type: "SUV",
    price: "₹1,999",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=90",
    bookedDates: [
      "2026-09-18",
      "2026-09-19",
      "2026-09-20",
    ],
  },
  {
    id: 3,
    name: "Hyundai Creta",
    type: "SUV",
    price: "₹2,199",
    image:
      "https://images.unsplash.com/photo-1628573042918-a91e94c2c906?auto=format&fit=crop&w=1400&q=90",
    bookedDates: [],
  },
  {
    id: 4,
    name: "Mahindra Thar",
    type: "Off-Road SUV",
    price: "₹2,799",
    image:
      "https://images.unsplash.com/photo-1619767889550-28064966d63d?auto=format&fit=crop&w=1400&q=90",
    bookedDates: [
      "2026-09-22",
      "2026-09-23",
      "2026-09-24",
    ],
  },
  {
    id: 5,
    name: "Tata Nexon",
    type: "Compact SUV",
    price: "₹1,899",
    image:
      "https://images.unsplash.com/photo-1633619946656-159bb0448e59?auto=format&fit=crop&w=1400&q=90",
    bookedDates: [],
  },
  {
    id: 6,
    name: "Maruti Swift",
    type: "Hatchback",
    price: "₹1,499",
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1400&q=90",
    bookedDates: [],
  },
];

const carTypes = [
  "All Cars",
  "Premium MPV",
  "SUV",
  "Off-Road SUV",
  "Compact SUV",
  "Hatchback",
];

// Pickup location is fixed to Pune only.
const locations = ["Pune, India"];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEK_DAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

/* =========================================================
   DATE HELPERS
========================================================= */

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDate(dateString) {
  if (!dateString) return null;

  const [year, month, day] =
    dateString.split("-").map(Number);

  if (!year || !month || !day) return null;

  return new Date(year, month - 1, day);
}

function formatDisplayDate(dateString) {
  if (!dateString) return "Select date";

  const date = parseDate(dateString);

  if (!date) return "Select date";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function addDays(dateString, amount) {
  const date = parseDate(dateString);

  if (!date) return "";

  date.setDate(date.getDate() + amount);

  return getLocalDateString(date);
}

/* =========================================================
   CALENDAR
========================================================= */

function Calendar({
  value,
  minDate,
  bookedDates = [],
  rangeStart,
  rangeEnd,
  onSelect,
  onClose,
}) {
  const minimumDate = parseDate(minDate);
  const selectedDate = parseDate(value);

  const initialDate =
    selectedDate ||
    minimumDate ||
    new Date();

  const [viewDate, setViewDate] = useState(
    new Date(
      initialDate.getFullYear(),
      initialDate.getMonth(),
      1
    )
  );

  useEffect(() => {
    const selected = parseDate(value);
    const minimum = parseDate(minDate);
    const target = selected || minimum;

    if (!target) return;

    setViewDate(
      new Date(
        target.getFullYear(),
        target.getMonth(),
        1
      )
    );
  }, [value, minDate]);

  const minimumMonth = minimumDate
    ? new Date(
        minimumDate.getFullYear(),
        minimumDate.getMonth(),
        1
      )
    : null;

  const canGoPrevious =
    !minimumMonth ||
    viewDate.getTime() > minimumMonth.getTime();

  const goPreviousMonth = () => {
    if (!canGoPrevious) return;

    setViewDate(
      new Date(
        viewDate.getFullYear(),
        viewDate.getMonth() - 1,
        1
      )
    );
  };

  const goNextMonth = () => {
    setViewDate(
      new Date(
        viewDate.getFullYear(),
        viewDate.getMonth() + 1,
        1
      )
    );
  };

  const firstDay = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth(),
    1
  );

  const firstWeekday = firstDay.getDay();

  const daysInMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0
  ).getDate();

  const calendarDays = [];

  for (let i = 0; i < firstWeekday; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(
      new Date(
        viewDate.getFullYear(),
        viewDate.getMonth(),
        day
      )
    );
  }

  const minimumDateString = minimumDate
    ? getLocalDateString(minimumDate)
    : null;

  const handleDateClick = (date) => {
    if (!date) return;

    const dateString = getLocalDateString(date);

    if (
      minimumDateString &&
      dateString < minimumDateString
    ) {
      return;
    }

    if (bookedDates.includes(dateString)) {
      return;
    }

    onSelect(dateString);
  };

  return (
    <div
      className="rentocar-calendar"
      onMouseDown={(event) =>
        event.stopPropagation()
      }
      onClick={(event) =>
        event.stopPropagation()
      }
    >
      <div className="calendar-header">
        <button
          type="button"
          className="calendar-nav"
          onClick={goPreviousMonth}
          disabled={!canGoPrevious}
          aria-label="Previous month"
        >
          ←
        </button>

        <div className="calendar-month">
          <strong>
            {MONTH_NAMES[viewDate.getMonth()]}
          </strong>

          <span>{viewDate.getFullYear()}</span>
        </div>

        <button
          type="button"
          className="calendar-nav"
          onClick={goNextMonth}
          aria-label="Next month"
        >
          →
        </button>
      </div>

      <div className="calendar-weekdays">
        {WEEK_DAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarDays.map((date, index) => {
          if (!date) {
            return (
              <span
                className="calendar-empty"
                key={`empty-${index}`}
              />
            );
          }

          const dateString =
            getLocalDateString(date);

          const isPast =
            minimumDateString &&
            dateString < minimumDateString;

          const isBooked =
            bookedDates.includes(dateString);

          const isSelected =
            value === dateString;

          const isRangeStart =
            rangeStart === dateString;

          const isRangeEnd =
            rangeEnd === dateString;

          const isInRange =
            rangeStart &&
            rangeEnd &&
            dateString > rangeStart &&
            dateString < rangeEnd;

          const classNames = [
            "calendar-day",
            isPast ? "past" : "",
            isBooked ? "booked" : "",
            isSelected ? "selected" : "",
            isRangeStart ? "range-start" : "",
            isRangeEnd ? "range-end" : "",
            isInRange ? "in-range" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={dateString}
              type="button"
              className={classNames}
              disabled={isPast || isBooked}
              onClick={() =>
                handleDateClick(date)
              }
            >
              <span>{date.getDate()}</span>

              {isBooked && (
                <small className="booked-cross">
                  ×
                </small>
              )}
            </button>
          );
        })}
      </div>

      <div className="calendar-footer">
        <div className="calendar-legend">
          <span>
            <i className="legend-dot available" />
            Available
          </span>

          <span>
            <i className="legend-dot unavailable" />
            Booked
          </span>
        </div>

        <button
          type="button"
          className="calendar-close"
          onClick={onClose}
        >
          Done
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  const navigate = useNavigate();

  const today = useMemo(
    () => getLocalDateString(),
    []
  );

  const [active, setActive] = useState(2);
  const [paused, setPaused] = useState(false);

  // Pickup location is fixed to Pune only.
  const [pickupLocation, setPickupLocation] =
    useState("Pune, India");

  const [selectedCarType, setSelectedCarType] =
    useState("All Cars");

  const [pickupDate, setPickupDate] =
    useState(today);

  const [dropoffDate, setDropoffDate] =
    useState("");

  const [openCalendar, setOpenCalendar] =
    useState(null);

  const [searchMessage, setSearchMessage] =
    useState("");

  const [carImages, setCarImages] =
    useState({});

  /* =======================================================
     LOAD CAR IMAGES FROM FIREBASE
     (collection "cars", each doc id matching a car's id,
     with an "image" field holding the image URL — the
     hardcoded images above stay as the fallback whenever a
     doc is missing, has no image, or the fetch fails)
  ======================================================= */

  useEffect(() => {
    let isMounted = true;

    async function loadCarImages() {
      try {
        const snapshot = await getDocs(
          collection(db, "cars")
        );

        const images = {};

        snapshot.forEach((docSnap) => {
          const data = docSnap.data();

          if (data?.image) {
            images[Number(docSnap.id)] =
              data.image;
          }
        });

        if (isMounted) {
          setCarImages(images);
        }
      } catch (error) {
        // Fetch failed — carImages stays empty and every
        // car simply renders its local fallback image.
        console.error(
          "Could not load car images from Firebase:",
          error
        );
      }
    }

    loadCarImages();

    return () => {
      isMounted = false;
    };
  }, []);

  const getCarImage = (car) =>
    carImages[car.id] || car.image;

  /* =======================================================
     AUTO CAR SLIDER
  ======================================================= */

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setActive(
        (previous) =>
          (previous + 1) % cars.length
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [paused]);

  /* =======================================================
     CLOSE CALENDAR ON OUTSIDE CLICK
  ======================================================= */

  useEffect(() => {
    const closeCalendar = (event) => {
      if (
        !event.target.closest(
          ".date-picker-wrapper"
        )
      ) {
        setOpenCalendar(null);
      }
    };

    document.addEventListener(
      "mousedown",
      closeCalendar
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        closeCalendar
      );
    };
  }, []);

  /* =======================================================
     CAROUSEL
  ======================================================= */

  const getPosition = (index) => {
    let difference = index - active;

    if (difference > cars.length / 2) {
      difference -= cars.length;
    }

    if (difference < -cars.length / 2) {
      difference += cars.length;
    }

    return difference;
  };

  const nextCar = () => {
    setActive(
      (previous) =>
        (previous + 1) % cars.length
    );
  };

  const previousCar = () => {
    setActive(
      (previous) =>
        (previous - 1 + cars.length) %
        cars.length
    );
  };

  /* =======================================================
     CAR FILTER
  ======================================================= */

  const matchingCars = useMemo(() => {
    if (selectedCarType === "All Cars") {
      return cars;
    }

    return cars.filter(
      (car) =>
        car.type === selectedCarType
    );
  }, [selectedCarType]);

  /* =======================================================
     FULLY BOOKED DATES
  ======================================================= */

  const globallyBookedDates = useMemo(() => {
    if (matchingCars.length === 0) {
      return [];
    }

    const allDates = new Set();

    matchingCars.forEach((car) => {
      (car.bookedDates || []).forEach(
        (date) => allDates.add(date)
      );
    });

    return Array.from(allDates).filter(
      (date) =>
        matchingCars.every((car) =>
          (car.bookedDates || []).includes(
            date
          )
        )
    );
  }, [matchingCars]);

  /* =======================================================
     PICKUP
  ======================================================= */

  const handlePickupDateSelect = (
    selectedDate
  ) => {
    if (selectedDate < today) return;

    if (
      globallyBookedDates.includes(
        selectedDate
      )
    ) {
      setSearchMessage(
        "This date is fully booked."
      );
      return;
    }

    setPickupDate(selectedDate);

    if (
      dropoffDate &&
      dropoffDate <= selectedDate
    ) {
      setDropoffDate("");
    }

    setOpenCalendar(null);
    setSearchMessage("");
  };

  /* =======================================================
     DROPOFF
  ======================================================= */

  const handleDropoffDateSelect = (
    selectedDate
  ) => {
    if (!pickupDate) return;

    if (selectedDate <= pickupDate) {
      setSearchMessage(
        "Drop-off date must be after pickup date."
      );
      return;
    }

    if (
      globallyBookedDates.includes(
        selectedDate
      )
    ) {
      setSearchMessage(
        "This date is fully booked."
      );
      return;
    }

    const hasBookedDateInRange =
      globallyBookedDates.some(
        (bookedDate) =>
          bookedDate > pickupDate &&
          bookedDate <= selectedDate
      );

    if (hasBookedDateInRange) {
      setSearchMessage(
        "Selected range contains a booked date."
      );
      return;
    }

    setDropoffDate(selectedDate);
    setOpenCalendar(null);
    setSearchMessage("");
  };

  /* =======================================================
     CAR AVAILABILITY
  ======================================================= */

  const isCarAvailableForRange = (
    car,
    startDate,
    endDate
  ) => {
    if (!startDate || !endDate) {
      return false;
    }

    const current = parseDate(startDate);
    const end = parseDate(endDate);

    if (!current || !end) {
      return false;
    }

    while (current < end) {
      const dateString =
        getLocalDateString(current);

      if (
        (car.bookedDates || []).includes(
          dateString
        )
      ) {
        return false;
      }

      current.setDate(
        current.getDate() + 1
      );
    }

    return true;
  };

  /* =======================================================
     SEARCH
  ======================================================= */

  const handleSearch = () => {
    if (!pickupDate) {
      setSearchMessage(
        "Please select a pickup date."
      );
      return;
    }

    if (!dropoffDate) {
      setSearchMessage(
        "Please select a drop-off date."
      );
      return;
    }

    if (dropoffDate <= pickupDate) {
      setSearchMessage(
        "Drop-off date must be after pickup date."
      );
      return;
    }

    const availableCars =
      matchingCars.filter((car) =>
        isCarAvailableForRange(
          car,
          pickupDate,
          dropoffDate
        )
      );

    if (availableCars.length === 0) {
      setSearchMessage(
        `No cars available from ${formatDisplayDate(
          pickupDate
        )} to ${formatDisplayDate(
          dropoffDate
        )}.`
      );
      return;
    }

    const firstAvailableIndex =
      cars.findIndex(
        (car) =>
          car.id === availableCars[0].id
      );

    if (firstAvailableIndex >= 0) {
      setActive(firstAvailableIndex);
    }

    setSearchMessage(
      `${availableCars.length} ${
        availableCars.length === 1
          ? "car"
          : "cars"
      } available for your dates.`
    );

    const params = new URLSearchParams();

    if (
      pickupLocation &&
      pickupLocation !== "All"
    ) {
      params.set(
        "location",
        pickupLocation
      );
    }

    if (
      selectedCarType &&
      selectedCarType !== "All Cars"
    ) {
      params.set(
        "type",
        selectedCarType
      );
    }

    navigate(
      params.toString()
        ? `/cars?${params.toString()}`
        : "/cars"
    );
  };

  /* =======================================================
     CAR TYPE
  ======================================================= */

  const handleCarTypeChange = (value) => {
    setSelectedCarType(value);
    setSearchMessage("");

    const firstMatchingIndex =
      cars.findIndex(
        (car) =>
          value === "All Cars" ||
          car.type === value
      );

    if (firstMatchingIndex >= 0) {
      setActive(firstMatchingIndex);
    }
  };

  return (
    <main className="home-page">
      {/* =================================================
          HERO BAND (dark asphalt panel: hero copy + carousel)
      ================================================= */}

      <div className="hero-band">
        <div
          className="home-background-word"
          aria-hidden="true"
        >
          DRIVE
        </div>

        <section className="hero-top">
          <div className="hero-copy">
            <span className="hero-kicker">
              Self-drive, six cities and counting
            </span>

            <h1>
              Find Your
              <br />
              <em>Perfect Ride</em>
            </h1>

            <p>
              Premium self-drive cars for every
              journey. Choose your car, pick your
              dates and hit the road.
            </p>

            <div className="hero-features">
              <div className="hero-feature">
                <span>✓</span>
                <strong>Safe & Secure</strong>
              </div>

              <div className="hero-feature">
                <span>₹</span>
                <strong>Best Pricing</strong>
              </div>

              <div className="hero-feature">
                <span>☎</span>
                <strong>24/7 Support</strong>
              </div>

              <div className="hero-feature">
                <span>★</span>
                <strong>Top Rated</strong>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            CAROUSEL
        ================================================= */}

        <section
          className="car-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="carousel-floor" />

          <div className="carousel-stage">
            {cars.map((car, index) => {
              const position =
                getPosition(index);

              return (
                <article
                  key={car.id}
                  className={`carousel-card position-${position}`}
                >
                  <div className="carousel-image-wrap">
                    <img
                      src={getCarImage(car)}
                      alt={car.name}
                      className="carousel-image"
                      onError={(event) => {
                        if (
                          event.currentTarget
                            .src !== car.image
                        ) {
                          event.currentTarget.src =
                            car.image;
                        }
                      }}
                    />

                    <div className="carousel-image-overlay" />
                  </div>

                  {position === 0 && (
                    <div className="carousel-card-info">
                      <span className="carousel-number">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}{" "}
                        / {String(cars.length).padStart(2, "0")}
                      </span>

                      <h2>{car.name}</h2>

                      <p>{car.type}</p>

                      <div className="carousel-price">
                        <strong>
                          {car.price}
                        </strong>

                        <span>/ day</span>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <button
            type="button"
            className="carousel-button carousel-button-prev"
            onClick={previousCar}
            aria-label="Previous car"
          >
            ←
          </button>

          <button
            type="button"
            className="carousel-button carousel-button-next"
            onClick={nextCar}
            aria-label="Next car"
          >
            →
          </button>

          <div className="carousel-dots">
            {cars.map((car, index) => (
              <button
                key={car.id}
                type="button"
                className={
                  index === active
                    ? "dot active"
                    : "dot"
                }
                onClick={() =>
                  setActive(index)
                }
                aria-label={`Show ${car.name}`}
              />
            ))}
          </div>
        </section>
      </div>

      {/* =================================================
          SEARCH
      ================================================= */}

      <section className="search-section">
        <div className="search-box">
          <div className="search-heading">
            <strong>Plan your drive</strong>
          </div>

          {/* LOCATION — fixed to Pune only */}

          <div className="search-field location-field">
            <span className="field-label">
              Pick-up location
            </span>

            <div className="search-text">
              <span className="field-icon">
                ◎
              </span>

              <select
                value={pickupLocation}
                onChange={(event) =>
                  setPickupLocation(
                    event.target.value
                  )
                }
                disabled={locations.length <= 1}
              >
                {locations.map((location) => (
                  <option
                    key={location}
                    value={location}
                  >
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* PICKUP */}

          <div className="search-field date-field">
            <span className="field-label">
              Pick-up date
            </span>

            <div className="date-picker-wrapper">
              <button
                type="button"
                className="date-picker-trigger"
                onClick={() =>
                  setOpenCalendar(
                    openCalendar === "pickup"
                      ? null
                      : "pickup"
                  )
                }
              >
                <span className="field-icon">
                  01
                </span>

                <span className="date-value">
                  <strong>
                    {formatDisplayDate(
                      pickupDate
                    )}
                  </strong>
                </span>
              </button>

              {openCalendar === "pickup" && (
                <Calendar
                  value={pickupDate}
                  minDate={today}
                  bookedDates={
                    globallyBookedDates
                  }
                  rangeStart={pickupDate}
                  rangeEnd={dropoffDate}
                  onSelect={
                    handlePickupDateSelect
                  }
                  onClose={() =>
                    setOpenCalendar(null)
                  }
                />
              )}
            </div>
          </div>

          <div className="date-arrow">
            →
          </div>

          {/* DROPOFF */}

          <div className="search-field date-field">
            <span className="field-label">
              Drop-off date
            </span>

            <div className="date-picker-wrapper">
              <button
                type="button"
                className="date-picker-trigger"
                onClick={() => {
                  if (!pickupDate) return;

                  setOpenCalendar(
                    openCalendar ===
                      "dropoff"
                      ? null
                      : "dropoff"
                  );
                }}
              >
                <span className="field-icon">
                  02
                </span>

                <span className="date-value">
                  <strong>
                    {dropoffDate
                      ? formatDisplayDate(
                          dropoffDate
                        )
                      : "Choose date"}
                  </strong>
                </span>
              </button>

              {openCalendar === "dropoff" && (
                <Calendar
                  value={dropoffDate}
                  minDate={
                    pickupDate
                      ? addDays(
                          pickupDate,
                          1
                        )
                      : today
                  }
                  bookedDates={
                    globallyBookedDates
                  }
                  rangeStart={pickupDate}
                  rangeEnd={dropoffDate}
                  onSelect={
                    handleDropoffDateSelect
                  }
                  onClose={() =>
                    setOpenCalendar(null)
                  }
                />
              )}
            </div>
          </div>

          {/* CAR TYPE */}

          <div className="search-field car-type-field">
            <span className="field-label">
              Car type
            </span>

            <div className="search-text">
              <span className="field-icon">
                ◇
              </span>

              <select
                value={selectedCarType}
                onChange={(event) =>
                  handleCarTypeChange(
                    event.target.value
                  )
                }
              >
                {carTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SEARCH BUTTON */}

          <button
            type="button"
            className="search-button"
            onClick={handleSearch}
          >
            <span>Search cars</span>
          </button>
        </div>

        {searchMessage && (
          <div className="search-message">
            {searchMessage}
          </div>
        )}
      </section>
    </main>
  );
}
