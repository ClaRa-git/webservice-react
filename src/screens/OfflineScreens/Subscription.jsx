import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchPlans } from '../../store/plans/planSlice';
import planSelector from '../../store/plans/planSelector';
import { USER_INFOS } from '../../constants/appConstant';
import useAuhtCheck from '../../hooks/useAuthCheck';

const Subscription = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  // on récupère les infos de l'utilisateur connecté
  const userInfo = JSON.parse(localStorage.getItem(USER_INFOS));

  // on appelle notre hook de vérification de l'utilisateur
  useAuhtCheck(userInfo);

  useEffect(() => {
    // on appelle la méthode fetchPlans depuis notre slice en utilisant dispatch
    dispatch(fetchPlans());

  }, [dispatch]);  

  // on récupère les infos du slice plans
  const { plans, loading } = useSelector(planSelector);

  console.log(loading);
  console.log(plans);

  return (
    <div>Subscription</div>
  )
}

export default Subscription