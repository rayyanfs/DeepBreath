const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "jwttoken";

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, hashedpassword });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ message: "user registered successfuly", token });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.hashedpassword);
    // bcrypt.compare compares a normal pass with a hashedpass
    if (!isPasswordValid) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "user logged in successfuly", token });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
});

module.exports = router;
