import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/withSetPropAction";
import { GenreModel } from "./Genre";

/**
 * Model representing a movie with its properties.
 */
export const MoviesModel = types.model("Movies")
  .props({
    id: types.identifierNumber,
    poster_path: types.maybeNull(types.string),
    adult: types.maybeNull(types.boolean),
    overview: types.maybeNull(types.string),
    release_date: types.maybeNull(types.string),
    genre_ids: types.maybeNull(types.array(types.integer)),
    original_title: types.maybeNull(types.string),
    original_language: types.maybeNull(types.string),
    title: types.maybeNull(types.string),
    backdrop_path: types.maybeNull(types.string),
    popularity: types.maybeNull(types.number),
    vote_count: types.maybeNull(types.integer),
    video: types.maybeNull(types.boolean),
    vote_average: types.maybeNull(types.number),
    genres: types.array(GenreModel),
  }).actions(withSetPropAction).views((self) => ({
    get genre() {
      return self.genres.length > 0 ? self.genres[0].name : '-';
    }
  }));

export interface Movies extends Instance<typeof MoviesModel> { }
export interface MovieSnapshotOut extends SnapshotOut<typeof MoviesModel> { }
export interface MovieSnapshotIn extends SnapshotIn<typeof MoviesModel> { }
