import React, { useState } from 'react'
import { playPause, setActiveAlbum, setActiveSong } from '../../store/player/playerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BiTime } from 'react-icons/bi';
import { tableIcon } from '../../constants/appConstant';
import PlayPause from '../Services/PlayPause';
import { IoMdAdd } from 'react-icons/io';
import PopupPlaylist from '../Ui/PopupPlaylist';

const ListAlbumSong = ({ dataAlbum }) => {
  //on redeclare nos constantes
  const data = dataAlbum;
  const songs = dataAlbum?.songs;
  //on declare nos states
  const [isHover, setIsHover] = useState(-1); //quand la souris sera sur une piste
  const [isVisible, setIsVisible] = useState(false); //pour gérer l'affichage de la popup pour la playlist
  const [songId, setSongId] = useState(null); //pour gérer l'ajout d'une piste dans la playlist
  //on récupère les données du store
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  //on recupère le hook
  const dispatch = useDispatch();
  //méthode lorsqu'on met pause
  const handlePauseClick = () => {
    dispatch(playPause(false));
  }
  //méthode lorsqu'on met play
  const handlePlayClick = (index) => {
    dispatch(setActiveSong({ songs, data, index }));
    dispatch(setActiveAlbum(data));
    dispatch(playPause(true));
  }


  // méthode pour mettre une piste dans la playlist
  const addPlaylist = (songId) => {
    setSongId(songId);
    setIsVisible(true);
  }

  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto min-w-full py-2 sm:px-6 lg:px-8'>
        <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='min-w-full text-left text-sm font-light'>
              <thead className='border-b font-medium'>
                <tr>
                  <th scope='col' className='px-6 py-4'>#</th>
                  <th scope='col' className='px-6 py-4'>TITRE</th>
                  <th scope='col' className='px-6 py-4'></th>
                  <th scope='col' className='px-6 py-4'>
                    <BiTime style={tableIcon} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {songs && songs.map((row, index)=> {
                  //formattage du temps pour les titres
                  const minutes = Math.floor(row.duration / 60);
                  const seconds = Math.floor(row.duration % 60);
                  //on format le temps mm:ss
                  const duration = seconds < 10 
                  ? `${minutes}:0${seconds}`
                  : `${minutes}:${seconds}`;

                  return (
                    <tr 
                      key={index}
                      className='border-b transition duration-300 ease-in-out hover:bg-gradient-to-b from-green_top to-transparent'
                      onMouseEnter={() => setIsHover(index)}
                      onMouseLeave={() => setIsHover(-1)}
                    >
                      <td className='whitespace-nowrap px-6 py-4 font-medium m-1'>
                        {/* on va utiliser isHover pour afficher le bouton play */}
                        {isHover !== index && `#${index+1}`}
                        {isHover === index && 
                        <PlayPause 
                          size='16px'
                          songs={songs}
                          handlePlay={() => handlePlayClick(index)}
                          handlePause={handlePauseClick}
                          isPlaying={isPlaying}
                          activeSong={activeSong}
                          index={index}
                        />}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 font-medium m-1'>{row.title}</td>
                      <td className='whitespace-nowrap px-6 py-4 font-medium m-1'>
                        <div className='flex justify-end'>
                          {isHover !== index && <div style={tableIcon}></div>}
                          {isHover === index && <IoMdAdd className='cursor-pointer' style={tableIcon} onClick={() => addPlaylist(row.id)} />}
                        </div>
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 font-medium m-1'>{duration}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isVisible &&
      <PopupPlaylist
        callable={() => setIsVisible(false)}
        songId={songId}
      />}
    </div>
  )
}

export default ListAlbumSong