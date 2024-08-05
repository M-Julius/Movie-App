import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "app/theme";
import { TextField } from "app/components";

const styles = StyleSheet.create({
    searchBarContainer: {
        backgroundColor: colors.palette.verifiedBlack,
        borderRadius: 20,
        margin: 20,
        padding: 10,
        alignSelf: 'center',
    },
    searchInput: {
        margin: 20,
        paddingLeft: 10,
        width: "90%",
        backgroundColor: colors.palette.verifiedBlack,
        borderRadius: 20,
    },
    searchButton: {
        backgroundColor: colors.palette.offWhite,
        borderRadius: 50,
        padding: 10,
        marginLeft: 10,
    },
});

const SearchBar: React.FC<{ query: string; onQueryChange: (text: string) => void; onSearchPress: () => void; }> = ({ query, onQueryChange, onSearchPress }) => (
    <TextField
        style={styles.searchBarContainer}
        inputWrapperStyle={styles.searchInput}
        placeholder="Search movies..."
        placeholderTextColor={colors.textDim}
        value={query}
        onChangeText={onQueryChange}
        RightAccessory={() => (
            <Pressable style={styles.searchButton} onPress={onSearchPress}>
                <MaterialIcons name="search" size={24} color={colors.palette.black} />
            </Pressable>
        )}
    />
);

export default SearchBar;