const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, fullName: user.fullName, phoneNo: user.phoneNo },
    process.env.JWT_SECRET  || 'fallback_secret',
    { expiresIn: '30d' }
  );
};

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    console.log("Signup request received:", req.body); // Log the request body for debugging
    const { fullName, email, phoneNo, password } = req.body;

    if (!fullName || !email || !phoneNo || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    const nameExists = await User.findOne({ fullName });
    if (nameExists) {
      return res.status(400).json({ message: 'FullName is already taken' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
        fullName,
        email,
        phoneNo,
        password: hashedPassword,
    };
    const user = await User.create(userData);

    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNo: user.phoneNo,
      },
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
        success: true,
        message: "Login successfully.",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;