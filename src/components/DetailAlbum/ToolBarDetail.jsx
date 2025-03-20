import React, { useEffect, useState } from 'react'
import { USER_INFOS } from '../../constants/appConstant';
import { useDispatch, useSelector } from 'react-redux';
import selectUserData from '../../store/user/userSelector';
import { fetchUserFavorites } from '../../store/user/userSlice';
import PageLoader from '../Loader/PageLoader';
import { playPause, setActiveAlbum, setActiveSong } from '../../store/player/playerSlice';
import PlayPause from '../Services/PlayPause';
import { AiFillHeart, AiFillInfoCircle, AiOutlineHeart, AiOutlineInfoCircle } from 'react-icons/ai';
import { fetchAddRemoveFavorite } from '../../services/userFavoritesService';
import { Collapse } from 'react-collapse';
import InfoCollapse from './InfoCollapse';

const ToolBarDetail = ({dataAlbum}) => {
    // on redéclare des constantes
    const data = dataAlbum;
    const songs = dataAlbum?.songs;
    const albumId = dataAlbum?.id;
    const userId = localStorage.getItem(USER_INFOS)
        ? JSON.parse(localStorage.getItem(USER_INFOS)).userId
        : null;

    // on déclare nos states
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isInList, setIsInList] = useState(false);
    const [listArray, setListArray] = useState([]);

    // on récupère les hooks
    const dispatch = useDispatch();
    
    // on va récupérer les infos du store
    const { isPlaying, activeSong } = useSelector((state) => state.player);

    // on va récupérer les favoris de l'utilisateur
    const { loading, userFavorites } = useSelector(selectUserData);

    useEffect(() => {
        dispatch(fetchUserFavorites(userId));
        setIsLoading(false);
    }, [dispatch])

    useEffect(() => {
        checkFavorite();
    }, [loading])
    
    // méthode qui vérifie si l'album est dans les favoris de l'utilisateur
    const checkFavorite = () => {
        if (userFavorites) {
            const idArray = userFavorites.map((item) => `/api/albums/${item.id}`);
            // on set la liste dans le state en supprimant les doublons
            setListArray([...new Set(idArray)]);

            if(idArray.includes(`/api/albums/${albumId}`)) {
                setIsInList(true);
            }
        }
    }

    // méthode lorsqu'on met en pause
    const handlePauseClick = () => {
        dispatch(playPause(false));
    }

    //méthode lorsqu'on met play
    const handlePlayClick = (index) => {
        dispatch(setActiveSong({songs, data, index}));
        dispatch(setActiveAlbum({data}));
        dispatch(playPause(true));
    }

    // méthode pour gérer le favoris (pour ajouter ou supprimer un album des favoris)
    const toggleFavorite = async () => {
        // on va créer une copie de listArray
        let updatedListArray = [...listArray];

        // on va vérifier si l'album est dans la liste
        if (isInList) {
            // on va supprimer l'album de la liste
            updatedListArray = listArray.filter((item) => item !== `/api/albums/${albumId}`);
        } else {
            updatedListArray.push(`/api/albums/${albumId}`);
        }

        // on va appeler le service pour mettre à jour les favoris dans la bdd
        await fetchAddRemoveFavorite(updatedListArray, userId);

        // on va mettre à jour le state
        setListArray(updatedListArray);
        setIsInList(!isInList);
    }

    // méthode pour ouvrir/fermer le collapse
    const handleCollapseClick = () => {
        setIsCollapsed(!isCollapsed);
    }

    return (
        loading ? <PageLoader /> :
        <>
            <div className='flex items-center ml-5'>
                <div className='cursor-pointer mr-3'>
                    <PlayPause 
                        songs={songs}
                        handlePause={handlePauseClick}
                        handlePlay={() => handlePlayClick(index)}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        index={index}
                        data={data}
                    />
                </div>
                <div className='cursor-pointer' onClick={() => toggleFavorite()}>
                    {isInList ? 
                        <AiFillHeart size={30} className='text-green m-3' />
                        :
                        <AiOutlineHeart size={30} className='text-green m-3'/>
                    }
                </div>
                <div className='cursor-pointer' onClick={handleCollapseClick}>
                    {isCollapsed
                    ? <AiFillInfoCircle size={30} className='text-green m-3' />
                    : <AiOutlineInfoCircle size={30} className='text-green m-3' /> 
                    }
                </div>
            </div>
            <div>
                <Collapse isOpened={isCollapsed}>
                    <InfoCollapse dataAlbum={dataAlbum} />
                </Collapse>
            </div>
        </>
    )
}

export default ToolBarDetail