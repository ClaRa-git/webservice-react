import { use, useContext, useState } from 'react';
import { createContext } from 'react';
import { USER_INFOS } from '../constants/appConstant';

// Définition du contexte d'authentification
const AuthContext = createContext({
    userId: '',
    email: '',
    nickname: '',
    setUserId: () => {},
    setEmail: () => {},
    setNickname: () => {},
    signIn: async () => {},
    signOut: async () => {},
});

// Définition de toute la mécanique du contexte d'authentification
const AuthContextProvider = ({children}) => {
    // Définition des états
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    
    // Définition de la méthode signIn pour la connexion
    const signIn = async (user) => {
        try {
            // Remplissage des états avec les données de l'utilisateur
            setUserId(user.id);
            setEmail(user.email);
            setNickname(user.nickname);

            // Stockage des données de l'utilisateur dans le localStorage
            localStorage.setItem(USER_INFOS, JSON.stringify(user));
        } catch (error) {
            throw new Error(`Erreur lors de la connexion : ${error}`);
        }
    }

    // Définition de la méthode signOut pour la déconnexion
    const signOut = async () => {
        try {
            // Remise à zéro des états
            setUserId('');
            setEmail('');
            setNickname('');

            // Suppression des données de l'utilisateur dans le localStorage
            localStorage.removeItem(USER_INFOS);
        } catch (error) {
            throw new Error(`Erreur lors de la déconnexion : ${error}`);
        }
    }

    const value = {
        userId,
        email,
        nickname,
        setUserId,
        setEmail,
        setNickname,
        signIn,
        signOut,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Création d'un hook personnalisé pour utiliser le contexte d'authentification
const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthContextProvider, useAuthContext };