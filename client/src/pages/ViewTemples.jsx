import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import "../styles/ViewTemples.css";

function ViewTemples() {
    const navigate = useNavigate();
  const [temples, setTemples] = useState([]);

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
      const res = await API.get("/temples");
      setTemples(res.data.temples);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch temples");
    }
  };

  const deleteTemple = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this temple?"
    );

    if (!confirmDelete) return;

    try {
      const res = await API.delete(`/temples/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      alert(res.data.message);

      fetchTemples();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="view-temples-container">
        <h1>🛕 Manage Temples</h1>

        <div className="temples-grid">
          {temples.map((temple) => (
            <div className="temple-card" key={temple._id}>
              <h2>{temple.name}</h2>

              <p>
                <strong>📍</strong> {temple.location}
              </p>

              <p>
                <strong>🙏</strong> {temple.deity}
              </p>

              <p>{temple.description}</p>

              <div className="btn-group">
                <button
  className="edit-btn"
  onClick={() => navigate(`/admin/edit-temple/${temple._id}`)}
>
  ✏️ Edit
</button>

                <button
                  className="delete-btn"
                  onClick={() => deleteTemple(temple._id)}
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

export default ViewTemples;