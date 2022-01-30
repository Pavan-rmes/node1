import express from "express"
import {client} from "../index.js"
import {getPassword,getUserByName,getMoviesById,getAllMovies,updateMovie,deleteMovie,insertMovie} from "./helper.js"
import {auth} from "../Auth/token.js"

const moviesRuter = express.Router()

moviesRuter.get("/:id",auth,async (request,response)=>{
    const {id}= request.params
    const movie = await getMoviesById(id)
    movie?response.send(movie):response.send("Movie not found")
})


moviesRuter.get("/",async (request,response)=>{
    const filter = request.query
    const filtermovies = await getAllMovies(filter)
    response.send(filtermovies)
})


// For new data post
moviesRuter.post("/",express.json(),async (req,res)=>{
  const insertResponse = await insertMovie(req.body)
  res.send(insertResponse)

})

// Update the data

moviesRuter.put("/:id",express.json(),async (req,res)=>{
  const editResponse =await updateMovie(req.params,req.body)
  res.send(editResponse)
})


//Delete the movie with id

moviesRuter.delete("/:id",express.json(),async (req,res)=>{
  const deleteResponse = await deleteMovie(req.params)
  res.send(deleteResponse)
})

export {moviesRuter}

