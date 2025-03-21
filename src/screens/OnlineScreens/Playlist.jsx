import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthContext } from '../../contexts/AuthContext';
import { fetchUserPlaylists } from '../../store/user/userSlice';
import selectUserData from '../../store/user/userSelector';
import PageLoader from '../../components/Loader/PageLoader';
import { ALBUM_URL, IMAGE_URL } from '../../constants/apiConstant';
import { totalDuration } from '../../services/toolsService';
import { Link } from 'react-router-dom';
import PlaylistCard from '../../components/Card/PlaylistCard';

const Playlist = () => {
  const dispatch = useDispatch();
  const {userId} = useAuthContext();

  useEffect(() => {
    dispatch(fetchUserPlaylists(userId));
  }, [dispatch, userId]);

  const {loading, userPlaylists} = useSelector(selectUserData);

  return (
    loading ? <PageLoader />
    :
      <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-bold mb-4'>Gestion des playlists</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {userPlaylists && userPlaylists.map((playlist, index) => (
            <PlaylistCard key={index} playlist={playlist} />
          )      
          )}
        </div>
      </div>
  )
}

export default Playlist