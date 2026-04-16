import fetch from 'node-fetch'
import { config } from 'dotenv'

config()

import { API_URL } from './env.js'

const OAUTH_PASSWORD = process.env.OAUTH_PASSWORD

export const loginOrRegister = async (email) => {
  const loginRes = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
          }
        }
      `,
      variables: {
        email,
        password: OAUTH_PASSWORD
      }
    })
  })

  const loginData = await loginRes.json()

  if (loginRes.ok && !loginData.errors) {
    return loginData.data.login.token
  }

  const registerRes = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation Register($email: String!, $password: String!) {
          register(email: $email, password: $password) {
            token
          }
        }
      `,
      variables: {
        email,
        password: OAUTH_PASSWORD
      }
    })
  })

  const registerData = await registerRes.json()
  return registerData.data.register.token
}