import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { userRouter } from "./routes/Users.js";
import dotenv from "dotenv";
dotenv.config();
import {ExpenseRouter} from './routes/Expense.js';

const PORT = 3000;
const DATABASE_URI = process.env.MONGODB_URI;
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
// app.use('/api', routes);

// authentication route
app.use("/auth", userRouter);

// expense route
app.use("/users", ExpenseRouter);

mongoose
  .connect(DATABASE_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.get("/", (req, res) => {
  res.send("Hello there");
});

app.listen(PORT, () => {
  console.log("Server Started");
});
