import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { USER_INFOS } from "../constants/appConstant";
import PageLoader from "../components/Loader/PageLoader";
import { RouterProvider } from "react-router-dom";
import OnlineRouter from "./OnlineRouter";
import OfflineRouter from "./OfflineRouter";
import useSubscriptionCheck from "../hooks/useSubscriptionCheck";

// Création d'un mini contexte pour la session
const SessionContext = createContext({ inSession: false });

// Création d'un hook personnalisé pour utiliser le contexte de session
export const useSession = () => useContext(sessionContext);

const AppRouter = () => {
    // Création d'un state pour gérer la session
    const [inSession, setInSession] = useState(null);
    // Récupération des données du contexte d'authentification grâce au hook
    const { userId, setUserId, setEmail, setNickname } = useAuthContext();
    // Récupération des données de l'utilisateur dans le localStorage
    const userInfo = JSON.parse(localStorage.getItem(USER_INFOS));
    // Vérification de l'abonnement de l'utilisateur
    const {isSubscribed, isLoading: loadingSubscription} = useSubscriptionCheck(userInfo);

    useEffect(() => {
        const checkUserSession = async () => {
            if(userInfo) {
                setUserId(userInfo.id);
                setEmail(userInfo.email);
                setNickname(userInfo.nickname);
                setInSession(true);
            } else {
                setInSession(false);
            }
        }

        checkUserSession();
    
    }, [userId])

    // Affichage du loader le temps du chargement
    if(inSession === null || loadingSubscription) {
        return <PageLoader />
    }

    return (
        <SessionContext.Provider value={{ inSession }}>
            {/* <RouterProvider router={inSession && isSubscribed ? OnlineRouter : OfflineRouter} /> */}
            <RouterProvider router={inSession ? OnlineRouter : OfflineRouter} />

        </SessionContext.Provider>
    );
    
};

export default AppRouter;