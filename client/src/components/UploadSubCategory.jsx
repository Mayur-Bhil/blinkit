import React from 'react';
import { IoClose } from 'react-icons/io5';

const UploadSubCategory = () => {
    return (
        <section className='fixed top-0 right-0 bottom-0 z-50 left-0 bg-neutral-800 opacity-85 p-4 flex justify-center items-center'>
            <div className='w-full max-w-6xl bg-white rounded-sm'>
                    <div className='flex items-center p-4 justify-between'>
                        <h1 className='font-semibold'>Add Sub Categoty</h1>
                        <button onClick={close} className='w-fit cursor-pointer block ml-auto'> 
                            <IoClose size={20}/>
                        </button>
                    </div>
                    <div>

                    </div>
            </div>
        </section>
    );
};

export default UploadSubCategory;