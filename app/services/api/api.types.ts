import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"
import { Movies, DetailMovies } from "../../models"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem

export type GetMoviesResult = { kind: "ok"; movies: Movies[] } | GeneralApiProblem
export type GetMovieResult = { kind: "ok"; movie: DetailMovies } | GeneralApiProblem
