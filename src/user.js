import express from "express";
import { client } from "./index.js";
import { getPassword,getUserByName ,verifyPassword} from "./helper.js";

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
   const isUserExist = await getUserByName(userid)
   if(!isUserExist){
    res.send({message:"Invalid Credentials"})
   }
   const isPasswordCorrect = await verifyPassword(userid,password)
   if(!isPasswordCorrect){
    res.send({message:"Invalid Credentials"})
    return;
   }
   res.send("hello")

})

export {userRouter}