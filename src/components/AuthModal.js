
import React, { useEffect, useRef, useState } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase";
import "./AuthModal.css";

export default function AuthModal({ isOpen, onClose }) {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const confirmationResultRef = useRef(null);
  const recaptchaRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setStep("phone");
      setPhone("");
      setOtp("");
      setError("");
      setSuccess("");
      confirmationResultRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (recaptchaRef.current) {
        try {
          recaptchaRef.current.clear();
        } catch (error) {
          console.log("reCAPTCHA cleanup error:", error);
        }

        recaptchaRef.current = null;
      }
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  // =====================================================
  // SETUP RECAPTCHA
  // =====================================================

  const setupRecaptcha = () => {
    if (recaptchaRef.current) {
      return recaptchaRef.current;
    }

    recaptchaRef.current = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",

        callback: () => {
          console.log("reCAPTCHA verified");
        },

        "expired-callback": () => {
          setError(
            "Security verification expired. Please try again."
          );
        },
      }
    );

    return recaptchaRef.current;
  };

  // =====================================================
  // PHONE INPUT
  // =====================================================

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setPhone(value);
    }
  };

  // =====================================================
  // OTP INPUT
  // =====================================================

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 6) {
      setOtp(value);
    }
  };

  // =====================================================
  // SEND OTP
  // =====================================================

  const handleSendOTP = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (phone.length !== 10) {
      setError(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    setLoading(true);

    try {
      const appVerifier = setupRecaptcha();

      const phoneNumber = `+91${phone}`;

      const confirmationResult =
        await signInWithPhoneNumber(
          auth,
          phoneNumber,
          appVerifier
        );

      confirmationResultRef.current =
        confirmationResult;

      setStep("otp");

      setSuccess(
        `OTP sent to +91 ${phone}`
      );
    } catch (error) {
      console.error("OTP error:", error);

      if (recaptchaRef.current) {
        try {
          recaptchaRef.current.clear();
        } catch (err) {
          console.log(
            "reCAPTCHA reset error:",
            err
          );
        }

        recaptchaRef.current = null;
      }

      switch (error.code) {
        case "auth/invalid-phone-number":
          setError(
            "Please enter a valid mobile number."
          );
          break;

        case "auth/too-many-requests":
          setError(
            "Too many requests. Please try again later."
          );
          break;

        case "auth/quota-exceeded":
          setError(
            "SMS limit exceeded. Please try again later."
          );
          break;

        case "auth/captcha-check-failed":
          setError(
            "Security verification failed. Please try again."
          );
          break;

        case "auth/billing-not-enabled":
          setError(
            "Phone sign-in is temporarily unavailable. Please try again later."
          );
          break;

        case "auth/network-request-failed":
          setError(
            "Network error. Please check your internet connection."
          );
          break;

        default:
          setError(
            "Unable to send OTP. Please try again."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // VERIFY OTP
  // =====================================================

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (otp.length !== 6) {
      setError(
        "Please enter the 6-digit OTP."
      );
      return;
    }

    if (!confirmationResultRef.current) {
      setError(
        "Your OTP session has expired. Please request a new OTP."
      );
      return;
    }

    setLoading(true);

    try {
      // =================================================
      // CONFIRM OTP
      // =================================================

      const result =
        await confirmationResultRef.current.confirm(
          otp
        );

      const user = result.user;

      // =================================================
      // USER DOCUMENT
      // =================================================

      const userRef = doc(
        db,
        "users",
        user.uid
      );

      // Check whether user already exists
      const userSnapshot =
        await getDoc(userRef);

      // =================================================
      // FIRST TIME USER
      // =================================================

      if (!userSnapshot.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          phoneNumber: user.phoneNumber,

          // Created only once
          createdAt: serverTimestamp(),

          // First login
          lastLogin: serverTimestamp(),
        });
      }

      // =================================================
      // EXISTING USER
      // =================================================

      else {
        await setDoc(
          userRef,
          {
            uid: user.uid,
            phoneNumber: user.phoneNumber,

            // Update only login time
            lastLogin: serverTimestamp(),
          },
          {
            merge: true,
          }
        );
      }

      // =================================================
      // SUCCESS
      // =================================================

      setSuccess(
        "Welcome to Rentocar!"
      );

      setTimeout(() => {
        onClose();
      }, 900);
    } catch (error) {
      console.error(
        "OTP verification error:",
        error
      );

      switch (error.code) {
        case "auth/invalid-verification-code":
          setError(
            "The OTP you entered is incorrect."
          );
          break;

        case "auth/code-expired":
          setError(
            "This OTP has expired. Please request a new one."
          );
          break;

        default:
          setError(
            "Unable to verify OTP. Please try again."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // BACK
  // =====================================================

  const handleBack = () => {
    setStep("phone");
    setOtp("");
    setError("");
    setSuccess("");
  };

  // =====================================================
  // CLOSE
  // =====================================================

  const handleClose = () => {
    setError("");
    setSuccess("");
    setOtp("");
    setPhone("");

    if (recaptchaRef.current) {
      try {
        recaptchaRef.current.clear();
      } catch (error) {
        console.log(
          "reCAPTCHA close error:",
          error
        );
      }

      recaptchaRef.current = null;
    }

    onClose();
  };

  // =====================================================
  // JSX
  // =====================================================

  return (
    <div
      className="rd-auth-overlay"
      onMouseDown={handleClose}
    >
      <div
        className="rd-auth-modal"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >
        {/* CLOSE */}

        <button
          className="rd-auth-close"
          onClick={handleClose}
          type="button"
          aria-label="Close login"
        >
          ×
        </button>

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="rd-auth-left">

          <div className="rd-auth-brand">
            <div className="rd-brand-icon">
              R
            </div>

            <span>
              RentoCar
            </span>
          </div>

          <div className="rd-auth-left-content">

            <span className="rd-auth-label">
              SELF-DRIVE RENTALS
            </span>

            <h2>
              Drive more.
              <br />
              <span>
                Worry less.
              </span>
            </h2>

            <p>
              Your next adventure is just a
              few clicks away. Choose your car,
              hit the road and enjoy the journey.
            </p>

            <div className="rd-auth-features">

              <div className="rd-feature">
                <span>✓</span>
                <p>
                  Verified rental cars
                </p>
              </div>

              <div className="rd-feature">
                <span>✓</span>
                <p>
                  Flexible self-drive bookings
                </p>
              </div>

              <div className="rd-feature">
                <span>✓</span>
                <p>
                  Simple & secure payments
                </p>
              </div>

            </div>
          </div>

          <div className="rd-auth-circle circle-one"></div>

          <div className="rd-auth-circle circle-two"></div>

          <div className="rd-car-shape">
            🚗
          </div>

        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="rd-auth-right">

          {step === "phone" ? (
            <>

              <div className="rd-auth-heading">

                <span>
                  Welcome to Rentocar
                </span>

                <h1>
                  Login or Sign Up
                </h1>

                <p>
                  Enter your mobile number
                  to continue.
                </p>

              </div>

              <form
                onSubmit={handleSendOTP}
              >

                <label className="rd-input-label">
                  Mobile number
                </label>

                <div className="rd-phone-box">

                  <div className="rd-country">
                    <span>🇮🇳</span>

                    <strong>
                      +91
                    </strong>
                  </div>

                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="Enter mobile number"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={10}
                    autoComplete="tel"
                  />

                </div>

                {error && (
                  <div className="rd-auth-error">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="rd-auth-success">
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  className="rd-auth-button"
                  disabled={
                    loading ||
                    phone.length !== 10
                  }
                >
                  {loading ? (
                    <>
                      <span className="rd-spinner"></span>
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      Continue
                      <span>→</span>
                    </>
                  )}
                </button>

              </form>

              <div
                id="recaptcha-container"
                className="rd-recaptcha"
              />

              <div className="rd-secure">

                <span>🔒</span>

                <div>
                  <strong>
                    Secure login
                  </strong>

                  <p>
                    Your number is protected
                    with Firebase authentication.
                  </p>
                </div>

              </div>

              <p className="rd-terms">
                By continuing, you agree to our{" "}
                <a href="/privacy">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="/terms">
                  Terms of Use
                </a>
                .
              </p>

            </>
          ) : (
            <>

              <button
                type="button"
                className="rd-back"
                onClick={handleBack}
              >
                ← Change mobile number
              </button>

              <div className="rd-auth-heading">

                <span>
                  Almost there
                </span>

                <h1>
                  Verify your number
                </h1>

                <p>
                  Enter the OTP sent to
                  <br />

                  <strong>
                    +91 {phone}
                  </strong>
                </p>

              </div>

              <form
                onSubmit={handleVerifyOTP}
              >

                <label className="rd-input-label">
                  One-time password
                </label>

                <input
                  className="rd-otp"
                  type="text"
                  inputMode="numeric"
                  placeholder="• • • • • •"
                  value={otp}
                  onChange={handleOtpChange}
                  maxLength={6}
                  autoComplete="one-time-code"
                  autoFocus
                />

                {error && (
                  <div className="rd-auth-error">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="rd-auth-success">
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  className="rd-auth-button"
                  disabled={
                    loading ||
                    otp.length !== 6
                  }
                >
                  {loading ? (
                    <>
                      <span className="rd-spinner"></span>
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify & Continue
                      <span>→</span>
                    </>
                  )}
                </button>

              </form>

              <button
                type="button"
                className="rd-resend"
                onClick={handleBack}
              >
                Didn't receive the OTP?
                <span>
                  {" "}Try again
                </span>
              </button>

            </>
          )}

        </div>

      </div>
    </div>
  );
}

