import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/BookingReceipt.css";

function BookingReceipt() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <>
        <Navbar />
        <div className="receipt-container">
          <h2>No Booking Found</h2>

          <button
            className="receipt-btn"
            onClick={() => navigate("/home")}
          >
            Go Home
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const { booking } = state;

  return (
    <>
      <Navbar />

      <div className="receipt-container">

<div className="receipt-card" id="receipt">
          <h1>🛕 DarshanEase E-Ticket</h1>

          <hr />

          <p><strong>Temple :</strong> {booking.temple?.name}</p>

          <p><strong>Date :</strong> {booking.slot?.date}</p>

          <p><strong>Time :</strong> {booking.slot?.time}</p>

          <p><strong>Status :</strong> {booking.status}</p>

          <p><strong>Booking ID :</strong> {booking._id}</p>

          <button
            className="receipt-btn"
            onClick={() => window.print()}
          >
            🖨 Print Ticket
          </button>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default BookingReceipt;