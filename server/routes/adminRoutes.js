const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getAllBookings,
  getStats,
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");

// Admin Routes
router.get("/users", authMiddleware, getAllUsers);
router.get("/bookings", authMiddleware, getAllBookings);
router.get("/stats", authMiddleware, getStats);

module.exports = router;