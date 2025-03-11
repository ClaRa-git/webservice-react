import { createSelector } from "@reduxjs/toolkit";

const selectLoading = (state) => state.users.loading;
const selectUserFavorites = (state) => state.users.userFavorites;

const selectUserData = createSelector(
    [selectLoading, selectUserFavorites],
    (loading, userFavorites) => ({loading, userFavorites})
);

export default selectUserData;