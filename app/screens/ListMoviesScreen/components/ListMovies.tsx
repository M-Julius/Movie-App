import React from "react";
import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Movies } from "app/models/Movies";
import { observer } from "mobx-react-lite";
import { colors } from "app/theme";
import ItemMovie from "../../../components/movies/ItemMovies";
import { EmptyState } from "app/components";

const styles = StyleSheet.create({
    listFooter: {
        marginBottom: 20,
        alignSelf: 'center',
    },
});

type ListMoviesProps = {
    data: Movies[];
    isLoading: boolean;
    onEndReached?: () => void;
    onRefresh?: () => void;
};

const ListMovies: React.FC<ListMoviesProps> = observer(({ data, isLoading, onEndReached, onRefresh }) => {
    return (
        <FlatList
            refreshing={false}
            onRefresh={onRefresh}
            ListFooterComponent={() => isLoading &&
                <ActivityIndicator size="large" color={colors.text} style={styles.listFooter} />}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 140 }}
            data={data}
            ListEmptyComponent={() => !isLoading && <EmptyState button="" content="" />}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ItemMovie item={item} type="vertical" />}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
        />
    );
});

export default ListMovies;