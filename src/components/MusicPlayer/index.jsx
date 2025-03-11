    import React, { useEffect, useState } from 'react'
    import { useDispatch, useSelector } from 'react-redux'
    import { nextSong, playPause, prevSong } from '../../store/player/playerSlice';
    import Track from './Track';
    import Controls from './Controls';
import SeekBar from './SeekBar';
import Player from './Player';
import VolumeBar from './VolumeBar';

    const MusicPlayer = () => {
    // on va récupérer toutes les données du slice player
    const { activeSong, currentSongs, currentAlbum, currentIndex, isActive, isPlaying } = useSelector(state => state.player);
    // on va déclarer nos states
    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [volume, setVolume] = useState(0.3);
    const [duration, setDuration] = useState(0);
    const [seekTime, setSeekTime] = useState(0);
    const [appTime, setAppTime] = useState(0);
    // on récupèrele hook useDispatch
    const dispatch = useDispatch();

    useEffect(() => {
        // si le store contient un tableau de chansons on dispatch playPause à true
        if(currentSongs.length) dispatch(playPause(true));

    }, [currentIndex])

    const handlePlayPause = () => {
        if(!isActive) return;

        // si une chanson est active on dispatch playPause à true
        isPlaying ? dispatch(playPause(false)) : dispatch(playPause(true));
    }

    const handleNextSong = () => {
        // si on n'est pas en mode shuffle
        if(!shuffle) {
            dispatch(nextSong((currentIndex + 1) % currentSongs.length));
        } else {
            // on génère un nombre aléatoire
            const randomIndex = Math.floor(Math.random() * currentSongs.length);
            // on dispatch nextSong avec le nombre aléatoire
            dispatch(nextSong(randomIndex));
        }
    }

    const handlePrevSong = () => {
        if(currentIndex === 0){
            dispatch(prevSong(currentSongs.length - 1));
        } else if (shuffle) {
            const randomIndex = Math.floor(Math.random() * currentSongs.length);
            dispatch(prevSong(randomIndex));
        } else {
            dispatch(prevSong(currentIndex - 1));
        }
    }

    return (
        <div className='relative sm:px-12 px-8 w-full flex items-center justify-between'>
            <Track 
                isPlaying={isPlaying}
                isActive={isActive}
                currentAlbum={currentAlbum}
                activeSong={activeSong}
            />
            <div className='flex flex-1 flex-col items-center justify-center'>
                <Controls 
                    isPlaying={isPlaying}
                    currentSongs={currentSongs}
                    isActive={isActive}
                    repeat={repeat}
                    shuffle={shuffle}
                    setRepeat={setRepeat}
                    setShuffle={setShuffle}
                    handlePlayPause={handlePlayPause}
                    handleNextSong={handleNextSong}
                    handlePrevSong={handlePrevSong}
                />
                <SeekBar
                    value={appTime}
                    min={0}
                    max={duration}
                    onInput={(event) => setSeekTime(event.target.value)}
                    setSeekTime={setSeekTime}
                    appTime={appTime}
                />
                <Player
                    activeSong={activeSong}
                    volume={volume}
                    isPlaying={isPlaying}
                    seekTime={seekTime}
                    repeat={repeat}
                    currentIndex={currentIndex}
                    onEnded={handleNextSong}
                    onTimeUpdate={(event) => setAppTime((event.target.currentTime))}
                    onLoadedData={(event) => setDuration(event.target.duration)}
                />
            </div>
            <VolumeBar
                value={volume}
                min={0}
                max={1}
                onChange={(event) => setVolume(event.target.value)}
                setVolume={setVolume}
            />
        </div>
    )
}

    export default MusicPlayer