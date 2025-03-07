import { configureStore } from "@reduxjs/toolkit";
import planReducer from "./plans/planSlice";
import albumReducer from "./album/albumSlice";

const store = configureStore({
    reducer: {
        //TODO: Ajouter les reducers
        plans: planReducer,
        albums: albumReducer
    }
});

export default store;