import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import uploadImages from '../utils/uploadImages';
import Loading from './Loading';
import AxiosToastError from '../utils/AxiosToastError';
import summeryApis from '../common/summuryApi';

const UploadSubCategory = ({close}) => {
    const [subCategoryData,setsubCategotyData] = useState({
        name:"",
        image:"",
        category:[]
    });
    const [loading,setLoading] = useState(false);

   const HandleOnChange = (e)=>{
            const { name ,value } = e.target;
            setsubCategotyData((prev)=>{
                return {
                    ...prev,
                    [name]:value
                }
            })
   }
    const HandelSubmit = async(e) =>{
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({
                ...summeryApis.addCategory,
                data:Data
            })
            const {data:responseData} = response;
            
            if(responseData.success){
               toast.success(responseData.message);
                close()
                fetchData()
            }
        } catch (error) {
                AxiosToastError(error)
        }finally{
            setLoading(false)
        }

    }

   const HandleUploadSubCategory = async(e)=>{
            try {
                
                const file = e.target.files[0];
            if(!file){
                return;
            }
           const response = await uploadImages(file);

           setsubCategotyData((prev)=>{
                return {
                    ...prev,
                    image:subCategoryData.data.url
                    }
                })
            } catch (error) {
                AxiosToastError(error)
            }   

   }
    return (
<section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 opacity-80 flex items-center justify-center'>
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
                            placeholder='Enter Sub Category Name'
                            className='p-2 border-2 border-blue-500 focus-within:border-amber-300 outline-none rounded-sm'
                            value={subCategoryData.name}
                            onChange={HandleOnChange}
             
                            />
                        </div>
                        <div className='grid gap-1'>
                            <p>Photo</p>
                            <div className='flex gap-4 flex-col lg:flex-row items-center'>
                                <div className='border bg-blue-50 h-36 rounded-sm w-36 flex justify-center items-center '>
                                    {
                                        subCategoryData.image ? (
                                            <img className='h-full w-full object-scale-down' src={subCategoryData.image} alt={"sub-category"} />
                                        ):(
                                             <p className='text-sm'>{loading ?  <Loading/> : "no Photo" }</p>

                                        )
                                    }
                            </div>
                            <label htmlFor="uploadSubCategoryimage">
                        <div 
                            
                            className={`
                                    ${!subCategoryData.name ? "border-2":"bg-amber-300"}
                                        p-4 py-2 rounded-xl cursor-pointer
                                        border-amber-300 hover:bg-amber-300 
                                `}>
                                    { 
                                    loading ? "lodding...": "Upload image"
                                    
                                    }</div>
                                <input disabled={!subCategoryData.name} onChange={HandleUploadSubCategory } type="file" id='uploadSubCategoryimage' className='hidden' />
                            </label>
                            
                            </div>
                        </div>  
                        <button
                        className={
                            `
                            ${subCategoryData.name && subCategoryData.image ? "bg-amber-300 hover:bg-amber-300 cursor-pointer" : "bg-slate-300"} py-2 font-semibold rounded-lg 
                            `
                        }
                        >
                        {
                            loading ? <Loading/> : "Add Category"
                        }
                        </button>
                    </form>
                    </div>  
        </section>
    );
};

export default UploadSubCategory;