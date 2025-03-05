import { replace, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useEffect } from "react";
import { checkUser } from "../services/userService";

const useAuhtCheck = (userInfo) => {
    const navigate = useNavigate();
    const { signOut } = useAuthContext();

    const verifyUser = async () => {
        if(userInfo && userInfo.userId) {
            const isValidUser = await checkUser(userInfo);
            // si l'utilisateur n'est pas valide, on le déconnecte et on le redirige vers la page de connexion
            if(!isValidUser) {
                signOut();
                navigate('/', {replace: true});
            }
        } else {
            navigate('/', {replace: true});
        }
    }

    useEffect(() => {
        verifyUser();
    }, [userInfo, navigate])
    
};

export default useAuhtCheck;