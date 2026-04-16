import fetch from "node-fetch";
import { config } from "dotenv";

config();

import { API_URL } from "./env.js";

const OAUTH_PASSWORD = process.env.OAUTH_PASSWORD;

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