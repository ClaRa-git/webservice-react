import React, { useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { dataAlbumNav, dataUserNav, IMG_LOGO, styleIcon } from '../../constants/appConstant';
import NavLinks from './NavLinks';
import { FiLogOut } from 'react-icons/fi';
import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';

const Logout = () => {
    const { signOut } = useAuthContext();
    const navigate = useNavigate();

    // on crée la méthode de décconnexion
    const handleLogout = () => {
        signOut();
        navigate('/');
    }

    return (
        <button onClick={() => {
            const confirmLogout = window.confirm('Voulez-vous vraiment vous déconnecter ?');
            if(confirmLogout) handleLogout();
        }}
        className='link-sidebar'>
            <FiLogOut className='w-6 h-6 mr-2' />
            Déconnexion
        </button>
    )
}

const Sidebar = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    // on récupère l'id de l'user et la méthode signOut du contexte
    const { userId } = useAuthContext();

  return (
    <>
        {/* nav pour la vue au dessus de 768px */}
        <div className='hidden md:flex flex-col w-[240px] py-10 px-4 bg-black justify-between'>
            <div>
                <img src={IMG_LOGO} alt="LogoSpotify" className='w-full h-14 object-containt' />
                <h2 className="text-lg text-white font-semibold mt-10">Albums</h2>
                <NavLinks 
                    data={dataAlbumNav} 
                    marginTop={'mt-4'}
                />
                <h2 className="text-lg text-white font-semibold mt-10">Utilisateur</h2>
                <NavLinks 
                    data={dataUserNav} 
                    marginTop='mt-4'
                    userId={userId}
                />                
            </div>
            {/* bouton de déconnexion */}
            <div className="mt-5">
                <Logout />
            </div>
        </div>

        {/* gestion des icones pour ouvrir/fermer le menu en petit écran */}
        <div className="absolute md:hidden block top-6 right-3">
            { mobileMenu ? (
                <RiCloseLine
                style={styleIcon}
                className='text-white mr-2'
                onClick={() => setMobileMenu(false)}
                />
            ) : (
                <HiOutlineMenu
                style={styleIcon}
                className='text-white mr-2'
                onClick={() => setMobileMenu(true)}
                />
            ) }
        </div>

        {/* nav pour la vue en dessous de 768px */}
        <div className={`z-20 absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white_01 to-black backdrop-blur-lg p-6 md:hidden smooth-transition duration-500 ${mobileMenu ? 'left-0' : '-left-full'} flex flex-col justify-between`}>
            <div>
                <img src={IMG_LOGO} alt="Logo Spotify" className='w-full h-14 object-contain' />
                <h2 className="text-lg text-white font-semibold mt-10">Albums</h2>
                <NavLinks
                    data={dataAlbumNav}
                    marginTop={'mt-4'}
                    handleClick={() => setMobileMenu(false)}
                />
                <h2 className="text-lg text-white font-semibold mt-10">Utilisateur</h2>
                <NavLinks
                    data={dataUserNav}
                    marginTop={'mt-4'}
                    userId={userId}
                    handleClick={() => setMobileMenu(false)}
                />
            </div>
            <div className="mt-5">
                <Logout />
            </div>
        </div>
    </>
  )
}

export default Sidebar