import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetMoviesResult, GetMovieResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

export class MovieApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getMoviesPopular(): Promise<GetMoviesResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get("/movie/popular")

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const movies = response.data.results

      return { kind: "ok", movies }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getMoviesTopRated(): Promise<GetMoviesResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get("/movie/top_rated")

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const movies = response.data.results

      return { kind: "ok", movies }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getNowPlayingMovies(): Promise<GetMoviesResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get("/movie/now_playing")

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const movies = response.data.results
      return { kind: "ok", movies }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getDetailMovie(id: number): Promise<GetMovieResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(`/movie/${id}`)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const movie = response.data
      return { kind: "ok", movie }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getMoviesSimilar(id: number): Promise<GetMoviesResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(`/movie/${id}/similar`)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const movies = response.data.results
      return { kind: "ok", movies }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
