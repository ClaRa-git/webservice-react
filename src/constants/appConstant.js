import { AiOutlineAppstoreAdd, AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { IMAGE_URL } from "./apiConstant";
import { BiLibrary } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import { FiSettings } from "react-icons/fi";

export const USER_INFOS = 'userInfos';

export const IMG_LOGO = `${IMAGE_URL}/logo.png`;

// on va construire 2 tableaux pour notre sidebar
// 1er pour la gestion des albums
export const dataAlbumNav = [
    { title: 'Accueil', path: '/', icon: AiOutlineHome },
    { title: 'Rechercher', path: '/search', icon: AiOutlineSearch },
    { title: 'Bibliothèque', path: '/library', icon: BiLibrary },
];

// 2ème pour les options de l'utilisateur
export const dataUserNav = [
    { title: 'Créer une playlist', path: '/add-playlist', icon: AiOutlineAppstoreAdd },
    { title: 'Titres likés', path: '/wishlist', icon: MdFavoriteBorder },
    { title: 'Mon compte', path: '/account/:id', icon: FiSettings },
];

// on définit du style pour les icônes
export const styleIcon = {width: '25px', height: '25px'};
export const tableIcon = {width: '20px', height: '20px'};