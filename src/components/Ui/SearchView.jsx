import React, { useState } from 'react'
import selectAlbumData from '../../store/album/albumSelector';
import { useSelector } from 'react-redux';
import AlbumCard from '../Card/AlbumCard';
import ArtistCard from '../Card/ArtistCard';

const SearchView = ({word}) => {

    const [searchWord, setSearchWord] = useState(word);
    // on récupère les infos du slice album
    const { searchAlbum, searchTitle, searchArtist } = useSelector(selectAlbumData);

    // on récupère les infos du slice player
    const {isPlaying, activeSong} = useSelector((state) => state.player);

    // on déclare une const pour les données de recherche de l'album
    const dataAlbum = searchAlbum['hydra:member'];
    const dataTitle = searchTitle['hydra:member'];
    const dataArtist = searchArtist['hydra:member'];

  return (
    <>
        {dataAlbum && dataAlbum.length === 0 
        && dataTitle && dataTitle.length === 0
        && dataArtist && dataArtist.length === 0 && (
            <h2 className='font-bold text-3xl text-white text-left mt-10 mb-4 ml-4'>{`Aucun résultat trouvé pour "${searchWord}"`}</h2>
        )}

        {/* partie album */}
        {dataAlbum && dataAlbum.length > 0 
            ? <h2 className='font-bold text-3xl text-white text-left mt-10 mb-4 ml-4'>{`${dataAlbum.length} album(s) pour "${searchWord}"`}</h2>
            : null
        }
        <div className='flex flex-wrap'>
            {dataAlbum && dataAlbum.map((data, index) => (
                <div className='p-3 m-3' key={`album_${index}`}>
                    <AlbumCard 
                        data={data}
                        songs={data.songs}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        index={0}
                    />
                </div>
            ))}
        </div>
        {/* partie artiste */}
        {dataArtist && dataArtist.length > 0 
            ? <h2 className='font-bold text-3xl text-white text-left mt-10 mb-4 ml-4'>{`${dataArtist.length} artiste(s) pour "${searchWord}"`}</h2>
            : null
        }
        <div className='flex flex-wrap'>
            {dataArtist && dataArtist.map((data, index) => (
                <div className='p-3 m-3' key={`artist_${index}`}>
                    <ArtistCard dataArtist={data} />
                </div>
            ))}
        </div>

        {/* partie titre*/}
        {dataTitle && dataTitle.length > 0 
            ? <h2 className='font-bold text-3xl text-white text-left mt-10 mb-4 ml-4'>{`${dataTitle.length} titre(s) de chanson pour "${searchWord}"`}</h2>
            : null
        }
        <div className='flex flex-wrap'>
            {dataTitle && dataTitle.map((data, index) => (
                <div className='p-3 m-3' key={`title_${index}`}>
                    <AlbumCard 
                        data={data}
                        songs={data.songs}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        index={0}
                    />
                </div>
            ))}
        </div>
    </>
  )
}

export default SearchView