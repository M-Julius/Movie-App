import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const MoviesModel = types.model("Movies").props({
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
  vote_count: types.maybeNull(types.number),
  video: types.maybeNull(types.boolean),
  vote_average: types.maybeNull(types.number),
})

type MoviesType = Instance<typeof MoviesModel>
export interface Movies extends MoviesType {}
type MoviesSnapshotType = SnapshotOut<typeof MoviesModel>
export interface MoviesSnapshot extends MoviesSnapshotType {}
export const createMoviesDefaultModel = () => types.optional(MoviesModel, {})
