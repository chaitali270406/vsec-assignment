
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Student schema
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    course: String,
    city: String
});

const Student = mongoose.model("Student", studentSchema);

// 1. POST - Add student
app.post("/students", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 2. GET - Get all students
app.get("/", (req, res) => {
    res.send("Student API is running");
});
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. GET - Get student by ID
app.get("/students/id/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(student);
    } catch (err) {
        res.status(400).json({ error: "Invalid student ID" });
    }
});

// 4. GET - Search by course
app.get("/students/course/:course", async (req, res) => {
    try {
        const students = await Student.find({
            course: { $regex: req.params.course, $options: "i" }
        });
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. GET - Count students
app.get("/students/count", async (req, res) => {
    try {
        const count = await Student.countDocuments();
        res.json({ totalStudents: count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. GET - Sort students by age
app.get("/students/sort/age", async (req, res) => {
    try {
        const students = await Student.find().sort({ age: 1 });
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 8. PUT - Update student
app.put("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 9. PATCH - Update selected fields
app.patch("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 10. DELETE - Delete one student
app.delete("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "Student deleted", student });
    } catch (err) {
        res.status(400).json({ error: "Invalid student ID" });
    }
});

// 11. DELETE - Delete all students
app.delete("/students", async (req, res) => {
    try {
        const result = await Student.deleteMany({});
        res.json({
            message: "All students deleted",
            deletedCount: result.deletedCount
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server after database connects
mongoose.connection.once("open", () => {
    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });
});
