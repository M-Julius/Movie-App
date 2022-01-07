/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageBackground, Pressable, StyleSheet, View } from "react-native"
import { Screen, Text } from "../../components"
import { CompositeNavigationProp, RouteProp, useNavigation } from "@react-navigation/native"
import { DetailMovies, Movies, useStores } from "../../models"
import { color } from "../../theme"
import { LinearGradient } from "expo-linear-gradient"
import { deg } from "../../utils/degree"
import { URI_STORAGE } from "../../config/env"
import { NavigatorParamList } from "../../navigators"
import { Entypo } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import BadgeGenres from "./component/badges-genre"
import Ratings from "../../components/ratings/ratings"
import HorizontalListMovies from "./component/horizontal-list-movies"

const styles = StyleSheet.create({
  divider: {
    backgroundColor: color.palette.white,
    height: 1,
    marginVertical: 20,
    opacity: 0.1,
    width: "100%",
  },
  img: {
    flex: 1,
    justifyContent: "space-between",
  },
  imgBg: {
    backgroundColor: color.palette.lightGrey,
    height: 320,
    width: "100%",
  },
  overview: {
    alignSelf: "center",
    backgroundColor: color.palette.verifiedBlack,
    marginTop: 15,
    padding: 15,
  },
  root: {
    backgroundColor: color.palette.black,
    flexGrow: 1,
  },
  txtCast: {
    color: color.palette.white,
    fontSize: 14,
    fontWeight: "normal",
    marginTop: 20,
  },
})

type DetailMovieProps = {
  route: RouteProp<NavigatorParamList, "DetailMovies">
  navigation: CompositeNavigationProp<any, any>
}

export const DetailMoviesScreen = observer(function DetailMoviesScreen({
  route,
}: DetailMovieProps) {
  const { movieStore } = useStores()
  const { movie } = route.params
  const insets = useSafeAreaInsets()

  const [movies, setMovies] = useState<DetailMovies>()
  const [similar, setSimilar] = useState<Movies[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await movieStore.getDetailMovies(movie?.id)
      const resultSimilar = await movieStore.getMoviesSimilar(movie?.id)
      if (result.kind === "ok") {
        setMovies(result.movie)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
      if (resultSimilar.kind === "ok") {
        setSimilar(resultSimilar.movies)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }
    fetchData()
  }, [])

  return (
    <Screen style={styles.root} preset="scroll" unsafe>
      <HeaderInfo movie={movies} />
      <Synopsis movie={movies} />
      <View style={styles.divider} />
      <HorizontalListMovies
        data={similar}
        typeMovies="SIMILAR"
        title="You Might Also Like This"
        containerStyle={{ marginBottom: insets.bottom, marginTop: 0 }}
      />
    </Screen>
  )
})

const Synopsis = ({ movie }: { movie: DetailMovies }) => {
  return (
    <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
      <Text text="Synopsis" preset="header" style={{ fontSize: 20 }} />
      <View style={styles.overview}>
        <Text text={movie?.overview} preset="secondary" style={{ fontSize: 14 }} />
      </View>

      <Text preset="secondary" style={styles.txtCast}>
        Cast :{" "}
        <Text style={{ fontWeight: "700" }}>
          Gal Gadot, Kristen Wiig, Chris Pine,
          <Text style={{ color: color.palette.yellow }}> more</Text>
        </Text>
      </Text>
    </View>
  )
}

const HeaderInfo = ({ movie }: { movie: DetailMovies }) => {
  const navigation = useNavigation<CompositeNavigationProp<any, any>>()

  const insets = useSafeAreaInsets()

  return (
    <ImageBackground source={{ uri: `${URI_STORAGE}${movie?.backdrop_path}` }} style={styles.imgBg}>
      <LinearGradient colors={color.palette.blackWhiteGradient} {...deg(269)} style={styles.img}>
        <Pressable
          onPress={navigation.goBack}
          style={{ paddingTop: insets.top + 10, paddingLeft: 15 }}
        >
          <Entypo name="chevron-left" size={22} color={color.palette.white} />
        </Pressable>

        <View style={{ paddingLeft: 20, paddingBottom: 20 }}>
          <BadgeGenres genre={movie?.genres[0]?.name ?? ""} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ratings rating={movie?.vote_average / 2} size={18} style={{ marginVertical: 15 }} />
            <Text text="∙" style={{ fontSize: 42, marginHorizontal: 5 }} />
            <Text
              text={`Relase Year : ${movie?.release_date.slice(0, 4)}`}
              style={{ fontWeight: "300", fontSize: 12 }}
            />
          </View>
          <Text text={movie?.original_title} preset="header" style={{ fontSize: 24 }} />
        </View>
      </LinearGradient>
    </ImageBackground>
  )
}
