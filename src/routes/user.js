import express from "express";
import { client } from "../index.js";
import { getPassword,getUserByName } from "./helper.js";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

const userRouter = express.Router()

userRouter.post("/signup",express.json(),async (req,res)=>{
   const {userid,password} = req.body
   const isUserExist = await getUserByName(userid)
   if(isUserExist){
    res.status(400).send({message:"user already exist"})
    return;
   }

   if(!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)){
    res.status(400).send({message:"Password is not strong"})
    return;
    }
   const hashPassword = await getPassword(password)
   const insertRes =  await client.db("bw251").collection("users").insertOne({userid,hashPassword})
   res.send(insertRes)
})




userRouter.post("/login",express.json(),async(req,res)=>{
   const {userid,password} = req.body
   const userFromDb = await getUserByName(userid)
   if(!userFromDb){
    res.status(401).send({message:"Invalid Credentials"})
    return;
   }
   const isPasswordCorrect = await bcrypt.compare(password,userFromDb.hashPassword)
   if(isPasswordCorrect){
    const token = Jwt.sign({pk:userFromDb._id},process.env.SECRET_KEY)
    res.status(200).send({message:"success",token:token})
   }
   else{
    res.status(401).send({message:"Invalid Credentials"})
    return;
   }

})

export {userRouter}