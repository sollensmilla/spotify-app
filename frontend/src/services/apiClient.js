/**
 * API Client: A simple wrapper around axios to handle GraphQL requests to the backend.
 *
 * @author Smilla Sollén <ss226uk@student.lnu.se>
 */

import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/graphql'
})

export default apiClient
