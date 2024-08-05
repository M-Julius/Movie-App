import ShimmerPlaceHolder from "app/components/common/ShimmerPlaceholder";
import React from "react";
import { View, StyleSheet } from "react-native";
import ShimmerHorizontalListMovies from "./ShimmerHorizontalListMovies";

const styles = StyleSheet.create({
    container: {
        // padding: 20,
    },
    shimmerHeader: {
        width: "100%",
        height: 320,
        marginBottom: 20,
    },
    shimmerOverview: {
        width: "100%",
        height: 100,
        marginVertical: 10,
        borderRadius: 10,
    },
    shimmerCast: {
        width: "80%",
        height: 20,
        marginVertical: 10,
        borderRadius: 10,
    },
    shimmerHorizontalList: {
        width: "100%",
        height: 180,
        marginVertical: 20,
    },
});

const ShimmerDetailMovies: React.FC = () => {
    return (
        <View style={styles.container}>
            <ShimmerPlaceHolder style={styles.shimmerHeader} />
            <View style={{ padding: 20 }}>
                <ShimmerPlaceHolder style={styles.shimmerOverview} />
                <ShimmerPlaceHolder style={styles.shimmerCast} />
            </View>
            <ShimmerHorizontalListMovies />
        </View>
    );
};

export default ShimmerDetailMovies;