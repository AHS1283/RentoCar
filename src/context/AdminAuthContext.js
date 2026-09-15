import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        setCurrentUser(user);

        if (!user) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        // A user being logged in (even a regular customer, since
        // this app shares one Firebase Auth with the customer
        // signup/login flow) does NOT make them an admin. We only
        // treat them as admin if there is a matching document in
        // the "admins" collection, keyed by their uid.
        try {
          const adminSnap = await getDoc(
            doc(db, "admins", user.uid)
          );

          setIsAdmin(adminSnap.exists());
        } catch (error) {
          setIsAdmin(false);
        } finally {
          setLoading(false);
        }
      }
    );

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const adminSnap = await getDoc(
      doc(db, "admins", userCredential.user.uid)
    );

    if (!adminSnap.exists()) {
      await signOut(auth);
      throw new Error("not-an-admin");
    }

    return userCredential.user;
  };

  const logout = () => signOut(auth);

  const value = {
    currentUser,
    isAdmin,
    loading,
    login,
    logout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {!loading && children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error(
      "useAdminAuth must be used within an AdminAuthProvider"
    );
  }

  return context;
}
