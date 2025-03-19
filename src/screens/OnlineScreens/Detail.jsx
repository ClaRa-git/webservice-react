import React, { useEffect } from 'react'
import DetailAlbum from '../../components/DetailAlbum'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbumByGenre, fetchAlbumDetail } from '../../store/album/albumSlice'
import selectAlbumData from '../../store/album/albumSelector'
import PageLoader from '../../components/Loader/PageLoader'

const Detail = () => {
  //hook pour récuperer les paramètres de l'url
  const params = useParams()
  //on récupère l'id de l'album passé dans l'url
  const id = params.id; // const {id} = params;
  //on récupère le hook useDispatch pour dispatcher les actions
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbumDetail(id));
  }, [dispatch, id])

  const {loading, albumDetail, albumByGenre} = useSelector(selectAlbumData);

  useEffect(() => {
    dispatch(fetchAlbumByGenre(albumDetail.genre));
  }, [dispatch, albumDetail.genre])
  
  

  return (
    loading ? <PageLoader /> :
    <DetailAlbum dataAlbum={albumDetail} albumByGenre={albumByGenre}/>
  )
}

export default Detail