import { createSelector } from "@reduxjs/toolkit";

const selectLoading = (state) => state.albums.loading;
const selectAlbums = (state) => state.albums.albums;
const selectAlbumDetail = (state) => state.albums.albumDetail;
const selectSearchAlbum = (state) => state.albums.searchAlbum;
const selectSearchTitle = (state) => state.albums.searchTitle;
const selectSearchArtist = (state) => state.albums.searchArtist;

const selectAlbumData = createSelector(
    [
        selectLoading,
        selectAlbums,
        selectAlbumDetail,
        selectSearchAlbum,
        selectSearchTitle,
        selectSearchArtist
    ],
    (loading, albums, albumDetail, searchAlbum, searchTitle, searchArtist) => ({loading, albums, albumDetail, searchAlbum, searchTitle, searchArtist}));

export default selectAlbumData;