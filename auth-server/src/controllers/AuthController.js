import fetch from 'node-fetch'
import {
  CLIENT_ID,
  CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
} from '../config/env.js'
import { loginOrRegister } from '../config/api.js'

export class AuthController {

  githubAuth(req, res) {
    const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user:email`
    res.redirect(url)
  }

  async githubCallback(req, res) {
    const { code } = req.query

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

    res.redirect(`http://localhost:5173/oauth-success?token=${token}`)
  }

  googleAuth(req, res) {
    const url =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${GOOGLE_CLIENT_ID}` +
      `&redirect_uri=http://localhost:3001/auth/google/callback` +
      `&response_type=code` +
      `&scope=openid email profile`

    res.redirect(url)
  }

  async googleCallback(req, res) {
    const { code } = req.query

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

    res.redirect(`http://localhost:5173/oauth-success?token=${token}`)
  }
}