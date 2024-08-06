import React from "react";
import { View, ImageBackground, Pressable, StyleSheet } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import Ratings from "app/components/common/Ratings";
import Config from "app/config";
import { DetailMovies } from "app/models/DetailMovies";
import { colors } from "app/theme";
import { useStores } from "app/models";
import { deg } from "app/utils/degree";
import BadgeGenres from "../../../components/movies/BadgesGenre";
import { Text } from "app/components";
import { observer } from "mobx-react-lite";
import AnimatedPressable from "app/components/common/AnimatedPressable";

const styles = StyleSheet.create({
    imgBg: {
        backgroundColor: colors.palette.lightGrey,
         minHeight: 320,
        width: "100%",
    },
    img: {
        flex: 1,
        justifyContent: "space-between",
    },
    backButton: {
        paddingTop: 10,
        paddingLeft: 15,
    },
    favoriteButton: {
        backgroundColor: colors.palette.blackTransparent,
        padding: 10,
        borderRadius: 100,
    },
    headerContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    badgeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    rowCenter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 24,
        width: "70%",
    },
    releaseYearText: {
        fontWeight: "300",
        fontSize: 12,
    },
    ratingDot: {
        width: 7,
        height: 7,
        borderRadius: 10,
        backgroundColor: colors.text,
        marginHorizontal: 15,
    },
    ratingSize: {
        marginVertical: 15,
    },
});

const HeaderInfo: React.FC<{ movie: DetailMovies }> = observer(({ movie }) => {
    const { favoriteStore } = useStores();
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();
    const insets = useSafeAreaInsets();

    const onFavorite = () => {
        favoriteStore.toggleFavorite(movie);
    };

    return (
        <ImageBackground source={{ uri: `${Config.URI_STORAGE}${movie?.backdrop_path}` }} style={styles.imgBg}>
            <LinearGradient colors={colors.palette.blackWhiteGradient} {...deg(269)} style={styles.img}>
                <Pressable
                    onPress={navigation.goBack}
                    style={[styles.backButton, { paddingTop: insets.top + 10 }]}
                >
                    <Entypo name="chevron-left" size={22} color={colors.palette.white} />
                </Pressable>
                <View style={styles.headerContainer}>
                    <BadgeGenres genre={(movie?.genres ?? [])[0]?.name ?? ""} />
                    <View style={styles.badgeContainer}>
                        <Ratings rating={(movie?.vote_average ?? 0) / 2} size={18} style={styles.ratingSize} />
                        <View style={styles.ratingDot} />
                        <Text
                            text={`Release Year: ${movie?.release_date?.slice(0, 4) ?? "-"}`}
                            style={styles.releaseYearText}
                        />
                    </View>
                    <View style={styles.rowCenter}>
                        <Text text={movie?.original_title ?? ""} preset="header" style={styles.headerTitle} />
                        <AnimatedPressable onPress={onFavorite} style={styles.favoriteButton}>
                            <MaterialIcons
                                size={24}
                                name={favoriteStore.isFavorite(movie?.id) ? "favorite" : "favorite-outline"}
                                color={colors.text}
                            />
                        </AnimatedPressable>
                    </View>
                </View>
            </LinearGradient>
        </ImageBackground>
    );
});

export default HeaderInfo;