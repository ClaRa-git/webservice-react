import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nextSong, playPause, prevSong } from '../../store/player/playerSlice';
import Track from './Track';
import Controls from './Controls';
import SeekBar from './SeekBar';
import Player from './Player';
import VolumeBar from './VolumeBar';

const MusicPlayer = () => {
  //on va recupérer toutes les données du slice player
  const { activeSong, currentSongs, currentAlbum, currentIndex, isActive, isPlaying } = useSelector(state => state.player)
  //on va déclarer nos states
  const [shuffle, setShuffle] = useState(false); // état du mode aléatoire
  const [repeat, setRepeat] = useState(false); // état du mode répétition
  const [volume, setVolume] = useState(0.3); // état du volume
  const [duration, setDuration] = useState(0); // la durée de la musique
  const [seekTime, setSeekTime] = useState(0); // le temps de la musique
  const [appTime, setAppTime] = useState(0); // le temps actuel de la musique

  //on récupère le hook useDispatch
  const dispatch = useDispatch();

  useEffect(() => {
    //si le store contient un tableau de chanson on dispatch playPause à true
    if (currentSongs?.length) dispatch(playPause(true));
  }, [currentIndex]) //si currentIndex change on recharge le composant

  //on définit nos méthodes
  //méthode pour gérer l'état du play/pause
  const handlePlayPause = () => {
    if (!isActive) return;

    //si une chanson est active on dispatch playPause 
    isPlaying ? dispatch(playPause(false)) : dispatch(playPause(true));
  }

  //méthode pour avancer d'une piste
  const handleNextSong = () => {
    //si on n'est pas en mode shuffle
    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs?.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs?.length)));
    }
  }
  //méthode pour reculer d'une piste
  const handlePrevSong = () => {
    if (currentIndex === 0) {
      //si l'index est a 0 on récupère le dernier index du tableau
      dispatch(prevSong(currentSongs?.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs?.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  }

  return (
    <div className='relative sm:px-12 px-8 w-full flex items-center justify-between mt-5'>
      <Track
        isPlaying={isPlaying}
        isActive={isActive}
        currentAlbum={currentAlbum}
        activeSong={activeSong}
      />
      <div className='flex flex-1 flex-col items-center justify-center'>
        <Controls
          isPlaying={isPlaying} // pour savoir si la musique est en cours de lecture
          currentSongs={currentSongs} // tableau de chanson
          isActive={isActive} // savoir si le player est actif
          repeat={repeat} // state de l'état de répétition
          shuffle={shuffle} // state de l'état de lecture aléatoire
          setRepeat={setRepeat} // pour changer l'état de répétition
          setShuffle={setShuffle} // pour changer l'état de lecture aléatoire
          handlePlayPause={handlePlayPause} // méthode pour mettre en pause ou en play
          handleNextSong={handleNextSong} // méthode pour passer à la chanson suivante
          handlePrevSong={handlePrevSong} // méthode pour passer à la chanson précédente
        />
        <SeekBar
          value={appTime} // la valeur actuel de la musique
          min="0" // la valeur minimum
          max={duration} // la valeur maximum
          onInput={(event) => setSeekTime(event.target.value)} // pour récupérer la position de la barre de lecture
          setSeekTime={setSeekTime} // pour changer la position de la barre de lecture
          appTime={appTime} // le temps actuel de la musique
        />
        <Player 
          activeSong={activeSong} // la chanson active
          volume={volume} // le volume
          isPlaying={isPlaying} // pour savoir si la musique est en cours de lecture
          seekTime={seekTime} // pour recuperer la position de la barre de lecture
          repeat={repeat} // l'état de répétition
          currentIndex={currentIndex} // l'index de la chanson actuelle
          onEnded={handleNextSong} // méthode pour passer à la chanson suivante
          onTimeUpdate={(event)=> setAppTime(event.target.currentTime)} // méthode pour mettre à jour le temps actuel de la musique
          onLoadedData={(event) => setDuration(event.target.duration)} // méthode pour récupérer la durée de la musique
        />
      </div>
      <VolumeBar 
        value={volume} // valeur reel du volume
        min="0" // valeur minimum
        max="1" // valeur maximum
        onChange={(event) => setVolume(event.target.value)} // pour récupérer la valeur du volume
        setVolume={setVolume} // pour changer la valeur du volume
      />
    </div>
  )
}

export default MusicPlayer