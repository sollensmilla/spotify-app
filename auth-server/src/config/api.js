import fetch from 'node-fetch'
import { API_URL } from './env.js'

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
        password: 'oauth-login'
      }
    })
  })

  const loginData = await loginRes.json()

  if (!loginData.errors) {
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
        password: 'oauth-login'
      }
    })
  })

  const registerData = await registerRes.json()
  return registerData.data.register.token
}