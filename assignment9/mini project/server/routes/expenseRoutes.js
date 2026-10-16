const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// Display expenses for a selected month
router.get("/:month", async (req, res) => {
  const expenses = await Expense.find({
    date: { $regex: `^${req.params.month}` }
  });

  res.json(expenses);
});

// Add an expense
router.post("/", async (req, res) => {
  const expense = await Expense.create(req.body);
  res.json(expense);
});

module.exports = router;