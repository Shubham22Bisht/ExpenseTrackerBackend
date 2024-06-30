import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/Users.js";
const PORT=3000;
const app=express();

app.use(express.json());
app.use(cors());

// authentication route
app.use("/auth",userRouter);


mongoose.connect("mongodb+srv://shubhambisht1924:H2t02PtDRlOH4D1j@cluster0.axbayjz.mongodb.net/Expense_Tracker");

app.get("/",(req,res)=>{
    res.send("Hello there");
})

app.listen(PORT,()=>{
    console.log("Server Started");
})
