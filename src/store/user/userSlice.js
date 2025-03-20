import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

const userSlice = createSlice({
    name: "users",
    initialState: {
        loading: false,
        userDetail: {},
        userFavorites: [],
        userPlaylists: [],
        playlistDetail: {},
        avatars: []
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUserFavorites: (state, action) => {
            state.userFavorites = action.payload;
        },
        setUserDetail: (state, action) => {
            state.userDetail = action.payload;
        },
        setAvatars: (state, action) => {
            state.avatars = action.payload['hydra:member'];
        },
        setUserPlaylists: (state, action) => {
            state.userPlaylists = action.payload['hydra:member'];
        },
        setPlaylistDetail: (state, action) => {
            state.playlistDetail = action.payload;
        }
    }
});

export const { setLoading, setUserFavorites, setUserDetail, setAvatars, setUserPlaylists, setPlaylistDetail } = userSlice.actions;

// méthode qui récupère les détails d'un utilisateur
export const fetchUserDetail = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/users/${id}`);
        dispatch(setUserDetail(response.data));
    } catch (error) {
        console.log(`Erreur lors du fetchUserDetail: ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}

// méthode qui récupère les favoris d'un utilisateur
export const fetchUserFavorites = (userId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/users/${userId}`);
        dispatch(setUserFavorites(response.data.albums));
    } catch (error) {
        console.log(`Erreur lors de la récupération des favoris de l'utilisateur: ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
};

// méthode qui récupère les avatars d'un utilisateur
export const fetchAvatars = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/avatars?page=1&isActive=true`);
        dispatch(setAvatars(response.data));
    } catch (error) {
        console.log(`Erreur lors de la récupération des avatars: ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}

// méthode qui récupère les playlists d'un utilisateur
export const fetchUserPlaylists = (userId) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/playlists?page=1&user=${userId}`);
        dispatch(setUserPlaylists(response.data));
    } catch (error) {
        console.log(`Erreur lors de la récupération des playlists de l'utilisateur: ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}

// méthode qui récupère le détail d'une playlist
export const fetchPlaylistDetail = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/playlists/${id}`);
        dispatch(setPlaylistDetail(response.data));
    } catch (error) {
        console.log(`Erreur lors de la récupération du détail de la playlist: ${error}`);
    } finally {
        dispatch(setLoading(false));
    }
}

export default userSlice.reducer;