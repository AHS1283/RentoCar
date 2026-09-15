import React, { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, currentUser } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const links = [
    { to: "/admin", label: "Dashboard", end: true },
    { to: "/admin/cars", label: "Cars" },
    { to: "/admin/cars/new", label: "Add car" },
    { to: "/admin/bookings", label: "Bookings" },
    { to: "/admin/users", label: "Users" },
    { to: "/admin/settings", label: "Settings" },
  ];

  return (
    <div className="rd-admin-shell">
      <style>{`
        .rd-admin-shell{min-height:100vh;background:#f7f7f3;color:#1d2025;font-family:"Work Sans",Arial,sans-serif;display:flex}
        .rd-sidebar{width:250px;flex-shrink:0;background:#17191d;color:#fff;padding:22px 16px;display:flex;flex-direction:column;position:sticky;top:0;height:100vh;box-sizing:border-box}
        .rd-logo{font-family:"Fraunces",Georgia,serif;font-size:23px;font-style:italic;font-weight:700;padding:0 10px}
        .rd-logo small{display:block;font-family:"Work Sans",Arial,sans-serif;font-size:10px;font-style:normal;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#aeb2ba;margin-top:4px}
        .rd-nav{margin-top:30px;display:flex;flex-direction:column;gap:5px}
        .rd-nav a{color:#b8bbc2;text-decoration:none;padding:12px 13px;border-radius:10px;font-size:14px;font-weight:600;transition:.18s}
        .rd-nav a:hover{background:#24272d;color:#fff}
        .rd-nav a.active{background:#f2a93b;color:#39270c}
        .rd-side-bottom{margin-top:auto;border-top:1px solid #30333a;padding:16px 8px 0}
        .rd-email{display:block;color:#9ea2ab;font-size:11px;line-height:1.4;word-break:break-all;margin-bottom:11px}
        .rd-logout{width:100%;border:1px solid #3a3d44;background:transparent;color:#fff;border-radius:9px;padding:10px;cursor:pointer;font-weight:600}
        .rd-logout:hover{background:#fff;color:#17191d}
        .rd-main{flex:1;min-width:0}
        .rd-topbar{height:68px;background:#fff;border-bottom:1px solid #e8e8e2;display:flex;align-items:center;justify-content:space-between;padding:0 30px;box-sizing:border-box}
        .rd-page-title{font-family:"Fraunces",Georgia,serif;font-size:20px;font-weight:600}
        .rd-user{font-size:12px;color:#737780}
        .rd-content{padding:30px;max-width:1500px;margin:0 auto}
        .rd-mobile-menu{display:none}
        @media(max-width:800px){
          .rd-sidebar{position:fixed;z-index:50;left:0;top:0;transform:translateX(-105%);transition:.22s;width:260px}
          .rd-sidebar.open{transform:translateX(0)}
          .rd-mobile-menu{display:inline-flex;border:0;background:transparent;font-size:22px;cursor:pointer}
          .rd-topbar{padding:0 16px}
          .rd-content{padding:18px 14px}
        }
      `}</style>

      <aside className={`rd-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="rd-logo">
          RentoCar
          <small>Admin panel</small>
        </div>

        <nav className="rd-nav">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="rd-side-bottom">
          {currentUser?.email && <span className="rd-email">{currentUser.email}</span>}
          <button className="rd-logout" onClick={handleLogout}>Log out</button>
        </div>
      </aside>

      <section className="rd-main">
        <header className="rd-topbar">
          <button className="rd-mobile-menu" onClick={() => setMobileOpen(v => !v)} aria-label="Open menu">
            ☰
          </button>
          <div className="rd-page-title">
            {location.pathname === "/admin" ? "Dashboard" : "RentoCar Admin"}
          </div>
          <div className="rd-user">{currentUser?.email || "Administrator"}</div>
        </header>

        <div className="rd-content">
          <Outlet />
        </div>
      </section>
    </div>
  );
}
