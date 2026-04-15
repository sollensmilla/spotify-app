import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './src/routes/authRoutes.js'

const app = express()

app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/auth', authRoutes)

app.listen(3001, () => console.log('Auth server running'))