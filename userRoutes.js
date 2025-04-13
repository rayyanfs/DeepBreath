const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");

router.get("/points", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.status(200).json({ points: user.points });
  } catch (error) {
    res.status(500).json({ message: "server error", errpr });
  }
});

router.put("/update-points", verifyToken, async (req, res) => {
  const { points } = req.body;
  if (typeof points !== "number") {
    return res.status(400).json({ message: "points must be a number" });
  }
  try {
    const user = await User.findById(req.user.userId);
    user.points += points;

    await user.save();
    res.status(200).json({ message: "points updated", points: user.points });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
});

module.exports = router;
