import bcrypt from "bcrypt"
import {client} from "./index.js"

async function getPassword(password){
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)
    return(hashPassword)
}

async function getUserByName(user){
    const userById = await client.db("bw251").collection("users").findOne({userid:user})
    return userById
}

async function verifyPassword(user,password){
    const userById = await client.db("bw251").collection("users").findOne({userid:user})
    const hashPassword = await bcrypt.compare(password,userById.hashPassword)
    return hashPassword
}


export {getPassword,getUserByName,verifyPassword}