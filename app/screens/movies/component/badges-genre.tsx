import React from "react"
import { StyleSheet, View } from "react-native"
import { Text } from "../../../components"
import { color } from "../../../theme"

const styles = StyleSheet.create({
  badge: {
    backgroundColor: color.palette.blueHex,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    maxWidth: 90,
  },
  textBadge: {
    color: color.palette.blue,
    marginVertical: 5,
    textAlign: "center",
  },
})

export default function BadgeGenres({ genre }: { genre: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.textBadge}>{genre}</Text>
    </View>
  )
}
