import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './src/routes/authRoutes.js'

const app = express()

app.use(cookieParser())

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

const allowedOrigins = [
  'http://localhost:5173',
  'https://spotify-app-production-6203.up.railway.app'
]

app.use(cors({
  origin: function (origin, callback) {
    console.log('Incoming origin:', origin)

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Auth server is running')
})

const PORT = process.env.PORT || 3001

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Auth server running on ${PORT}`)
})
