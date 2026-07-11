const Booking = require("../models/Booking");
const Slot = require("../models/Slot");

// Book Darshan
const bookDarshan = async (req, res) => {
  try {
    const { temple, slot } = req.body;

    const selectedSlot = await Slot.findById(slot);

    if (!selectedSlot) {
      return res.status(404).json({
        message: "Slot Not Found",
      });
    }

    if (selectedSlot.availableSeats <= 0) {
      return res.status(400).json({
        message: "No Seats Available",
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      temple,
      slot,
    });

    selectedSlot.availableSeats -= 1;
    await selectedSlot.save();

    res.status(201).json({
      message: "Darshan Booked Successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// My Bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate("temple")
      .populate("slot");

    res.status(200).json({
      message: "Bookings Fetched Successfully",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Cancel Booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking Not Found",
      });
    }

    if (booking.status === "Cancelled") {
      return res.status(400).json({
        message: "Booking Already Cancelled",
      });
    }

    booking.status = "Cancelled";
    await booking.save();

    const slot = await Slot.findById(booking.slot);

    if (slot) {
      slot.availableSeats += 1;
      await slot.save();
    }

    res.status(200).json({
      message: "Booking Cancelled Successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Bookings (Admin)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("temple")
      .populate("slot");

    res.status(200).json({
      message: "All Bookings Fetched Successfully",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Booking Analytics
const getBookingAnalytics = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("slot")
      .populate("temple");

    const totalBookings = bookings.length;

    const cancelledBookings = bookings.filter(
      (b) => b.status === "Cancelled"
    ).length;

    const totalRevenue = bookings
      .filter((b) => b.status === "Booked")
      .reduce((sum, b) => sum + (b.slot?.price || 0), 0);

    const templeCount = {};

    bookings.forEach((b) => {
      if (b.status === "Booked" && b.temple) {
        const templeName = b.temple.name;

        templeCount[templeName] =
          (templeCount[templeName] || 0) + 1;
      }
    });

    let mostBookedTemple = "N/A";
    let max = 0;

    for (const temple in templeCount) {
      if (templeCount[temple] > max) {
        max = templeCount[temple];
        mostBookedTemple = temple;
      }
    }

    res.status(200).json({
      totalBookings,
      cancelledBookings,
      totalRevenue,
      mostBookedTemple,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  bookDarshan,
  getMyBookings,
  cancelBooking,
  getAllBookings,
  getBookingAnalytics,
};