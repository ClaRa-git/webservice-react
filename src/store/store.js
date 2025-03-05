import { configureStore } from "@reduxjs/toolkit";
import planReducer from "./plans/planSlice";

const store = configureStore({
    reducer: {
        //TODO: Ajouter les reducers
        plans: planReducer,
    }
});

export default store;