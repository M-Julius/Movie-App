/* eslint-disable react-native/no-inline-styles */
import React, { useMemo } from "react"
import { ImageBackground, Pressable, StyleSheet, View, ViewStyle } from "react-native"
import { Text } from "../../../components"
import { Movies } from "../../../models"
import { color } from "../../../theme"
import { FlatList } from "react-native-gesture-handler"
import { LinearGradient } from "expo-linear-gradient"
import { deg } from "../../../utils/degree"
import { URI_STORAGE } from "../../../config/env"
import { Entypo } from "@expo/vector-icons"

import BadgeGenres from "./badges-genre"
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native"
import Ratings from "../../../components/ratings/ratings"

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  imgBg: {
    height: 280,
    marginRight: 15,
    width: 180,
  },
  overLay: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 25,
    paddingLeft: 15,
  },
  ratings: {
    alignSelf: "flex-start",
    marginVertical: 15,
  },
  textSeeAll: {
    color: color.palette.yellow,
    fontWeight: "500",
    marginRight: 5,
  },
})

function HorizontalListMovies({
  data,
  title,
  containerStyle,
  typeMovies,
}: {
  data: Movies[]
  title: string
  containerStyle?: ViewStyle
  typeMovies?: "TOP_RATED" | "POPULAR" | "SIMILAR"
}) {
  const navigation = useNavigation<CompositeNavigationProp<any, any>>()

  const listMovies = useMemo(() => data, [data])

  const renderItem = ({ item, index }: { item: Movies; index: number }) => {
    return (
      <Pressable onPress={() => navigation.push("DetailMovies", { movie: item })}>
        <ImageBackground
          source={{ uri: `${URI_STORAGE}${item.poster_path}` }}
          key={item.id}
          style={{ ...styles.imgBg, marginLeft: index ? 0 : 15 }}
        >
          <LinearGradient
            colors={color.palette.blackWhiteGradient}
            {...deg(180)}
            style={styles.overLay}
          >
            <BadgeGenres genre="Fantasy" />
            <View>
              <Ratings rating={item.vote_average / 2} style={styles.ratings} />
            </View>
            <Text text={item.title} style={{ fontWeight: "500", fontSize: 15 }} />
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    )
  }
  return (
    <View
      style={{
        marginTop: 20,
        ...containerStyle,
      }}
    >
      <View style={styles.container}>
        <Text text={title} preset="header" style={{ fontSize: 20 }} />
        <Pressable
          disabled
          onPress={() =>
            navigation.push("ListMoreMovies", {
              type: typeMovies,
            })
          }
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text text="See All" style={styles.textSeeAll} />
          <Entypo name="chevron-right" color={color.palette.yellow} size={16} />
        </Pressable>
      </View>

      <FlatList
        horizontal
        data={listMovies?.slice(0, 10)}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  )
}

export default HorizontalListMovies
