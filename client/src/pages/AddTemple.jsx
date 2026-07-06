import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/AddTemple.css";

function AddTemple() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    deity: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addTemple = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/temples", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      alert(res.data.message);

      navigate("/admin");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to Add Temple");
    }
  };

  return (
    <>
      <Navbar />

      <div className="add-temple-container">

        <form className="add-temple-form" onSubmit={addTemple}>

          <h1>🛕 Add New Temple</h1>

          <input
            type="text"
            name="name"
            placeholder="Temple Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="deity"
            placeholder="Deity"
            value={formData.deity}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image Name (example: tirumala.jpg)"
            value={formData.image}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Temple Description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <button type="submit">
            ➕ Add Temple
          </button>

        </form>
      </div>

      <Footer />
    </>
  );
}

export default AddTemple;