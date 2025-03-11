import React from 'react'
import { ALBUM_URL } from '../../constants/apiConstant'
import HeaderInfo from './HeaderInfo';
import HeaderCategory from './HeaderCategory';

const HeaderDetail = ({dataAlbum}) => {
    //on récupère l'image de l'album
    const imgAlbum = `${ALBUM_URL}/${dataAlbum?.imagePath}`;

    return (
        <div className='bg-gradient-to-b from-green_top to-transparent p-5 w-full flex items-center'>
            <img src={imgAlbum} alt={`image de l'album ${dataAlbum?.title}`} className='w-48 h-48 m-1 rounded-full object-cover' />
            <div className='ml-10 flex flex-col justify-end'>
                <h1 className='text-5xl font-bold text-white my-7'>{dataAlbum?.title}</h1>
                {/* on va afficher la barre d'infos */}
                <HeaderInfo dataAlbum={dataAlbum} />
                <HeaderCategory dataAlbum={dataAlbum} />
            </div>
        </div>
    )
}

export default HeaderDetail