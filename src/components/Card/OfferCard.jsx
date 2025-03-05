import React from 'react'
import ButtonLoader from '../Loader/ButtonLoader'

const OfferCard = ({ plan, onSubscribe, isLoading }) => {
  return (
    <div className={`relative bg-gray-900 p-8 rounded-2xl shadow-lg text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${plan.isFeatured ? 'border-2 border-green' : ''}`}>
        {/* Badge "Meilleure offre" */}
        { plan.isFeatured && (
          <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green text-white text-xs xl:text-sm font-bold px-4 py-1 rounded-full shadow-md'>
            Meilleure offre
         </div>   
        )}

        <h3 className="text-white font-bold text62xl mb-3">{plan.name}</h3>

        <p className="text-white text-5xl font-extrabold mb-2">{plan.price / 100} €</p>
        <p className="text-gray-400 mb-4">
            { plan.period === 'month' ? 'par mois' : 'par an' }
        </p>

        { plan?.discount && <p className='text-green font-semibold mb-6'>{ plan.discount }</p> }

        {
            isLoading ?
            <ButtonLoader /> :
            <button className='w-full bg-green hover:bg-green_top text-white font-bold py-3 rounded-lg transition duration-300 cursor-pointer' onClick={onSubscribe}>
                S'abonner
            </button>
                
        }
        
    </div>
  )
}

export default OfferCard