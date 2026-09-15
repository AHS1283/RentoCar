import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminCars() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "cars"), orderBy("createdAt", "desc"));
    return onSnapshot(q, snap => {
      setCars(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, error => console.error("Cars listener failed:", error));
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return cars;
    return cars.filter(c =>
      [c.name, c.type, c.fuelType].filter(Boolean).join(" ").toLowerCase().includes(term)
    );
  }, [cars, search]);

  const removeCar = async (car) => {
    if (!window.confirm(`Delete "${car.name}"? This cannot be undone.`)) return;
    try {
      setDeleting(car.id);
      await deleteDoc(doc(db, "cars", car.id));
    } catch (e) {
      console.error(e);
      alert("Could not delete this car.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <style>{`
        .rd-head{display:flex;justify-content:space-between;align-items:center;gap:15px;margin-bottom:20px;flex-wrap:wrap}.rd-head h1{margin:0;font-family:"Fraunces",Georgia,serif;font-size:28px}
        .rd-primary{display:inline-flex;text-decoration:none;border:0;border-radius:9px;background:#f2a93b;color:#3d290c;padding:11px 16px;font-weight:700;font-size:13px;cursor:pointer}.rd-primary:hover{background:#d88f1f;color:#fff}
        .rd-search{width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid #deded8;border-radius:10px;background:#fff;outline:none;margin-bottom:16px}.rd-search:focus{border-color:#f2a93b}
        .rd-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(245px,1fr));gap:16px}.rd-car{background:#fff;border:1px solid #e6e6df;border-radius:15px;overflow:hidden}.rd-car-img2{width:100%;height:155px;object-fit:cover;background:#eee}.rd-car-body{padding:15px}.rd-car-name{font-family:"Fraunces",Georgia,serif;font-size:18px;font-weight:600}.rd-meta{font-size:12px;color:#858991;margin-top:5px}.rd-price{font-size:14px;font-weight:700;color:#c47c11;margin-top:8px}.rd-actions{display:flex;gap:8px;margin-top:13px}.rd-actions a,.rd-actions button{flex:1;text-align:center;text-decoration:none;padding:9px;border-radius:8px;border:1px solid #ddd;background:#fff;color:#202329;font-weight:600;font-size:12px;cursor:pointer}.rd-actions a:hover{background:#202329;color:#fff}.rd-actions .danger:hover{background:#b6341c;border-color:#b6341c;color:#fff}
      `}</style>

      <div className="rd-head">
        <h1>Cars</h1>
        <Link className="rd-primary" to="/admin/cars/new">+ Add new car</Link>
      </div>

      <input
        className="rd-search"
        placeholder="Search by car name, type or fuel..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <div className="rd-car" style={{padding:30,textAlign:"center",color:"#888"}}>
          {cars.length ? "No cars match your search." : "No cars yet. Add your first car."}
        </div>
      ) : (
        <div className="rd-grid">
          {filtered.map(car => (
            <article className="rd-car" key={car.id}>
              <img className="rd-car-img2" src={car.images?.[0] || car.image || "https://placehold.co/500x320?text=No+Image"} alt={car.name || "Car"} />
              <div className="rd-car-body">
                <div className="rd-car-name">{car.name || "Unnamed car"}</div>
                <div className="rd-meta">
                  {car.type || "—"} · {car.fuelType || "—"} · {car.seats || "—"} seats
                </div>
                <div className="rd-price">{car.price || "—"} / day</div>
                <div className="rd-actions">
                  <Link to={`/admin/cars/${car.id}/edit`}>Edit</Link>
                  <button className="danger" disabled={deleting === car.id} onClick={() => removeCar(car)}>
                    {deleting === car.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
