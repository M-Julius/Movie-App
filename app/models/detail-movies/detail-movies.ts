import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const DetailMoviesModel = types.model("DetailMovies").props({
  adult: types.maybeNull(types.boolean),
  backdrop_path: types.maybeNull(types.string),
  belongs_to_collection: types.maybeNull(types.string),
  budget: types.maybeNull(types.number),
  genres: types.maybeNull(
    types.array(
      types.model({
        name: types.maybeNull(types.string),
        id: types.maybeNull(types.number),
      }),
    ),
  ),
  homepage: types.maybeNull(types.string),
  id: types.maybeNull(types.number),
  imdb_id: types.maybeNull(types.string),
  original_language: types.maybeNull(types.string),
  original_title: types.maybeNull(types.string),
  overview: types.maybeNull(types.string),
  popularity: types.maybeNull(types.number),
  poster_path: types.maybeNull(types.string),
  release_date: types.maybeNull(types.string),
  revenue: types.maybeNull(types.number),
  runtime: types.maybeNull(types.number),
  status: types.maybeNull(types.string),
  tagline: types.maybeNull(types.string),
  title: types.maybeNull(types.string),
  video: types.maybeNull(types.boolean),
  vote_average: types.maybeNull(types.number),
  vote_count: types.maybeNull(types.number),
})

type DetailMoviesType = Instance<typeof DetailMoviesModel>
export interface DetailMovies extends DetailMoviesType {}
type DetailMoviesSnapshotType = SnapshotOut<typeof DetailMoviesModel>
export interface DetailMoviesSnapshot extends DetailMoviesSnapshotType {}
export const createDetailMoviesDefaultModel = () => types.optional(DetailMoviesModel, {})
