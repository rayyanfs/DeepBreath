const express = require("express");
const router = express.Router();
const Dare = require("../models/Dare");
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");

// Get the list of 5 dares (you can add pagination or dynamic fetching logic later)
router.get("/", async (req, res) => {
  try {
    const dares = await Dare.find().limit(5); // Fetch only 5 dares
    res.status(200).json({ dares });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dares", error });
  }
});

// Endpoint to mark a dare as completed
router.post("/completeddare", verifyToken, async (req, res) => {
  const { dareId } = req.body; // The ID of the dare that the user completed

  try {
    const userId = req.user.userId; // Get the user ID from the JWT token
    const user = await User.findById(userId); // Fetch the user from the database
    const dare = await Dare.findById(dareId); // Fetch the dare from the database

    // Check if the user or dare exists
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (!dare) {
      return res.status(400).json({ message: "Dare not found" });
    }

    // Check if the user has already completed this dare
    const alreadyCompleted = user.completedDares.some(
      (completedDare) => completedDare.dare.toString() === dareId
    );

    if (alreadyCompleted) {
      return res.status(400).json({ message: "Dare already completed" });
    }

    // Add the dare to the completedDares array
    user.completedDares.push({
      dare: dare._id, // Store only the dareId to avoid storing large objects
      dateCompleted: new Date(),
    });

    // Add points to the user for completing the dare
    // user.points += dare.points;
    await user.save(); // Save the user with the updated completedDares and points

    // Populate the completedDares with the dare details and send the response
    const updatedUser = await User.findById(userId).populate(
      "completedDares.dare"
    );

    res.status(200).json({
      message: "Dare completed successfully",
      points: user.points, // Send the updated points
      completedDares: updatedUser.completedDares, // Send the full dare data
    });
  } catch (error) {
    console.error("Error completing dare:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/getcompleteddares", verifyToken, async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findById(userId).populate("completedDares.dare"); // bascially saying u have an id and u want the complete info

  res.status(200).json({
    message: "here are all the completed dares",
    completedDares: user.completedDares,
  });
});

module.exports = router;
