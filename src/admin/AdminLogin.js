import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setError("");
    if (!email || !password) return setError("Please enter email and password.");

    try {
      setSubmitting(true);
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err?.message === "not-an-admin"
        ? "This account doesn't have admin access."
        : "Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="rd-login">
      <style>{`
        .rd-login{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f7f7f3;padding:20px;font-family:"Work Sans",Arial,sans-serif}.rd-login-card{width:100%;max-width:390px;background:#fff;border:1px solid #e5e5df;border-radius:20px;padding:34px;box-shadow:0 24px 55px rgba(20,15,5,.09);box-sizing:border-box}.rd-kicker{font-size:13px;color:#d88f1f;font-style:italic;font-weight:600}.rd-login h1{font:600 30px "Fraunces",Georgia,serif;margin:7px 0 25px}.rd-login-field{margin-bottom:16px}.rd-login-field label{display:block;font-size:12px;font-weight:700;color:#63656c;margin-bottom:6px}.rd-login-field input{width:100%;box-sizing:border-box;padding:12px 13px;border:1px solid #ddd;border-radius:9px;outline:none}.rd-login-field input:focus{border-color:#f2a93b}.rd-login-error{padding:10px 12px;border-radius:8px;background:#fff0ed;color:#b6341c;font-size:13px;margin-bottom:15px}.rd-login-btn{width:100%;padding:13px;border:0;border-radius:10px;background:#f2a93b;color:#4a3210;font-weight:700;cursor:pointer}.rd-login-btn:disabled{opacity:.6}
      `}</style>
      <div className="rd-login-card">
        <span className="rd-kicker">RentoCar admin</span>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div className="rd-login-field"><label>Email</label><input type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} /></div>
          <div className="rd-login-field"><label>Password</label><input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} /></div>
          {error && <div className="rd-login-error">{error}</div>}
          <button className="rd-login-btn" disabled={submitting}>{submitting ? "Signing in..." : "Sign in"}</button>
        </form>
      </div>
    </main>
  );
}
