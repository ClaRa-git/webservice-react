import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { API_ROOT, API_URL } from '../../constants/apiConstant';
import ButtonLoader from '../../components/Loader/ButtonLoader';
import { USER_INFOS } from '../../constants/appConstant';

const PaymentSuccess = () => {
  const [subId, setSubId] = useState('');
  const [subPriceId, setSubPriceId] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem(USER_INFOS))?.userId;
  const date = new Date();
  const status = 'active';

  // on récupère le paramètre de l'url
  const sessionId = new URLSearchParams(window.location.search).get('session_id');
  
  // grâce au sessionId, on va récupérer l'abonnement de stripe
  const fetchSubscription = async () => {
    try {
      const response = await axios.get(`${API_ROOT}/checkout-session/${sessionId}`);
      const data = response.data?.subscription;
      setSubId(data.id);
      setSubPriceId(data?.plan?.id);
    } catch (error) {
      console.log(`Erreur lors de la récupération de l'abonnement: ${error}`);      
    }
  }

  useEffect(() => {
    fetchSubscription();
  }, [])

  const fetchSubscriptionId = async (subPriceId) => {
    try {
      const response = await axios.get(`${API_URL}/subscription_plans?page=1&stripePriceId=${subPriceId}`);
      const dataSubId = response.data['hydra:member'][0]?.id;
      setSubscriptionId(dataSubId);
      console.log("blop");

    } catch (error) {
      console.log(`Erreur lors de la récupération de l'id de l'abonnement: ${error}`);
    }
  }

  const handleRedirect = async () => {
    setIsLoading(true);
    
    await fetchSubscriptionId(subPriceId);
    console.log("blop2"); 

    // on reconstruit l'objet userSubscription
    const dataSubscriptionPlan = {
      user:`/api/users/${userId}`,
      plan:`/api/subscription_plans/${subscriptionId}`,
      stripeSubscriptionId:subId,
      startDate:date,
      status:status
    }

    // on envoie l'objet userSubscription à l'api
    try {
      const response = await axios.post(`${API_URL}/user_subscriptions`, dataSubscriptionPlan);
      if(response.status === 201) {
        navigate('/');
      }

    } catch (error) {
      console.log(`Erreur lors de la création de l'abonnement de l'user: ${error}`);      
    } finally {
      setIsLoading(false);
    }
  }

  return (
      <div className='flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg text-center max-w-md'>
        <FaCheckCircle className='text-green-500 text-6xl mb-4 ' />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Paiement réussi</h1>
        <p className="text-gray-600 mb-6">Votre paiement a été traité avec succès. Vous pouvez maintenant accéder à la plateforme.</p>
        {isLoading ? <ButtonLoader /> : <button className='bg-green-500 text-white px-4 py-2 hover:bg-green_top transition duration-300 rounded-lg' onClick={handleRedirect}>
          Aller à l'accueil
        </button>}
      </div>
    )
}

export default PaymentSuccess