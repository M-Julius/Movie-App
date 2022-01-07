import { cast, Instance, SnapshotOut, types } from "mobx-state-tree"
import { MoviesSnapshot, MoviesModel } from "../movies/movies"
import { MovieApi } from "../../services/api/movie-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Example store containing Rick and Morty movies
 */
export const MovieStoreModel = types
  .model("MovieStore")
  .props({
    popular: types.optional(types.array(MoviesModel), []),
    topRated: types.optional(types.array(MoviesModel), []),
    nowPlaying: types.optional(types.array(MoviesModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveMovies: (movieSnapshots: MoviesSnapshot[]) => {
      self.popular = cast(movieSnapshots)
    },
    saveNowPlaying: (movieSnapshots: MoviesSnapshot[]) => {
      self.nowPlaying = cast(movieSnapshots)
    },
    saveTopRated: (movieSnapshots: MoviesSnapshot[]) => {
      self.topRated = cast(movieSnapshots)
    },
  }))
  .actions((self) => ({
    getMoviesPopular: async () => {
      const movieApi = new MovieApi(self.environment.api)
      const result = await movieApi.getMoviesPopular()

      if (result.kind === "ok") {
        self.saveMovies(result.movies)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    getTopRated: async () => {
      const movieApi = new MovieApi(self.environment.api)
      const result = await movieApi.getMoviesTopRated()

      if (result.kind === "ok") {
        self.saveTopRated(result.movies)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    getNowPlayingMovies: async () => {
      const movieApi = new MovieApi(self.environment.api)
      const result = await movieApi.getNowPlayingMovies()

      if (result.kind === "ok") {
        self.saveNowPlaying(result.movies)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    getDetailMovies: async (id: number) => {
      const movieApi = new MovieApi(self.environment.api)
      const result = await movieApi.getDetailMovie(id)

      return result
    },
    getMoviesSimilar: async (id: number) => {
      const movieApi = new MovieApi(self.environment.api)
      const result = await movieApi.getMoviesSimilar(id)

      return result
    },
  }))
  .actions((self) => ({
    getMoviesInMainPage: async () => {
      await self.getMoviesPopular()
      await self.getTopRated()
      await self.getNowPlayingMovies()
    },
  }))

type MovieStoreType = Instance<typeof MovieStoreModel>
export interface MovieStore extends MovieStoreType {}
type MovieStoreSnapshotType = SnapshotOut<typeof MovieStoreModel>
export interface MovieStoreSnapshot extends MovieStoreSnapshotType {}
export const createMovieStoreDefaultModel = () => types.optional(MovieStoreModel, {})
