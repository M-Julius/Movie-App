// Use this import if you want to use "env" file
const { API_URL, API_KEY } = require("../../config/env")
// Or just specify it directly like this:
// const API_URL = "https://api.themoviedb.org/3"

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number

  /**
   * API Key from moviedb
   */

  apiKey: string
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL,
  timeout: 10000,
  apiKey: API_KEY,
}
