import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from '../../contexts/AuthContext';
import { fetchUserFavorites } from '../../store/user/userSlice';
import selectUserData from '../../store/user/userSelector';
import PageLoader from '../../components/Loader/PageLoader';
import AlbumCard from '../../components/Card/AlbumCard';

const Wishlist = () => {
  const dispatch = useDispatch();
  const {userId} = useAuthContext();

  useEffect(() => {
    dispatch(fetchUserFavorites(userId));
  }, [dispatch, userId]);

  const {loading, userFavorites} = useSelector(selectUserData);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const title = userFavorites?.length > 0
  ? userFavorites?.length === 1
  ? 'Album likés'
  : 'Albums likés'
  : 'Aucun album liké';
  
  return (
    loading ? <PageLoader /> :
      <div className='flex flex-col'>
        <h2 className='font-bold text-3xl text-white text-left mt-4 ml-4 mb-10'>
          {title}
        </h2>
        <div className="flex flex-wrap justify-center sm:justify-start gap-8 mx-2">
          { userFavorites && userFavorites.map((data, index) => 
            <AlbumCard
              key={index}
              data={data} // données de l'album
              songs={data.songs} // tableau de chansons
              isPlaying={isPlaying} // état de lecture/pause
              activeSong={activeSong} // infos de la chanson en cours de lecture
              index={0} // index de la chanson dans son tableau
            />
          )}
        </div>
      </div>
  )
}

export default Wishlist