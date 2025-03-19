import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-collapse';
import { IoMdClose } from 'react-icons/io'
import { MdAdd, MdOutlineCancel } from 'react-icons/md'
import CustomInput from './CustomInput';
import axios from 'axios';
import { API_URL } from '../../constants/apiConstant';
import { useAuthContext } from '../../contexts/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPlaylists } from '../../store/user/userSlice';
import selectUserData from '../../store/user/userSelector';
import DisplayPlaylist from './DisplayPlaylist';
import ButtonLoader from '../Loader/ButtonLoader';
import PageLoader from '../Loader/PageLoader';

const PopupPlaylist = ({ callable, songId }) => {
  const dispatch = useDispatch();

  const [isCollapse, setIsCollapse] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const {userId} = useAuthContext();

  useEffect(() => {
    dispatch(fetchUserPlaylists(userId));
  }, [dispatch, userId]);
  
  const {loading, userPlaylists} = useSelector(selectUserData);

  const toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); //empeche le comportement naturel du formulaire
    try {
      setError('');
      const data = {
        title: name.trim(),
        user: `/api/users/${userId}`
      }
      if(data.title === ''){
        setError('Le nom de la playlist est obligatoire');
        displaySuccess();
        return;
      }
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/playlists`,  data )
      if(response.status === 201){
        setSuccess('La playlist a bien été ajoutée');
        setName('');
        setIsCollapse(false);
        displaySuccess();
        dispatch(fetchUserPlaylists(userId));
      }
    } catch (error) {
      setError("Une erreur est survenue lors de l'ajout de la playlist");
      displaySuccess();
      console.log(`erreur lors de l'ajout de la playlist : ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  const displaySuccess = () => {
    setTimeout(() => {
      setSuccess('');
      setError('');
    }, 3000);
  }

  return (
    <div className='z-30 absolute top-0 bottom-0 left-0 right-0 backdrop-blur-xl flex items-center justify-center'>
        <div className=' relative w-full sm:w-2/3 lg:w-1/2 h-1/2 bg-black rounded-lg border border-green flex flex-col overflow-y-scroll'>
            <div className='absolute top-2 right-2 cursor-pointer hover:scale-110' onClick={callable} >
            <IoMdClose size={20} color='white' />
            </div>
            <h2 className='text-white text-2xl py-4 text-center'>Ajouter à la playlist</h2>
            {success && <p className='text-green text-center'>{success}</p> }
            {error && <p className='text-red-500 text-center'>{error}</p> }
            {/* bouton pour créer une nouvelle playlist */}
            <div
            className={`flex items-center self-center py-2 px-4 rounded-lg cursor-pointer transition duration-1000 ease-in-out ${isCollapse ? 'bg-red-500 hover:bg-red-700' : 'bg-green hover:bg-green_top'} `}
            onClick={() => toggleCollapse()}
            >
            {isCollapse ? <MdOutlineCancel size={20} color='white' /> : <MdAdd size={20} color='white' />}
            <button className='cursor-pointer'>{isCollapse ? 'Annuler le choix' : 'Ajouter une playlist'}</button>
            </div>

            <div className='flex justify-center py-4'>
            <Collapse isOpened={isCollapse}>
                <form onSubmit={handleSubmit}>
                <CustomInput
                    state={name}
                    label='Nom de la playlist'
                    type='text'
                    callable={(e) => setName(e.target.value)}
                />
                {isLoading 
                ? <ButtonLoader />
                : <button
                    type='submit'
                    className='w-full bg-green hover:bg-green_top text-white font-bold py-2 px-4 rounded-lg cursor-pointer'
                  >
                    Enregistrer
                  </button>
                }
                </form>
            </Collapse>

            </div>
            {/* affichage des playlists existantes */}
            {loading ? <PageLoader /> : <DisplayPlaylist userPlaylists={userPlaylists} songId={songId} callable={callable}/>}
        </div>
    </div >
  )
}

export default PopupPlaylist