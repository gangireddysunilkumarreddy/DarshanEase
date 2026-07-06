const User = require("../models/User");
const Booking = require("../models/Booking");
const Temple = require("../models/Temple");
const Slot = require("../models/Slot");

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user")
      .populate("temple")
      .populate("slot");

    res.status(200).json({
      message: "All bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Dashboard Stats
const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const bookings = await Booking.countDocuments();
    const temples = await Temple.countDocuments();
    const slots = await Slot.countDocuments();

    res.status(200).json({
      message: "Stats fetched successfully",
      data: {
        users,
        bookings,
        temples,
        slots,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getAllBookings,
  getStats,
};