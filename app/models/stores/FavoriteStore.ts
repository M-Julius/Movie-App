import { detach, Instance, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "../helpers/withSetPropAction";
import { DetailMovies, DetailMoviesModel } from "../DetailMovies";

/**
 * Example store containing Rick and Morty movies
 */
export const FavoriteStoreModel = types
    .model("FavoriteStore")
    .props({
        favorite: types.optional(types.array(DetailMoviesModel), []),
    })
    .actions(withSetPropAction)
    .actions((self) => ({
        addToFavorite: (movieSnapshots: DetailMovies) => {
            self.setProp("favorite", [...self.favorite, movieSnapshots]);
        },
        removeFavorite: (movieId: number) => {
            const movie = self.favorite.find((fav) => fav.id === movieId);
            if (movie) {
                detach(movie);
                self.favorite.remove(movie);
            }
        },
    })).actions((self) => ({
        toggleFavorite: (movie: DetailMovies) => {
            const existing = self.favorite.find((fav) => fav.id === movie.id);
            if (existing) {
                self.removeFavorite(movie.id);
            } else {
                self.addToFavorite(movie);
            }
        },
    }))
    .views((self) => ({
        isFavorite: (id: number) => self.favorite.some((movie) => movie.id === id),
    }));

export interface FavoriteStore extends Instance<typeof FavoriteStoreModel> { }
export interface FavoriteStoreSnapshot extends SnapshotOut<typeof FavoriteStoreModel> { }