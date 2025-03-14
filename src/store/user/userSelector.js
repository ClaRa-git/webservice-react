import { createSelector } from "@reduxjs/toolkit";

const selectLoading = (state) => state.users.loading;
const selectUserFavorites = (state) => state.users.userFavorites;
const selectUserDetail = (state) => state.users.userDetail;
const selectAvatars = (state) => state.users.avatars;

const selectUserData = createSelector(
    [selectLoading, selectUserFavorites, selectUserDetail, selectAvatars],
    (loading, userFavorites, userDetail, avatars) => ({loading, userFavorites, userDetail, avatars})
);

export default selectUserData;