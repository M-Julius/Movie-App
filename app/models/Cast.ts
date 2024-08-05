import { Instance, SnapshotOut, types } from "mobx-state-tree";

/**
 * Cast model to describe individual cast members in detail.
 */
const CastModel = types.model("Cast").props({
  adult: types.boolean,
  gender: types.maybeNull(types.number),
  id: types.identifierNumber,
  known_for_department: types.string,
  name: types.string,
  original_name: types.string,
  popularity: types.number,
  profile_path: types.maybeNull(types.string),
  cast_id: types.maybeNull(types.number),
  character: types.string,
  credit_id: types.string,
  order: types.maybeNull(types.number),
});

/**
 * Type definitions for Cast.
 */
type CastType = Instance<typeof CastModel>;
export interface Cast extends CastType { }
type CastSnapshotType = SnapshotOut<typeof CastModel>;
export interface CastSnapshot extends CastSnapshotType { }
