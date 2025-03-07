import React, { useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { dataAlbumNav, dataUserNav, IMG_LOGO } from '../../constants/appConstant';
import NavLinks from './NavLinks';
import { FiLogOut } from 'react-icons/fi';

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

        {/* nav pour la vue en dessous de 768px */}
    </>
  )
}

export default Sidebar