import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import "../styles/AdminBookings.css";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setBookings(res.data.bookings);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch bookings");
    }
  };

  return (
    <>
      <Navbar />

      <div className="admin-bookings-container">
        <h1>📖 All Bookings</h1>

        <table className="booking-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Temple</th>
              <th>Date</th>
              <th>Time</th>
              <th>Seats</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.user?.name}</td>
                <td>{booking.temple?.name}</td>
                <td>{booking.slot?.date}</td>
                <td>{booking.slot?.time}</td>
                <td>1</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
}

export default AdminBookings;