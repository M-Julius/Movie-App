import { types, Instance, SnapshotOut } from "mobx-state-tree";
import { GenreModel } from "./Genre";

/**
 * Genre model to describe individual genres in detail movies.
 */

/**
 * BelongsToCollection model to describe collection details.
 */
const BelongsToCollectionModel = types.model("BelongsToCollection").props({
  id: types.number,
  name: types.string,
  poster_path: types.maybeNull(types.string),
  backdrop_path: types.maybeNull(types.string),
});

/**
 * ProductionCompany model to describe production companies.
 */
const ProductionCompanyModel = types.model("ProductionCompany").props({
  id: types.number,
  logo_path: types.maybeNull(types.string),
  name: types.string,
  origin_country: types.string,
});

/**
 * ProductionCountry model to describe production countries.
 */
const ProductionCountryModel = types.model("ProductionCountry").props({
  iso_3166_1: types.string,
  name: types.string,
});

/**
 * SpokenLanguage model to describe spoken languages.
 */
const SpokenLanguageModel = types.model("SpokenLanguage").props({
  english_name: types.string,
  iso_639_1: types.string,
  name: types.string,
});

/**
 * Model for detailed movie information.
 */
export const DetailMoviesModel = types.model("DetailMovies").props({
  adult: types.boolean,
  backdrop_path: types.maybeNull(types.string),
  belongs_to_collection: types.maybeNull(BelongsToCollectionModel),
  budget: types.number,
  genres: types.array(GenreModel),
  homepage: types.maybeNull(types.string),
  id: types.identifierNumber,
  imdb_id: types.maybeNull(types.string),
  origin_country: types.array(types.string),
  original_language: types.string,
  original_title: types.string,
  overview: types.maybeNull(types.string),
  popularity: types.number,
  poster_path: types.maybeNull(types.string),
  production_companies: types.array(ProductionCompanyModel),
  production_countries: types.array(ProductionCountryModel),
  release_date: types.string,
  revenue: types.number,
  runtime: types.number,
  spoken_languages: types.array(SpokenLanguageModel),
  status: types.string,
  tagline: types.maybeNull(types.string),
  title: types.string,
  video: types.boolean,
  vote_average: types.number,
  vote_count: types.number,
}).views((self) => ({
  get genre() {
    return self.genres.length > 0 ? self.genres[0].name : '-';
  }
}));

/**
 * Type definitions for DetailMovies.
 */
type DetailMoviesType = Instance<typeof DetailMoviesModel>;
export interface DetailMovies extends DetailMoviesType { }
type DetailMoviesSnapshotType = SnapshotOut<typeof DetailMoviesModel>;
export interface DetailMoviesSnapshot extends DetailMoviesSnapshotType { }
