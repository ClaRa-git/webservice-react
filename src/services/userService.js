import axios from "axios";
import { API_URL } from "../constants/apiConstant";

/**
 * méthode qui vérifie si l'utilisateur a bien un abonnement actif
 * @param {string} email - email de l'utilisateur
 * @returns {boolean} - true si l'utilisateur a un abonnement actif, false sinon
 */
export const checkSubscription = async (email) => {
  try {
    const response = await axios.get(
      `${API_URL}/user_subscriptions?page=1&user.email=${email}`
    );
    const subscription = response.data['hydra:member'];
    
    //si l'abonnement est actif
    if (subscription[0]?.status === "active") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(`Erreur sur le checkSubscription: ${error}`);
    return false;
  }
};


/**
 * méthode qui vérifie que l'utilisateur du local storage est bien celui de la bdd
 * @params [object] userInfo - l'utilisateur du local storage
 * @returns {boolean} - true si l'utilisateur est bien celui de la bdd, false sinon
 */
export const checkUser = async (userInfo) => {
  try {
    //on récupère l'utilisateur dans la bdd avec l'id qui est en local storage
    const response = await axios.get(`${API_URL}/users/${userInfo.userId}`);
    const user = response.data;
    // maintenant on va comparer les données de la bdd avec celle du locale storage
    if(user.email === userInfo.email && user.nickname === userInfo.nickname){
      return true;
    }else{
      return false;
    }
  } catch (error) {
    console.log(`Erreur sur le checkUser: ${error}`);
    return false;
  }
};