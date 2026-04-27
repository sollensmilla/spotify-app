/**
 * Environment Variables: Loads and exports environment variables from the .env file for use in the authentication server.
 *
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

import dotenv from 'dotenv'
dotenv.config()

export const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  API_URL
} = process.env
