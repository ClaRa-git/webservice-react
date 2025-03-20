import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveAlbum, setActiveSong } from '../../store/player/playerSlice';
import PlayPause from '../Services/PlayPause';
import { IoMdAdd } from 'react-icons/io';
import { BiTime } from 'react-icons/bi';
import { tableIcon } from '../../constants/appConstant';
import { FiMinusCircle } from 'react-icons/fi';
import axios from 'axios';
import { API_URL } from '../../constants/apiConstant';
import { fetchPlaylistDetail } from '../../store/user/userSlice';

const ListPlaylistSong = ({dataPlaylist}) => {
    
    const [isHover, setIsHover] = useState(-1);
    
    const songs = dataPlaylist?.songs;
    const data = isHover != -1 ? dataPlaylist?.songs[isHover]?.album : {};

    const { isPlaying, activeSong } = useSelector((state) => state.player);

    const dispatch = useDispatch();

    const handlePauseClick = () => {
        dispatch(playPause(false));
    }

    const handlePlayClick = (index) => {
        dispatch(setActiveSong({ songs, data, index }));
        dispatch(setActiveAlbum({data}));
        dispatch(playPause(true));
    }

    const handleDeleteSong = async (id) => {
        try {
            const confirm = window.confirm('Voulez-vous vraiment supprimer cette piste de la playlist ?');
            if(!confirm) return;

            // on doit récupérer le tableau d'ids de la playlist
            // ['api/songs/1', 'api/songs/2', 'api/songs/3']
            const songIds = dataPlaylist?.songs && dataPlaylist?.songs?.map(song => song['@id']);
            // on va enlever du tableau l'id reçu en paramètre
            const newSongIds = songIds.filter(songId => songId !== id);

            // on va mettre à jour la playlist dans la bdd
            axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';
            const response = await axios.patch(`${API_URL}/playlists/${dataPlaylist.id}`, {
                songs: newSongIds
            });

            if(response.status === 200) {
                dispatch(fetchPlaylistDetail(dataPlaylist.id));
            }
        } catch (error) {
            console.log(`Erreur lors de la suppression de la piste: ${error}`);
        }
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
                  <th scope='col' className='px-6 py-4'>ALBUM</th>
                  <th scope='col' className='px-6 py-4'>ARTISTE</th>
                  <th scope='col' className='px-6 py-4'>
                    <BiTime style={tableIcon} />
                  </th>
                  <th scope='col' className='px-6 py-4'></th>
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
                      <td className='whitespace-nowrap px-6 py-4 font-medium m-1 truncate'>{row.title}</td>
                      <td className='whitespace-nowrap px-6 py-4 font-medium m-1 truncate'>{row?.album?.title}</td>
                      <td className='whitespace-nowrap px-6 py-4 font-medium m-1 truncate'>{row?.album?.artist?.name}</td>
                      <td className='whitespace-nowrap px-6 py-4 font-medium m-1'>{duration}</td>
                      <td className='whitespace-nowrap px-6 py-4 font-medium m-1'>
                        <FiMinusCircle style={tableIcon} onClick={() =>handleDeleteSong(row['@id'])} className='cursor-pointer hover:text-red-500'/>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListPlaylistSong