import React from 'react'
import { FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

const PaymentCancel = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/subscription')
  }

  return (
    <div className='flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg text-center max-w-md'>
      <FaTimesCircle className='text-red-500 text-6xl mb-4 ' />
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Paiement annulé</h1>
      <p className="text-gray-600 mb-6">Votre paiement a été annulé. Vous pouvez réessayer ou choisir un autre moyen de paiement.</p>
      <button className='bg-red-500 text-white px-4 py-2 hover:bg-red-600 transition duration-300 rounded-lg' onClick={handleRedirect}>
        Retour à l'accueil
      </button>
    </div>
  )
}

export default PaymentCancel