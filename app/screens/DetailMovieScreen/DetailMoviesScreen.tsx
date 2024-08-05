import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { Screen } from "../../components";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { useStores } from "../../models";
import { colors } from "../../theme";
import { observer } from "mobx-react-lite";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HorizontalListMovies from "../../components/movies/HorizontalListMovies";
import { DetailMovies } from "app/models/DetailMovies";
import { Cast } from "app/models/Cast";
import { AppStackParamList } from "app/navigators";
import useFadeAnimation from "app/hooks/useFadeAnimation";
import ShimmerDetailMovies from "../MoviesScreen/components/Shimmer/ShimmerDetailMovies";
import HeaderInfo from "./components/HeaderInfo";
import Synopsis from "./components/Synopsis";

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.palette.black,
    flexGrow: 1,
  },
  divider: {
    backgroundColor: colors.palette.white,
    height: 1,
    marginVertical: 20,
    opacity: 0.1,
    width: "100%",
  },
});

type DetailMovieProps = {
  route: RouteProp<AppStackParamList, "DetailMovies">;
  navigation: CompositeNavigationProp<any, any>;
};

const DetailMoviesScreen: React.FC<DetailMovieProps> = observer(({ route }) => {
  const { movieStore } = useStores();
  const { movie } = route.params;
  const insets = useSafeAreaInsets();

  const [movies, setMovies] = useState<DetailMovies>();
  const [credits, setCredits] = useState<Cast[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadingStyle = useFadeAnimation(isLoading);
  const contentStyle = useFadeAnimation(!isLoading);

  useEffect(() => {
    const fetchData = async () => {
      const result = await movieStore.getDetailMovies(movie?.id ?? 0);
      
      if (result.movie.kind === 'ok' && result.cast.kind === 'ok') {
        setMovies(result.movie.movie);
        setCredits(result.cast.cast);
        setIsLoading(false);
      } else {
        Alert.alert('Failed, ', result.movie.kind)
      }
    };
    fetchData();
  }, [movieStore, movie]);

  return (
    <Screen style={styles.root} preset="scroll">
      <Animated.View style={[StyleSheet.absoluteFill, loadingStyle]}>
        <ShimmerDetailMovies />
      </Animated.View>
      <Animated.View style={contentStyle}>
        <HeaderInfo movie={movies as DetailMovies} />
        <Synopsis movie={movies as DetailMovies} credits={credits} />
        <View style={styles.divider} />
        <HorizontalListMovies
          data={movieStore.similar}
          movieId={movie?.id}
          typeMovies="similar"
          title="You Might Also Like This"
          containerStyle={{ marginBottom: insets.top, marginTop: 0 }}
        />
      </Animated.View>
    </Screen>
  );
});

export default DetailMoviesScreen;