// const { request, response } = require("express");
import express from "express"
import { MongoClient } from "mongodb";
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

// app.get("/movies",(request,response)=>{
//     response.send(movies)
// })

app.get("/movies/:id",async (request,response)=>{
    const {id}= request.params
    const movie = await client.db("bw251").collection("movies").findOne({id:id})
    // const movie = movies.filter((mv)=>mv.id === id)
    movie?response.send(movie):response.send("Movie not found")
})


const PORT = process.env.PORT
app.listen(PORT)


app.get("/",(req,res)=>{
  res.send("Hello")
})

app.get("/movies",async (request,response)=>{
    const {language,rating} = request.query

    const filter = request.query
    if(filter.rating){
        filter.rating = +rating
    }
    const filtermovies = await client
    .db("bw251")
    .collection("movies")
    .find(filter)
    .toArray()
    // console.log(filtermovies)
    // if(language){
    //     filtermovies = filtermovies.filter((mv)=>mv.language === language)
    // }

    // if(rating){
    //     filtermovies = filtermovies.filter((mv)=>mv.rating === +rating)
    // }

    response.send(filtermovies)
})

// For new data post
app.post("/movies",express.json(),async (req,res)=>{
  const insertResponse = await client
  .db("bw251")
  .collection("movies")
  .insertMany(req.body)

  res.send(insertResponse)

})

// Update the data

app.put("/movies/:id",express.json(),async (req,res)=>{
  const editResponse = await client
  .db("bw251")
  .collection("movies")
  .updateOne(req.params,{$set:req.body})
  res.send(editResponse)
})


//Delete the movie with id

app.delete("/movies/:id",express.json(),async (req,res)=>{
  const deleteResponse = await client
  .db("bw251")
  .collection("movies")
  .deleteOne(req.params)
  res.send(deleteResponse)
})


