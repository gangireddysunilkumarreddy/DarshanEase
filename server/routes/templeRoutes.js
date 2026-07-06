const express = require("express");
const router = express.Router();

const {
  addTemple,
  getAllTemples,
  getTempleById,
  updateTemple,
  deleteTemple,
} = require("../controllers/templeController");

const authMiddleware = require("../middleware/authMiddleware");

// Add Temple
router.post("/", authMiddleware, addTemple);

// Get All Temples
router.get("/", getAllTemples);

// Get Temple By ID
router.get("/:id", getTempleById);

// Update Temple
router.put("/:id", authMiddleware, updateTemple);

// Delete Temple
router.delete("/:id", authMiddleware, deleteTemple);

module.exports = router;