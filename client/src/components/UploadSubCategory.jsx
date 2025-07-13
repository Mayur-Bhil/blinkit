import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const UploadSubCategory = () => {
    const [subCategoryData,setsubCategotyData] = useState({
        name:"",
        image:"",
        category:[]
    });

   const HandelChange = (e)=>{
            const { name ,value } = e.target;
            setsubCategotyData((prev)=>{
                return {
                    ...prev,
                    [name]:value
                }
            })
   } 
    return (
        <section className='fixed top-0 right-0 bottom-0 z-50 left-0 bg-neutral-800 opacity-85 p-4 flex justify-center items-center'>
            <div className='w-full max-w-6xl bg-white rounded-sm'>
                    <div className='flex items-center p-4 justify-between'>
                        <h1 className='font-semibold'>Add Sub Categoty</h1>
                        <button onClick={close} className='w-fit cursor-pointer block ml-auto'> 
                            <IoClose size={20}/>
                        </button>
                    </div>
                    <form action="" className='my-3 p-4 grid group gap-4'>
                    <div className='grid'>
                        <label htmlFor="subcategory" className=''>Category Name</label>
                        <input type="text" 
                        className='p-3 bg-blue-50 outline-none border-2 focus-within:border-amber-300 rounded'
                        id='subcategory' 
                        name='subcategory'
                        onChange={HandelChange}
                        />
                    </div>
                    <div>
                        <p className='m-2'>Image</p>
                        <div className='border h-36 w-36 bg-blue-100'>
                            {subCategoryData.image}   
                        </div>
                    </div>
                    </form>
            </div>
        </section>
    );
};

export default UploadSubCategory;