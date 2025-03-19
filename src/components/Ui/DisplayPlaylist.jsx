import React, { useState } from 'react'
import { API_URL } from '../../constants/apiConstant';
import axios from 'axios';
import ButtonLoader from '../Loader/ButtonLoader';

const DisplayPlaylist = ({userPlaylists, songId, callable}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePlaylistSong = async (playlistId, songId, arraySongs) => {
        try {
            setError('');
            setIsLoading(true);
            // on reconstruit un tableau pour les chansons au format attendu par l'API
            let songs = [];
            arraySongs && arraySongs.map((song, index) => {
                songs.push(`/api/songs/${song.id}`);
            });
            // on ajoute la nouvelle chanson si elle n'est pas déjà présente
            if(!songs.includes(`/api/songs/${songId}`)){
                songs.push(`/api/songs/${songId}`);
            } else {
                setError('La chanson est déjà présente dans la playlist');
                setIsLoading(false);
                return;
            }
            const data = {
                songs: songs
            }

            axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';
            const response = await axios.patch(`${API_URL}/playlists/${playlistId}`, data);
            if(response.status === 200){
                // On ferme la popup
                callable();
            } else {
                setError('Erreur lors de l\'ajout de la chanson dans la playlist');
            }
        } catch (error) {
            console.log(`Erreur lors de l'ajout de la chanson dans la playlist: ${error}`);            
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className='flex flex-col m-3'>
        {error && <div className='text-red-500 text-center'>{error}</div>}
        {userPlaylists && userPlaylists.map((playlist, index) => {
            const playlistId = playlist?.id ?? 0;
            const title = playlist?.title.toUpperCase() ?? '';        
            const nbSongs = playlist?.songs?.length ?? 0;
            const arraySongs = playlist?.songs ?? [];

            return (
                <div key={index} className='flex justify-between items-center bg-gray-800 p-2 rounded-lg m-1 border border-green'>
                    <span className='font-bold'>{title}</span>{nbSongs} chanson(s)
                    {isLoading? <ButtonLoader /> : <button onClick={() => handlePlaylistSong(playlistId, songId, arraySongs)} className='bg-green-500 text-white rounded-lg p-2 cursor-pointer hover:bg-green_top'>Ajouter</button>}
                </div>
            )
        })}   
    </div>
  )
}

export default DisplayPlaylist