import { configureStore } from "@reduxjs/toolkit";
import planReducer from "./plans/planSlice";
import albumReducer from "./album/albumSlice";
import playerReducer from "./player/playerSlice";
import userReducer from "./user/userSlice";

const store = configureStore({
    reducer: {
        //TODO: Ajouter les reducers
        plans: planReducer,
        albums: albumReducer,
        player: playerReducer,
        users: userReducer
    }
});

export default store;