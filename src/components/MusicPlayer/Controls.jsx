import React from 'react'
import { BsArrowRepeat, BsFillPauseBtnFill, BsPlayFill, BsShuffle } from 'react-icons/bs'
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md'

const Controls = ({ isPlaying, currentSongs, isActive, repeat, shuffle, setRepeat, setShuffle, handlePlayPause, handlePrevSong, handleNextSong }) => {
  return (
    <div className='flex items-center justify-around md:w-36 lg:w-52 2xl:w-80'>
        {/* on affiche le bouton repeat */}
        <BsArrowRepeat
            size={20}
            color={repeat ? 'rgba(30, 215, 96, 1)' : '#fff'}
            className='cursor-pointer hidden sm:block'
            onClick={() => setRepeat(!repeat)}
        />
        {/* on affiche le bouton précédent si on a un tableau de chansons > 1 */}
        { currentSongs?.length > 1 && 
            <MdSkipPrevious 
                size={30}
                color='#fff'
                className='cursor-pointer'
                onClick={handlePrevSong}
            />
        }
        {/* on affiche le bouton play/pause */}
        { isPlaying ?
            (
                // on affiche le bouton pause
                <BsFillPauseBtnFill 
                    size={45}
                    color='#fff'
                    className='cursor-pointer'
                    onClick={handlePlayPause}
                />
            )
            : (
                // on affiche le bouton play
                <BsPlayFill
                    size={45}
                    color='#fff'
                    className='cursor-pointer'
                    onClick={handlePlayPause}
                />
            )
        }
        {/* on affiche le bouton suivant si on a un tableau de chansons > 1 */}
        { currentSongs?.length > 1 &&
            <MdSkipNext
                size={30}
                color='#fff'
                className='cursor-pointer'
                onClick={handleNextSong}
            />
        }
        {/* on affiche le bouton shuffle */}
        <BsShuffle
            size={20}
            color={shuffle ? 'rgba(30, 215, 96, 1)' : '#fff'}
            className='cursor-pointer hidden sm:block'
            onClick={() => setShuffle(!shuffle)}
        />
    </div>
  )
}

export default Controls