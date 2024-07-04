import express from 'express';
import multer from 'multer';
import {ExpenseModel} from '../models/Expense.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle form submission
router.post('/expenses', upload.single('invoice'), async (req, res) => {
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
    res.status(400).json({ error: error.message });
  }
});
export {router as ExpenseRouter}

// module.exports = router;
