import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser, isAdmin } = useAdminAuth();

  if (!currentUser || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
