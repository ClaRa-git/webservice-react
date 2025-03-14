import React from 'react'
import { ARTIST_URL, IMAGE_URL } from '../../constants/apiConstant';

const HeaderDetail = ({dataArtist}) => {
    // on récupère l'image de l'artiste sinon on récupère une image par défaut
    const imgArtist = dataArtist?.imagePath
    ? `${ARTIST_URL}/${dataArtist.imagePath}`
    : `${IMAGE_URL}/artist.png`;

    const artistName = dataArtist?.name ?? 'Artiste inconnu';

  return (
    <div className='bg-gradient-to-b from-green_top to-transparent p-5 w-full flex items-center'>
        <img src={imgArtist} alt={`Image de l'artiste ${artistName}`} className='w-48 h-48 m-1 rounded-full object-cover' />
        <div className='ml-10 flex flex-col justify-end'>
            <h1 className='text-5xl font-bold text-white my-7'>{artistName}</h1>
        </div>
    </div>
  )
}

export default HeaderDetail