import React, { useEffect, useState } from "react";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    return onSnapshot(collection(db, "users"), snap => {
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, console.error);
  }, []);

  const changeRole = async (id, role) => {
    try { await updateDoc(doc(db, "users", id), { role }); }
    catch (e) { console.error(e); alert("Could not update role."); }
  };

  return (
    <div>
      <style>{`
        .au-title{font:600 28px "Fraunces",Georgia,serif;margin:0 0 18px}.au-card{background:#fff;border:1px solid #e5e5df;border-radius:16px;overflow:auto}.au-table{width:100%;border-collapse:collapse;min-width:650px}.au-table th,.au-table td{padding:13px 16px;border-bottom:1px solid #eee;text-align:left;font-size:13px}.au-table th{font-size:11px;color:#858991;text-transform:uppercase}.au-select{padding:7px;border:1px solid #ddd;border-radius:7px}
      `}</style>
      <h1 className="au-title">Users</h1>
      <div className="au-card">
        <table className="au-table">
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th></tr></thead>
          <tbody>
            {users.length === 0 ? <tr><td colSpan="4">No user documents found.</td></tr> : users.map(u => (
              <tr key={u.id}>
                <td>{u.name || "—"}</td><td>{u.email || "—"}</td><td>{u.phone || "—"}</td>
                <td>
                  <select className="au-select" value={u.role || "user"} onChange={e => changeRole(u.id, e.target.value)}>
                    <option value="user">User</option><option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
