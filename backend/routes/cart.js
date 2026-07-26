const express = require('express');
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require('../middleware/authMiddleware');


// add to cart
router.post("/add", protect, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const { id, email } = req.user;
    // console.log(id, email);
    const userId = id;
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }
    // Check product exists
    const product = Product.findById({ productId });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

     // Check existing cart item
    const existingCart = await Cart.findOne({
      userId: id,
      productId,
    });

    if (existingCart) {
      existingCart.quantity += quantity;

      await existingCart.save();

      return res.status(200).json({
        success: true,
        message: "Cart quantity updated",
        cart: existingCart,
      });
    }

    // Create separate cart document
    const cart = await Cart.create({
      userId,
      productId,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" })
  }
});

// GET ALL CART DATA
router.get("/all", protect, async (req, res) => {
  try {
    const { id, email } = req.user;
    const userId = id;
    const cart = await Cart.find({
      userId,
    }).populate("productId");
    console.log(cart, id);
    
    // Sort pets by plan priority first, then verified status
    cart.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE QUANTITY
router.put("/:userId/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const { id, email } = req.user;
    let cart = await Cart.findOne({ userId: id });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// REMOVE ITEM
router.delete("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// CLEAR CART
router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items: [] },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Cart cleared",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;