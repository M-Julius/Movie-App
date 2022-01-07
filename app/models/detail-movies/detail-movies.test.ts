import { DetailMoviesModel } from "./detail-movies"

test("can be created", () => {
  const instance = DetailMoviesModel.create({})

  expect(instance).toBeTruthy()
})
