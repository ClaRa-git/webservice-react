import React from 'react'
import { totalDuration } from '../../services/toolsService';
import { data } from 'react-router-dom';

const HeaderInfo = ({dataPlaylist}) => {
    // on définit le nombre de titre par album
    const nbTracks = dataPlaylist?.songs
    ? dataPlaylist?.songs?.length > 1
    ? `${dataPlaylist?.songs?.length} titres`
    : `${dataPlaylist?.songs?.length} titre`
    : 'Pas de titre';

    // on se créé un élément graphique pour faire un point
    const Dot = () => (
        <p>&#8226;</p>
    )

  return (
    <div className='flex items-center'>
        <p className='font-bold text-base p-1'>{nbTracks}</p>
        <Dot />
        <p className='font-bold text-base p-1'>{dataPlaylist?.songs?.length > 0 ? totalDuration(dataPlaylist) : "Pas de titre"}</p>
    </div>
  )
}

export default HeaderInfo