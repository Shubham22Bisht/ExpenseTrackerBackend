import express from 'express';
import { ExpenseModel } from '../models/Expense.js';
import { upload, generateUniqueFileName } from '../middlewares/FileUpload.js';
import { validateExpense } from "../validators/ExpenseValidator.js";
import { UserModel } from '../models/Users.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.post('/expenses', upload.single('invoice'), validateExpense, async (req, res) => {
  const { date, total, category, description, userId } = req.body;
  const invoiceFile = req.file;

  if (!invoiceFile) {
    return res.status(400).json({ error: 'Invoice file is required' });
  }

  const invoiceFilename = generateUniqueFileName(invoiceFile.originalname);

  try {
    // Save the file to disk
    const invoiceFilePath = path.join(__dirname, '..', 'uploads', invoiceFilename);
    fs.writeFileSync(invoiceFilePath, invoiceFile.buffer);

    const newExpense = new ExpenseModel({
      date,
      total,
      category,
      description,
      invoice: invoiceFilename, // Store filename instead of file content
      user: userId,
    });

    await newExpense.save();

    const createdUser = await UserModel.findById(userId);

    if (!createdUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!createdUser.expenses) {
      createdUser.expenses = [];
    }
    createdUser.expenses.push(newExpense._id);
    await createdUser.save();

    res.status(201).json(newExpense);
  } catch (error) {
    console.error('Error saving expense:', error);
    res.status(400).json({ error: error.message });
  }
});

export { router as ExpenseRouter };
