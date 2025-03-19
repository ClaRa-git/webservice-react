import { createSelector } from "@reduxjs/toolkit";

const selectLoading = (state) => state.users.loading;
const selectUserFavorites = (state) => state.users.userFavorites;
const selectUserDetail = (state) => state.users.userDetail;
const selectAvatars = (state) => state.users.avatars;
const selectUserPlaylists = (state) => state.users.userPlaylists;

const selectUserData = createSelector(
    [selectLoading, selectUserFavorites, selectUserDetail, selectAvatars, selectUserPlaylists],
    (loading, userFavorites, userDetail, avatars, userPlaylists) => ({loading, userFavorites, userDetail, avatars, userPlaylists})
);

export default selectUserData;