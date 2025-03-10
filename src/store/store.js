import { configureStore } from "@reduxjs/toolkit";
import planReducer from "./plans/planSlice";
import albumReducer from "./album/albumSlice";
import playerReducer from "./player/playerSlice";

const store = configureStore({
    reducer: {
        //TODO: Ajouter les reducers
        plans: planReducer,
        albums: albumReducer,
        player: playerReducer
    }
});

export default store;