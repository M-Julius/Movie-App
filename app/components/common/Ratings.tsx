import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Entypo } from "@expo/vector-icons";

interface RatingsProps {
  rating: number;
  style?: ViewStyle;
  size?: number;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  image: {},
});

const Ratings: React.FC<RatingsProps> = ({ rating, style, size = 18 }) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <Entypo
      key={i}
      color={i < rating ? "white" : "grey"}
      name="star"
      style={styles.image}
      size={size}
    />
  ));

  return <View style={[styles.container, style]}>{stars}</View>;
};

export default Ratings;