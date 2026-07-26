const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// CREATE PRODUCT
router.post("/create", async (req, res) => {
  try {
    const { pdtName, category, pdtDes, pdtDiscount, pdtStock, pdtImages, pdtColors, pdtTags, pdtStatus, metaData } = req.body;

    if (!pdtName) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }
    if (!pdtDes) {
      return res.status(400).json({
        success: false,
        message: "Product description is required",
      });
    }
    if (!pdtImages) {
      return res.status(400).json({
        success: false,
        message: "Product images is required",
      });
    }
    if (!pdtStatus) {
      return res.status(400).json({
        success: false,
        message: "Product status is required",
      });
    }
    // const existingProduct =
    //   await Product.findOne({ pdtName });

    // if (existingProduct) {
    //   return res.status(409).json({
    //     success: false,
    //     message: "Producy already exists",
    //   });
    // }

    const pdtData = { pdtName, category, pdtDes, metaData, pdtDiscount, pdtStock, pdtImages, pdtColors, pdtTags, pdtStatus }
    const product =
      await Product.create(pdtData);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET ALL PRODUCT
router.get("/all", async (req, res) => {
  try {
    const { search = "", status = "" } = req.query;
    const query = {};

    if (search.trim()) {
      query.$or = [{
        pdtName: {
          $regex: search,
          $options: "i",
        }}
      ];
    }
    if (status) {
      query.pdtStatus = status;
    }

    const products =
      await Product.find(query);

    // Sort pets by plan priority first, then verified status
    products.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE PRODUCT
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update PRODUCT
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { pdtName, category, pdtDes, metaData, pdtImages, pdtColors, pdtTags, pdtStatus } = req.body;
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { pdtName, category, pdtDes, metaData, pdtImages, pdtColors, pdtTags, pdtStatus },
      { new: true }
    );

    if (!pdtName) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }
    if (!pdtDes) {
      return res.status(400).json({
        success: false,
        message: "Product description is required",
      });
    }
    if (!pdtImages) {
      return res.status(400).json({
        success: false,
        message: "Product images is required",
      });
    }
    if (!pdtStatus) {
      return res.status(400).json({
        success: false,
        message: "Product status is required",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get PRODUCT
router.get("/:id", async (req, res) => {
  try {
    console.log(req.params);
    
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }
    const data = {
      pdtName: product?.pdtName,
      category: product?.category,
      pdtDes: product?.pdtDes,
      metaData: product.metaData,
      pdtImages: product?.pdtImages,
      pdtColors: product?.pdtColors,
      pdtTags: product?.pdtTags,
      pdtStatus: product?.pdtStatus,
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