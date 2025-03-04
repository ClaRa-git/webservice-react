import React, { useEffect, useState } from 'react'
import CustomInput from '../../components/Ui/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import ButtonLoader from '../../components/Loader/ButtonLoader';
import { useAuthContext } from '../../contexts/AuthContext';
import useSubscriptionCheck from '../../hooks/useSubscriptionCheck';
import axios from 'axios';
import { API_ROOT } from '../../constants/apiConstant';

const Login = () => {

  // Définition des states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Récupération de la méthode signIn depuis authContext
  const { signIn } = useAuthContext();
  const navigate = useNavigate();

  // Vérification des abonnements de l'utilisateur
  const { isSubscribed, loading: checkSubscription } = useSubscriptionCheck();

  useEffect(() => {
    if (user && !checkSubscription) {
      if (isSubscribed) {
        navigate('/');
      } else {
        navigate('/subscription');
      }
    }
  }, [user, isSubscribed, checkSubscription, navigate]);  

  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche d'envoyer le formulaire
    setIsLoading(true); // Active le loader
    setErrorMessage(''); // Réinitialise le message d'erreur

    try {
      const response = await axios.post(`${API_ROOT}/login`, {email, password});
      console.log(response.data);

      if(response.data?.email) {
        const loggedInUser = response.data;
        signIn(loggedInUser);
        loggedInUser.isSubscribed = response.data?.isSubscribed;
        setUser(loggedInUser);
      } else {
        setErrorMessage('Email ou mot de passe incorrect');
      }

    } catch (error) {
      setErrorMessage('Erreur lors de la connexion');
      console.log(`Erreur lors de la connexion : ${error}`);
    } finally {
      setIsLoading(false); // Désactive le loader
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-full px-6 py-10'>
      <h1 className='title-h1'>Connectez-vous !</h1>
      <form onSubmit={handleSubmit} className='w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg space-y-5'>
        <CustomInput 
          state={email} 
          label='Votre email' 
          type='email' 
          callable={(e) => setEmail(e.target.value)} />
        <CustomInput 
          state={password} 
          label='Votre mot de passe' 
          type='password' 
          callable={(e) => setPassword(e.target.value)} />
        
        {/* Gestion des messages d'erreur */}
        {errorMessage && <p className='text-red-500 text-center'>{errorMessage}</p>}

        <p className="text-gray-400">
          Pas encore de compte ? <Link to="/register" className="text-green font-bold hover:text-green_top">Créer un compte</Link>
        </p>

        {/* Bouton de soumission */}
        <div className="flex justify-center">
          { isLoading ? (
            <ButtonLoader />
          ) : (
            <button 
              type="submit" 
              className="w-full bg-green hover:bg-green_top text-white font-bold py-3 rounded-lg transition">
              Se connecter
            </button>
          )}
        </div>

      </form>
    </div>
  )
}

export default Login