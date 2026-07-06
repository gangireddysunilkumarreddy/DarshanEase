import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css";
import tirumala from "../assets/images/tirumala.jpg";
import srisailam from "../assets/images/srisailam.jpg";
import kanakadurga from "../assets/images/kanakadurga.jpg";
import yadadri from "../assets/images/yadadri.jpg";
import annavaram from "../assets/images/annavaram.jpg";
import simhachalam from "../assets/images/simhachalam.jpg";
import bhadrachalam from "../assets/images/bhadrachalam.jpg";
import srikalahasti from "../assets/images/srikalahasti.jpg";
import draksharamam from "../assets/images/draksharamam.jpg";
import ahobilam from "../assets/images/ahobilam.jpg";

function Home() {
  const navigate = useNavigate();

  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const templeImages = {
  "Sri Tirumala Venkateswara Temple": tirumala,
  "Tirumala Venkateswara Temple": tirumala,
  "tirumala": tirumala,

  "Srisailam Temple": srisailam,
  "srisailam": srisailam,

  "Kanaka Durga Temple": kanakadurga,
  "kanaka durga": kanakadurga,

  "Yadadri Temple": yadadri,
  "yadadri": yadadri,

  "Annavaram Satyanarayana Swamy Temple": annavaram,
  "annavaram": annavaram,

  "Simhachalam Temple": simhachalam,
  "simhachalam": simhachalam,

  "Bhadrachalam Sri Rama Temple": bhadrachalam,
  "bhadrachalam": bhadrachalam,

  "Srikalahasti Temple": srikalahasti,
  "srikalahasti": srikalahasti,

  "Draksharamam Temple": draksharamam,
  "draksharamam": draksharamam,

  "Ahobilam Temple": ahobilam,
  "ahobilam": ahobilam,
};

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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading Temples...</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="hero">
  <div className="hero-overlay">

    <h1>🪔 Welcome to DarshanEase</h1>

    <p>
      Book your temple darshan anytime, anywhere with ease.
    </p>

    <button
      className="hero-btn"
      onClick={() =>
        document
          .querySelector(".section-title")
          .scrollIntoView({ behavior: "smooth" })
      }
    >
      Explore Temples
    </button>

  </div>
</div>

      <div className="home-container">

        <h2 className="section-title">
  🛕 Popular Temples
</h2>
        <div className="search-box">
         <input
           type="text"
           placeholder="🔍 Search Temple or Location..."
           value={search}
           onChange={(e) => setSearch(e.target.value)}
  />
</div>

        <div className="temple-grid">

{temples
  .filter(
    (temple) =>
      temple.name.toLowerCase().includes(search.toLowerCase()) ||
      temple.location.toLowerCase().includes(search.toLowerCase())
  )
  .map((temple) => (
            <div className="temple-card" key={temple._id}>

              <img
            src={templeImages[temple.name] || tirumala}
            alt={temple.name}
            className="temple-image"
             />

              <h2>{temple.name}</h2>

              <p>
                <strong>📍</strong> {temple.location}
              </p>

              <p>
                <strong>🙏</strong> {temple.deity}
              </p>

              <p className="description">
                {temple.description}
              </p>

              <button
  className="slot-btn"
  onClick={() => navigate(`/temple/${temple._id}`)}
>
  Explore Temple →
</button>

            </div>

          ))}

        </div>

      </div>
      <section className="about-section">

  <h2>🪔 About DarshanEase</h2>

  <p>
    DarshanEase is an online temple darshan booking platform designed to
    simplify the pilgrimage experience. Users can explore famous temples,
    view available darshan slots, book appointments online, manage bookings,
    and receive instant booking receipts.
  </p>

  <div className="about-grid">

    <div className="about-card">
      <h3>🛕 10+ Temples</h3>
      <p>Explore famous temples across Andhra Pradesh & Telangana.</p>
    </div>

    <div className="about-card">
      <h3>⚡ Instant Booking</h3>
      <p>Book darshan slots within seconds.</p>
    </div>

    <div className="about-card">
      <h3>🔒 Secure Login</h3>
      <p>JWT Authentication keeps your account safe.</p>
    </div>

    <div className="about-card">
      <h3>📄 Digital Receipt</h3>
      <p>Get instant booking confirmation after every booking.</p>
    </div>

  </div>

</section>
      <Footer />
    </>
  );
}

export default Home;