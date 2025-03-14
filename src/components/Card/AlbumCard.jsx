import React from 'react'
import { ALBUM_URL } from '../../constants/apiConstant';
import { Link } from 'react-router-dom';
import PlayPause from '../Services/PlayPause';
import { playPause, setActiveAlbum, setActiveSong } from '../../store/player/playerSlice';
import { useDispatch } from 'react-redux';

const AlbumCard = ({ data, index, songs, isPlaying, activeSong, artist= 'inconnu' }) => {
  //on récupère le hook dispatch pour dispatch des actions de react-redux
  const dispatch = useDispatch();
  //on récupère l'image de l'album
  const imgAlbum = `${ALBUM_URL}/${data?.imagePath}`;
  //on redefinit des const pour les infos de l'album
  const artistName = data?.artist?.name ?? artist;
  const albumName = data?.title ?? 'Album inconnu';
  const albumId = data?.id ?? 0;

  //méthode lorsqu'on met pause
  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  //méthode lorsqu'on met play
  const handlePlayClick = (index) => {
    dispatch(setActiveSong({songs, data, index}));
    dispatch(setActiveAlbum({data}));
    dispatch(playPause(true));
  }

  return (
    <div className='flex flex-col w-[250px] p-4 bg-white_01 hover:bg-white_05 transition-all ease-in-out duration-500 animate-slideup rounded-lg cursor-pointer group'>
      <div className='relative w-full flex flex-col'>
        <Link to={`/detail/${albumId}`}>
          <img
            src={imgAlbum}
            alt={`image de l'album ${albumName}`}
            className='card-sh rounded-lg object-cover h-52 w-52'
          />
        </Link>
        {/* ici le bouton play/pause */}
        <div className={`absolute ${activeSong?.title === songs[index]?.title ? 'flex' : 'hidden'} group-hover:flex right-3 bottom-5`}>
          <div className='group-hover:animate-slideup2 bg-black outline-none rounded-full group-hover:duration-75 overflow-hidden'>
            <PlayPause 
              songs={songs}
              activeSong={activeSong}
              isPlaying={isPlaying}
              index={index}
              data={data}
              handlePause={handlePauseClick}
              handlePlay={() => handlePlayClick(index)}
            />
          </div>
        </div>
        <Link to={`/detail/${albumId}`}>
          <div className='mt-4 flex flex-col'>
            <p className='text-white text-xl truncate font-bold'>{albumName}</p>
            <p className='text-white text-sm truncate'>{artistName}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default AlbumCard