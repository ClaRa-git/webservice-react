import React from 'react'
import { ALBUM_URL } from '../../constants/apiConstant'
import { useSelector } from 'react-redux';
import selectArtistData from '../../store/artist/artistSelector';

const Track = ({ isPlaying, isActive, activeSong, currentAlbum, artist = 'Artiste inconnu' }) => {
    // on récupère les infos de l'artiste depuis le store
    const { artistDetail } = useSelector(selectArtistData);
    console.log('artistDetail', artistDetail);
    // on récupère l'image de l'album
    const imgAlbum = `${ALBUM_URL}/${currentAlbum?.imagePath}`;
    // on récupère le titre de la chanson
    const title = activeSong?.title ?? 'Musique inconnue';
    // on récupère le nom de l'artiste
    const artistName = currentAlbum?.artist?.name
    ?currentAlbum?.artist?.name
    : artistDetail?.artist?.name
    ? artistDetail?.artist?.name
    : artist
    // on récupère le nom de l'album
    const album = currentAlbum?.title ?? 'Album inconnu';
    console.log('currentAlbum', currentAlbum);

  return (
    <div className='flex flex-1 items-center justify-start'>
        <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block w-16 h-16 mr-6 mt-4`}>
            <img src={imgAlbum} alt={`image album ${album}`} className='rounded-full' />
        </div>
    
        <div className='w-[50%'>
            <p className='truncate text-white font-bold text-lg'>{ title }</p>
            <p className='truncate text-gray-500'> {artistName} </p>
        </div>
    </div>
  )
}

export default Track