import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/TempleDetails.css";
import Footer from "../components/Footer";

import tirumala from "../assets/images/tirumala.jpg";
import srisailam from "../assets/images/srisailam.jpg";
import kanakadurga from "../assets/images/kanakadurga.jpg";
import yadadri from "../assets/images/yadadri.jpg";

function TempleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [temple, setTemple] = useState(null);

  const templeImages = {
    "Sri Tirumala Venkateswara Temple": tirumala,
    "Tirumala Venkateswara Temple": tirumala,
    "Srisailam Temple": srisailam,
    "Kanaka Durga Temple": kanakadurga,
    "Yadadri Temple": yadadri,
  };

  useEffect(() => {
    fetchTemple();
  }, []);

  const fetchTemple = async () => {
    try {
      const res = await API.get(`/temples/${id}`);
      setTemple(res.data.temple);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch temple");
    }
  };

  if (!temple) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="details-container">

        <img
          src={templeImages[temple.name] || tirumala}
          alt={temple.name}
          className="details-image"
        />

        <div className="details-content">

          <p className="temple-tag">
  🪔 Sacred Temple
</p>

          <h1>{temple.name}</h1>

          <p><strong>📍 Location:</strong> {temple.location}</p>

          <p><strong>🙏 Deity:</strong> {temple.deity}</p>

<h3>About Temple</h3>

<p>{temple.description}</p><a
  href={`https://www.google.com/maps/search/${encodeURIComponent(
    temple.location
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="map-btn"
>
  📍 View on Google Maps
</a>
          <button
            className="slot-btn"
            onClick={() => navigate(`/slots/${temple._id}`)}
          >
            View Available Slots
          </button>

        </div>

      </div>
      <Footer />
    </>
  );
}

export default TempleDetails;