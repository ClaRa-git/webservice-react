import React, { useState } from 'react'
import CustomInput from '../../components/Ui/CustomInput';
import { Link } from 'react-router-dom';
import ButtonLoader from '../../components/Loader/ButtonLoader';

const Register = () => {

  // Définition des states
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche d'envoyer le formulaire
    console.log('Email :', email);
    console.log('Password :', password);
    console.log('Nickname :', nickname);
  }

  return (
    <div className='flex flex-col items-center justify-center w-full px-6 py-10'>
      <h1 className='title-h1'>Connectez-vous !</h1>
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
          Vous avez déjà un compte ? <Link to="/" className="text-green font-bold hover:text-green_top">Connectez-vous</Link>
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