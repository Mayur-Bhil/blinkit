import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const DisplayCartItems = ({ close }) => {
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 opacity-95 flex items-center justify-center z-50'>
      <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
        <div className='flex items-center justify-between p-3 shadow-md'>
          <h1 className='font-semibold'>Cart</h1>
          
          {/* Mobile close button */}
          <button 
            onClick={close}
            className='lg:hidden'
          >
            <IoClose size={25} />
          </button>

          {/* Desktop close button */}
          <button 
            onClick={close}
            className='hidden lg:block'
          >
            <IoClose size={25} />
          </button>
        </div>
      </div>  
    </section>
  )
}

export default DisplayCartItems
