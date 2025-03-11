import { createSelector } from "@reduxjs/toolkit";

const selectLoading = (state) => state.albums.loading;
const selectAlbums = (state) => state.albums.albums;
const selectAlbumDetail = (state) => state.albums.albumDetail;

const selectAlbumData = createSelector(
    [
        selectLoading,
        selectAlbums,
        selectAlbumDetail
    ],
    (loading, albums, albumDetail) => ({loading, albums, albumDetail}));

export default selectAlbumData;