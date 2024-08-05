/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import { getGeneralApiProblem } from "./apiProblem"
import type { ApiConfig, GetCreditsResult, GetMovieResult, GetMoviesResult, GetResultGenres } from "./api.types"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
  apiKey: Config.API_KEY,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
      params: {
        api_key: this.config.apiKey,
      }
    })
  }

  /**
   * Gets a list of recent React Native Radio episodes.
   */
  async getMoviesPopular(page: number = 1): Promise<GetMoviesResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.apisauce.get(`/movie/popular?page=${page}`)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const data = response.data;

      return { kind: "ok", data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }

  async getMoviesTopRated(page: number = 1): Promise<GetMoviesResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.apisauce.get(`/movie/top_rated?page=${page}`)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const data = response.data;

      return { kind: "ok", data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }

  async getNowPlayingMovies(): Promise<GetMoviesResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.apisauce.get("/movie/now_playing")

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const data = response.data;
      return { kind: "ok", data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }

  async searchMovies(query: string, page: number = 1): Promise<GetMoviesResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.apisauce.get(`/search/movie?query=${query}&page=${page}`)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const data = response.data
      return { kind: "ok", data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }

  async getDetailMovie(id: number): Promise<GetMovieResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.apisauce.get(`/movie/${id}`)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const movie = response.data
      return { kind: "ok", movie }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }

  async getCastMovie(id: number): Promise<GetCreditsResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.apisauce.get(`/movie/${id}/credits`)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const cast = response.data?.cast
      return { kind: "ok", cast }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }

  async getMoviesSimilar(id: number, page: number = 1): Promise<GetMoviesResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.apisauce.get(`/movie/${id}/similar?page=${page}`)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const data = response.data
      return { kind: "ok", data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }

  async getGenres(): Promise<GetResultGenres> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.apisauce.get(`/genre/movie/list`)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const data = response.data
      return { kind: "ok", genres: data.genres }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
