import bcrypt from "bcrypt"
import {client} from "../index.js"



async function getMoviesById(id){
    console.log(id)
    const movie = await client.db("bw251").collection("movies").findOne({id:id})
    return movie
}

async function getAllMovies(filter){
    if(filter.rating){
        filter.rating = +filter.rating
    }
    const filtermovies = await client
    .db("bw251")
    .collection("movies")
    .find(filter)
    .toArray()
    return filtermovies
}

async function insertMovie(movie){
    return await client.db("bw251").collection("movies").insertMany(movie)
}


async function updateMovie(id,movie){

    return await client.db("bw251").collection("movies").updateOne({_id:id},{$set:movie})    
}


async function deleteMovie(id){
    return await client
  .db("bw251")
  .collection("movies")
  .deleteOne(id)
}





async function getPassword(password){
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)
    return(hashPassword)
}

async function getUserByName(user){
    const userById = await client.db("bw251").collection("users").findOne({userid:user})
    return userById
}



export {getPassword,getUserByName,getMoviesById,getAllMovies,updateMovie,deleteMovie,insertMovie}