const express = require('express');
const router = express.Router();
const Orderdetails = require("../models/Orderdetails");

// order details
router.post("/add", async (req, res) => {
    try {
        const { fullName, phoneNo, email, address, landmark, country, city, state, pincode, orderNotes } = req.body;

        const orderData = {fullName, phoneNo, email, address, country, state, city, landmark,orderNotes }
        const data = await Orderdetails.create(orderData);
        res.status(201).json({
            fullName: data.fullName,
            phoneNo: data.phoneNo,
            email: data.email,
            address: data.address,
            country: data.country,
            state: data.state,
            city: data.city,
            landmark: data.landmark,
            orderNotes: data.orderNotes,
            amount: "",
            payment: "",
            status: "inprogress"
        })
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
});

// GET ALL ORDERS
router.get("/all", async (req, res) => {
  try {
    const { search = "" } = req.query;
    const query = {};

    if (search.trim()) {
      query.$or = [{
        fullName: {
          $regex: search,
          $options: "i",
        }}
      ];
    }

    const orders =
      await Orderdetails.find(query);

    // Sort pets by plan priority first, then verified status
    orders.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;