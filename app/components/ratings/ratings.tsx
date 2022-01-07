import React from "react"
import { StyleSheet, View } from "react-native"
import { Entypo } from "@expo/vector-icons"

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    alignItems: "center",
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  image: {
    // height: 12,
    // width: 12,
  },
})

export default function Ratings({ rating, style, size = 18 }) {
  const stars = []
  // Loop 5 times
  for (let i = 1; i <= 5; i++) {
    let path = <Entypo color={"white"} name="star" style={styles.image} size={size} />
    if (i > rating) {
      path = <Entypo color={"grey"} name="star" style={styles.image} size={size} />
    }
    stars.push(path)
  }
  return (
    <View style={[styles.container, style || {}]}>
      {[1, 2, 3, 4, 5].map((item) => {
        if (item < rating) {
          return <Entypo key={item} color={"white"} name="star" style={styles.image} size={size} />
        }
        return <Entypo key={item} color={"grey"} name="star" style={styles.image} size={size} />
      })}
    </View>
  )
}
