import React, { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Business from "../components/Business/Business";
import Layout from "../components/Layout/Layout";
import Login from "../components/Login/Login";
import Inventory from "../components/Inventory/Inventory";
import { AuthContext } from "../providers/AuthProvider";

function useAuth() {
  return useContext(AuthContext);
}

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/business" element={<Business />} />
        <Route path="/inventory" element={
          <RequireAuth>
            <Inventory />
          </RequireAuth>
        } />
      </Route>
    </Routes>
  );
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!Object.entries(auth.user).length) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children;
}

export default RoutesApp;