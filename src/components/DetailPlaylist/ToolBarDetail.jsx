import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveAlbum, setActiveSong } from '../../store/player/playerSlice';
import PlayPause from '../Services/PlayPause';
import { current } from '@reduxjs/toolkit';

const ToolBarDetail = ({dataPlaylist}) => {
    const dispatch = useDispatch();
    console.log(dataPlaylist);
    const[index, setIndex] = useState(null);
    const {isPlaying, activeSong, currentIndex} = useSelector((state) => state.player);
    console.log('currentIndex', currentIndex);

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
        </div>
    </>
  )
}

export default ToolBarDetail