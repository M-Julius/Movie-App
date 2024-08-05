import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "..";
import { colors } from "../../theme";
import { observer } from "mobx-react-lite";

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.palette.blueHex,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    maxWidth: 100,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  textBadge: {
    color: colors.palette.blue,
    textAlign: "center",
  },
});

interface BadgeGenresProps {
  genre: string;
}

const BadgeGenres: React.FC<BadgeGenresProps> = observer(({ genre }) => (
  <View style={styles.badge}>
    <Text style={styles.textBadge}>{genre}</Text>
  </View>
));

export default BadgeGenres;