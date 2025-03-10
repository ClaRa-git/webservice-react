import React from 'react'
import { Outlet } from 'react-router-dom'
import { USER_INFOS } from './constants/appConstant'
import useAuhtCheck from './hooks/useAuthCheck';
import Sidebar from './components/Ui/Sidebar';
import Topbar from './components/Ui/Topbar';
import { useSelector } from 'react-redux';
import MusicPlayer from './components/MusicPlayer';

const App = () => {
  // on récupère les infos de l'user dans le local storage
  const user = JSON.parse(localStorage.getItem(USER_INFOS));
  // on vérifie que l'utilisateur en session est bien le bon
  useAuhtCheck(user);
  // on récupère le state activeSong du slice player
  const { activeSong } = useSelector(state => state.player);

  return (
    <div className='relative flex'>
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-b from-black to-[rgb(18,18,18)]">
        <Topbar />
        <div className='h-[calc(100vh-64px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse'>
          <div className='flex-1 h-fit pb-40 text-white'>
            <Outlet />
          </div>
        </div>
      </div>
      { activeSong?.title && (
        <div className='absolute h-28 bottom-0 left-0 right-0 animate-slideup bg-gradient-to-br from-white_01 to-black backdrop-blur-lg rounded-t-3xl z-10'>
          <MusicPlayer />
        </div>
      ) }
    </div>
  )
}

export default App