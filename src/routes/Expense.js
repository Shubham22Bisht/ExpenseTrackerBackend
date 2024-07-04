import express from 'express';
import { ExpenseModel } from '../models/Expense.js';
import { upload } from '../middlewares/FileUpload.js';
import { validateExpense } from "../validators/ExpenseValidator.js";

const router = express.Router();

router.post('/expenses', upload.single('invoice'), validateExpense, async (req, res) => {
  const { date, total, category, description } = req.body;
  const invoice = req.file.buffer.toString('base64'); // Store file as base64 string

  try {
    const newExpense = new ExpenseModel({
      date,
      total,
      category,
      description,
      invoice,
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    console.error('Error saving expense:', error); // Log error for debugging
    res.status(400).json({ error: error.message });
  }
});

export { router as ExpenseRouter };
