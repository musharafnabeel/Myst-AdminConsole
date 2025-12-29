import { useState } from "react";
import { encryptData } from "../lib/encryptData"; // adjust path
import "./Login.css";

export default function LoginPassword({ email, onBack, onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        username: encryptData(email),
        password: encryptData(password),
        roles: ["R1"],
      };

      const response = await fetch(
        "https://beanstalk.myskillstree.com/skill/api/v1/skills/encrypt/role/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok || data.status === "failure") {
        setError(data.message || "Incorrect password");
        return;
      }

      // ✅ store token if present
      if (data.authenticationtoken) {
        localStorage.setItem("token", data.authenticationtoken);
      }

      onSuccess(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-card">
      <h2>Enter password</h2>
      <p className="muted">
        Signing in as <strong>{email}</strong>
      </p>

      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Password
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </label>

        {error && <div className="error">{error}</div>}

        <div className="actions">
          <button
            type="button"
            className="secondary"
            onClick={onBack}
            disabled={loading}
          >
            Back
          </button>

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
    </div>
  );
}
