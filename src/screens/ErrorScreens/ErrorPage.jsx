import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <FaExclamationTriangle className='text-red-500 text-6xl mb-4' />
      <h1 className='text-4xl font-bold text-white mb-4'>Page non trouvée</h1>
      <p className="text-white text-lg mb-6">La page que vous recherchez n'existe pas</p>
      <button className='px-4 py-2 bg-green hover:bg-green_top rounded-lg text-white' 
        onClick={() => handleRedirect()}
      >
        Retour à l'accueil
      </button>
    </div>
  )
}

export default ErrorPage