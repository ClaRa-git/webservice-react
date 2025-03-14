import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const artistSlice = createSlice({
    name: 'artists',
    initialState: {
        loading: false,
        artistDetail: []
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setArtistDetail: (state, action) => {
            state.artistDetail = action.payload;
        }
    }
});

export const { setLoading, setArtistDetail } = artistSlice.actions;

// méthode qui récupère le détail d'un artiste
export const fetchArtistDetail = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/artists?id=${id}&page=1&albums.isActive=true`);
        dispatch(setArtistDetail(response.data));
    } catch (error) {
        console.log(`Erreur lors de la récupération du détail de l'artiste: ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}

export default artistSlice.reducer;