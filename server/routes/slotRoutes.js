const express = require("express");
const router = express.Router();

const {
  addSlot,
  getAllSlots,
  getSlotsByTemple,
  getSlotById,
  updateSlot,
  deleteSlot,
} = require("../controllers/slotController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addSlot);

router.get("/", getAllSlots);

// ⚠️ Ee route undali
router.get("/temple/:templeId", getSlotsByTemple);

router.get("/:id", getSlotById);

router.put("/:id", authMiddleware, updateSlot);

router.delete("/:id", authMiddleware, deleteSlot);

module.exports = router;