import { MoviesModel } from "./movies"

test("can be created", () => {
  const instance = MoviesModel.create({})

  expect(instance).toBeTruthy()
})
