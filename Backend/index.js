const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ Connection Error:", err));

// Schema
const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String,
  status: { type: String, default: "Active" },
});

const StudentModel = mongoose.model("students", StudentSchema);

// --- ROUTES ---

// 1. Get All Students
app.get("/getUsers", (req, res) => {
  StudentModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// 2. Add Student
app.post("/createUser", (req, res) => {
  StudentModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// 3. Update Student
app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  StudentModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      course: req.body.course,
    },
    { new: true }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// 4. Delete Student
app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  StudentModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
