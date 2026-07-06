import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import "../styles/ViewSlots.css";

function ViewSlots() {
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const res = await API.get("/slots");
      setSlots(res.data.slots);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch slots");
    }
  };

  const deleteSlot = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this slot?"
    );

    if (!confirmDelete) return;

    try {
      const res = await API.delete(`/slots/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      alert(res.data.message);

      fetchSlots();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="view-slots-container">
        <h1>🕘 Manage Slots</h1>

        <div className="slots-grid">
          {slots.map((slot) => (
            <div className="slot-card" key={slot._id}>
              <h2>{slot.temple?.name}</h2>

              <p>
                <strong>📅 Date:</strong> {slot.date}
              </p>

              <p>
                <strong>🕘 Time:</strong> {slot.time}
              </p>

              <p>
                <strong>💺 Available:</strong> {slot.availableSeats}
              </p>

              <p>
                <strong>💰 Price:</strong> ₹{slot.price}
              </p>

              <div className="btn-group">
  <button
    className="delete-btn"
    onClick={() => deleteSlot(slot._id)}
  >
    🗑 Delete
  </button>
</div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ViewSlots;