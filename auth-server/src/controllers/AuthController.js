/**
 * Auth Controller: Handles authentication logic for GitHub and Google OAuth, as well as user session management.
 *
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

import fetch from 'node-fetch'
import {
  CLIENT_ID,
  CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
} from '../config/env.js'
import { loginOrRegister } from '../config/api.js'
import jwt from 'jsonwebtoken'

/**
 * AuthController: A class that defines methods for handling authentication routes and logic.
 */
export class AuthController {
  /**
   * Handles the GitHub OAuth authentication request.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   */
  githubAuth (req, res) {
    const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user:email`
    res.redirect(url)
  }

  /**
   * Handles the GitHub OAuth callback.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves when the callback is handled.
   */
  async githubCallback (req, res) {
    try {
      const { code } = req.query
      if (!code) return res.redirect('http://localhost:5173')

      const params = new URLSearchParams()
      params.append('client_id', CLIENT_ID)
      params.append('client_secret', CLIENT_SECRET)
      params.append('code', code)

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      })

      const { access_token } = await tokenRes.json()

      const userRes = await fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${access_token}` }
      })

      const githubUser = await userRes.json()

      let email = githubUser.email

      if (!email) {
        const emailRes = await fetch('https://api.github.com/user/emails', {
          headers: { Authorization: `Bearer ${access_token}` }
        })
        const emails = await emailRes.json()
        email = emails.find(e => e.primary)?.email
      }

      const token = await loginOrRegister(email)

      res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/'
      })

      res.redirect('http://localhost:5173')
    } catch (err) {
      console.error(err)
      res.redirect('http://localhost:5173')
    }
  }

  /**
   * Handles the Google OAuth authentication request.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   */
  googleAuth (req, res) {
    const url =
      'https://accounts.google.com/o/oauth2/v2/auth?' +
      `client_id=${GOOGLE_CLIENT_ID}` +
      '&redirect_uri=http://localhost:3001/auth/google/callback' +
      '&response_type=code' +
      '&scope=openid email profile'

    res.redirect(url)
  }

  /**
   * Handles the Google OAuth callback.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves when the callback is handled.
   */
  async googleCallback (req, res) {
    try {
      const { code } = req.query
      if (!code) return res.redirect('http://localhost:5173')

      const params = new URLSearchParams()
      params.append('client_id', GOOGLE_CLIENT_ID)
      params.append('client_secret', GOOGLE_CLIENT_SECRET)
      params.append('code', code)
      params.append('redirect_uri', 'http://localhost:3001/auth/google/callback')
      params.append('grant_type', 'authorization_code')

      const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
      })

      const tokenData = await tokenRes.json()

      const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` }
      })

      const googleUser = await userRes.json()

      const token = await loginOrRegister(googleUser.email)

      res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/'
      })

      res.redirect('http://localhost:5173')
    } catch (err) {
      console.error(err)
      res.redirect('http://localhost:5173')
    }
  }

  /**
   * Retrieves the authenticated user's information.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   */
  me (req, res) {
    const token = req.cookies.jwt

    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      res.json(decoded)
    } catch {
      res.status(401).json({ error: 'Token expired or invalid' })
    }
  }

  /**
   * Logs out the user by clearing the authentication cookie.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   */
  logout (req, res) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/'
    })

    res.json({ message: 'Logged out' })
  }
}
