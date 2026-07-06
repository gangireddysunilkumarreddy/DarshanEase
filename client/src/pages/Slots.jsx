import "../styles/Slots.css";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function Slots() {
  const { templeId } = useParams();
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const res = await API.get(`/slots/temple/${templeId}`);
      setSlots(res.data.slots);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch slots");
    } finally {
      setLoading(false);
    }
  };

 const bookSlot = async (slot) => {
  try {
    const res = await API.post(
      "/bookings",
      {
        temple: slot.temple._id,
        slot: slot._id,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    alert(res.data.message);

    fetchSlots();

    navigate("/receipt", {
      state: {
        booking: {
          ...res.data.booking,
          temple: slot.temple,
          slot: {
            date: slot.date,
            time: slot.time,
          },
        },
      },
    });

  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Booking Failed");
  }
};

  return (
    <>
      <Navbar />

      <div className="slots-container">
        <h1 className="slot-title">🛕 Available Darshan Slots</h1>

        {loading ? (
<h2 className="loading-text">Loading...</h2>       ) : slots.length === 0 ? (
          <h2 className="no-slots">No Slots Available</h2>
        ) : (
          <div className="slots-grid">
            {slots.map((slot) => (
              <div className="slot-card" key={slot._id}>
                <div className="slot-header">
                  <h2>📅 {slot.date}</h2>
                </div>

                <div className="slot-details">
                  <p>🕘 <strong>Time:</strong> {slot.time}</p>

<p>
  💺 <strong>Seats Left:</strong>

  <span
    className={
      slot.availableSeats > 5
        ? "seat-green"
        : slot.availableSeats > 0
        ? "seat-orange"
        : "seat-red"
    }
  >
    {slot.availableSeats}
  </span>
</p>
                  <p>💰 <strong>Price:</strong> ₹{slot.price}</p>
                </div>

               <button
  className="book-btn"
  disabled={slot.availableSeats === 0}
  onClick={() => bookSlot(slot)}
>
  {slot.availableSeats === 0
    ? "Fully Booked"
    : "Book Darshan"}
</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Slots;