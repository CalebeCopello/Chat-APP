import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
const app = express()
import connectDB from './config/dbConn.js'
import authRoute from './routes/authRoute.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

connectDB()

const PORT = process.env.PORT
app.use(express.json())
app.use(cookieParser())
const allowedOrigins = ['http://192.168.2.105:5173', 'http://localhost:5173'];
app.use(cors({
    credentials: true,
    origin: allowedOrigins
}))

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/api/auth', authRoute)

app.listen(PORT, (req, res) => {
    console.log(`Server running on port ${PORT}\nhttp://localhost:${PORT}`)
    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB')
    })
})
