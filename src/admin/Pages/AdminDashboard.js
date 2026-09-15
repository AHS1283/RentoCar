import React, { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ cars: 0, bookings: 0, users: 0, available: 0 });
  const [recentCars, setRecentCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [carsSnap, bookingsSnap, usersSnap] = await Promise.all([
          getDocs(collection(db, "cars")),
          getDocs(collection(db, "bookings")),
          getDocs(collection(db, "users")),
        ]);

        const cars = carsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setStats({
          cars: cars.length,
          bookings: bookingsSnap.size,
          users: usersSnap.size,
          available: cars.filter(c => c.status !== "booked").length,
        });

        try {
          const recent = await getDocs(
            query(collection(db, "cars"), orderBy("createdAt", "desc"), limit(5))
          );
          setRecentCars(recent.docs.map(d => ({ id: d.id, ...d.data() })));
        } catch {
          setRecentCars(cars.slice(0, 5));
        }
      } catch (error) {
        console.error("Dashboard load failed:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const cards = [
    ["Total Cars", stats.cars],
    ["Available Cars", stats.available],
    ["Bookings", stats.bookings],
    ["Users", stats.users],
  ];

  return (
    <div>
      <style>{`
        .rd-welcome{margin-bottom:24px}.rd-welcome h1{margin:0;font-family:"Fraunces",Georgia,serif;font-size:32px}.rd-welcome p{margin:6px 0 0;color:#777b83;font-size:14px}
        .rd-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px}
        .rd-stat{background:#fff;border:1px solid #e7e7e1;border-radius:16px;padding:20px;box-shadow:0 8px 25px rgba(25,25,20,.04)}
        .rd-stat span{font-size:12px;color:#8b8e95}.rd-stat strong{display:block;font-family:"Fraunces",Georgia,serif;font-size:30px;margin-top:7px}
        .rd-panel{background:#fff;border:1px solid #e7e7e1;border-radius:16px;overflow:hidden}.rd-panel-head{padding:18px 20px;border-bottom:1px solid #ecece7;display:flex;justify-content:space-between;align-items:center}.rd-panel-head h2{margin:0;font-size:16px}
        .rd-table{width:100%;border-collapse:collapse}.rd-table th,.rd-table td{text-align:left;padding:13px 18px;border-bottom:1px solid #efefe9;font-size:13px}.rd-table th{font-size:11px;color:#8a8d94;text-transform:uppercase;letter-spacing:.06em}.rd-car-img{width:48px;height:36px;border-radius:7px;object-fit:cover;background:#eee}.rd-empty{padding:28px;color:#888}
        @media(max-width:900px){.rd-stats{grid-template-columns:repeat(2,1fr)}}@media(max-width:560px){.rd-stats{grid-template-columns:1fr 1fr}.rd-table th:nth-child(3),.rd-table td:nth-child(3){display:none}}
      `}</style>

      <div className="rd-welcome">
        <h1>Welcome back 👋</h1>
        <p>Manage your RentoCar website from one place.</p>
      </div>

      <div className="rd-stats">
        {cards.map(([label, value]) => (
          <div className="rd-stat" key={label}>
            <span>{label}</span>
            <strong>{loading ? "—" : value}</strong>
          </div>
        ))}
      </div>

      <section className="rd-panel">
        <div className="rd-panel-head"><h2>Recent cars</h2></div>
        {recentCars.length === 0 ? (
          <div className="rd-empty">No cars added yet.</div>
        ) : (
          <table className="rd-table">
            <thead><tr><th>Car</th><th>Type</th><th>Fuel</th><th>Price</th></tr></thead>
            <tbody>
              {recentCars.map(car => (
                <tr key={car.id}>
                  <td style={{display:"flex",alignItems:"center",gap:10}}>
                    <img className="rd-car-img" src={car.images?.[0] || car.image || "https://placehold.co/100x70?text=Car"} alt="" />
                    <strong>{car.name || "Unnamed car"}</strong>
                  </td>
                  <td>{car.type || "—"}</td>
                  <td>{car.fuelType || "—"}</td>
                  <td>{car.price || "—"} / day</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
