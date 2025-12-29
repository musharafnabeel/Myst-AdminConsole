import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import LoginEmail from "./components/LoginEmail";
import LoginPassword from "./components/LoginPassword";
import "./components/Login.css";
import loginImg from "./assets/login-image.jpg";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

/* ================= LOGIN PAGE ================= */

function LoginPage() {
  const [stage, setStage] = useState("email");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div className="login-page">
      {/* LEFT IMAGE */}
      <div
        className="login-image"
        style={{ backgroundImage: `url(${loginImg})` }}
      />

      {/* RIGHT CONTENT */}
      <div className="login-right">
        {stage === "email" && (
          <LoginEmail
            onNext={(e) => {
              setEmail(e);
              setStage("password");
            }}
          />
        )}

        {stage === "password" && (
          <LoginPassword
            email={email}
            onBack={() => setStage("email")}
            onSuccess={() => {
              // ✅ save token or flag
              localStorage.setItem("token", "logged-in");

              // ✅ redirect to dashboard
              navigate("/dashboard");
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ================= APP ROOT ================= */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
