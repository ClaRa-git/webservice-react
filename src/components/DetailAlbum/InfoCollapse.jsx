import React from 'react'
import { RiArticleLine } from 'react-icons/ri';
import { styleIcon } from '../../constants/appConstant';
import parse from 'html-react-parser';
import InfoIconLabel from './InfoIconLabel';
import { FaCompactDisc } from 'react-icons/fa';
import { GiMicrophone } from 'react-icons/gi';
import { BsCalendar2Week } from 'react-icons/bs';

const InfoCollapse = ({dataAlbum}) => {
    // on redéclare des constantes
    const date = new Date(dataAlbum?.releaseDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateFormat = date.toLocaleDateString('fr-FR', options);


  return (
    <>
        <h2 className='text-xl my-5'>Informations</h2>
        <div className="w-full flex justify-start items-start bg-gradient-to-b from-transparent via-green to-transparent pt-5 pb-10">
            <div className="flex items-start justify-start w-[60%]">
                <div className="flex-col" style={{maxWidth: '80%'}}>
                    <div className="p-1 m-1 flex">
                        <RiArticleLine className='mr-1' style={styleIcon} />
                    </div>
                    <div className="p-1 m-1 pb-5">
                        {dataAlbum?.artist?.biography
                            ? parse(dataAlbum?.artist?.biography)
                            : 'Pas de biographie disponible'
                        }
                    </div>
                </div>
            </div>
            <div className="flex-col" style={{minWidth: '20%'}}>
                <InfoIconLabel
                    icon={{iconName: FaCompactDisc}}
                    label={'Album'}
                    value={dataAlbum?.title}
                />
                <InfoIconLabel
                    icon={{iconName: GiMicrophone}}
                    label={'Artiste'}
                    value={dataAlbum?.artist?.name}
                />
                <InfoIconLabel
                    icon={{iconName: BsCalendar2Week}}
                    label={'Sorti le'}
                    value={dateFormat}
                />
            </div>
        </div>
    </>
  )
}

export default InfoCollapse