/**
 * API: Handles communication with the backend GraphQL API for authentication and user management.
 *
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

import fetch from 'node-fetch'
import { config } from 'dotenv'

import { API_URL } from './env.js'

config()

const OAUTH_PASSWORD = process.env.OAUTH_PASSWORD

if (!OAUTH_PASSWORD) {
  throw new Error('Missing OAUTH_PASSWORD environment variable')
}

const REQUEST_TIMEOUT = 5000

/**
 * Fetches data from a URL with a timeout.
 *
 * @param {string} url - The URL to fetch.
 * @param {object} options - The fetch options.
 * @param {number} timeoutMs - The timeout in milliseconds.
 * @returns {Promise<Response>} - A promise that resolves to the fetch response.
 */
const fetchWithTimeout = async (url, options, timeoutMs) => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    return res
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Request timeout', { cause: err })
    }
    throw new Error('Network request failed', { cause: err })
  } finally {
    clearTimeout(timeout)
  }
}

/**
 * Safely parses JSON from a fetch response.
 *
 * @param {Response} res - The fetch response.
 * @returns {Promise<object>} - A promise that resolves to the parsed JSON data.
 */
const parseJsonSafe = async (res) => {
  try {
    return await res.json()
  } catch (err) {
    throw new Error('Invalid JSON response from API', { cause: err })
  }
}

/**
 * Validates the GraphQL response for errors.
 *
 * @param {Response} res - The fetch response.
 * @param {object} data - The parsed JSON data.
 */
const validateGraphQLResponse = (res, data) => {
  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`)
  }

  if (data.errors) {
    throw new Error(`GraphQL error: ${JSON.stringify(data.errors)}`)
  }
}

/**
 * Makes an authenticated request to the GraphQL API for login or registration.
 *
 * @param {string} query - The GraphQL query or mutation to execute.
 * @param {string} email - The user's email address to use for authentication.
 * @returns {Promise<object>} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails, times out, or if the API returns an error.
 */
const makeAuthRequest = async (query, email) => {
  try {
    const res = await fetchWithTimeout(
      API_URL,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          variables: {
            email,
            password: OAUTH_PASSWORD
          }
        })
      },
      REQUEST_TIMEOUT
    )

    const data = await parseJsonSafe(res)

    validateGraphQLResponse(res, data)

    return data
  } catch (err) {
    throw new Error('Auth request failed', { cause: err })
  }
}

/**
 * Logs in a user with the provided email.
 *
 * @param {string} email - The user's email address.
 * @returns {Promise<string>} - A promise that resolves to the authentication token.
 * @throws {Error} - Throws an error if login fails.
 */
const login = async (email) => {
  try {
    const data = await makeAuthRequest(
      `
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `,
      email
    )

    return data?.data?.login?.token ?? null
  } catch (err) {
    console.error('Login failed:', err.message)
    return null
  }
}

/**
 * Registers a new user with the provided email.
 *
 * @param {string} email - The user's email address.
 * @returns {Promise<string>} - A promise that resolves to the authentication token.
 * @throws {Error} - Throws an error if registration fails.
 */
const register = async (email) => {
  try {
    const data = await makeAuthRequest(
      `
      mutation Register($email: String!, $password: String!) {
        register(email: $email, password: $password) {
          token
        }
      }
    `,
      email
    )

    return data?.data?.register?.token ?? null
  } catch (err) {
    console.error('Register failed:', err.message)
    return null
  }
}

/**
 * Attempts to log in a user, and if that fails, tries to register them.
 *
 * @param {string} email - The user's email address.
 * @returns {Promise<string>} - A promise that resolves to the authentication token.
 * @throws {Error} - Throws an error if both login and registration fail.
 */
export const loginOrRegister = async (email) => {
  const loginToken = await login(email)
  if (loginToken) return loginToken

  const registerToken = await register(email)
  if (registerToken) return registerToken

  throw new Error('Authentication failed: login and register both failed')
}
