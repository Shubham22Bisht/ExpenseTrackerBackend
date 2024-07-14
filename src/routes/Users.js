import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {UserModel} from "../models/Users.js";

const router=express.Router();

router.post("/register", async (req, res) => {
    const { username, password,email } = req.body;
    const user = await UserModel.findOne({email});
  
    if (user) {
      return res.json({message:"UserEmail already exists.Please try with another email"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword,email });
  
    await newUser.save();
    res.json({message:"User Registered Successfully"});
  });
  
  router.post("/login", async (req,res) => {
      const {userEmail,password}=req.body;
      const email=userEmail;
      const user=await UserModel.findOne({email});
      if(!user){
          return res.json({message:"UserEmail does not exist"});
      }
      const isPasswordValid=await bcrypt.compare(password,user.password);
  
      if(!isPasswordValid){
          return res.json({message:"Invalid Password"});
      }
      
      const token=jwt.sign({id:user._id},"secret");
      res.json({token,userID:user._id});
  });

export {router as userRouter};


export const verifyToken=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
      jwt.verify(token,"secret",(err)=>{
        if(err)return res.sendStatus(403);
        next();
      })
    }else{
      res.sendStatus(401);
    }
  }