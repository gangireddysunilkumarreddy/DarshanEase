import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {
    setLoading(true);

    try {
      await axios.post("http://localhost:8000/api/users/register", formData);

      setLoading(false);

      alert("Registration Successful");

      navigate("/");
    } catch (err) {
      setLoading(false);
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">

        <h1>🪔 DarshanEase</h1>

        <p className="subtitle">
          Create Your Account
        </p>

        <input
          type="text"
          name="name"
          placeholder="👤 Full Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="📧 Email"
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="📱 Phone Number"
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="📍 Address"
          onChange={handleChange}
        />

        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="🔒 Password"
          onChange={handleChange}
        />

        <p
          className="show-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "🙈 Hide Password" : "👁 Show Password"}
        </p>

        <button onClick={registerUser}>
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="register-link">
          Already have an account?{" "}
          <Link to="/">Login Here</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;