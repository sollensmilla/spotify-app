import express from 'express'
import authRoutes from './src/routes/authRoutes.js'

const app = express()

app.use('/auth', authRoutes)

app.listen(3001, () => console.log('Auth server running'))