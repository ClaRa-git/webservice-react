import React from 'react'
import { ALBUM_URL } from '../../constants/apiConstant'
import { Link } from 'react-router-dom';

const AlbumCard = ({data}) => {
    // on récupère l'image de l'album
    const imgAlbum = `${ALBUM_URL}/${data.imagePath}`;
    // on redéfinit des const pour les infos de l'album
    const artistName = data?.artist?.name ?? 'Artiste inconnu';
    const albumName = data?.title ?? 'Album inconnu';
    const albumId = data?.id ?? 0;

    return (
        <div className='flex flex-col w-[250px] p-4 bg-white_01 hover:bg-white_05 transition-all ease-in-out duration-500 animate-slideup rounded-lg cursor-pointer group'>
            <div className="relative w-full flex flex-col">
                <Link to={`/detail/${albumId}`}>
                    <img 
                        src={imgAlbum}
                        alt={`image de l'album ${albumName}`}
                        className='card-sh rounded-lg object-cover h-52 w-52' />
                </Link>
                {/* TODO: placer ici le bouton play/pause */}
                <Link to={`/detail/${albumId}`}>
                </Link>
                <div className="mt-4 flex flex-col">
                    <p className='text-white text-xl truncate font-bold'>{albumName}</p>
                    <p className='text-white text-sm truncate'>{artistName}</p>
                </div>
            </div>
        </div>
    )
}

export default AlbumCard