import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.get('/auth/github', (req, res) => {
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user:email`
    res.redirect(url)
})

app.get('/auth/github/callback', async (req, res) => {
    const { code } = req.query

    const params = new URLSearchParams()
    params.append('client_id', process.env.CLIENT_ID)
    params.append('client_secret', process.env.CLIENT_SECRET)
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

    console.log(githubUser)

    res.send("OAuth running")
})

app.listen(3001, () => console.log('Auth server running'))