import { Instance, types } from "mobx-state-tree";

// Define the Genre model
export const GenreModel = types.model("Genre", {
  id: types.number,
  name: types.string,
});

export interface Genre extends Instance<typeof GenreModel> { }