import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { DetailMovies } from "app/models/DetailMovies";
import { Cast } from "app/models/Cast";
import ModalCast from "../../../components/movies/ModalCast";
import { colors } from "app/theme";
import { Text } from "app/components";

const styles = StyleSheet.create({
    overview: {
        alignSelf: "center",
        backgroundColor: colors.palette.verifiedBlack,
        marginTop: 15,
        padding: 15,
    },
    txtCast: {
        color: colors.palette.white,
        fontSize: 14,
        fontWeight: "normal",
        marginTop: 20,
    },
    synopsisContainer: {
        marginTop: 15,
        paddingHorizontal: 20,
    },
    synopsisHeader: {
        fontSize: 20,
    },
    castTextBold: {
        fontWeight: "700",
    },
});

const Synopsis: React.FC<{ movie: DetailMovies; credits: Cast[] }> = ({ movie, credits }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.synopsisContainer}>
            <Text text="Synopsis" preset="header" style={styles.synopsisHeader} />
            <View style={styles.overview}>
                <Text text={movie?.overview ?? ""} preset="secondary" style={{ fontSize: 14 }} />
            </View>
            <Text preset="secondary" style={styles.txtCast}>
                Cast:{" "}
                <Text style={styles.castTextBold}>
                    {credits.slice(0, 5).map((item) => item.name).join(", ")}
                    {credits.length > 5 && (
                        <>
                            , <Text style={{ color: colors.palette.yellow }}></Text>
                            <Text onPress={() => setModalVisible(true)} style={{ color: colors.palette.yellow }}> more...</Text>
                        </>
                    )}
                </Text>
            </Text>
            <ModalCast
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                cast={credits}
            />
        </View>
    );
};

export default Synopsis;