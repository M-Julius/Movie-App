import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { Screen } from "../../components";
import { useStores } from "../../models";
import { colors } from "../../theme";
import HorizontalListMovies from "../../components/movies/HorizontalListMovies";
import { getSnapshot } from "mobx-state-tree";
import { observer } from "mobx-react-lite";
import HeaderMovies from "./components/HeaderMovies";
import useFadeAnimation from "app/hooks/useFadeAnimation";
import MoviesCarousel from "./components/MoviesCarousel";
import ShimmerHorizontalListMovies from "./components/Shimmer/ShimmerHorizontalListMovies";
import ShimmerCarousel from "./components/Shimmer/ShimmerCarousel";

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.palette.black,
    flexGrow: 1,
  },
  horizontalListContainer: {
    marginBottom: 50,
  },
});

const MoviesScreen: React.FC = observer(() => {
  const { movieStore } = useStores();
  const snapshot = getSnapshot(movieStore);

  const [isLoading, setIsLoading] = useState(true);

  const loadingStyle = useFadeAnimation(isLoading);
  const contentStyle = useFadeAnimation(!isLoading);

  const movieTopRated = useMemo(() => movieStore.topRated, [snapshot]);
  const moviePopular = useMemo(() => movieStore.popular, [snapshot]);

  useEffect(() => {
    const fetchData = async () => {
      await movieStore.getMoviesInMainPage();
      setIsLoading(false);
    };

    fetchData();
  }, [movieStore]);

  return (
    <>
      {
        !isLoading && (
          <Animated.View style={[contentStyle, {zIndex:1}]}>
            <HeaderMovies />
          </Animated.View>
        )
      }
      <Screen style={styles.root} preset="scroll">
        <Animated.View style={[contentStyle, { zIndex: 1 }]}>
          <MoviesCarousel />
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, loadingStyle, { zIndex: 0 }]}>
          <ShimmerCarousel />
          <ShimmerHorizontalListMovies />
          <ShimmerHorizontalListMovies />
        </Animated.View>
        <Animated.View style={contentStyle}>
          <HorizontalListMovies data={moviePopular} title="Popular" typeMovies="popular" />
          <HorizontalListMovies
            data={movieTopRated}
            title="Top Rated"
            typeMovies="topRated"
            containerStyle={styles.horizontalListContainer}
          />
        </Animated.View>
      </Screen>
    </>
  );
});

export default MoviesScreen;