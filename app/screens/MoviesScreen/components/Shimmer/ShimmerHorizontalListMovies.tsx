import ShimmerPlaceHolder from "app/components/common/ShimmerPlaceholder";
import React from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 20,
    marginLeft: 20,
  },
  shimmerItem: {
    width: 180,
    height: 280,
    borderRadius: 10,
    marginRight: 15,
  },
});

const ShimmerHorizontalListMovies: React.FC = () => {
  return (
    <View style={styles.container}>
      {Array(10).fill(0).map((_, index) => (
        <ShimmerPlaceHolder key={index} style={styles.shimmerItem} />
      ))}
    </View>
  );
};

export default ShimmerHorizontalListMovies;