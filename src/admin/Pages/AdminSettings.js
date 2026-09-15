import React from "react";

export default function AdminSettings() {
  return (
    <div>
      <style>{`
        .as-title{font:600 28px "Fraunces",Georgia,serif;margin:0 0 8px}.as-text{color:#777;font-size:14px}.as-card{background:#fff;border:1px solid #e5e5df;border-radius:16px;padding:22px;margin-top:20px;max-width:700px}.as-row{padding:14px 0;border-bottom:1px solid #eee}.as-row:last-child{border:0}.as-label{font-weight:700;font-size:13px}.as-value{font-size:12px;color:#858991;margin-top:4px}
      `}</style>
      <h1 className="as-title">Settings</h1>
      <p className="as-text">Basic admin settings area. Add your website-specific settings here later.</p>
      <div className="as-card">
        <div className="as-row"><div className="as-label">Cars collection</div><div className="as-value">Firestore: cars</div></div>
        <div className="as-row"><div className="as-label">Bookings collection</div><div className="as-value">Firestore: bookings</div></div>
        <div className="as-row"><div className="as-label">Users collection</div><div className="as-value">Firestore: users</div></div>
        <div className="as-row"><div className="as-label">Images</div><div className="as-value">Firebase Storage: cars/{`{carId}`}/...</div></div>
      </div>
    </div>
  );
}
