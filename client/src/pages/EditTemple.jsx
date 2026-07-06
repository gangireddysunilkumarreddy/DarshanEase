import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/EditTemple.css";

function EditTemple() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    deity: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchTemple();
  }, []);

  const fetchTemple = async () => {
    try {
      const res = await API.get(`/temples/${id}`);
      setFormData(res.data.temple);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch temple");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateTemple = async (e) => {
    e.preventDefault();

    try {
      const res = await API.put(`/temples/${id}`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      alert(res.data.message);

      navigate("/admin/view-temples");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="edit-temple-container">
        <form className="edit-temple-form" onSubmit={updateTemple}>
          <h1>✏️ Edit Temple</h1>

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
            placeholder="Image"
            value={formData.image}
            onChange={handleChange}
          />

          <textarea
            name="description"
            rows="5"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Update Temple
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default EditTemple;