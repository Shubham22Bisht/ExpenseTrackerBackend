import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email:{ type: String,unique:true,required:true},
  expenses: [{type: mongoose.Schema.Types.ObjectId, ref: "Expense"}]
});

export const UserModel=mongoose.model("users",UserSchema);
