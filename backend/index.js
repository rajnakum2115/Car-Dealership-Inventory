import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import app from './app.js'

dotenv.config()
let port=process.env.PORT || 6000

let app = express()

app.listen(port,()=>{
    console.log("Hello from server")
    connectDb()
})