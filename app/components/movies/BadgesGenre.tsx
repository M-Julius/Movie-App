import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "..";
import { colors } from "../../theme";

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.palette.blueHex,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    maxWidth: 100,
    width:'auto',
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems:'center'
  },
  textBadge: {
    color: colors.palette.blue,
  },
});

interface BadgeGenresProps {
  genre: string;
}

const BadgeGenres: React.FC<BadgeGenresProps> = ({ genre }) => (
  <View style={styles.badge}>
    <Text style={styles.textBadge}>{genre}</Text>
  </View>
);

export default BadgeGenres;