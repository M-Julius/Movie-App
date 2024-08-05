import { detach, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Movies, MoviesModel } from "../Movies"
import { Api } from "app/services/api/api";
import { withSetPropAction } from "../helpers/withSetPropAction";
import { GenreModel } from "../Genre";

/**
 * Example store containing Rick and Morty movies
 */
export type MovieType = 'popular' | 'topRated' | 'nowPlaying' | 'similar' | 'searched' | 'favorite'

export const MovieStoreModel = types
  .model("MovieStore")
  .props({
    popular: types.array(MoviesModel),
    topRated: types.array(MoviesModel),
    nowPlaying: types.array(MoviesModel),
    similar: types.array(MoviesModel),
    searched: types.array(MoviesModel),
    genres: types.array(GenreModel),
    favorite: types.array(MoviesModel),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    parseGenres: (genreIds: number[]) => {
      return JSON.parse(JSON.stringify(genreIds?.map(genreId => self.genres.find(genre => genre.id === genreId)).filter(Boolean) ?? []));
    }
  }))
  .actions((self) => {
    return {
      saveMovies: (type: MovieType, movieSnapshots: Movies[]) => {
        const movies = movieSnapshots.map(movie => {
          const genres = self.parseGenres(movie?.genre_ids ?? []) ?? []
          return ({
            ...movie,
            genres,
          })
        });

        detach(self[type]);
        self.setProp(type, movies);
      },
      appendMovies: (movieSnapshots: Movies[], type: MovieType) => {
        // check duplicate
        const newMovies = movieSnapshots.filter((movie) => {
          return !self[type].find((m) => m.id === movie.id)
        }).map(movie => {
          const genres = self.parseGenres(movie?.genre_ids ?? []) ?? []
          return ({
            ...movie,
            genres,
          })
        }
        );
        self[type].push(...newMovies)
      },
      clearMovies: (type: MovieType) => {
        self.setProp(type, [])
      },
    }
  }).actions((self) => {
    let movieApi = new Api();

    return {
      getMoviesPopular: async (page: number = 1) => {
        const result = await movieApi.getMoviesPopular(page)
        if (result.kind === "ok") {
          if (page === 1) {
            self.saveMovies('popular', result.data.results)
          } else {
            self.appendMovies(result.data.results, 'popular')
          }
          return result.data.results;
        } else {
          __DEV__ && console.tron.log(result.kind)
          return [];
        }
      },
      getTopRated: async (page: number = 1) => {
        const result = await movieApi.getMoviesTopRated(page)
        if (result.kind === "ok") {
          if (page === 1) {
            self.saveMovies('topRated', result.data.results)
          } else {
            self.appendMovies(result.data.results, 'topRated')
          }
          return result.data.results;
        } else {
          __DEV__ && console.tron.log(result.kind)
          return [];
        }
      },
      getNowPlayingMovies: async () => {
        const result = await movieApi.getNowPlayingMovies()
        if (result.kind === "ok") {
          self.saveMovies('nowPlaying', result.data.results)
          return result.data.results
        } else {
          __DEV__ && console.tron.log(result.kind)
          return [];
        }
      },
      getSimilarMovies: async (id: number, page: number = 1) => {
        const result = await movieApi.getMoviesSimilar(id, page)
        if (result.kind === "ok") {
          if (page === 1) {
            self.saveMovies('similar', result.data.results)
          } else {
            self.appendMovies(result.data.results, 'similar')
          }
          return result.data.results;
        } else {
          __DEV__ && console.log(result)
          return [];
        }
      },
      getSearchMovies: async (query: string = '', page: number = 1) => {
        const result = await movieApi.searchMovies(query, page)
        if (result.kind === "ok") {
          if (page === 1) {
            self.saveMovies('searched', result.data.results)
          } else {
            self.appendMovies(result.data.results, 'searched')
          }

          return result.data.results;
        } else {
          __DEV__ && console.log(result)
          return [];
        }
      },
      getGenres: async () => {
        const result = await movieApi.getGenres()
        if (result.kind === "ok") {
          self.setProp("genres", result.genres)
        } else {
          __DEV__ && console.log(result)
        }
      }
    }
  }).actions((self) => {
    let movieApi = new Api();

    return {
      getDetailMovies: async (id: number) => {
        const resultMovie = await movieApi.getDetailMovie(id)
        const resultCast = await movieApi.getCastMovie(id)
        const resultSimilar = await self.getSimilarMovies(id)

        return { movie: resultMovie, cast: resultCast, similar: resultSimilar }
      },
      getMoviesInMainPage: async () => {
        await self.getGenres().then(async () => {
          await self.getMoviesPopular()
          await self.getTopRated()
          await self.getNowPlayingMovies()
        });

      }
    }
  });


export interface MovieStore extends Instance<typeof MovieStoreModel> { }
export interface MovieStoreSnapshot extends SnapshotOut<typeof MovieStoreModel> { }
