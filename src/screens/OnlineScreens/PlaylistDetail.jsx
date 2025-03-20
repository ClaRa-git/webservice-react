import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { fetchPlaylistDetail } from '../../store/user/userSlice';
import selectUserData from '../../store/user/userSelector';
import PageLoader from '../../components/Loader/PageLoader';
import HeaderDetail from '../../components/DetailPlaylist/HeaderDetail';
import ToolBarDetail from '../../components/DetailPlaylist/ToolBarDetail';

const PlaylistDetail = () => {
    const dispatch = useDispatch();

    const params = useParams();
    const {id} = params;

    const {loading, playlistDetail} = useSelector(selectUserData);

    useEffect(() => {
        dispatch(fetchPlaylistDetail(id));
    }, [dispatch, id]);
    

  return (
    loading ? <PageLoader /> :
    <>
        <HeaderDetail dataPlaylist={playlistDetail}/>
        <ToolBarDetail dataPlaylist={playlistDetail} />
    </>
  )
}

export default PlaylistDetail