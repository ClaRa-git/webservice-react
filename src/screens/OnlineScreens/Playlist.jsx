import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthContext } from '../../contexts/AuthContext';
import { fetchUserPlaylists } from '../../store/user/userSlice';
import selectUserData from '../../store/user/userSelector';
import PageLoader from '../../components/Loader/PageLoader';
import { ALBUM_URL, IMAGE_URL } from '../../constants/apiConstant';
import { totalDuration } from '../../services/toolsService';
import { Link } from 'react-router-dom';

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
          {userPlaylists && userPlaylists.map((playlist, index) => {
            // on créé une const pour récupérer la première image d'album dans le tableau de songs, si un tableau vide on récupère l'image par défaut
            const image = playlist.songs.length > 0 
            ? `${ALBUM_URL}/${playlist.songs[0].album.imagePath}`
            : `${IMAGE_URL}/playlist.png`;

            // on récupère le titre de la playlist, si pas de titre on met 'Playlist sans titre'
            const title = playlist?.title || 'Playlist sans titre';

            // on récupère le nombre de chansons dans la playlist
            const nbSongs = playlist?.songs?.length > 0
            ? 
              playlist?.songs?.length === 1
              ? `${playlist?.songs?.length} chanson`
              : `${playlist?.songs?.length} chansons`
            : 'Aucune chanson';

            // on récupère la durée totale en hh:mm:ss
            const durationPlaylist = playlist?.songs?.length > 0
            ? totalDuration(playlist)
            : '-';

            return (
              <Link to={`/playlist-detail/${playlist.id}`} key={index} className='flex flex-col text-white p-3 bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] rounded-lg items-center justify-between'>
                <img src={image} alt={`image de la playlist ${title}`} className='w-15 h-15 object-containt rounded-full' />
                <h2 className='text-xl truncate font-bold py-3'>{title}</h2>
                <p className='text-base'>{nbSongs}</p>
                <p className='text-base'>{durationPlaylist}</p>
              </Link>
            )
          }            
          )}
        </div>
      </div>
  )
}

export default Playlist