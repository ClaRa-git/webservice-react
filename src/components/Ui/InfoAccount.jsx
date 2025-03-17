import React from 'react'

const InfoAccount = ({label, value}) => {
  return (
    <div className='flex flex-col items-start mb-4'>
        <p className='text-lg font-semibold text-gray-700'>{label}</p>
        <p className='text-xl font-bold text-gray-900'>{value}</p>
    </div>
  )
}

export default InfoAccount