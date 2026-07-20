const express = require('express');
const router = express.Router();
const Category = require("../models/Category");

const createSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
};

// CREATE CATEGORY
router.post("/create", async (req, res) => {
  try {
    const { catName, catDes, catImg, catStatus } = req.body;

    if (!catName) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }
    if (!catImg) {
      return res.status(400).json({
        success: false,
        message: "Category Image is required",
      });
    }
    if (!catStatus) {
      return res.status(400).json({
        success: false,
        message: "Category Status is required",
      });
    }
    const existingCategory =
      await Category.findOne({ catName });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category Name already exists",
      });
    }
    const cateData = { catName, catDes, catImg, catStatus }
    const category =
      await Category.create(cateData);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET ALL CATEGORIES
router.get("/all", async (req, res) => {
  try {
    const { search = "", status = "" } = req.query;
    const query = {};

    if (search.trim()) {
      query.$or = [{
        catName: {
          $regex: search,
          $options: "i",
        }}
      ];
    }
    if (status) {
      query.catStatus = status;
    }

    const categories =
      await Category.find(query);

    // Sort pets by plan priority first, then verified status
    categories.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE CATEGORY
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Category.findByIdAndDelete(id);

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

// Update CATEGORY
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { catName, catDes, catImg, catStatus } = req.body;
    const category = await Category.findOneAndUpdate(
      { _id: id },
      { catName, catDes, catImg, catStatus },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    if (!catName) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }
    if (!catImg) {
      return res.status(400).json({
        success: false,
        message: "Category Image is required",
      });
    }
    if (!catStatus) {
      return res.status(400).json({
        success: false,
        message: "Category Status is required",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category Updated successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get CATEGORY
router.get("/:id", async (req, res) => {
  try {
    console.log(req.params);
    
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    const data = {
      catName: category?.catName,
      catDes: category?.catDes,
      catImg: category?.catImg,
      catStatus: category?.catStatus
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