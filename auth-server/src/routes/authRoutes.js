import express from 'express'
import { AuthController } from '../controllers/authController.js'

const router = express.Router()
const controller = new AuthController()

router.get('/github', controller.githubAuth.bind(controller))
router.get('/github/callback', controller.githubCallback.bind(controller))

router.get('/google', controller.googleAuth.bind(controller))
router.get('/google/callback', controller.googleCallback.bind(controller))

router.get('/me', controller.me.bind(controller))
router.post('/logout', controller.logout.bind(controller))

export default router