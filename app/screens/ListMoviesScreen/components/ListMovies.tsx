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
    onMomentumScrollEnd?: () => void;
};

const ListMovies: React.FC<ListMoviesProps> = observer(({ data, isLoading, onEndReached, onRefresh, onMomentumScrollEnd }) => {
    return data.length ? (
        <FlatList
            refreshing={false}
            onRefresh={onRefresh}
            ListFooterComponent={() => isLoading &&
                <ActivityIndicator size="large" color={colors.text} style={styles.listFooter} />}
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: 210 }}
            data={data}
            extraData={[data, data]}
            keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
            renderItem={({ item }) => <ItemMovie item={item} type="vertical" />}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            onMomentumScrollEnd={onMomentumScrollEnd}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
        />
    ) : isLoading ?
        <ActivityIndicator size="large" color={colors.text} style={styles.listFooter} />
        :
        <EmptyState button="" content="" />;
});

export default ListMovies;