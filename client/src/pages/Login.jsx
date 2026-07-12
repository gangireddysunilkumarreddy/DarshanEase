import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
const loginUser = async (type) => {
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (type === "admin" && res.data.user.role !== "admin") {
  alert("This is Admin Login");
  return;
}

if (type === "user" && res.data.user.role === "admin") {
  alert("Please use Admin Login");
  return;
}

      setLoading(false);


      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setLoading(false);
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>🕉️ DarshanEase</h1>
        
        <p className="subtitle">
          Temple Darshan Booking System
        </p>

        <input
          type="email"
          placeholder="📧 Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="🔒 Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p
          className="show-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "🙈 Hide Password" : "👁 Show Password"}
        </p>

        <button
  onClick={() => loginUser("user")}
  disabled={loading}
>
  {loading ? "Logging In..." : "👤 User Login"}
</button>

<button
  className="admin-btn"
  onClick={() => loginUser("admin")}
  disabled={loading}
>
  {loading ? "Logging In..." : "🛡️ Admin Login"}
</button>


        <p className="register-link">
          Don't have an account?{" "}
          <Link to="/register">Register Here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;