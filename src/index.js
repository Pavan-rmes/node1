// const { request, response } = require("express");
import express from "express"
import { MongoClient } from "mongodb";
import {moviesRuter} from "./movies.js"
import dotenv from "dotenv";
dotenv.config();
// import { runInNewContext } from "vm";
// const express = require("express")


console.log(process.env.Mongodb)
// For local --"mongodb://localhost:27017"
// const Mongodb = 'mongodb+srv://pavan98:Pavan98@cluster0.wwnwy.mongodb.net'
const Mongodb = process.env.Mongodb
async function createConnection(){
    const client = new MongoClient(Mongodb)
    await client.connect()
    console.log("Db Connected")
    return client
}

const client = await createConnection()

const app = express()

const PORT = process.env.PORT
app.listen(PORT)

app.use("/movies",moviesRuter)

moviesRuter.get("/",(req,res)=>{
  res.send("Hello")
})



export {client}