import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchUserDetail } from '../../../store/user/userSlice';
import selectUserData from '../../../store/user/userSelector';
import { AVATAR_URL, IMAGE_URL } from '../../../constants/apiConstant';
import PageLoader from '../../../components/Loader/PageLoader';
import { BsFillPenFill } from 'react-icons/bs';
import InfoAccount from '../../../components/Ui/InfoAccount';

const Account = () => {
  // onrécupère le hook useParams pour récupérer les paramètres de l'url
  const params = useParams();
  const userId = params.id;

  // on déclare un state pour l'abonnement
  const [subscriptions, setSubscriptions] = useState([]);

  // on récupère le hook useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetail(userId));

  }, [dispatch, userId]);
  
  const { userDetail, loading } = useSelector(selectUserData);

  useEffect(() => {
    if(userDetail && userDetail?.userSubscriptions) setSubscriptions(userDetail.userSubscriptions);
  }, [userDetail])  

  // on déclare des constantes pour récupérer les informations de l'utilisateur
  const imgUser = userDetail?.avatar?.imagePath
  ? `${AVATAR_URL}/${userDetail.avatar.imagePath}`
  : `${IMAGE_URL}/user.png`;
  const nickname = userDetail?.nickname ?? "Pas de pseudo";
  const email = userDetail?.email ?? "Pas d'email";

  return (
    loading ? <PageLoader /> :
    <div className='flex flex-col items-center justify-center mt-20'>
      <h1 className='title-h1'>Mon compte</h1>

      <div className='flex flex-col items-center justify-center'>
        <div className='w-40 h-40 relative'>
          <img src={imgUser} alt="Avater utilisateur" className='w-40 h-40 rounded-full object-cover shadow-lg' />
          <Link to={'/edit-avatar'} className='absolute bottom-2 right-2 bg-green text-white p-2 rounded-full hover:bg-green_top transition duration-300' >
            <BsFillPenFill size={20}/>
          </Link>
        </div>
      </div>
      <div className='w-full max-w-md mt-10 bg-white p-6 rounded-lg shadow-lg'>
        <InfoAccount label={'Pseudo :'} value={nickname} />
        <InfoAccount label={'Email :'} value={email} />
        <InfoAccount label={'Mot de passe :'} value={'********'} /> 

        <div className='flex flex-col w-full items-start mb-4'>
          <Link to={'/edit-info'} className='w-full text-center mt-4 bg-green text-white px-4 py-2 rounded-lg hover:bg-green_top transition duration-300'>
            Modifier mes informations
          </Link>
          <Link to={`/manage-subscription/${userId}`}
            className='w-full text-center mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300'
            state={{subscriptions: subscriptions}}  
          >
            Gérer mon abonnement
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Account