import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SocialSidebar from "./components/SocialSidebar";

/* =====================================================
   MAIN WEBSITE PAGES
===================================================== */

import Home from "./pages/Home";
import FeaturedCars from "./components/FeaturedCars";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import BecomeHost from "./pages/BecomeHost";
import Account from "./pages/Account";
import AppDownload from "./pages/AppDownload";

/* =====================================================
   ABOUT / CONTACT PAGES
===================================================== */

import About from "./pages/About";
import Contact from "./pages/Contact";

/* =====================================================
   SUPPORT PAGES
===================================================== */

import FAQPage from "./pages/FAQPage";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";

/* =====================================================
   COMPANY / CORPORATE PAGES
===================================================== */

import CompanyProfile from "./pages/CompanyProfile";
import Financials from "./pages/Financials";
import SecFilings from "./pages/SecFilings";
import NewsEvents from "./pages/NewsEvents";
import Leadership from "./pages/Leadership";

/* =====================================================
   HOMEPAGE SECTIONS
===================================================== */

import StatsSection from "./components/StatsSection";
import ServicesSection from "./components/ServicesSection";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import Reviews from "./components/Reviews";

/* =====================================================
   ADMIN PAGES
===================================================== */

import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/Pages/AdminDashboard";
import AdminCars from "./admin/Pages/AdminCars";
import AdminCarForm from "./admin/Pages/AdminCarForm";
import AdminBookings from "./admin/Pages/AdminBookings";
import AdminUsers from "./admin/Pages/AdminUsers";
import AdminSettings from "./admin/Pages/AdminSettings";

/* =====================================================
   AUTH CONTEXTS
===================================================== */

import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";

import "./App.css";

/* =====================================================
   SCROLL TO TOP ON ROUTE CHANGE
===================================================== */

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

/* =====================================================
   APP CONTENT
===================================================== */

function AppContent() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  /*
    Admin pages use their own layout.

    Navbar and Footer are NOT shown on:
    - /admin/login
    - /admin
    - /admin/cars
    - /admin/cars/new
    - /admin/cars/:id/edit
    - /admin/bookings
    - /admin/users
    - /admin/settings
  */

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {/* =================================================
          SCROLL RESET
      ================================================= */}

      <ScrollToTop />

      {/* =================================================
          GLOBAL NAVBAR
          
          Hidden on admin pages
      ================================================= */}

      {!isAdminPage && <Navbar />}

      {/* =================================================
          GLOBAL SOCIAL SIDEBAR
          
          Hidden on admin pages
      ================================================= */}

      {!isAdminPage && <SocialSidebar />}

      {/* =================================================
          PAGE CONTENT
      ================================================= */}

      <main>
        <Routes>

          {/* =================================================
              PUBLIC WEBSITE
          ================================================= */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/cars"
            element={<Cars />}
          />

          <Route
            path="/cars/:id"
            element={<CarDetails />}
          />

          <Route
            path="/booking/:id"
            element={<Booking />}
          />

          {/* =================================================
              ABOUT / CONTACT
          ================================================= */}

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          {/* =================================================
              USER PAGES
          ================================================= */}

          <Route
            path="/my-bookings"
            element={<MyBookings />}
          />

          <Route
            path="/account"
            element={<Account />}
          />

          {/* =================================================
              HOST
          ================================================= */}

          <Route
            path="/become-host"
            element={<BecomeHost />}
          />

          {/* =================================================
              GET THE APP
          ================================================= */}

          <Route
            path="/get-app"
            element={<AppDownload />}
          />

          {/* =================================================
              SUPPORT PAGES
              
              Footer links:
              /faq
              /terms
              /privacy
              /refund
          ================================================= */}

          <Route
            path="/faq"
            element={<FAQPage />}
          />

          <Route
            path="/terms"
            element={<Terms />}
          />

          <Route
            path="/privacy"
            element={<Privacy />}
          />

          <Route
            path="/refund"
            element={<Refund />}
          />

          {/* =================================================
              COMPANY PROFILE
          ================================================= */}

          <Route
            path="/company-profile"
            element={<CompanyProfile />}
          />

          <Route
            path="/company-profile/financials"
            element={<Financials />}
          />

          <Route
            path="/company-profile/sec-filings"
            element={<SecFilings />}
          />

          <Route
            path="/company-profile/news-events"
            element={<NewsEvents />}
          />

          <Route
            path="/company-profile/leadership"
            element={<Leadership />}
          />

          {/* =================================================
              ADMIN LOGIN
              
              Separate from AdminLayout
          ================================================= */}

          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />

          {/* =================================================
              ADMIN PANEL
              
              AdminLayout contains:
              - Sidebar
              - Navigation
              - Logout
              - Outlet
          ================================================= */}

          <Route
            path="/admin"
            element={<AdminLayout />}
          >

            {/* Dashboard */}

            <Route
              index
              element={<AdminDashboard />}
            />

            {/* Cars */}

            <Route
              path="cars"
              element={<AdminCars />}
            />

            {/* Add New Car */}

            <Route
              path="cars/new"
              element={<AdminCarForm />}
            />

            {/* Edit Car */}

            <Route
              path="cars/:id/edit"
              element={<AdminCarForm />}
            />

            {/* Bookings */}

            <Route
              path="bookings"
              element={<AdminBookings />}
            />

            {/* Users */}

            <Route
              path="users"
              element={<AdminUsers />}
            />

            {/* Settings */}

            <Route
              path="settings"
              element={<AdminSettings />}
            />

          </Route>

        </Routes>

        {/* =================================================
            HOMEPAGE ONLY SECTIONS
        ================================================= */}

        {isHomePage && (
          <>
            <FeaturedCars count={4} />

            <ServicesSection />
            <StatsSection />

            <HowItWorks />

            <FAQ />

            <Reviews />
          </>
        )}
      </main>

      {/* =================================================
          GLOBAL FOOTER
          
          Hidden on admin pages
      ================================================= */}

      {!isAdminPage && <Footer />}
    </>
  );
}

/* =====================================================
   APP
===================================================== */

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminAuthProvider>
          <AppContent />
        </AdminAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
