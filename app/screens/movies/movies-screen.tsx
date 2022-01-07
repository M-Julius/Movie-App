/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useMemo } from "react"
import { ViewStyle } from "react-native"
import { Screen } from "../../components"
import { useStores } from "../../models"
import { color } from "../../theme"
import MoviesCarousel from "./component/movies-carousel"
import HorizontalListMovies from "./component/horizontal-list-movies"
import { getSnapshot } from "mobx-state-tree"
import { observer } from "mobx-react-lite"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flexGrow: 1,
}

const MoviesScreenRenderer = () => {
  const { movieStore } = useStores()

  const snapshot = getSnapshot(movieStore)
  const movieTopRated = useMemo(() => movieStore.topRated, [snapshot])
  const moviePopular = useMemo(() => movieStore.popular, [snapshot])

  useEffect(() => {
    // get movies in main home
    async function fetchData() {
      await movieStore.getMoviesInMainPage()
    }

    fetchData()
  }, [])

  return (
    <Screen style={ROOT} preset="scroll" unsafe>
      <MoviesCarousel />
      <HorizontalListMovies data={moviePopular} title="Popular" typeMovies="POPULAR" />
      <HorizontalListMovies
        data={movieTopRated}
        title="Top Rated"
        typeMovies="TOP_RATED"
        containerStyle={{ marginBottom: 50 }}
      />
    </Screen>
  )
}
const MoviesScreen = observer(MoviesScreenRenderer)
export default MoviesScreen
