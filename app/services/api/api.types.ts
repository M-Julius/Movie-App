import { DetailMovies } from "app/models/DetailMovies"
import { Movies } from "app/models/Movies"
import { GeneralApiProblem } from "./apiProblem"
import { Cast } from "app/models/Cast"
import { Genre } from "app/models/Genre"

/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface EpisodeItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: {
    link: string
    type: string
    length: number
    duration: number
    rating: { scheme: string; value: string }
  }
  categories: string[]
}

export interface ApiFeedResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: EpisodeItem[]
}


/**
 * The result of a request.
 */
export type ResultListMovies = {
  page: number
  results: Movies[]
  total_results: number
  total_pages: number
}

export type GetResultGenres = { kind: "ok"; genres: Genre[] } | GeneralApiProblem
export type GetMoviesResult = { kind: "ok"; data: ResultListMovies } | GeneralApiProblem
export type GetMovieResult = { kind: "ok"; data: DetailMovies } | GeneralApiProblem
export type GetCreditsResult = { kind: "ok"; data: Cast[] } | GeneralApiProblem


/**
 * The options used to configure apisauce.
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

  apiKey: string
}
