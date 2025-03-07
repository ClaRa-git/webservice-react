import React, { useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { IMG_LOGO } from '../../constants/appConstant';

const Sidebar = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    // on récupère l'id de l'user et la méthode signOut du contexte
    const { userId, signOut } = useAuthContext();
    // on récupère le hook de navigation
    const navigate = useNavigate();

    // on crée la méthode de décconnexion
    const handleLogout = () => {
        signOut();
        navigate('/');
    }

  return (
    <>
        {/* nav pour la vue au dessus de 768px */}
        <div className='hidden md:flex flex-col w-[240px] py-10 px-4 bg-black justify-between'>
            <div>
                <img src={IMG_LOGO} alt="LogoSpotify" className='w-full h-14 object-containt' />
                <h2 className="text-lg text-white font-semibold mt-10">Albums</h2>
            </div>
        </div>

        {/* gestion des icones pour ouvrir/fermer le menu en petit écran */}

        {/* nav pour la vue en dessous de 768px */}
    </>
  )
}

export default Sidebar