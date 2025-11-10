import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";


const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/"; // redirect to home or dashboard
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div
      style={{ maxWidth: "300px", margin: "50px auto", textAlign: "center" }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ width: "100%", padding: "8px" }}>
          Log In
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Sign Up button */}
      <p style={{ marginTop: "15px" }}>
        Don’t have an account?{" "}
        <button
          onClick={() => navigate("/signup")}
          style={{
            background: "transparent",
            border: "none",
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;
