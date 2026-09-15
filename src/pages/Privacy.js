import React from "react";
import { Link } from "react-router-dom";
import "./Privacy.css";

export default function Privacy() {
  return (
    <main className="privacy-page">
      <section className="privacy-hero">
        <div className="privacy-hero-content">
          <span className="privacy-eyebrow">RENTOCAR PRIVACY</span>

          <h1>Privacy Policy</h1>

          <p>
            Learn how RentoCar collects, uses and protects information when
            you use our website and rental services.
          </p>

          <div className="privacy-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </section>

      <section className="privacy-content">
        <div className="privacy-container">
          <div className="privacy-intro">
            <span className="privacy-label">YOUR PRIVACY MATTERS</span>

            <h2>
              We believe in responsible handling of your information.
            </h2>

            <p>
              This Privacy Policy explains the general ways information may
              be collected and used when customers interact with RentoCar,
              make a booking or contact our support team.
            </p>
          </div>

          <article className="privacy-card">
            <section>
              <h3>1. Information We May Collect</h3>
              <p>
                Depending on how you use our services, we may collect
                information necessary to provide rental and support services.
              </p>

              <ul>
                <li>Name and contact information</li>
                <li>Mobile number and email address</li>
                <li>Booking and rental information</li>
                <li>Vehicle and pickup preferences</li>
                <li>Information required for customer verification</li>
                <li>Communication and support details</li>
              </ul>
            </section>

            <section>
              <h3>2. How We Use Information</h3>
              <p>
                Information may be used to process bookings, communicate with
                customers, provide support, improve our services and maintain
                the security of the platform.
              </p>
            </section>

            <section>
              <h3>3. Booking Information</h3>
              <p>
                When you make a rental booking, information associated with
                that booking may be used to manage your reservation, vehicle
                pickup, return process and customer support.
              </p>
            </section>

            <section>
              <h3>4. Communication</h3>
              <p>
                RentoCar may use your contact information to send important
                booking-related communications, service updates, support
                messages and other information relevant to your interaction
                with the service.
              </p>
            </section>

            <section>
              <h3>5. Payment Information</h3>
              <p>
                Payment transactions may be processed through applicable
                payment service providers. Customers should provide payment
                information only through the designated secure payment
                process.
              </p>
            </section>

            <section>
              <h3>6. Cookies and Website Data</h3>
              <p>
                Our website may use cookies or similar technologies to support
                website functionality, understand usage patterns and improve
                the user experience.
              </p>
            </section>

            <section>
              <h3>7. Data Security</h3>
              <p>
                RentoCar takes reasonable measures to protect information
                against unauthorized access, misuse or disclosure. However,
                no internet-based system can be guaranteed to be completely
                secure.
              </p>
            </section>

            <section>
              <h3>8. Sharing of Information</h3>
              <p>
                Information may be shared with service providers or other
                parties when reasonably necessary to provide rental services,
                process transactions, maintain the platform, comply with
                applicable requirements or protect the rights and safety of
                users and the service.
              </p>
            </section>

            <section>
              <h3>9. Third-Party Services</h3>
              <p>
                RentoCar may use third-party services for functions such as
                payments, hosting, analytics, communications or other
                operational requirements. Those services may have their own
                privacy practices and policies.
              </p>
            </section>

            <section>
              <h3>10. Your Choices</h3>
              <p>
                You may contact RentoCar regarding questions about information
                associated with your account or booking. Certain information
                may need to be retained where required for operational,
                contractual, legal or security purposes.
              </p>
            </section>

            <section>
              <h3>11. Policy Updates</h3>
              <p>
                This Privacy Policy may be updated periodically. Changes will
                be reflected on this page so users can review the current
                policy.
              </p>
            </section>

            <section>
              <h3>12. Contact RentoCar</h3>
              <p>
                For privacy-related questions or concerns, contact our
                support team.
              </p>

              <div className="privacy-contact">
                <strong>RentoCar Support</strong>
                <span>support@rentocarpune.com</span>
                <span>+91 7020148417</span>
                <span>Pune, Maharashtra, India</span>
              </div>
            </section>
          </article>

          <div className="privacy-navigation">
            <Link to="/terms">← Terms & Conditions</Link>
            <Link to="/refund">Cancellation & Refund →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}