const express = require("express");
const router = express.Router();

const {
  bookDarshan,
  getMyBookings,
  cancelBooking,
  getAllBookings,
  getBookingAnalytics,
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, bookDarshan);

router.get("/", authMiddleware, getAllBookings);

router.get("/my-bookings", authMiddleware, getMyBookings);

router.put("/cancel/:id", authMiddleware, cancelBooking);

router.get("/analytics", authMiddleware, getBookingAnalytics);

module.exports = router;