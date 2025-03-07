import React from 'react'
import { Outlet } from 'react-router-dom'
import { USER_INFOS } from './constants/appConstant'
import useAuhtCheck from './hooks/useAuthCheck';
import Sidebar from './components/Ui/Sidebar';

const App = () => {
  // on récupère les infos de l'user dans le local storage
  const user = JSON.parse(localStorage.getItem(USER_INFOS));
  // on vérifie que l'utilisateur en session est bien le bon
  useAuhtCheck(user);
  return (
    <div className='relative flex'>
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-b from-black to-[rgb(18,18,18)]">
        {/* TODO: appeler la topbar */}
        <div className='h-[calc(100vh-64px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse'>
          <div className='flex-1 h-fit pb-40 text-white'>
            <Outlet />
          </div>
        </div>
      </div>
      {/* TODO: afficher le player */}
    </div>
  )
}

export default App