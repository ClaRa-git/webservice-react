import React, { useState } from 'react'
import { useAuthContext } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../../components/Ui/CustomInput';
import ButtonLoader from '../../../components/Loader/ButtonLoader';
import { checkUser } from '../../../services/userService';
import { USER_INFOS } from '../../../constants/appConstant';
import axios from 'axios';
import { API_ROOT, API_URL } from '../../../constants/apiConstant';

const EditInfo = () => {
    // on récupère les infos de notre contexte d'identification
    const {userId, nickname, email, signIn, signOut} = useAuthContext();
    // on récupère le hook de navigation
    const navigate = useNavigate();
    // on déclare nos states
    const [nicknameValue, setNicknameValue] = useState(nickname);
    const [emailValue, setEmailValue] = useState(email);
    const [passwordValue, setPasswordValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // on passe le loader à true
            setIsLoading(true);
            // on vérifie que l'utilisateur en session est bien le bon
            const userInfo = JSON.parse(localStorage.getItem(USER_INFOS));
            // on vérifie que l'utilisateur en session est bien le bon
            const userValid = await checkUser(userInfo);
            if(userValid) {
                // on vérfie que les champs sont remplis
                if(emailValue.length > 0 && passwordValue.length > 0 && nicknameValue.length > 0) {
                    // on continue et on va construire plusieurs petits tableaux de données
                    // on crée un tableau pour vérifier le mot de passe
                    const dataCheck = {
                        id: userId,
                        password: passwordValue
                    }
                    // on crée un tableau pour le patch (pour modifier les infos de l'user) on ne prends pas le mdp
                    const data = {
                        nickname: nicknameValue,
                        email: emailValue
                    }

                    // on créé un tableau pour les entêtes de la requête
                    const headers = {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }

                    try {
                        // requête pour vérifier le mot de passe
                        const responsePassword = await axios.post(`${API_ROOT}/check-password`, dataCheck, {headers});

                        if(responsePassword.data.response) {
                            // on vérifie que l'email n'est pas déjà utilisé
                            const responseEmail = await axios.get(`${API_URL}/users?email=${emailValue}`);
                            if(emailValue != email && responseEmail.data['hydra:member'].length > 0 ) {
                                setError('Email déjà utilisé');
                            }else {
                                // on peut modifier les infos de l'utilisateur en patch
                                axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';
                                const response = await axios.patch(`${API_URL}/users/${userId}`, data);
                                // on reconstruit un tableau pour mettre à jour la session
                                const user = {
                                    userId: response.data.id,
                                    email: response.data.email,
                                    nickname: response.data.nickname
                                }
                                // on met à jour le contexte d'authentification
                                signIn(user);
                                // on redirige vers la page de profil
                                navigate(`/account/${userId}`);
                            }
                        } else {
                            setError('Mot de passe incorrect');
                        }
                        
                    } catch (error) {
                        console.error(`Erreur lors de la modification des infos : ${error}`);
                        setError('Erreur lors de la modification du mot de passe');                        
                    }

                } else {
                    setError('Veuillez remplir tous les champs');
                }
            } else {
                signOut();
                navigate('/');
            }
        } catch (error) {
            console.error(`Erreur lors de la vérification de l'utilisateur : ${error}`);
        } finally {
            // on passe le loader à false
            setIsLoading(false);
        }
    }

  return (
    <div className='flex flex-1 flex-col h-screen justify-start items-center bg-black'>
        <h2 className='text-white font-bold text-xl py-5'>Modifier mes infos</h2>
        <div className='text-red-500 font-bold mb-4'>{error}</div>
        <form onSubmit={handleSubmit} className='w-[350px] mx-auto'>
            <CustomInput
                state={nicknameValue}
                label={"Votre pseudo"}
                type={"text"}
                callable={(e) => setNicknameValue(e.target.value)}
            />
            <CustomInput
                state={emailValue}
                label={"Votre email"}
                type={"email"}
                callable={(e) => setEmailValue(e.target.value)}
            />
            <CustomInput
                state={passwordValue}
                label={"Votre mot de passe"}
                type={"password"}
                callable={(e) => setPasswordValue(e.target.value)}
            />

            <div className='flex items-center justify-center pt-5'>
                { isLoading ? <ButtonLoader /> :
                    <button type='submit' className='bg-green hover:bg-green_top text-white font-bold py-2 px-4 rounded-lg'>
                        Modifier mes infos
                    </button>
                }
            </div>
        </form>
    </div>
  )
}

export default EditInfo