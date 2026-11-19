const Student = require("../models/Student");

// 1. Get all students (with search, department, and status filters)
exports.getAllStudents = async (req, res) => {
  try {
    const { search, department, status } = req.query;
    const filter = {};

    if (search && search.trim()) {
      const q = search.trim();
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { rollNumber: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ];
    }

    if (department && department !== "All") {
      filter.department = department;
    }

    if (status && status !== "All") {
      filter.status = status;
    }

    const students = await Student.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve student records",
      error: error.message,
    });
  }
};

// 2. Get single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student record not found",
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid student identifier format",
      error: error.message,
    });
  }
};

// 3. Create a new student
exports.createStudent = async (req, res) => {
  try {
    const { name, rollNumber, email, department, year, phone, status } = req.body;

    if (!name || !rollNumber || !email || !department || !year || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (name, rollNumber, email, department, year, phone).",
      });
    }

    const formattedRoll = rollNumber.trim().toUpperCase();

    // Check duplicate roll number
    const existing = await Student.findOne({ rollNumber: formattedRoll });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `Roll number ${formattedRoll} is already registered.`,
      });
    }

    const student = await Student.create({
      name: name.trim(),
      rollNumber: formattedRoll,
      email: email.trim().toLowerCase(),
      department,
      year,
      phone: phone.trim(),
      status: status || "Active",
    });

    res.status(201).json({
      success: true,
      message: "Student record registered successfully!",
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Could not register student.",
    });
  }
};

// 4. Update existing student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found to update.",
      });
    }

    if (req.body.rollNumber) {
      const formattedRoll = req.body.rollNumber.trim().toUpperCase();
      if (formattedRoll !== student.rollNumber) {
        const conflict = await Student.findOne({ rollNumber: formattedRoll });
        if (conflict) {
          return res.status(409).json({
            success: false,
            message: `Roll number ${formattedRoll} is already in use by another student.`,
          });
        }
        req.body.rollNumber = formattedRoll;
      }
    }

    if (req.body.name) req.body.name = req.body.name.trim();
    if (req.body.email) req.body.email = req.body.email.trim().toLowerCase();
    if (req.body.phone) req.body.phone = req.body.phone.trim();

    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Student record updated successfully!",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update student.",
    });
  }
};

// 5. Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Student record not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: `Student ${deleted.name} removed successfully!`,
      data: deleted,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to delete student.",
    });
  }
};
