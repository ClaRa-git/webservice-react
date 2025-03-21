import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveAlbum, setActiveSong } from '../../store/player/playerSlice';
import PlayPause from '../Services/PlayPause';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants/apiConstant';

const ToolBarDetail = ({dataPlaylist}) => {
    const dispatch = useDispatch();
    const[index, setIndex] = useState(null);
    const {isPlaying, activeSong, currentIndex} = useSelector((state) => state.player);
    const navigate = useNavigate();

    useEffect(() => {
      setIndex(currentIndex);
    }, [currentIndex])

    const songs = dataPlaylist?.songs;
    const data = index !== null ? dataPlaylist?.songs[index]?.album : {};

    // méthode lorsqu'on met en pause
    const handlePauseClick = () => {
        dispatch(playPause(false));
    }

    //méthode lorsqu'on met play
    const handlePlayClick = (index) => {
        dispatch(setActiveSong({songs, data, index}));
        dispatch(setActiveAlbum({data}));
        dispatch(playPause(true));
    }

    const handleDeletePlaylist = async (id) => {
        const confirm = window.confirm('Voulez-vous vraiment supprimer cette playlist ?');
        if(!confirm) return;

        try {
            const response = await axios.delete(`${API_URL}/playlists/${id}`);
            if(response.status === 204) {
                navigate('/playlist');
            }
        } catch (error) {
            console.log(`Erreur lors de la suppression de la playlist: ${error}`);
        }
    }


  return (
    <>
        <div className='flex items-center ml-5'>
            <div className='cursor-pointer mr-3'>
                <PlayPause 
                    songs={songs}
                    handlePause={handlePauseClick}
                    handlePlay={() => handlePlayClick(index)}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    index={index}
                    data={data}
                />
            </div>
            <div className='cursor-pointer mr-5'>
                <FaRegTrashAlt size={30} className='text-white hover:text-red-500' onClick={() => handleDeletePlaylist(dataPlaylist?.id)} />
            </div>
        </div>
    </>
  )
}

export default ToolBarDetail