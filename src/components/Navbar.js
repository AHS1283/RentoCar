import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Menu,
  X,
  UserRound,
  Home,
  Coins,
  Car,
  Heart,
  Building2,
  Newspaper,
  FileText,
  Phone,
  LogOut,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

import "./Navbar.css";

/* =====================================================
   GET THE APP ICON
   Custom phone-with-download-arrow glyph — reads more
   clearly as "get the app" than a plain phone outline.
   Uses currentColor so it follows the button's hover
   color automatically.
===================================================== */

function AppDownloadIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="6.25"
        y="2"
        width="11.5"
        height="20"
        rx="3.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path
        d="M10 20.1h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="M12 6.3v6.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="M9.1 10.4 12 13.3l2.9-2.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const auth = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = auth?.currentUser || null;
  const logout = auth?.logout;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  /* =====================================================
     USER INFORMATION
  ===================================================== */

  const isLoggedIn = Boolean(currentUser);

  const userPhone =
    currentUser?.phoneNumber ||
    currentUser?.email ||
    "";

  const userName =
    currentUser?.displayName?.trim() ||
    userPhone ||
    "User";

  const hasRealName =
    Boolean(currentUser?.displayName?.trim());

  const userInitial = hasRealName
    ? currentUser.displayName
        .trim()
        .charAt(0)
        .toUpperCase()
    : null;

  const userCredits = currentUser?.credits ?? 0;

  /* =====================================================
     CLOSE PROFILE OUTSIDE CLICK
  ===================================================== */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* =====================================================
     ESC KEY
  ===================================================== */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
        setProfileOpen(false);
        setAuthOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /* =====================================================
     BODY SCROLL LOCK
  ===================================================== */

  useEffect(() => {
    if (drawerOpen) {
      document.body.classList.add(
        "navbar-drawer-open"
      );
    } else {
      document.body.classList.remove(
        "navbar-drawer-open"
      );
    }

    return () => {
      document.body.classList.remove(
        "navbar-drawer-open"
      );
    };
  }, [drawerOpen]);

  /* =====================================================
     SCROLL TO SECTION AFTER NAVIGATION
     Runs whenever we land on "/" with a pending
     scrollTo request in the navigation state. This
     replaces the old fixed setTimeout, which raced
     against the page's own render and often lost.
  ===================================================== */

  useEffect(() => {
    const targetId = location.state?.scrollTo;

    if (location.pathname !== "/" || !targetId) {
      return;
    }

    let attempts = 0;

    const tryScroll = () => {
      const section = document.getElementById(targetId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }

      // Section not mounted yet — keep retrying briefly
      // instead of guessing a fixed delay.
      attempts += 1;

      if (attempts < 20) {
        requestAnimationFrame(tryScroll);
      }
    };

    requestAnimationFrame(tryScroll);

    // Clear the pending scroll from history state so
    // navigating back here later doesn't re-trigger it.
    navigate(location.pathname, {
      replace: true,
      state: {},
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.state]);

  /* =====================================================
     DRAWER
  ===================================================== */

  const toggleDrawer = () => {
    setDrawerOpen((previous) => !previous);
    setProfileOpen(false);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  /* =====================================================
     AUTH
  ===================================================== */

  const openAuth = () => {
    setAuthOpen(true);
    closeDrawer();
    setProfileOpen(false);
  };

  const closeAuth = () => {
    setAuthOpen(false);
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = async () => {
    try {
      if (logout) {
        await logout();
      }

      setProfileOpen(false);
      closeDrawer();

      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  /* =====================================================
     SCROLL TO SECTION
     If already on "/", scroll immediately. Otherwise
     navigate home and let the effect above finish the
     scroll once the target section actually exists.
  ===================================================== */

  const scrollToSection = (sectionId) => {
    closeDrawer();
    setProfileOpen(false);

    if (location.pathname === "/") {
      const section =
        document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    navigate("/", {
      state: { scrollTo: sectionId },
    });
  };

  /* =====================================================
     DOWNLOAD APP
     Goes straight to the dedicated download page
     instead of scrolling to a homepage section.
  ===================================================== */

  const handleDownloadApp = () => {
    closeDrawer();
    setProfileOpen(false);

    navigate("/get-app");
  };

  /* =====================================================
     HOW TO BOOK
  ===================================================== */

  const handleHowToBook = () => {
    scrollToSection("how-it-works");
  };

  /* =====================================================
     NORMAL NAVIGATION
  ===================================================== */

  const handleNavigation = () => {
    closeDrawer();
    setProfileOpen(false);
  };

  /* =====================================================
     GO HOME
  ===================================================== */

  const handleGoHome = () => {
    closeDrawer();
    setProfileOpen(false);

    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    navigate("/");
  };

  /* =====================================================
     PROFILE AVATAR
  ===================================================== */

  const ProfileAvatar = ({
    large = false,
    drawer = false,
  }) => {
    if (userInitial) {
      return (
        <span
          className={
            large
              ? "dropdown-avatar"
              : drawer
              ? "drawer-user-icon"
              : "profile-avatar"
          }
        >
          {userInitial}
        </span>
      );
    }

    return (
      <span
        className={
          large
            ? "dropdown-avatar icon-avatar"
            : drawer
            ? "drawer-user-icon icon-avatar"
            : "profile-avatar icon-avatar"
        }
      >
        <UserRound
          size={large ? 22 : drawer ? 22 : 19}
          strokeWidth={2}
        />
      </span>
    );
  };

  return (
    <>
      {/* =================================================
          MAIN NAVBAR
      ================================================= */}

      <header
        className={`navbar ${
          isLoggedIn
            ? "navbar-logged-in"
            : "navbar-logged-out"
        }`}
      >
        <div className="navbar-inner">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="navbar-left">

            {/* HAMBURGER */}

            <button
              type="button"
              className={`hamburger-btn ${
                drawerOpen ? "active" : ""
              }`}
              onClick={toggleDrawer}
              aria-label={
                drawerOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={drawerOpen}
              aria-controls="rentocar-mobile-drawer"
            >
              {drawerOpen ? (
                <X
                  size={23}
                  strokeWidth={2}
                />
              ) : (
                <Menu
                  size={23}
                  strokeWidth={2}
                />
              )}
            </button>

            {/* =================================================
                RENTOCAR IMAGE LOGO ONLY
            ================================================= */}

            <Link
              to="/"
              className="navbar-logo"
              onClick={handleGoHome}
              aria-label="Rentocar Home"
            >
              <img
                src="/assets/finallogo.png"
                alt="Rentocar Logo"
                className="navbar-logo-image"
              />
            </Link>
          </div>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav
            className="navbar-right"
            aria-label="Main navigation"
          >
            <button
              type="button"
              className="navbar-nav-button"
              onClick={handleGoHome}
            >
              Home
            </button>

            <button
              type="button"
              className="navbar-nav-button"
              onClick={handleHowToBook}
            >
              How to book?
            </button>

            <Link
              to="/become-host"
              onClick={handleNavigation}
              className="navbar-nav-link"
            >
              Become a Host
            </Link>

            <Link
              to="/company-profile"
              onClick={handleNavigation}
              className="navbar-nav-link"
            >
              Company Profile
            </Link>

            <button
              type="button"
              className="navbar-app-button"
              onClick={handleDownloadApp}
            >
              <AppDownloadIcon size={18} />

              <span>
                Get the App
              </span>
            </button>

            {/* =================================================
                LOGIN / PROFILE
            ================================================= */}

            {currentUser ? (
              <div
                className="navbar-profile"
                ref={profileRef}
              >
                <button
                  type="button"
                  className="profile-trigger"
                  onClick={() =>
                    setProfileOpen(
                      (previous) => !previous
                    )
                  }
                  aria-expanded={profileOpen}
                  aria-haspopup="menu"
                >
                  <ProfileAvatar />

                  <span className="profile-name">
                    {userName}
                  </span>

                  <ChevronDown
                    size={15}
                    strokeWidth={2}
                    className={`profile-chevron ${
                      profileOpen ? "open" : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <div
                    className="profile-dropdown"
                    role="menu"
                  >
                    <div className="profile-dropdown-header">

                      <ProfileAvatar large />

                      <div className="dropdown-user-info">

                        <strong>
                          {userName}
                        </strong>

                        {userPhone && (
                          <span>
                            {userPhone}
                          </span>
                        )}

                      </div>
                    </div>

                    <div className="profile-dropdown-menu">

                      <Link
                        to="/account"
                        role="menuitem"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                      >
                        <UserRound
                          size={18}
                          strokeWidth={1.9}
                        />

                        <span>
                          My Account
                        </span>
                      </Link>

                      <Link
                        to="/my-bookings"
                        role="menuitem"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                      >
                        <Car
                          size={18}
                          strokeWidth={1.9}
                        />

                        <span>
                          My Bookings
                        </span>
                      </Link>

                    </div>

                    <div className="profile-dropdown-footer">

                      <button
                        type="button"
                        onClick={handleLogout}
                        role="menuitem"
                      >
                        <LogOut
                          size={18}
                          strokeWidth={1.9}
                        />

                        <span>
                          Logout
                        </span>
                      </button>

                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                className="navbar-login-btn"
                onClick={openAuth}
              >
                Login
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* =====================================================
          DRAWER OVERLAY
      ===================================================== */}

      <div
        className={`drawer-overlay ${
          drawerOpen ? "open" : ""
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* =====================================================
          LEFT DRAWER
      ===================================================== */}

      <aside
        id="rentocar-mobile-drawer"
        className={`drawer ${
          drawerOpen ? "open" : ""
        }`}
        aria-hidden={!drawerOpen}
      >
        {isLoggedIn ? (
          <>
            {/* ACCOUNT HEADER */}

            <Link
              to="/account"
              className="drawer-user-area drawer-account-header"
              onClick={closeDrawer}
            >
              <ProfileAvatar drawer />

              <div className="drawer-user-info">

                <strong>
                  {userName}
                </strong>

                {userPhone && (
                  <span>
                    {userPhone}
                  </span>
                )}

              </div>

              <ArrowRight
                size={19}
                className="drawer-user-arrow"
              />
            </Link>

            {/* MAIN MENU */}

            <div className="drawer-main-menu">

              <button
                type="button"
                className="drawer-main-link drawer-button"
                onClick={handleGoHome}
              >
                <span className="drawer-main-icon">
                  <Home size={20} />
                </span>

                <span>
                  Home
                </span>
              </button>

              <button
                type="button"
                className="drawer-main-link drawer-button drawer-credits-row"
              >
                <span className="drawer-main-icon">
                  <Coins size={20} />
                </span>

                <span>
                  Credits
                </span>

                <span className="drawer-credits-value">
                  {userCredits}
                </span>
              </button>

              <Link
                to="/become-host"
                onClick={handleNavigation}
                className="drawer-main-link"
              >
                <span className="drawer-main-icon host-icon">
                  R
                </span>

                <span>
                  Become a Host
                </span>
              </Link>

            </div>

            <div className="drawer-divider" />

            {/* TRIPS */}

            <div className="drawer-main-menu">

              <Link
                to="/my-bookings"
                onClick={handleNavigation}
                className="drawer-main-link"
              >
                <span className="drawer-main-icon">
                  <Car size={20} />
                </span>

                <span>
                  My Trips
                </span>
              </Link>

              <Link
                to="/favourite-cars"
                onClick={handleNavigation}
                className="drawer-main-link"
              >
                <span className="drawer-main-icon">
                  <Heart size={20} />
                </span>

                <span>
                  Favourite Cars
                </span>
              </Link>

            </div>

            <div className="drawer-divider" />

            {/* COMPANY */}

            <div className="drawer-main-menu">

              <Link
                to="/company-profile"
                onClick={handleNavigation}
                className="drawer-main-link"
              >
                <span className="drawer-main-icon">
                  <Building2 size={20} />
                </span>

                <span>
                  Company Profile
                </span>
              </Link>

              <Link
                to="/company-profile/news-events"
                onClick={handleNavigation}
                className="drawer-main-link"
              >
                <span className="drawer-main-icon">
                  <Newspaper size={20} />
                </span>

                <span>
                  News & Events
                </span>
              </Link>

            </div>

            <div className="drawer-divider" />

            {/* SUPPORT */}

            <div className="drawer-main-menu">

              <Link
                to="/host-vehicle-policies"
                onClick={handleNavigation}
                className="drawer-main-link"
              >
                <span className="drawer-main-icon">
                  <FileText size={20} />
                </span>

                <span>
                  Rentocar Host Vehicles Policies
                </span>
              </Link>

              <a
                href="mailto:support@rentocar.app"
                onClick={closeDrawer}
                className="drawer-main-link"
              >
                <span className="drawer-main-icon">
                  <HelpCircle size={20} />
                </span>

                <span>
                  Help & Support
                </span>
              </a>

              <Link
                to="/blogs"
                onClick={handleNavigation}
                className="drawer-main-link"
              >
                <span className="drawer-main-icon">
                  <BookOpen size={20} />
                </span>

                <span>
                  Blogs
                </span>
              </Link>

            </div>

            <div className="drawer-divider" />

            {/* LOGOUT */}

            <div className="drawer-main-menu">

              <button
                type="button"
                className="drawer-main-link drawer-button drawer-logout-row"
                onClick={handleLogout}
              >
                <span className="drawer-main-icon">
                  <LogOut size={20} />
                </span>

                <span>
                  Logout
                </span>
              </button>

            </div>
          </>
        ) : (
          <>
            {/* LOGGED OUT */}

            <div className="drawer-user-area">

              <button
                type="button"
                className="drawer-login"
                onClick={openAuth}
              >
                <span className="drawer-login-icon">
                  <UserRound
                    size={23}
                    strokeWidth={1.9}
                  />
                </span>

                <span className="drawer-login-text">
                  Login or Signup
                </span>

                <ArrowRight
                  size={21}
                  className="drawer-arrow"
                />
              </button>

            </div>

            <div className="drawer-main-menu drawer-main-menu--bordered">

              <button
                type="button"
                className="drawer-main-link drawer-button"
                onClick={handleGoHome}
              >
                <span className="drawer-main-icon">
                  <Home size={20} />
                </span>

                <span>
                  Home
                </span>
              </button>

              <Link
                to="/become-host"
                onClick={handleNavigation}
                className="drawer-main-link"
              >
                <span className="drawer-main-icon host-icon">
                  R
                </span>

                <span>
                  Become a Host
                </span>
              </Link>

              <Link
                to="/company-profile"
                onClick={handleNavigation}
                className="drawer-main-link"
              >
                <span className="drawer-main-icon">
                  <Building2 size={20} />
                </span>

                <span>
                  Company Profile
                </span>
              </Link>

              <button
                type="button"
                className="drawer-main-link drawer-button"
                onClick={handleHowToBook}
              >
                <span className="drawer-main-icon">
                  <HelpCircle size={20} />
                </span>

                <span>
                  How to book?
                </span>
              </button>

              <button
                type="button"
                className="drawer-main-link drawer-button"
                onClick={handleDownloadApp}
              >
                <span className="drawer-main-icon">
                  <AppDownloadIcon size={20} />
                </span>

                <span>
                  Get the App
                </span>
              </button>

            </div>

            {/* INFO MENU */}

            <div className="drawer-info-menu">

              <a
                href="mailto:support@rentocar.app"
                onClick={closeDrawer}
                className="drawer-info-link"
              >
                <HelpCircle size={19} />

                <span>
                  Help & Support
                </span>
              </a>

              <a
                href="tel:+911234567890"
                onClick={closeDrawer}
                className="drawer-info-link"
              >
                <Phone size={19} />

                <span>
                  Contact Us
                </span>
              </a>

              <Link
                to="/my-bookings"
                onClick={handleNavigation}
                className="drawer-info-link"
              >
                <Car size={19} />

                <span>
                  My Bookings
                </span>
              </Link>

            </div>
          </>
        )}
      </aside>

      {/* =====================================================
          AUTH MODAL
      ===================================================== */}

      <AuthModal
        isOpen={authOpen}
        onClose={closeAuth}
      />
    </>
  );
}
