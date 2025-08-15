import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/onboarding");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <input name="name" onChange={handleChange} placeholder="Name" />
      </div>
      <div className="form-row">
        <input name="email" onChange={handleChange} placeholder="Email" type="email" />
      </div>
      <div className="form-row">
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
        />
      </div>
      <button
        className="w-full flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
        type="submit"
      >
        Register
      </button>
      {error && <p style={{color:'red', marginTop:20, fontStyle:'italic', textAlign:'center', fontWeight:'bold'}}>{error}</p>}
    </form>
  );
};

export default Register;
