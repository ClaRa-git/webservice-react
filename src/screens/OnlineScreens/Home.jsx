import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbums } from '../../store/album/albumSlice';
import selectAlbumData from '../../store/album/albumSelector';
import PageLoader from '../../components/Loader/PageLoader';
import AlbumCard from '../../components/Card/AlbumCard';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbums());

  }, [dispatch])

  const { albums, loading } = useSelector(selectAlbumData);
  const dataAlbums = albums['hydra:member'];

  return (
    loading ? <PageLoader /> :
      <div className='flex flex-col'>
        <h2 className='font-bold text-3xl text-white text-left mt-4 ml-4 mb-10'>Tous les albums</h2>
        <div className="flex flex-wrap justify-center sm:justify-start gap-8 mx-2">
          { dataAlbums && dataAlbums.map((data, index) => 
            <AlbumCard key={index} data={data} />
          )}
        </div>
      </div>
  )
}

export default Home