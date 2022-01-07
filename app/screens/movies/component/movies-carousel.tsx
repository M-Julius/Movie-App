/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from "react"
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native"
import { Text } from "../../../components"
import { useStores } from "../../../models"
import { color } from "../../../theme"
import Carousel, { Pagination } from "react-native-snap-carousel"
import { LinearGradient } from "expo-linear-gradient"
import { URI_STORAGE } from "../../../config/env"
import { deg } from "../../../utils/degree"
import BadgeGenres from "./badges-genre"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"

const styles = StyleSheet.create({
  btn: {
    borderColor: color.palette.yellow,
    borderRadius: 30,
    borderWidth: 1,
    maxWidth: 150,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  container: {
    alignSelf: "flex-start",
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  containerDot: {
    alignItems: "center",
    alignSelf: "center",
    bottom: 0,
    position: "absolute",
    width: "50%",
  },
  dot: {
    backgroundColor: color.palette.white,
    borderRadius: 5,
    height: 10,
    marginHorizontal: 8,
    width: 10,
  },
  logo: {
    height: 30,
    left: 20,
    position: "absolute",
    resizeMode: "contain",
    top: 40,
    width: 30,
  },
  txtBtn: {
    color: color.palette.yellow,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
})

function MoviesCarouselRenderer() {
  const { movieStore } = useStores()
  const navigation = useNavigation<CompositeNavigationProp<any, any>>()

  const { width } = useWindowDimensions()

  const [currentSwiper, setSwiper] = useState(0)

  const renderItem = useCallback(
    ({ item }) => (
      <ImageBackground
        key={`${item.id}=`}
        source={{ uri: `${URI_STORAGE}${item.poster_path}` }}
        style={{ height: 320 }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={color.palette.blackWhiteGradient}
          {...deg(269)}
          style={styles.container}
        >
          <BadgeGenres genre="Fantasy" />

          <Text text={item.title} preset="header" style={{ marginVertical: 20 }} />

          <Pressable
            style={styles.btn}
            onPress={() => navigation.navigate("DetailMovies", { movie: item })}
          >
            <Text text="Watch Now" style={styles.txtBtn} />
          </Pressable>
        </LinearGradient>
      </ImageBackground>
    ),
    [],
  )

  return (
    <View style={{ width: "100%" }}>
      <Carousel
        layout={"default"}
        data={movieStore.nowPlaying.slice(0, 5)}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        slideStyle={{ width: width }}
        onSnapToItem={(index) => setSwiper(index)}
        containerCustomStyle={{ backgroundColor: color.primaryDarker }}
        contentContainerCustomStyle={{ alignSelf: "flex-start" }}
        autoplay
        loop
      />
      <Image source={require("../../../../assets/images/logo.png")} style={styles.logo} />
      <View style={styles.containerDot}>
        <Pagination
          dotsLength={movieStore.nowPlaying.slice(0, 5).length}
          activeDotIndex={currentSwiper}
          containerStyle={{ width: "20%", maxHeight: 50 }}
          dotStyle={styles.dot}
          inactiveDotStyle={{}}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    </View>
  )
}

const MoviesCarousel = observer(MoviesCarouselRenderer)
export default MoviesCarousel
