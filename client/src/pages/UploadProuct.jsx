import React, { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImages from '../utils/uploadImages';
import AxiosToastError from '../utils/AxiosToastError';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDelete } from 'react-icons/md';

const UploadProduct = () => {
    const [data,setData] = useState({
        name:"",
        image:[],
        category:[],
        subcategory:[],
        unit:[],
        stock:"",
        price:"",
        discount:"",
        description:"",
        more_details:{},
    });
    const [loading,setLoading] = useState(false);
    const [viewImage,setViewImage] = useState("");

    const handleChange = (e)=>{
        const {name,value} = e.target;

        setData((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }   

       const HandleUPloadImage = async(e)=>{
        try {
            const file = e.target.files[0]
            
            if(!file){
                return;
            }
            setLoading(true)
            const response = await uploadImages(file)
            const { data : ImageResponse } = response;
            const imageUrl = ImageResponse.data.url
            
            setData((prev)=>{
                return {
                    ...prev,
                    image:[...prev.image,imageUrl]
                }
            })
            setLoading(false)
            
        } catch (error) {
           AxiosToastError(error)
        }
        
    } 

const ImageFullScreenImage = ()=>{

}
    const HandelDeleteImage = async(index)=>{
        data.image.splice(index,1);
        setData((prev)=>{
            return {
                ...prev,
                
            }
        })
    }
    return (
        <section>
            <div className='p-2 bg-white shadow-md flex items-center justify-between'>
                <h2 className='font-semibold'>Upload product</h2>
            </div>
            <div className='grid p-3'>
                <form action="" className=''>
                    <div className='grid gap-2 leading-none'>
                        <label  htmlFor="name">Name</label>
                        <input type="text"
                               placeholder='Product Name'
                               value={data.name}
                               onChange={handleChange}
                               name='name'
                               required
                               id='name'
                                className='bg-blue-100 p-2 outline-none border-2 rounded-md focus-within:border-amber-300'
                        
                        />

                         <label  htmlFor="description">Description</label>
                        <textarea type="text"
                               placeholder='Product description'
                               value={data.description}
                               onChange={handleChange}
                               name='description'
                               required
                               multiple
                               rows={3}
                               id='description'
                                className='bg-blue-200 p-2 outline-none border-2 rounded-md focus-within:border-amber-300 resize-none'
                        
                        />
                    <div className='grid gap-1'>
                        <p>Image</p>
                        <div>
                            <label htmlFor='FileUpload' className='bg-slate-100 cursor-pointer  min-h-24 border rounded-lg flex items-center justify-center'>
                                <div className='flex justify-center items-center flex-col'>
                                    { loading ? <Loading/> : <FaCloudUploadAlt size={29}/> }
                                    

                                    { loading ? "Uploading Image" : "Uplode image"}
                                </div>
                                <input
                                id='FileUpload'
                                type="file"
                                className='hidden'
                                onChange={HandleUPloadImage}
                                accept='image'
                                   
                                   />
                        </label>
                            <div className='my-2 flex gap-3'>
                                {
                                    data.image.map((image,index)=>{

                                        return <div key={image*index}
                                        className='h-20 min-w-20 w-20 bg-blue-50 border-2 relative group'>
                                            <img 
                                            src={image} alt={image}
                                                className='h-full w-full object-scale-down cursor-pointer'
                                            onClick={()=>setViewImage(image)}
                                            />
                                             <div onClick={()=>HandelDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-400 hidden group-hover:block text-white rounded-full cursor-pointer hover:bg-blue-600 hover:text-white -500'>
                                                <MdDelete  size={18}/>
                                             </div>  
                                        </div>
                                
                                    })
                                }
                            </div>
                        </div>
                        
                    </div>
                               
                    </div>
                </form>
            </div>
            {
                viewImage && (
                    <ViewImage url={viewImage} close={()=>setViewImage("")} />
                )
            }
        </section>
    );
};

export default UploadProduct;