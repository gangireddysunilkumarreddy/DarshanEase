import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">🛕 DarshanEase</div>

      <div className="nav-links">
        {user?.role === "admin" ? (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/add-temple">Add Temple</Link>
            <Link to="/admin/view-temples">View Temples</Link>
            <Link to="/admin/add-slot">Add Slot</Link>
            <Link to="/admin/view-slots">View Slots</Link>
            <Link to="/admin/bookings">Bookings</Link>
          </>
        ) : (
          <>
            <Link to="/home">Home</Link>
            <Link to="/my-bookings">My Bookings</Link>
            <Link to="/profile">Profile</Link>
          </>
        )}

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;