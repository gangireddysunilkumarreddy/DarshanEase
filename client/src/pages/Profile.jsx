import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Profile.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <div className="profile-container">

        <div className="profile-card">

          <h1>👤 My Profile</h1>

          <div className="profile-info">
            <p><strong>Name:</strong> {user?.name}</p>

            <p><strong>Email:</strong> {user?.email}</p>

            <p><strong>Role:</strong> {user?.role}</p>

            <p><strong>Phone:</strong> {user?.phone || "Not Available"}</p>

            <p><strong>Address:</strong> {user?.address || "Not Available"}</p>
          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Profile;