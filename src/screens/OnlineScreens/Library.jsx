import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from '../../contexts/AuthContext';
import { fetchUserFavorites } from '../../store/user/userSlice';
import selectUserData from '../../store/user/userSelector';

const Library = () => {
  const dispatch = useDispatch();
  const {userId} = useAuthContext();

  useEffect(() => {
    dispatch(fetchUserFavorites(userId));
  }, [dispatch, userId]);

  const {loading, userFavorites} = useSelector(selectUserData);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const titleFavorites = userFavorites?.length > 0
  ? userFavorites?.length === 1
  ? 'Album likés'
  : 'Albums likés'
  : 'Aucun album liké';

  return (
    <div>Library</div>
  )
}

export default Library