import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    return onSnapshot(collection(db, "bookings"), snap => {
      setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, console.error);
  }, []);

  const setStatus = async (id, status) => {
    try { await updateDoc(doc(db, "bookings", id), { status }); }
    catch (e) { console.error(e); alert("Could not update booking."); }
  };

  const remove = async id => {
    if (!window.confirm("Delete this booking record?")) return;
    try { await deleteDoc(doc(db, "bookings", id)); }
    catch (e) { console.error(e); alert("Could not delete booking."); }
  };

  return (
    <div>
      <style>{`
        .ab-title{font:600 28px "Fraunces",Georgia,serif;margin:0 0 18px}.ab-card{background:#fff;border:1px solid #e5e5df;border-radius:16px;overflow:auto}.ab-table{width:100%;border-collapse:collapse;min-width:760px}.ab-table th,.ab-table td{padding:13px 16px;border-bottom:1px solid #eee;text-align:left;font-size:13px}.ab-table th{font-size:11px;color:#858991;text-transform:uppercase}.ab-select{padding:7px;border:1px solid #ddd;border-radius:7px}.ab-delete{border:0;background:#b6341c;color:#fff;border-radius:7px;padding:7px 9px;cursor:pointer}
      `}</style>
      <h1 className="ab-title">Bookings</h1>
      <div className="ab-card">
        <table className="ab-table">
          <thead><tr><th>Customer</th><th>Car</th><th>Dates</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {bookings.length === 0 ? <tr><td colSpan="6">No bookings found.</td></tr> : bookings.map(b => (
              <tr key={b.id}>
                <td>{b.customerName || b.name || b.email || "—"}</td>
                <td>{b.carName || b.carId || "—"}</td>
                <td>{b.startDate || b.from || "—"} → {b.endDate || b.to || "—"}</td>
                <td>{b.amount || b.total || "—"}</td>
                <td>
                  <select className="ab-select" value={b.status || "pending"} onChange={e => setStatus(b.id, e.target.value)}>
                    <option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="cancelled">Cancelled</option><option value="completed">Completed</option>
                  </select>
                </td>
                <td><button className="ab-delete" onClick={() => remove(b.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
