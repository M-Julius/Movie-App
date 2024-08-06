import { cast, detach, Instance, SnapshotOut, types } from "mobx-state-tree";
import { Movies, MoviesModel } from "../Movies";
import { withSetPropAction } from "../helpers/withSetPropAction";
import { GenreModel } from "../Genre";
import { MovieApi } from "app/services/api/movieApi";
import { GetMoviesResult } from "app/services/api";

/**
 * Example store containing Rick and Morty movies
 */
export type MovieType = 'popular' | 'topRated' | 'nowPlaying' | 'similar' | 'searched' | 'favorite';

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
    const saveMovies = (type: MovieType, movieSnapshots: Movies[]) => {
      const movies = movieSnapshots.map(movie => {
        const genres = self.parseGenres(movie?.genre_ids ?? []);
        return {
          ...movie,
          genres,
        };
      });

      detach(self[type]);
      self.setProp(type, movies);
    };

    const appendMovies = (movieSnapshots: Movies[], type: MovieType) => {
      const newMovies = movieSnapshots
        .filter(movie => !self[type].find(m => m.id === movie.id))
        .map(movie => {
          const genres = self.parseGenres(movie?.genre_ids ?? []);
          return {
            ...movie,
            genres,
          };
        });

      self[type] = cast([...self[type], ...newMovies]);
    };

    const clearMovies = (type: MovieType) => {
      self.setProp(type, []);
    };

    return {
      saveMovies,
      appendMovies,
      clearMovies,
    }
  })
  .actions((self) => {
    const movieApi = new MovieApi();

    // for movies list
    const handleApiResult = async <T extends GetMoviesResult>(apiCall: () => Promise<T>, type: MovieType, page: number) => {
      try {
        const result = await apiCall();
        if (result.kind === "ok") {
          if (page === 1) {
            self.saveMovies(type, JSON.parse(JSON.stringify(result.data.results)));
          } else {
            self.appendMovies(result.data.results, type);
          }
          return result.data.results;
        } else {
          __DEV__ && console.tron.log(result.kind);
          return [];
        }
      } catch (error) {
        console.log(type, error);
        return [];
      }
    };

    return {
      getMoviesPopular: async (page: number = 1) => {
        return handleApiResult(() => movieApi.getMoviesPopular(page), 'popular', page);
      },
      getTopRated: async (page: number = 1) => {
        return handleApiResult(() => movieApi.getMoviesTopRated(page), 'topRated', page);
      },
      getNowPlayingMovies: async () => {
        return handleApiResult(() => movieApi.getNowPlayingMovies(), 'nowPlaying', 1);
      },
      getSimilarMovies: async (id: number, page: number = 1) => {
        return handleApiResult(() => movieApi.getMoviesSimilar(id, page), 'similar', page);
      },
      getSearchMovies: async (query: string = '', page: number = 1) => {
        return handleApiResult(() => movieApi.searchMovies(query, page), 'searched', page);
      },
      getGenres: async () => {
        try {
          const result = await movieApi.getGenres();
          if (result.kind === "ok") {
            self.setProp("genres", result.genres);
          } else {
            __DEV__ && console.log(result);
          }
        } catch (error) {
          __DEV__ && console.log(error);
        }
      },
    };
  }).actions((self) => {
    const movieApi = new MovieApi();

    return {
      getDetailMovies: async (id: number) => {
        const resultMovie = await movieApi.getDetailMovie(id);
        const resultCast = await movieApi.getCastMovie(id);
        const resultSimilar = await self.getSimilarMovies(id);

        const similar = resultSimilar.map(movie => {
          const genres = self.parseGenres(movie?.genre_ids ?? []);
          return {
            ...movie,
            genres,
          };
        });

        return { movie: resultMovie, cast: resultCast, similar };
      },
      getMoviesInMainPage: async () => {
        await self.getGenres().then(async () => {
          await self.getNowPlayingMovies();
          await self.getMoviesPopular();
          await self.getTopRated();
        });
      }
    }
  });

export interface MovieStore extends Instance<typeof MovieStoreModel> { }
export interface MovieStoreSnapshot extends SnapshotOut<typeof MovieStoreModel> { }