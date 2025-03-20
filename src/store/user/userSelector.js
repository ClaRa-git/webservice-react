import { createSelector } from "@reduxjs/toolkit";

const selectLoading = (state) => state.users.loading;
const selectUserFavorites = (state) => state.users.userFavorites;
const selectUserDetail = (state) => state.users.userDetail;
const selectAvatars = (state) => state.users.avatars;
const selectUserPlaylists = (state) => state.users.userPlaylists;
const selectPlaylistDetail = (state) => state.users.playlistDetail;

const selectUserData = createSelector(
    [selectLoading, selectUserFavorites, selectUserDetail, selectAvatars, selectUserPlaylists, selectPlaylistDetail],
    (loading, userFavorites, userDetail, avatars, userPlaylists, playlistDetail) => ({loading, userFavorites, userDetail, avatars, userPlaylists, playlistDetail})
);

export default selectUserData;