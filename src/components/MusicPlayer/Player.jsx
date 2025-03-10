import React, { useEffect, useRef } from 'react'
import { MUSIC_URL } from '../../constants/apiConstant';

const Player = ({ activeSong, volume, isPlaying, seekTime, repeat, currentIndex, onEnded, onTimeUpdate, onLoadedData }) => {
    
    const ref = useRef(null);

    if(ref.current){
        if(isPlaying){
            ref.current.play();
        } else {
            ref.current.pause();
        }
    }

    useEffect(() => {
        ref.current.volume = volume;
    }, [volume])

    useEffect(() => {
        ref.current.currentTime = seekTime;
    }, [seekTime])
    
    
  return (
    <audio
        src={`${MUSIC_URL}/${activeSong?.filePath}`}
        ref={ref}
        loop={repeat}
        onEnded={onEnded}
        onTimeUpdate={onTimeUpdate}
        onLoadedData={onLoadedData}
    />
  )
}

export default Player