import React from 'react'
import { PriceInruppees } from '../utils/DisplayPriceinRuppes'

const CartProduct = ({data}) => {
  return (
    <div className='border mx-auto p-2 grid gap-2 max-w-56 min-w-52 lg:shadow-lg rounded '>
       <div className='min-h-20 max-h-32 rounded'>
            <img src={data.Image[0]} 
                className='w-full h-full object-scale-down'
            />
       </div>
        <div className='bg-green-100 text-green-600 w-fit p-[0.5px] px-02 rounded text-sm'>
            10 min
       </div>
       <div className='p-3 font-medium text-ellipsis line-clamp-2 rounded'>
            {data.name}
       </div>
       <div className='w-fit'>
            {data.unit  }
       </div>

       <div className='flex items-center justify-between gap-3'>
            <div className='p-3 '>
                  {PriceInruppees(data.price)}
            </div>
            <div className='p-3 '>
                    <button
                        className='bg-green-300 hover:bg-green-400 text-white px-4 py-1 rounded'
                    >Add</button>
            </div>
       </div>
    </div>
  )
}

export default CartProduct
