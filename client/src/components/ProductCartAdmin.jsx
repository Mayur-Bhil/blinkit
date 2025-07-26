import React from 'react';

const ProductCardAdmin = ({ data }) => {
    return (

            <div className='w-38 p-2 bg-white rounded-lg'>
                <div>
                    <img src={data?.Image[0]} alt={data?.name} 
                    className='h-full w-full object-scale-down'
                    />
                </div>
                <p className='text-ellipsis line-clamp-2 font-medium  '>{data?.name}</p>
                <p className='text-slate-500'>{data?.unit}</p>
            </div>
    
    );
};

export default ProductCardAdmin;