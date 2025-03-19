import { createSelector } from "@reduxjs/toolkit";

const selectLoading = (state) => state.albums.loading;
const selectAlbums = (state) => state.albums.albums;
const selectAlbumDetail = (state) => state.albums.albumDetail;
const selectSearchAlbum = (state) => state.albums.searchAlbum;
const selectSearchTitle = (state) => state.albums.searchTitle;
const selectSearchArtist = (state) => state.albums.searchArtist;
const selectAlbumByGenre = (state) => state.albums.albumByGenre;

const selectAlbumData = createSelector(
    [
        selectLoading,
        selectAlbums,
        selectAlbumDetail,
        selectSearchAlbum,
        selectSearchTitle,
        selectSearchArtist,
        selectAlbumByGenre
    ],
    (loading, albums, albumDetail, searchAlbum, searchTitle, searchArtist, albumByGenre) => ({loading, albums, albumDetail, searchAlbum, searchTitle, searchArtist, albumByGenre}));

export default selectAlbumData;