import React from 'react'
import HeaderDetail from './HeaderDetail'
import ToolBarDetail from './ToolBarDetail'

const DetailAlbum = ({dataAlbum}) => {

    return (
        <>
            <HeaderDetail dataAlbum={dataAlbum}/>
            <ToolBarDetail dataAlbum={dataAlbum}/>
        </>
    )
}

export default DetailAlbum