import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";

const carTypes = ["Premium MPV","SUV","Off-Road SUV","Compact SUV","Hatchback","Sedan"];
const fuelTypes = ["Petrol","Diesel","Electric","CNG","Hybrid"];

const emptyForm = {
  name: "", type: carTypes[0], price: "", fuelType: fuelTypes[0],
  seats: "", description: "", status: "active"
};

export default function AdminCarForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = Boolean(id);

  const [form, setForm] = useState(emptyForm);
  const [existingImages, setExistingImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!editing) return;
    getDoc(doc(db, "cars", id)).then(snap => {
      if (!snap.exists()) {
        setError("Car not found.");
        setLoading(false);
        return;
      }
      const d = snap.data();
      setForm({
        name: d.name || "",
        type: d.type || carTypes[0],
        price: d.price || "",
        fuelType: d.fuelType || fuelTypes[0],
        seats: d.seats || "",
        description: d.description || "",
        status: d.status || "active"
      });
      setExistingImages(d.images || (d.image ? [d.image] : []));
      setBookedDates(d.bookedDates || []);
      setLoading(false);
    }).catch(() => {
      setError("Could not load car.");
      setLoading(false);
    });
  }, [id, editing]);

  useEffect(() => () => previews.forEach(URL.revokeObjectURL), [previews]);

  const change = field => e => setForm(p => ({ ...p, [field]: e.target.value }));

  const selectImages = e => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setNewFiles(p => [...p, ...files]);
    setPreviews(p => [...p, ...files.map(f => URL.createObjectURL(f))]);
    e.target.value = "";
  };

  const removeExisting = async index => {
    const url = existingImages[index];
    setExistingImages(p => p.filter((_, i) => i !== index));
    // Firestore list is updated on Save. Storage deletion is attempted immediately.
    try {
      if (url?.includes("firebasestorage.googleapis.com")) {
        await deleteObject(ref(storage, url));
      }
    } catch (e) {
      // Storage deletion can fail when the URL format/rules do not permit it.
      console.warn("Storage image delete skipped:", e);
    }
  };

  const removeNew = index => {
    setNewFiles(p => p.filter((_, i) => i !== index));
    setPreviews(p => p.filter((_, i) => i !== index));
  };

  const addDate = () => {
    if (!date || bookedDates.includes(date)) return;
    setBookedDates(p => [...p, date].sort());
    setDate("");
  };

  const uploadImages = async () => {
    return Promise.all(newFiles.map(async file => {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const storageRef = ref(storage, `cars/${editing ? id : "new"}/${Date.now()}-${safeName}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    }));
  };

  const submit = async e => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.price.trim()) {
      setError("Car name and price are required.");
      return;
    }

    try {
      setSaving(true);
      let carId = id;

      if (!editing) {
        const created = await addDoc(collection(db, "cars"), {
          ...form,
          images: [],
          bookedDates,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        carId = created.id;
      }

      const uploaded = newFiles.length ? await Promise.all(newFiles.map(async file => {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const storageRef = ref(storage, `cars/${carId}/${Date.now()}-${safeName}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
      })) : [];

      const payload = {
        ...form,
        price: form.price.trim(),
        seats: form.seats ? Number(form.seats) : "",
        images: [...existingImages, ...uploaded],
        bookedDates,
        updatedAt: serverTimestamp()
      };

      await updateDoc(doc(db, "cars", carId), payload);
      navigate("/admin/cars");
    } catch (e) {
      console.error("Save car failed:", e);
      setError(e?.message || "Could not save the car. Check Firebase rules.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading car...</div>;

  return (
    <div>
      <style>{`
        .acf-title{font-family:"Fraunces",Georgia,serif;font-size:28px;margin:0 0 18px}
        .acf-card{background:#fff;border:1px solid #e5e5df;border-radius:16px;padding:24px;max-width:900px}
        .acf-row{display:grid;grid-template-columns:1fr 1fr;gap:15px}.acf-field{margin-bottom:16px}.acf-field label{display:block;font-size:12px;font-weight:700;color:#666a72;margin-bottom:6px}
        .acf-field input,.acf-field select,.acf-field textarea{width:100%;box-sizing:border-box;padding:11px 12px;border:1px solid #deded8;border-radius:9px;background:#fff;font:inherit;outline:none}.acf-field textarea{min-height:105px;resize:vertical}.acf-field input:focus,.acf-field select:focus,.acf-field textarea:focus{border-color:#f2a93b}
        .acf-images{display:grid;grid-template-columns:repeat(auto-fill,minmax(105px,1fr));gap:10px;margin-bottom:12px}.acf-img{height:100px;border-radius:10px;overflow:hidden;border:1px solid #ddd;position:relative}.acf-img img{width:100%;height:100%;object-fit:cover}.acf-x{position:absolute;right:5px;top:5px;border:0;border-radius:50%;width:23px;height:23px;background:rgba(0,0,0,.7);color:#fff;cursor:pointer}
        .acf-upload{border:1.5px dashed #d2d2cb;border-radius:11px;padding:18px;text-align:center;color:#777;font-size:13px;cursor:pointer;margin-bottom:20px}.acf-upload input{display:none}
        .acf-dates{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:9px}.acf-chip{background:#f3f0e8;border-radius:999px;padding:6px 10px;font-size:12px}.acf-chip button{border:0;background:none;cursor:pointer;margin-left:5px}.acf-date-add{display:flex;gap:8px}.acf-date-add input{flex:1}.acf-date-add button,.acf-actions button{padding:10px 15px;border-radius:9px;border:1px solid #ddd;background:#fff;font-weight:700;cursor:pointer}
        .acf-error{padding:11px;border-radius:9px;background:#fff0ed;color:#a52d1c;font-size:13px;margin-bottom:15px}.acf-actions{display:flex;gap:9px;margin-top:22px}.acf-save{background:#f2a93b!important;border-color:#f2a93b!important;color:#3d290c}.acf-save:disabled{opacity:.6;cursor:not-allowed}
        @media(max-width:600px){.acf-card{padding:16px}.acf-row{grid-template-columns:1fr}.acf-actions{flex-direction:column}}
      `}</style>

      <h1 className="acf-title">{editing ? "Edit car" : "Add new car"}</h1>

      <form className="acf-card" onSubmit={submit}>
        {error && <div className="acf-error">{error}</div>}

        <div className="acf-field">
          <label>Car name *</label>
          <input value={form.name} onChange={change("name")} placeholder="e.g. Toyota Innova" />
        </div>

        <div className="acf-row">
          <div className="acf-field"><label>Type</label><select value={form.type} onChange={change("type")}>{carTypes.map(x => <option key={x}>{x}</option>)}</select></div>
          <div className="acf-field"><label>Fuel type</label><select value={form.fuelType} onChange={change("fuelType")}>{fuelTypes.map(x => <option key={x}>{x}</option>)}</select></div>
        </div>

        <div className="acf-row">
          <div className="acf-field"><label>Price per day *</label><input value={form.price} onChange={change("price")} placeholder="₹1,999" /></div>
          <div className="acf-field"><label>Seats</label><input type="number" min="1" value={form.seats} onChange={change("seats")} placeholder="5" /></div>
        </div>

        <div className="acf-field">
          <label>Status</label>
          <select value={form.status} onChange={change("status")}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="booked">Booked</option>
          </select>
        </div>

        <div className="acf-field">
          <label>Description</label>
          <textarea value={form.description} onChange={change("description")} placeholder="Short description shown on the car detail page" />
        </div>

        <div className="acf-field">
          <label>Car images</label>
          <div className="acf-images">
            {existingImages.map((url, i) => (
              <div className="acf-img" key={`${url}-${i}`}>
                <img src={url} alt="" />
                <button type="button" className="acf-x" onClick={() => removeExisting(i)}>×</button>
              </div>
            ))}
            {previews.map((url, i) => (
              <div className="acf-img" key={url}>
                <img src={url} alt="" />
                <button type="button" className="acf-x" onClick={() => removeNew(i)}>×</button>
              </div>
            ))}
          </div>

          <label className="acf-upload">
            + Upload one or multiple images
            <input type="file" accept="image/*" multiple onChange={selectImages} />
          </label>
        </div>

        <div className="acf-field">
          <label>Booked dates</label>
          <div className="acf-dates">
            {bookedDates.map(d => (
              <span className="acf-chip" key={d}>
                {d}
                <button type="button" onClick={() => setBookedDates(p => p.filter(x => x !== d))}>×</button>
              </span>
            ))}
          </div>
          <div className="acf-date-add">
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            <button type="button" onClick={addDate}>Add date</button>
          </div>
        </div>

        <div className="acf-actions">
          <button type="button" onClick={() => navigate("/admin/cars")}>Cancel</button>
          <button className="acf-save" type="submit" disabled={saving}>
            {saving ? "Saving..." : editing ? "Save changes" : "Add car"}
          </button>
        </div>
      </form>
    </div>
  );
}
