import { createSelector } from "@reduxjs/toolkit";

const selectLoading = state => state.artists.loading;
const selectArtistDetail = state => state.artists.artistDetail;

const selectArtistData = createSelector(
    [selectLoading, selectArtistDetail],
    (loading, artistDetail) => ({loading, artistDetail})
)

export default selectArtistData;