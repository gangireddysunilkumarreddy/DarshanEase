import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section">
          <h2>🛕 DarshanEase</h2>
          <p>
            Making temple darshan booking simple, fast and hassle-free.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <p>🏠 Home</p>
          <p>📖 My Bookings</p>
          <p>🛕 Temples</p>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>

          <p>📧 support@darshanease.com</p>
          <p>📞 +91 6305718834</p>
          <p>📍 Andhra Pradesh, India</p>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 DarshanEase. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;