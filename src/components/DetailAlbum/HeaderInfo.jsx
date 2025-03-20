import React, { useEffect, useState } from 'react'
import { ALBUM_URL, ARTIST_URL } from '../../constants/apiConstant';
import PageLoader from '../Loader/PageLoader';
import { Link } from 'react-router-dom';
import { totalDuration } from '../../services/toolsService';

const HeaderInfo = ({dataAlbum}) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [])
    
    //on récupère la photo de l'artiste si elle existe sinon on met l'image de l'album
    const imgPath = dataAlbum?.artist?.imagePath ? `${ARTIST_URL}/${dataAlbum?.artist?.imagePath}` : `${ALBUM_URL}/${dataAlbum?.imagePath}`;

    // on formate la date de sortie de l'album et on ne garde que l'année
    const releaseDate = new Date(dataAlbum?.releaseDate).getFullYear().toString() ?? 'Date inconnue';

    // on définit le nombre de titre par album
    const nbTracks = dataAlbum?.songs
    ? dataAlbum?.songs?.length > 1
    ? `${dataAlbum?.songs?.length} titres`
    : `${dataAlbum?.songs?.length} titre`
    : 'Pas de titre';

    // on se créé un élément graphique pour faire un point
    const Dot = () => (
        <p>&#8226;</p>
    )

    // traitement de la durée totale de l'album
    const durationAlbum = totalDuration(dataAlbum);

    return (
        isLoading ? <PageLoader /> :
        <div className='flex items-center'>
            <Link to={`/artist-detail/${dataAlbum?.artist?.id}`} >
                <img src={imgPath} alt={dataAlbum?.artist?.name ?? "Photo artiste"} className='w-10 h-10 rounded-full object-cover' />
            </Link>
            <p className='font-bold text-base p-1'>{dataAlbum?.artist?.name ?? "Artiste inconnu"}</p>
            <Dot />
            <p className='font-bold text-base p-1'>{releaseDate}</p>
            <Dot />
            <p className='font-bold text-base p-1'>{nbTracks}</p>
            <Dot />
            <p className='font-bold text-base p-1'>{dataAlbum?.songs?.length > 0 ? durationAlbum : "Pas de titre"}</p>
        </div>
    )
}

export default HeaderInfo