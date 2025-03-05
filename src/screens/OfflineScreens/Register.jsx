import React, { useState } from 'react'
import CustomInput from '../../components/Ui/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import ButtonLoader from '../../components/Loader/ButtonLoader';
import { useAuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { API_ROOT } from '../../constants/apiConstant';

const Register = () => {

  // Définition des states
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const  {signIn} = useAuthContext();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche d'envoyer le formulaire
    setIsLoading(true); // Active le loader
    setErrorMessage(''); // Remise à zéro du message d'erreur

    try {
      const response = await axios.post(`${API_ROOT}/register`, {
        email,
        password,
        nickname
      });

      if(response.data?.success === false) {
        setErrorMessage(response.data.message);
      } else {
        const loggedInUser = {
          userId: response.data.id,
          email: response.data.email,
          nickname: response.data.nickname,
        };

        signIn(loggedInUser);
        navigate('/subscription');
      }

    } catch (error) {
      console.log(`Erreur de requête lors de l'inscription : ${error}`);
    } finally {
      setIsLoading(false); // Désactive le loader
    }

  }

  return (
    <div className='flex flex-col items-center justify-center w-full px-6 py-10'>
      <h1 className='title-h1'>Inscrivez-vous !</h1>
      <form onSubmit={handleSubmit} className='w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg space-y-5'>
        <CustomInput 
          state={email} 
          label={'Votre email'} 
          type={'email'} 
          callable={(e) => setEmail(e.target.value)} />
        <CustomInput
          state={nickname}
          label={"Votre nom d'utilisateur"}
          type={'text'}
          callable={(e) => setNickname(e.target.value)}
        />
        <CustomInput 
          state={password} 
          label={'Votre mot de passe'} 
          type={'password'} 
          callable={(e) => setPassword(e.target.value)} />
        
        {/* Gestion des messages d'erreur */}
        {errorMessage && <p className='text-red-500 text-center'>{errorMessage}</p>}

        <p className="text-gray-400">
          Vous avez déjà un compte ? <Link to="/" className="text-green font-bold hover:text-green_top">Connectez-vous !</Link>
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

export default Register