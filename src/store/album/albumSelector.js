import { createSelector } from "@reduxjs/toolkit";

const selectLoading = (state) => state.albums.loading;
const selectAlbums = (state) => state.albums.albums;

const selectAlbumData = createSelector(
    [
        selectLoading,
        selectAlbums
    ],
    (loading, albums) => ({loading, albums}));

export default selectAlbumData;