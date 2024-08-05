import React, { useMemo, useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Screen } from "../../components";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { colors } from "../../theme";
import { observer } from "mobx-react-lite";
import { AppStackParamList } from "app/navigators";
import { useStores } from "app/models";
import { getSnapshot } from "mobx-state-tree";
import { Movies } from "app/models/Movies";
import ListMovies from "./components/ListMovies";
import Header from "app/components/common/Header";

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.palette.black,
    flex: 1,
  },
  listFooter: {
    marginBottom: 120,
  },
});

type ListMoreMoviesScreenProps = {
  route: RouteProp<AppStackParamList, "ListMoreMovies">;
  navigation: CompositeNavigationProp<any, any>;
};

const ListMoreMoviesScreen: React.FC<ListMoreMoviesScreenProps> = observer(({ route }) => {
  const { movieStore, favoriteStore } = useStores();
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [isLoadMore, setLoadMore] = useState(true);

  const title = useMemo(() => {
    switch (route.params.type) {
      case 'topRated':
        return 'Top Rated';
      case 'favorite':
        return 'Favorite';
      case 'similar':
        return 'Similar';
      default:
        return 'Popular';
    }
  }, [route.params.type]);

  const data = useMemo(() => {
    switch (route.params.type) {
      case 'topRated':
        return movieStore.topRated;
      case 'favorite':
        return favoriteStore.favorite;
      case 'similar':
        return movieStore.similar;
      default:
        return movieStore.popular;
    }
  }, [route.params.type, movieStore, favoriteStore]);

  const onRefresh = useCallback(async () => {
    switch (route.params.type) {
      case 'topRated':
        movieStore.getTopRated();
        break;
      case 'similar':
        movieStore.getSimilarMovies(route.params?.movieId ?? 0);
        break;
      default:
        movieStore.getMoviesPopular();
        break;
    }
  }, [movieStore, route.params.movieId, route.params.type]);

  const getMoreMovies = useCallback(async () => {
    if (isLoading || !isLoadMore) return;

    const nextPage = page + 1;
    setLoading(true);
    setPage(nextPage);

    try {
      let movies = [];
      switch (route.params.type) {
        case 'topRated':
          movies = await movieStore.getTopRated(nextPage);
          break;
        case 'popular':
          movies = await movieStore.getMoviesPopular(nextPage);
          break;
        case 'similar':
          movies = await movieStore.getSimilarMovies(route.params?.movieId ?? 0, nextPage);
          break;
      }

      if (movies.length > 0) {
        setLoadMore(true);
      } else {
        setLoadMore(false);
      }
    } catch (err) {
      setLoadMore(false);
    } finally {
      setLoading(false);
    }
  }, [isLoading, isLoadMore, movieStore, page, route.params.type, route.params?.movieId]);

  return (
    <Screen style={styles.root} preset="fixed">
      <Header title={title} />
      <ListMovies
        data={getSnapshot(data) as Movies[]}
        isLoading={isLoading}
        onEndReached={getMoreMovies} 
        onRefresh={onRefresh}
        />
    </Screen>
  );
});

export default ListMoreMoviesScreen;