/**
 * API: Handles communication with the backend GraphQL API for authentication and user management.
 * 
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

import fetch from "node-fetch";
import { config } from "dotenv";

config();

import { API_URL } from "./env.js";

const OAUTH_PASSWORD = process.env.OAUTH_PASSWORD;

/**
 * Makes an authentication request to the backend GraphQL API.
 * 
 * @param {string} query - The GraphQL query or mutation to execute.
 * @param {string} email - The user's email address to use for authentication.
 * @returns {Promise<Object|null>} - A promise that resolves to the response data or null if authentication fails.
 */
const makeAuthRequest = async (query, email) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: {
        email,
        password: OAUTH_PASSWORD,
      },
    }),
  });

  const data = await res.json();

  if (!res.ok || data.errors) return null;

  return data;
};

/**
 * Logs in a user with the provided email.
 * 
 * @param {string} email - The user's email address.
 * @returns {Promise<string|null>} - A promise that resolves to the authentication token or null if login fails.
 */
const login = async (email) => {
  const data = await makeAuthRequest(
    `
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
  `,
    email
  );

  return data?.data?.login?.token || null;
};

/**
 * Registers a new user with the provided email.
 * 
 * @param {string} email - The user's email address.
 * @returns {Promise<string|null>} - A promise that resolves to the authentication token or null if registration fails.
 */
const register = async (email) => {
  const data = await makeAuthRequest(
    `
    mutation Register($email: String!, $password: String!) {
      register(email: $email, password: $password) {
        token
      }
    }
  `,
    email
  );

  return data?.data?.register?.token || null;
};

/**
 * Attempts to log in a user, and if that fails, tries to register them.
 *
 *  @param {string} email - The user's email address.
 * @returns {Promise<string>} - A promise that resolves to the authentication token.
 *  @throws {Error} - Throws an error if both login and registration fail.
 */
export const loginOrRegister = async (email) => {
  try {
    const loginToken = await login(email);
    if (loginToken) return loginToken;

    const registerToken = await register(email);
    if (registerToken) return registerToken;

    throw new Error("Authentication failed");
  } catch (err) {
    console.error("loginOrRegister error:", err.message);
    throw new Error("Authentication service unavailable");
  }
};