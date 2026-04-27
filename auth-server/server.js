import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './src/routes/authRoutes.js'

const app = express()

app.use(cookieParser())

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}))

app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Auth server running on ${PORT}`)
})
