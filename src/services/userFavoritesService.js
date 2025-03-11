import axios from "axios";
import { API_URL } from "../constants/apiConstant";

export const fetchAddRemoveFavorite = async (arrayIds, userId) => {
    const dataFavorite = {
        albums: arrayIds
    }

    try {
        // on doit ajouter la méthode patch à axios
        axios.defaults.headers.patch["Content-Type"] = "application/merge-patch+json";
        const response = await axios.patch(`${API_URL}/users/${userId}`, dataFavorite);

        if (response.status === 200) {
            // console.log('Favoris mis à jour');
        } else {
            console.log('Erreur lors de la mise à jour des favoris');
        }

    } catch (error) {
        console.log(`Erreur lors de la mise à jour des favoris de l'utilisateur: ${error}`);
    }
}