const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const Student = require("./models/Student");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/student_portal";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas Connection
const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      dbName: process.env.DB_NAME || "student_portal",
    });
    console.log(` MongoDB Atlas Connected: ${conn.connection.host}`);

    // Seed default sample data if empty
    const count = await Student.countDocuments();
    if (count === 0) {
      console.log("Seeding initial student records...");
      await Student.insertMany([
        {
          name: "Aarav Sharma",
          rollNumber: "CS-2024-101",
          email: "aarav.sharma@example.com",
          department: "Computer Science",
          year: "3rd Year",
          phone: "9876543210",
          status: "Active",
        },
        {
          name: "Sneha Patel",
          rollNumber: "IT-2024-204",
          email: "sneha.patel@example.com",
          department: "Information Technology",
          year: "2nd Year",
          phone: "9812345678",
          status: "Active",
        },
        {
          name: "Rohan Verma",
          rollNumber: "ME-2024-055",
          email: "rohan.verma@example.com",
          department: "Mechanical Engineering",
          year: "4th Year",
          phone: "9745612389",
          status: "Inactive",
        },
        {
          name: "Priya Nair",
          rollNumber: "EC-2024-112",
          email: "priya.nair@example.com",
          department: "Electronics & Comm.",
          year: "3rd Year",
          phone: "9654123780",
          status: "Active",
        },
        {
          name: "Vikram Malhotra",
          rollNumber: "CE-2024-032",
          email: "vikram.m@example.com",
          department: "Civil Engineering",
          year: "1st Year",
          phone: "9988776655",
          status: "Active",
        },
      ]);
      console.log(" Initial records seeded successfully.");
    }
  } catch (error) {
    console.error(" MongoDB Atlas Connection Error:", error.message);
  }
};

connectDatabase();

// Health Check API
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Management System API is live",
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString(),
  });
});

// Student Routes
app.use("/api/students", studentRoutes);

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
