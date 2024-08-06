import React, { useMemo } from "react";
import { StyleSheet, View, Pressable, ImageBackground } from "react-native";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { deg } from "app/utils/degree";
import Config from "app/config";
import BadgeGenres from "./BadgesGenre";
import Ratings from "app/components/common/Ratings";
import { Movies } from "app/models/Movies";
import { colors } from "app/theme";
import { Text } from "app/components";

const styles = StyleSheet.create({
    movieItem: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: colors.palette.verifiedBlack,
        borderRadius: 10,
        padding: 20,
    },
    movieImage: {
        height: 180,
        width: 130,
    },
    movieDetails: {
        width: '60%',
        justifyContent: 'space-between',
    },
    movieTitle: {
        fontWeight: "500",
        fontSize: 15,
    },
    movieRatings: {
        marginVertical: 10,
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
    titleText: {
        fontWeight: "500",
        fontSize: 15,
    },
    linearGradient: {
        flex: 1,
    },
    movieImageContainer: {
        marginRight: 20,
    },
});

type ItemMovieProps = {
    item: Movies;
    type?: 'horizontal' | 'vertical';
    index?: number;
};

const ItemMovie: React.FC<ItemMovieProps> = ({ item, index = 0, type = 'horizontal' }) => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>();

    const genre = useMemo(() => {
        return item?.genre ?? (item?.genres?.length ? item.genres[0].name : '-');
    }, [item?.genre, item?.genres]);

    const handlePress = () => {
        navigation.push("DetailMovies", { movie: item });
    };

    const renderHorizontalItem = () => (
        <Pressable onPress={handlePress}>
            <ImageBackground
                source={{ uri: `${Config.URI_STORAGE}${item?.poster_path}` }}
                style={[styles.imgBg, { marginLeft: index ? 0 : 15 }]}
                key={item?.id}
            >
                <LinearGradient
                    colors={colors.palette.blackWhiteGradient}
                    {...deg(180)}
                    style={styles.overLay}
                >
                    <BadgeGenres genre={genre} />
                    <Ratings rating={(item?.vote_average ?? 0) / 2} style={styles.ratings} />
                    <Text text={item?.title ?? '-'} style={styles.titleText} />
                </LinearGradient>
            </ImageBackground>
        </Pressable>
    );

    const renderVerticalItem = () => (
        <Pressable style={styles.movieItem} onPress={handlePress}>
            <View style={styles.movieImageContainer}>
                <ImageBackground
                    source={{ uri: `${Config.URI_STORAGE}${item?.poster_path}` }}
                    style={styles.movieImage}
                    key={item?.id}
                >
                    <LinearGradient
                        colors={colors.palette.blackWhiteGradient}
                        {...deg(180)}
                        style={styles.linearGradient}
                    />
                </ImageBackground>
            </View>
            <View style={styles.movieDetails}>
                <View>
                    <Text text={item?.title ?? '-'} style={styles.movieTitle} />
                    <View style={styles.movieRatings}>
                        <Ratings rating={(item?.vote_average ?? 0) / 2} />
                    </View>
                    <BadgeGenres genre={genre} />
                </View>
                <Text>Release: {item?.release_date}</Text>
            </View>
        </Pressable>
    );

    return type === 'horizontal' ? renderHorizontalItem() : renderVerticalItem();
};

export default ItemMovie;