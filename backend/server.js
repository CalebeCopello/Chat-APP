import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
const app = express()
import connectDB from './config/dbConn.js'

connectDB()

const PORT = process.env.PORT

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(PORT, (req, res) => {
    console.log(`Server running on port ${PORT}\nhttp://localhost:${PORT}`)
    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB')
    })
})
