const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET ALL USER
router.get("/all", async (req, res) => {
  try {
    const { search = "", status = "" } = req.query;
    const query = {};

    if (search.trim()) {
      query.$or = [{
        fullName: {
          $regex: search,
          $options: "i",
        }}
      ];
    }
    if (status) {
      query.status = status;
    }

    const user =
      await User.find(query);

    // Sort pets by plan priority first, then verified status
    user.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE USER
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update USER
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, phoneNo, password, status } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: id },
      { fullName, email, phoneNo, password, status },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (!fullName) {
      return res.status(400).json({
        success: false,
        message: "User name is required",
      });
    }
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    if (!phoneNo) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }
    res.status(200).json({
      success: true,
      message: "User Updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get USER
router.get("/:id", async (req, res) => {
  try {
    console.log(req.params);
    
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const data = {
      fullName: user?.fullName,
      email: user?.email,
      password: user?.password,
      phoneNo: user?.phoneNo,
      status: user?.status
    }
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;