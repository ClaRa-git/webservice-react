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

/**
 * Méthode qui vérifie que l'utilisateur du localStorage est bien celui de la bdd
 * @params [object] userInfos - l'utilisateur stocké dans le localStorage
 * @returns {boolean} - true si l'utilisateur est bien en bdd, false sinon
 */
export const checkUser = async (userInfo) => {
    try {
        // on récupère l'utilisateur dans la bdd avec l'id stocké dans le localStorage
        const response = await axios.get(`${API_URL}/users/${userInfo.userId}`);
        const user = response.data;
        // on compare l'email de l'utilisateur stocké dans le localStorage avec celui de la bdd
        if (user.email === userInfo.email && user.nickname === userInfo.nickname) {
            return true;
        }
    } catch (error) {
        console.log(`Erreur sur le checkUser : ${error}`);
        return false;
    }
}