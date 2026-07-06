import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">

      <div className="logo">
        🛕 DarshanEase
      </div>

      <div className="nav-links">

        <Link to="/home">
          Home
        </Link>

        <Link to="/my-bookings">
          My Bookings
        </Link>

        <Link to="/profile">
  Profile
</Link>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;