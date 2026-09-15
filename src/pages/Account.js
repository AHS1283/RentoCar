
import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";

import "./Account.css";

export default function Account() {
  const auth = useAuth();

  const currentUser = auth?.currentUser || null;

  /*
   * Firebase user doesn't always have displayName.
   * So Guest is the fallback.
   */

  const userName =
    currentUser?.displayName?.trim() || "Guest";

  const phone =
    currentUser?.phoneNumber ||
    "Not available";

  const email =
    currentUser?.email ||
    "Not available";

  const firstLetter =
    userName.charAt(0).toUpperCase();

  return (
    <>
      {/* =================================================
          SEO
      ================================================= */}

      <SEO
        title="My Account | RentoCar"
        description="Manage your RentoCar account, personal details, mobile number and booking information."
        canonical="/account"
        noIndex={true}
      />

      <main className="account-page">

        <div className="account-container">

          {/* =================================================
              LEFT SIDEBAR
          ================================================= */}

          <aside className="account-sidebar">

            {/* PROFILE */}

            <div className="account-profile">

              <div className="account-avatar">
                {firstLetter}
              </div>

              <h2>
                {userName}
              </h2>

              <p>
                {phone}
              </p>

            </div>


            {/* PROFILE STATUS */}

            <div className="account-status">

              <div className="account-status-item error">

                <span className="status-icon">
                  ×
                </span>

                <span>
                  Profile Document
                </span>

              </div>


              <div className="account-status-item success">

                <span className="status-icon">
                  ✓
                </span>

                <span>
                  Mobile Number
                </span>

              </div>

            </div>


            {/* Z POINTS */}

            <div className="account-menu-row">

              <span className="account-menu-icon">
                ◉
              </span>

              <span>
                Z-Points
              </span>

              <strong className="account-menu-green">
                0
              </strong>

            </div>


            {/* CREDITS */}

            <div className="account-menu-row">

              <span className="account-menu-icon">
                ◈
              </span>

              <span>
                Credits
              </span>

              <strong className="account-menu-green">
                ₹ 0
              </strong>

            </div>


            {/* LINKS */}

            <nav className="account-sidebar-nav">

              <Link to="/my-bookings">
                My Bookings
              </Link>

              <button type="button">
                Saved Cards
              </button>

              <Link
                to="/account"
                className="active"
              >
                <span className="active-dot"></span>
                Account
              </Link>

            </nav>

          </aside>


          {/* =================================================
              MAIN ACCOUNT CONTENT
          ================================================= */}

          <section className="account-content">

            {/* HEADER */}

            <div className="account-header">
              MY ACCOUNT
            </div>


            {/* ACCOUNT DETAILS */}

            <div className="account-section">

              <h3>
                Account Details
              </h3>

              <div className="account-divider"></div>


              <div className="account-field-row">

                <div className="account-field-label">
                  Mobile *
                </div>

                <div className="account-field-value">

                  <input
                    type="text"
                    value={phone}
                    readOnly
                  />

                </div>

              </div>

            </div>


            {/* PERSONAL DETAILS */}

            <div className="account-section">

              <h3>
                Personal Details
              </h3>

              <div className="account-divider"></div>


              <div className="personal-grid">

                {/* NAME */}

                <div className="personal-field">

                  <span>
                    Name *
                  </span>

                  <strong>
                    {userName}
                  </strong>

                </div>


                {/* EMAIL */}

                <div className="personal-field">

                  <span>
                    Email
                  </span>

                  <strong>
                    {email}
                  </strong>

                </div>


                {/* GENDER */}

                <div className="personal-field">

                  <span>
                    Gender
                  </span>

                  <input
                    type="text"
                    value="Not specified"
                    readOnly
                  />

                </div>

              </div>

            </div>


            {/* SECURITY / ACCOUNT INFO */}

            <div className="account-info-card">

              <div className="account-info-icon">
                ✓
              </div>

              <div>

                <strong>
                  Account verified
                </strong>

                <p>
                  Your mobile number is connected
                  to your RentoCar account.
                </p>

              </div>

            </div>


            {/* MOBILE BACK */}

            <Link
              to="/"
              className="account-back-button"
            >
              ← Back to Home
            </Link>

          </section>

        </div>

      </main>
    </>
  );
}

