require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminUser = require("../models/AdminUser");

const createAdmin = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    );

    const existingAdmin =
      await AdminUser.findOne({
        email: "admin@yopmail.com",
      });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword =
      await bcrypt.hash(
        "Admin@123",
        10
      );

    await AdminUser.create({
      name: "Admin",
      email: "admin@yopmail.com",
      password: hashedPassword,
    });

    console.log("Admin created successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();