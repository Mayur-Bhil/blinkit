import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { data } from 'react-router-dom';
import uploadImages from '../utils/uploadImages';

const UploadCategoryModel = ({close}) => {
    const [Data,setData] = useState({
        name:"",
        image:""
    });

    const HandleOnChange = (e)=> {
        const    {name,value} = e.target;
        setData((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        })

    }

    const HandelSubmit = (e) =>{
        e.preventDefault();



    }
    const HandleUploadCategory = async(e)=>{
        const file = e.target.files[0]

        if(!file){
            return;
        }
        const uploadImage = await uploadImages(file)

        console.log(uploadImage);
        
    }

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 opacity-75 flex items-center justify-center'>
                <div className='bg-white max-w-4xl p-4 w-full rounded '>
                    <div className='flex items-center justify-between font-semibold'>
                        <h1>Categoty</h1>
                        <button onClick={close} className='w-fit cursor-pointer block ml-auto'> 
                        <IoClose size={20}/>
                    </button>
            </div>
                    <form action="" className='m-3 grid gap-2' onSubmit={HandelSubmit}>
                        <div className='grid gap-1'>
                            <label htmlFor="CategotyName">Name</label>
                            <input 
                            type="text" 
                            id='CategotyName'
                            name='name'
                            placeholder='Enter Category Name'
                            className='p-2 border-2 border-blue-500 focus-within:border-amber-300 outline-none rounded-sm'
                            value={Data.name}
                            onChange={HandleOnChange}
                            
                            
                            
                            />
                        </div>
                        <div className='grid gap-1'>
                            <p>Photo</p>
                            <div className='flex gap-4 flex-col lg:flex-row items-center'>
                                <div className='border bg-blue-50 h-36 rounded-sm w-36 flex justify-center items-center '>
                                <p className='text-sm'>No photo</p>
                            </div>
                            <label htmlFor="uploadCategoryimage">
                        <div 
                            
                            className={`
                                    ${!Data.name ? "bg-gray-400":"bg-amber-300"}
                                        p-4 py-2 rounded-xl cursor-pointer
                                
                                `}>Upload Image</div>
                                <input disabled={!Data.name} onChange={HandleUploadCategory } type="file" id='uploadCategoryimage' className='hidden' />
                            </label>
                            
                            </div>
                        </div>
                    </form>
                    </div>
        </section>
    );
};

export default UploadCategoryModel;