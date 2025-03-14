import React from 'react'
import { ARTIST_URL, IMAGE_URL } from '../../constants/apiConstant'
import { Link } from 'react-router-dom';

const ArtistCard = ({dataArtist}) => {
    // on déclare des constantes pour les données de l'artiste
    const imgArtist = dataArtist?.imagePath
    ? `${ARTIST_URL}/${dataArtist?.imagePath}`
    : `${IMAGE_URL}/artist.png`;

    const userId = dataArtist?.id ?? 0;

    const name = dataArtist?.name ?? 'Artiste inconnu';

  return (
    <Link to={`/artist-detail/${userId}`}>
        <div className="flex flex-col items-center justify-center bg-white_01 rounded-lg shadow-lg p-4">
            <div className='flex flex-col justify-center items-center'>
                <img src={imgArtist} alt={`Image de l'artiste ${name}`} className='w-40 h-40 rounded-full object-cover' />
                <h3 className='font-bold text-xl text-white text-center mt-2'>{name}</h3>
            </div>
        </div>

    </Link>
  )
}

export default ArtistCard