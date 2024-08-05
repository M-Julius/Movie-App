import React from "react";
import { Image, Platform, Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TextField } from "app/components";
import { colors } from "app/theme";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  searchBar: {
    width: "100%",
    borderRadius: 20,
    zIndex: 100,
  },
  favoriteButton: {
    backgroundColor: colors.palette.blackTransparent05,
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    height: 50,
    resizeMode: "contain",
    width: 50,
  },
});

const HeaderMovies: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();

  return (
    <View style={[styles.header, { top: insets.top, zIndex: 1 }]}>
      <Image
        source={require("../../../../assets/images/logo-app.png")}
        style={styles.logo}
      />
      <Pressable
        onPress={() => Platform.OS === 'android' && navigation.navigate("SearchMoviesScreen")}
        style={{ width: "70%", zIndex: 100 }}
      >
        <TextField
          placeholder="Search"
          editable={false}
          containerStyle={styles.searchBar}
          onPress={() => Platform.OS === "ios" && navigation.navigate("SearchMoviesScreen")}
        />
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("ListMoreMovies", { type: "favorite" })}
        style={styles.favoriteButton}
      >
        <MaterialIcons size={24} name="favorite" color={colors.text} />
      </Pressable>
    </View>
  );
};

export default HeaderMovies;