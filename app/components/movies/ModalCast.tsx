import React from "react";
import { Modal, StyleSheet, View, FlatList, Pressable, Text } from "react-native";
import { Cast } from "app/models/Cast";
import { colors } from "app/theme";
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: colors.palette.black,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    modalTitle: {
        color: colors.palette.white,
        fontSize: 20,
        fontWeight: "bold",
    },
    closeButtonText: {
        color: colors.palette.white,
        fontSize: 16,
    },
    castItem: {
        paddingVertical: 15,
        borderBottomColor: colors.palette.lightGrey,
    },
    castName: {
        color: colors.palette.white,
        fontSize: 18,
    },
});

type ModalCastProps = {
    isVisible: boolean;
    onClose: () => void;
    cast: Cast[];
};

const ModalCast: React.FC<ModalCastProps> = ({ isVisible, onClose, cast }) => {
    const insets = useSafeAreaInsets();
    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={[styles.modalContainer, {marginTop: insets.top + 10}]}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>All Cast</Text>
                    <Pressable onPress={onClose}>
                        <AntDesign name="closecircle" size={28} color={colors.text} />
                    </Pressable>
                </View>
                <FlatList
                    data={cast}
                    keyExtractor={(item, index) => index+item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.castItem}>
                            <Text style={styles.castName}>{item.name}</Text>
                        </View>
                    )}
                />
            </View>
        </Modal>
    );
};

export default ModalCast;