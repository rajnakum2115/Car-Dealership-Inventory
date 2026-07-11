import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import app from './app.js'

dotenv.config()
let port=process.env.PORT || 6000


app.listen(port,()=>{
    console.log("Hello from server")
    console.log(`Server is running on port ${port}`);
    connectDb()
})