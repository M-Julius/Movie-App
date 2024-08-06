import React, { useCallback, useMemo, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { EmptyState, Text } from "../../../components";
import { useStores } from "../../../models";
import { colors } from "../../../theme";
import { LinearGradient } from "expo-linear-gradient";
import BadgeGenres from "../../../components/movies/BadgesGenre";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { deg } from "app/utils/degree";
import Config from "app/config";
import { Movies } from "app/models/Movies";
import Carousel from "react-native-reanimated-carousel";
import AnimatedPressable from "app/components/common/AnimatedPressable";

const styles = StyleSheet.create({
  root: { width: "100%", backgroundColor: colors.palette.verifiedBlack },
  btn: {
    borderColor: colors.palette.yellow,
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
    flexDirection: "row",
    marginBottom: 20,
  },
  dot: {
    backgroundColor: colors.palette.white,
    borderRadius: 10,
    height: 8,
    marginHorizontal: 8,
    width: 8,
  },
  activeDot: {
    backgroundColor: colors.text,
    width: 13,
    height: 13,
  },
  inActiveDot: {
    backgroundColor: colors.textDim,
  },
  logo: {
    height: 30,
    resizeMode: "contain",
    width: 30,
  },
  txtBtn: {
    color: colors.palette.yellow,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  searchBar: {
    width: "75%",
    backgroundColor: colors.palette.blackTransparent05,
    borderRadius: 20,
  },
  favoriteButton: {
    backgroundColor: colors.palette.blackTransparent05,
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 10,
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const MoviesCarouselRenderer: React.FC = () => {
  const { movieStore } = useStores();
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  const { width } = useWindowDimensions();
  const [swiper, setSwiper] = useState(0);

  const dataMovies = useMemo(() => movieStore?.nowPlaying?.slice(0, 5) ?? [], [movieStore.nowPlaying]);

  const renderItem = useCallback(
    ({ item }: { item: Movies }) => (
      <ImageBackground
        key={item.id}
        source={{ uri: `${Config.URI_STORAGE}${item.poster_path}` }}
        style={{ height: 340, }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={colors.palette.blackWhiteGradient}
          {...deg(269)}
          style={styles.container}
        >
          <BadgeGenres genre={item.genre} />
          <Text text={item?.title ?? '-'} preset="header" style={{ marginVertical: 20 }} />
          <AnimatedPressable
            style={styles.btn}
            onPress={() => navigation.navigate("DetailMovies", { movie: item })}
          >
            <Text text="Watch Now" style={styles.txtBtn} />
          </AnimatedPressable>
        </LinearGradient>
      </ImageBackground>
    ),
    [navigation]
  );

  return (
    <View style={styles.root}>
      {dataMovies.length > 0 ?
        <>
          <Carousel
            loop
            width={width}
            height={340}
            autoPlay
            data={dataMovies}
            onSnapToItem={(index) => setSwiper(index)}
            renderItem={renderItem}
          />
          <View style={styles.containerDot}>
            {dataMovies.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  swiper === index ? styles.activeDot : styles.inActiveDot,
                ]}
              />
            ))}
          </View>
        </>
        : <EmptyState button="" content="" style={{ paddingVertical: 80 }} />}
    </View>
  );
};

const MoviesCarousel = observer(MoviesCarouselRenderer);
export default MoviesCarousel;