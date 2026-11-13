
const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Register student
router.post("/register", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json({
            message: "Registration successful",
            student
        });
    } catch (err) {
        res.status(400).json({
            message: err.code === 11000
                ? "Email already exists"
                : "Registration failed"
        });
    }
});

// View all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Smart skill matching
router.get("/matches/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const matches = await Student.find({
            _id: { $ne: student._id },
            teach: {
                $regex: "^" + student.learn + "$",
                $options: "i"
            }
        });

        res.json(matches);
    } catch (err) {
        res.status(500).json({ message: "Matching failed" });
    }
});

module.exports = router;
