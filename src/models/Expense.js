import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  date: { type: String, required: true },
  total: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  invoice: { type: String, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
});

// module.exports = mongoose.model('Expense', ExpenseSchema);
export const ExpenseModel=mongoose.model("Expense",ExpenseSchema);