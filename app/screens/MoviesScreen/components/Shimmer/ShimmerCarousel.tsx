import ShimmerPlaceHolder from "app/components/common/ShimmerPlaceholder";
import React from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 10,
    },
    shimmerItem: {
        width: '100%',
        height: 320,
    },
});

const ShimmerCarousel: React.FC = () => {
    return (
        <View style={styles.container}>
            <ShimmerPlaceHolder style={styles.shimmerItem} />
        </View>
    );
};

export default ShimmerCarousel;