import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/AddSlot.css";

function AddSlot() {
  const navigate = useNavigate();

  const [temples, setTemples] = useState([]);
const [formData, setFormData] = useState({
  temple: "",
  date: "",
  time: "",
  totalSeats: "",
  availableSeats: "",
  price: "",
});
  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
      const res = await API.get("/temples");
      setTemples(res.data.temples);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addSlot = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/slots", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      alert(res.data.message);

      navigate("/admin");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to Add Slot");
    }
  };

  return (
    <>
      <Navbar />

      <div className="add-slot-container">
        <form className="add-slot-form" onSubmit={addSlot}>

          <h1>🕘 Add Darshan Slot</h1>

          <select
            name="temple"
            value={formData.temple}
            onChange={handleChange}
            required
          >
            <option value="">Select Temple</option>

            {temples.map((temple) => (
              <option key={temple._id} value={temple._id}>
                {temple.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="time"
            placeholder="Example: 10:00 AM"
            value={formData.time}
            onChange={handleChange}
            required
          />
          <input
  type="number"
  name="totalSeats"
  placeholder="Total Seats"
  value={formData.totalSeats}
  onChange={handleChange}
  required
/>

          <input
            type="number"
            name="availableSeats"
            placeholder="Available Seats"
            value={formData.availableSeats}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Add Slot
          </button>

        </form>
      </div>

      <Footer />
    </>
  );
}

export default AddSlot;