import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom'
import { API_ROOT } from '../../../constants/apiConstant';
import PageLoader from '../../../components/Loader/PageLoader';

const ManageSubscription = () => {
  //on recupère nos hooks
  const location = useLocation();
  //on déclare nos states
  const [infoSubscription, setInfoSubscription] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const { subscriptions } = location.state || {};

  const fetchSubscription = async () => {

    const subscriptionId = subscriptions[0].stripeSubscriptionId || null;

    try {
      setIsLoading(true)
      const response = await axios.post(`${API_ROOT}/user/subscription`, { subscriptionId: subscriptionId },
        {
          headers: {
            "Content-Type": "application/json",
          }
        })
      console.log('response', response.data);

      if (response.data) {
        setInfoSubscription(response.data)
      }
    } catch (error) {
      setError("Erreur lors de la récupération de l'abonnement")
      console.log(`erreur lors de la récupération de l'abonnement: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscription();
  }, [])

  const handleCancelSubscription = async () => {
    const confirm = window.confirm('Voulez-vous vraiment résilier votre abonnement?');
    if (!confirm) return;

    try {
      const responseCancel = await axios.post(`${API_ROOT}/user/pause-subscription`, { subscriptionId: subscriptions[0].stripeSubscriptionId },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      )
      if (responseCancel.data.message) {
        fetchSubscription();
      } else {
        setError('Erreur lors de la résiliation de l\'abonnement')
      }
    } catch (error) {
      console.log('Erreur lors de la résiliation de l\'abonnement', error)

    }
  }
  const handleResumeSubscription = async () => {
    const confirm = window.confirm('Voulez-vous vraiment réactiver votre abonnement?');
    if(!confirm) return;

    try {
      const responseResume = await axios.post(`${API_ROOT}/user/reactivate-subscription`, { subscriptionId: subscriptions[0].stripeSubscriptionId },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      )
      if (responseResume.data.message) {
        fetchSubscription();
      } else {
        setError('Erreur lors de la réactivation de l\'abonnement')
      }
    } catch (error) {
      console.log('Erreur lors de la réactivation de l\'abonnement', error)

    }
  }

  const status = infoSubscription?.subscription?.status;
  const subName = infoSubscription?.product?.name;
  const price = (infoSubscription?.subscription?.plan?.amount / 100).toString().replace('.', ',');
  const currency = infoSubscription?.subscription?.plan?.currency;
  const nextBilling = infoSubscription?.subscription?.current_period_end;
  const pauseSubscription = infoSubscription?.subscription?.cancel_at_period_end;
  return (
    isLoading ? <PageLoader /> :
      <div className='max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>Gérer mon abonnement</h2>
        <p className='text-red-700 p-3 text-base font-bold'>{error}</p>
        <div className='flex flex-col items-center'>
          {/* nom de l'abonnement */}
          <h3 className='text-lg font-semibold text-gray-700 mb-3'>
            {subName}
          </h3>
          <div className='flex items-center justify-between mb-3'>
            <p className='text-gray-600 font-medium'>Statut: </p>
            <p className={`px-3 py-1 rounded-full text-sm font-semibold ${status === 'active'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'}`}>
              {status === 'active' && !pauseSubscription 
                ? "Actif"
                : status === 'active' && pauseSubscription
                  ? "En pause"
                  : "Résilié"
              }
            </p>
          </div>
          <div className='flex items-center justify-between mb-3'>
            <p className='text-gray-600 font-medium pr-2'>Montant: </p>
            <p className='text-gray-600 font-medium'>
              {price} {currency}
            </p>
          </div>
          <div className='flex items-center justify-between mb-3'>
            {status === 'active' && !pauseSubscription
              ? <p className='text-gray-600 font-medium pr-2'>Prochain prélèvement: </p>
              : <p className='text-gray-600 font-medium pr-2'>Fin de l'abonnement: </p>}
            <p className='text-gray-600 font-medium'>
              {nextBilling ? new Date(nextBilling * 1000).toLocaleDateString() : 'Pas de date'}
            </p>
          </div>
          {/* bouton pour résilier ou reactiver l'abonnement */}
          {status === 'active' && !pauseSubscription
            ? <button
              className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300'
              onClick={() => {
                  handleCancelSubscription();
              }}
            >
              Résilier abonnement
            </button>
            : <button
              className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300'
              onClick={() => {
                  handleResumeSubscription();
              }}
            >
              Réactiver abonnement
            </button>
          }

        </div>
      </div>

  )
}

export default ManageSubscription