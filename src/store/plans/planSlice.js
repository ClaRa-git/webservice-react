import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/apiConstant";

// le slice correspond à un rayon de magasin
const planSlice = createSlice({
    name: "plans", // on lui donne un nom unique
    initialState: {
        plans: [], // on initialise le state avec un tableau vide
        loading: false, // on initialise le state avec loading à false
    },
    reducers: {
        setPlans: (state, action) => {
            state.plans = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setPlans, setLoading } = planSlice.actions;

export const fetchPlans = () => async (dispatch) => {
    try {
        // on passe le loading à true pour afficher le loader
        dispatch(setLoading(true));
        // on fait la requête pour récupérer les abonnements de la bdd
        const response = await axios.get(`${API_URL}/subscription_plans?page=1`);
        // on met à jour le state plans avec les données récupérées
        dispatch(setPlans(response.data));
        // on repasse le loading à false pour cacher le loader
        dispatch(setLoading(false));
    } catch (error) {
        console.log(`Erreur sur fetchPlans: ${error}`);
        // on repasse le loading à false pour cacher le loader
        dispatch(setLoading(false));
    }
};

export default planSlice.reducer;