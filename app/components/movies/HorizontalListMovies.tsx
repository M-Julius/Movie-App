import React, { useMemo } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { EmptyState, Text } from "..";
import { colors } from "../../theme";
import { FlatList } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { Movies } from "app/models/Movies";
import ItemMovie from "./ItemMovies";
import { MovieType } from "app/models/stores/MovieStore";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  textSeeAll: {
    color: colors.palette.yellow,
    fontWeight: "500",
    marginRight: 5,
  },
  titleText: {
    fontSize: 20,
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
  },
  listContainer: {
    marginTop: 20,
  },
});

interface HorizontalListMoviesProps {
  data: Movies[];
  title: string;
  containerStyle?: ViewStyle;
  typeMovies?: MovieType;
  movieId?: number;
}

const HorizontalListMovies: React.FC<HorizontalListMoviesProps> = ({
  data,
  title,
  containerStyle,
  typeMovies,
  movieId,
}) => {
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  const listMovies = useMemo(() => data.slice(0, 10), [data]);

  return (
    <View style={[styles.listContainer, containerStyle]}>
      <View style={styles.container}>
        <Text text={title} preset="header" style={styles.titleText} />
        <Pressable
          onPress={() =>
            navigation.navigate("ListMoreMovies", {
              type: typeMovies,
              movieId: movieId ?? undefined,
            })
          }
          style={styles.pressable}
        >
          <Text text="See All" style={styles.textSeeAll} />
          <Entypo name="chevron-right" color={colors.palette.yellow} size={16} />
        </Pressable>
      </View>

      <FlatList
        horizontal={listMovies.length > 0}
        data={listMovies}
        ListEmptyComponent={() => <EmptyState style={{ alignSelf: 'center' }} button="" content="" />}
        renderItem={({ item, index }) => <ItemMovie item={item} index={index} type="horizontal" />}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};

export default HorizontalListMovies;