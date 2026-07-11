import Navbar from "../components/Navbar";
import "../styles/AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    bookings: 0,
    temples: 0,
    slots: 0,
  });

  const [analytics, setAnalytics] = useState({
    totalBookings: 0,
    cancelledBookings: 0,
    totalRevenue: 0,
    mostBookedTemple: "N/A",
  });

  useEffect(() => {
  fetchStats();
  fetchAnalytics();
}, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/stats", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setStats(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAnalytics = async () => {
  try {
    const res = await API.get("/bookings/analytics", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    setAnalytics(res.data);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <Navbar />

      <div className="admin-container">
        <h1>🛕 Admin Dashboard</h1>

        {/* Statistics */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>🛕 Temples</h2>
            <h1>{stats.temples}</h1>
          </div>

          <div className="dashboard-card">
            <h2>🕘 Slots</h2>
            <h1>{stats.slots}</h1>
          </div>

          <div className="dashboard-card">
            <h2>📖 Bookings</h2>
            <h1>{stats.bookings}</h1>
          </div>

          <div className="dashboard-card">
            <h2>👥 Users</h2>
            <h1>{stats.users}</h1>
          </div>
        </div>

        <h2
  style={{
    marginTop: "40px",
    marginBottom: "20px",
    color: "#ff6b00",
  }}
>
  📊 Analytics
</h2>

<div className="dashboard-grid">

  <div className="dashboard-card">
    <h2>🏆 Most Booked Temple</h2>
    <h3>{analytics.mostBookedTemple}</h3>
  </div>

  <div className="dashboard-card">
    <h2>💰 Total Revenue</h2>
    <h3>₹{analytics.totalRevenue}</h3>
  </div>

  <div className="dashboard-card">
    <h2>📖 Total Bookings</h2>
    <h3>{analytics.totalBookings}</h3>
  </div>

  <div className="dashboard-card">
    <h2>❌ Cancelled</h2>
    <h3>{analytics.cancelledBookings}</h3>
  </div>

</div>

        {/* Management */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>➕ Add Temple</h2>
            <p>Create a new temple.</p>

            <button onClick={() => navigate("/admin/add-temple")}>
              Add Temple
            </button>
          </div>

          <div className="dashboard-card">
            <h2>🕘 Add Slot</h2>
            <p>Create darshan slots.</p>

            <button onClick={() => navigate("/admin/add-slot")}>
              Add Slot
            </button>
          </div>

          <div className="dashboard-card">
            <h2>🏛 View Temples</h2>
            <p>Manage all temples.</p>

            <button onClick={() => navigate("/admin/view-temples")}>
              View
            </button>
          </div>

          <div className="dashboard-card">
            <h2>🕘 View Slots</h2>
            <p>Manage all darshan slots.</p>

            <button onClick={() => navigate("/admin/view-slots")}>
              View Slots
            </button>
          </div>

          <div className="dashboard-card">
            <h2>📖 Bookings</h2>
            <p>View user bookings.</p>

            <button onClick={() => navigate("/admin/bookings")}>
              View
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;