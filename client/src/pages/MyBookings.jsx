import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/MyBookings.css";
import Footer from "../components/Footer";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings/my-bookings", {
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

  const cancelBooking = async (id) => {
    try {
      const res = await API.put(
        `/bookings/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      alert(res.data.message);
      fetchBookings();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Cancel Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="bookings-container">

        <h1 className="booking-title">
          📖 My Bookings
        </h1>

        {bookings.length === 0 ? (

          <h2>No Bookings Yet</h2>

        ) : (

          <div className="booking-grid">

            {bookings.map((booking) => (

              <div className="booking-card" key={booking._id}>

                <h2>{booking.temple?.name}</h2>

                <p>📅 {booking.slot?.date}</p>

                <p>🕘 {booking.slot?.time}</p>

                <p>Status :
                  <span className={booking.status === "Cancelled"
                    ? "cancelled"
                    : "confirmed"}>
                    {booking.status}
                  </span>
                </p>

                {booking.status !== "Cancelled" && (

                  <button
                    className="cancel-btn"
                    onClick={() => cancelBooking(booking._id)}
                  >
                    Cancel Booking
                  </button>

                )}

              </div>

            ))}

          </div>

        )}

      </div>
      <Footer />
    </>
  );
}

export default MyBookings;