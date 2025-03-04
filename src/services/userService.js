/**
 * Méthode qui vérifie si l'utilisateur a bien un abonnement actif
 * @param {string} email
 * @returns {boolean}
 */

import axios from "axios";
import { API_URL } from "../constants/apiConstant";

export const checkSubscription = async (email) => {
    try {
        const response = await axios.get(`${API_URL}/user_subscriptions?page=1&user.email=${email}`);
        const subscription = response.data['hydra:member'];
        // Vérification de l'abonnement de l'utilisateur
        if (subscription[0]?.status === 'active') {
        return true;
        } else {
            return false;
        }
        
    } catch (error) {
        console.log(`Erreur lors de la vérification de l'abonnement : ${error}`);
        return false;
    }
}