import express from "express"
import {client} from "./index.js"


const moviesRuter = express.Router()

moviesRuter.get("/:id",async (request,response)=>{
    const {id}= request.params
    const movie = await client.db("bw251").collection("movies").findOne({id:id})
    // const movie = movies.filter((mv)=>mv.id === id)
    movie?response.send(movie):response.send("Movie not found")
})


moviesRuter.get("/",async (request,response)=>{
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
    response.send(filtermovies)
})


// For new data post
moviesRuter.post("/",express.json(),async (req,res)=>{
  const insertResponse = await client
  .db("bw251")
  .collection("movies")
  .insertMany(req.body)

  res.send(insertResponse)

})

// Update the data

moviesRuter.put("/:id",express.json(),async (req,res)=>{
  const editResponse = await client
  .db("bw251")
  .collection("movies")
  .updateOne(req.params,{$set:req.body})
  res.send(editResponse)
})


//Delete the movie with id

moviesRuter.delete("/:id",express.json(),async (req,res)=>{
  const deleteResponse = await client
  .db("bw251")
  .collection("movies")
  .deleteOne(req.params)
  res.send(deleteResponse)
})

export {moviesRuter}

