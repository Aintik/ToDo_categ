import axios from "axios";
import { useState } from "react";
const API = "https://todo-categ.onrender.com";


const Signup = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/users/signup`, form);
    alert("Signup successful!");
    window.location.href = "/login";
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};
export default Signup;
