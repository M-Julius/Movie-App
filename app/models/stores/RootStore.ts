import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { MovieStoreModel } from "./MovieStore"
import { FavoriteStoreModel } from "./FavoriteStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  movieStore: types.optional(MovieStoreModel, {}),
  favoriteStore: types.optional(FavoriteStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
