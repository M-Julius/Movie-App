import React, { useState, useCallback, useEffect, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Screen } from "../../components";
import { useStores } from "../../models";
import { colors } from "../../theme";
import { observer } from "mobx-react-lite";
import SearchBar from "./components/SearchBar";
import ListMovies from "./components/ListMovies";
import Header from "app/components/common/Header";

const styles = StyleSheet.create({
    root: {
        backgroundColor: colors.palette.black,
        flex: 1,
    },
    listFooter: {
        marginBottom: 200,
        alignSelf: 'center',
    },
});

const SearchMoviesScreen: React.FC = observer(() => {
    const { movieStore } = useStores();
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [isLoadMore, setIsLoadMore] = useState(true);

    const movieSearched = useMemo(() => movieStore.searched, [movieStore.searched]);

    useEffect(() => {
        movieStore.clearMovies('searched');
    }, [movieStore]);

    const handleSearch = useCallback(async () => {
        if (query.trim() === "") return;

        setIsLoading(true);
        movieStore.clearMovies('searched');
        await movieStore.getSearchMovies(query);
        setPage(1);
        setIsLoadMore(true);
        setIsLoading(false);
    }, [query, movieStore]);

    const onEndReached = useCallback(async () => {
        if (!isLoadMore || isLoading || !movieStore.searched.length) return;

        setIsLoading(true);
        const nextPage = page + 1;
        setPage(nextPage);

        const movies = await movieStore.getSearchMovies(query, nextPage);
        setIsLoadMore(movies.length > 0);
        setIsLoading(false);
    }, [isLoading, isLoadMore, movieStore, page, query]);

    const onRefresh = useCallback(async () => {
        setIsLoading(true);
        await movieStore.getSearchMovies(query);
        setPage(1);
        setIsLoadMore(true);
        setIsLoading(false);
    }, [query, movieStore]);

    return (
        <Screen style={styles.root} preset="fixed">
            <Header title="Search Movies" />
            <SearchBar query={query} onQueryChange={setQuery} onSearchPress={handleSearch} />
            <ListMovies
                data={movieSearched}
                isLoading={isLoading}
                onMomentumScrollEnd={onEndReached}
                onRefresh={onRefresh}
            />
        </Screen>
    );
});

export default SearchMoviesScreen;
