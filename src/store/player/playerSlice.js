import { createSlice, current } from "@reduxjs/toolkit";

// on va initialiser nos states dans une constante
const initialState = {
    activeSong: {}, // infos de la chanson en cours de lecture
    currentAlbum: [], // infos de l'album en cours de lecture
    currentIndex: 0, // index de la chanson en cours de lecture
    currentSongs: [], // tableau de chansons de l album en cours de lecture
    isActive: false, // état du player
    isPlaying: false, // état de la lecture/pause
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        // mettre à jour les states tout ce qu'on stocke lorsqu'on active une chanson
        setActiveSong: (state, action) => {
            // stockage de la chanson en lecture dans activeSong
            state.activeSong = action.payload?.songs[action.payload.index];
            // stockage du tableau de chansons de l'album en cours de lecture
            state.currentSongs = action.payload?.songs;
            // stockage de l'index de la chanson en cours de lecture
            state.currentIndex = action.payload?.index;
            // stockage de l'état du player
            state.isActive = true;
        },
        // récuperer les infos de l'album en cours de lecture
        setActiveAlbum: (state, action) => {
            state.currentAlbum = action.payload?.data;
        },
        // méthode pour avancer d'une piste
        nextSong: (state, action) => {
            // on doit mettre à jour activeSong
            state.activeSong = state.currentSongs[action.payload];
            // on stocke le nouvel index
            state.currentIndex = action.payload;
            state.isActive = true;
        },
        // méthode pour revenir d'une piste
        prevSong: (state, action) => {
            state.activeSong = state.currentSongs[action.payload];
            state.currentIndex = action.payload;
            state.isActive = true;
        },
        // méthode pour mettre en pause
        playPause: (state, action) => {
            state.isPlaying = action.payload;
        } 
    }
})

// on exporte les actions
export const { setActiveSong, setActiveAlbum, nextSong, prevSong, playPause } = playerSlice.actions;
// on exporte le reducer
export default playerSlice.reducer;
