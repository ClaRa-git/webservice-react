import React from 'react'
import { NavLink } from 'react-router-dom'

const NavLinks = ({data, marginTop, handleClick, userId = 0}) => {
  return (
    <div className={marginTop}>
        {/* on map sur le tableau pour afficher les liens */}
        {data.map((item) => (
            <NavLink
                key={item.title} 
                to={item.path.replace(':id', userId)} 
                end
                className={'link-sidebar'}
                onClick={() => handleClick && handleClick()}
            >
                {<item.icon className='mr-2'/>}
                {item.title}
            </NavLink>
        ))}
    </div>
  )
}

export default NavLinks