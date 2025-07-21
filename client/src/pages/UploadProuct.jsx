import React, { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImages from '../utils/uploadImages';
import AxiosToastError from '../utils/AxiosToastError';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDelete } from 'react-icons/md';
import {useSelector} from "react-redux"
import { IoClose } from 'react-icons/io5';
import AddFields from '../components/AddFields';
import Axios from '../utils/useAxios';
import summeryApis from '../common/summuryApi';
import successAlert from '../utils/successAlert';


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
    const [SelectCategory,setSelectCategory] = useState("");
    const [selectSubCategory,setSelectSubCategory] = useState("");
    const [loading,setLoading] = useState(false);
    const [viewImage,setViewImage] = useState("");
    const allCategory = useSelector((store)=>store.product.allcategory);
    const allSubCategory = useSelector((store)=>store.product.allSubcategory);
   
    const [openAddField,setOpenAddField] = useState(false);
    const [fieldName,setFieldName] = useState("");

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

    const HandelDeleteImage = async(index)=>{
        data.image.splice(index,1);
        setData((prev)=>{
            return {
                ...prev,
                
            }
        })
    }

    const removeProductCategory = async(index)=>{
        data.category.splice(index,1);
        setData((prev)=>{
           return {
                ...prev
           }
        })
    }

    const removeProductsubCategory = async(index) =>{
        data.subcategory.splice(index,1);
            setData((prev)=>{
            return {
                ...prev
           }
        })
    }

    const HandleAddField = ()=>{
        setData((prev)=>{
           return{
                ...prev,
                more_details:{
                    ...prev.more_details,
                    [fieldName]:""
                }
           }
        })
        setFieldName("")
        setOpenAddField(false)
    }

    const HandleSubmit = async(e)=>{
        e.preventDefault();
       try {
            const response = await Axios({
                ...summeryApis.createNewProduct,
                data:data
            })

            const {data:ResponseData} = response;
            if(ResponseData.success){
                successAlert(ResponseData.message);
            }
       } catch (error) {
            AxiosToastError(error)
       }
    }
    return (
        <section>
            <div className='p-2 bg-white shadow-md flex items-center justify-between'>
                <h2 className='font-semibold'>Upload product</h2>
            </div>
            <div className='grid p-3 '>
                <form action="" className='' onSubmit={HandleSubmit}>
                    <div className='grid gap-2 leading-none'>
                        <label className='font-medium' htmlFor="name">Name</label>
                        <input type="text"
                               placeholder='Product Name'
                               value={data.name}
                               onChange={handleChange}
                               name='name'
                               required
                               id='name'
                                className='bg-blue-100 p-2 outline-none border-2 rounded-md focus-within:border-amber-300'
                        
                        />

                         <label className='font-medium'  htmlFor="description">Description</label>
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
                        <p className='font-medium'>Image</p>
                        <div>
                            <label htmlFor='FileUpload' className='bg-slate-100 font-medium cursor-pointer  min-h-24 border rounded-lg flex items-center justify-center'>
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
                            <div className='mt-2 flex gap-3'>
                                {
                                    data.image.map((image,index)=>{

                                        return <div key={image*index+"productIndex"}
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
                    <div className='grid gap-1'>
                        <label className='font-medium' htmlFor="category">
                            category
                        </label>
                        <div className='w-[vh]'>
                                <select name="" id="category" value={SelectCategory} onChange={(e)=>{
                                    const value = e.target.value;
                                    const category = allCategory.find((el)=>el._id === value)
                                    console.log(value);
                                    
                                    setData((prev)=>{
                                        return {
                                            ...prev,
                                            category:[...prev.category,category]
                                        }
                                    })
                                    setSelectCategory("")
                                }} className='w-full bg-blue-100 p-2 rounded '>
                                <option  value={""}>Select Category</option>
                                {
                                    allCategory.map((c,index)=>{
                                        return (
                                            <option key={index+"AllCategoryIndex"} value={c._id}>{c.name}</option>
                                        )
                                    })
                                    
                                }
                                </select>
                                <div className='flex flex-wrap gap-3'>

                                {
                                    data.category.map((c,index)=>{
                                        return (
                                            
                                            <div className='flex p-2 text-sm gap-2 items-center bg-green-300 mt-1 rounded-lg' key={c._id+index+"products"}>
                                                <p>{c.name}</p>
                                                <div className='font-bold hover:text-red-500 hover:cursor-pointer' onClick={()=>removeProductCategory(index)}>
                                                        <IoClose size={20}/>
                                                    </div>
                                                        </div>
                                       
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-1'>
                        <label className='font-medium' htmlFor="">
                            sub category
                        </label>
                        <div>
                                <select name="" id="" value={selectSubCategory} onChange={(e)=>{
                                    const value = e.target.value;
                                    const category = allSubCategory.find((el)=>el._id === value)
                                    console.log(value);
                                    
                                    setData((prev)=>{
                                        return {
                                            ...prev,
                                            subcategory:[...prev.subcategory,category]
                                        }
                                    })
                                    setSelectSubCategory("")
                                }} className='w-full bg-blue-100 p-2 rounded '>
                                <option value={""}>Select sub Category</option>
                                {
                                    allSubCategory.map((c,index)=>{
                                        return (
                                            <option key={index+"subCategoryIndex"} value={c._id}>{c.name}</option>
                                        )
                                    })
                                    
                                }
                                </select>
                                <div className='flex flex-wrap gap-3'>

                                {
                                    data.subcategory.map((c,index)=>{
                                        return (
                                            
                                            <div className='flex p-2 text-sm gap-2 items-center bg-green-300 mt-1 rounded-lg' key={c._id+index+"products"}>
                                                <p>{c.name}</p>
                                                <div className='font-bold hover:text-red-500 hover:cursor-pointer' onClick={()=>removeProductsubCategory(index)}>
                                                        <IoClose size={20}/>
                                                    </div>
                                            </div>
                                       
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>
                    <div className='grid gap-1 '>
                        <label className='font-medium' htmlFor="unit">unit</label>
                        <input type="text"
                               placeholder='Product Quantity'
                               value={data.unit}
                               onChange={handleChange}
                               name='unit'
                               required
                               id='unit'
                                className='bg-blue-100 p-2 outline-none border-2 rounded-md focus-within:border-amber-300'
                        
                        />
                    </div>

                     <div className='grid gap-1 '>
                        <label className='font-medium' htmlFor="stock">stock</label>
                        <input type="number "
                               placeholder='Product stock'
                               value={data.stock}
                               onChange={handleChange}
                               name='stock'
                               required
                               id='stock'
                                className='bg-blue-100 p-2 outline-none border-2 rounded-md focus-within:border-amber-300'
                        />
                    </div>

                    <div className='grid gap-1 '>
                        <label className='font-medium' htmlFor="price">price</label>
                        <input type="number "
                               placeholder='Product Price'
                               value={data.price}
                               onChange={handleChange}
                               name='price'
                               required
                               id='price'
                                className='bg-blue-100 p-2 outline-none border-2 rounded-md focus-within:border-amber-300'
                        />
                    </div>
                    <div className='grid gap-1  '>
                        <label className='font-medium' htmlFor="discount">discount</label>
                        <input type="number "
                               placeholder='Product discount'
                               value={data.discount}
                               onChange={handleChange}
                               name='discount'
                               required
                               id='discount'
                                className='bg-blue-100 p-2 outline-none border-2 rounded-md focus-within:border-amber-300'
                        />
                    </div>

                    <div>
                        {
                            Object?.keys(data?.more_details)?.map((k,index)=>{
                                return (
                                    <div key={index+"AddMoreFieldsIndex"} className='grid gap-1 '>
                                    <label  htmlFor={k}>{k}</label>
                                    <input
                                        id={k}
                                        type="text"
                                        value={data?.more_details[k]}
                                        onChange={(e)=>{
                                            const value = e.target.value;
                                            setData((prev)=>{
                                                return {
                                                    ...prev,
                                                    more_details:{
                                                        ...prev.more_details,
                                                        [k] :value
                                                    }
                                                }
                                            })
                                        }}
                                      
                                        required
                                            className='bg-blue-100 p-2 outline-none border-2 rounded-md focus-within:border-amber-300'
                                    />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div onClick={()=>setOpenAddField(true)} className='inline-block bg-amber-400 hover:bg-amber-300 py-2 px-3 w-32 mt-1 rounded-lg cursor-pointer text-center font-semibold border border-amber-300'>
                        add Fields
                    </div>
                    <button  className='bg-amber-200 hover:bg-amber-300 py-2 font-semibold px-3 w-full rounded-lg mt-2'>Submit</button>
                </form>
            </div>
            {
                viewImage && (
                    <ViewImage url={viewImage} close={()=>setViewImage("")} />
                )
            }

            {
                openAddField && (
                    <AddFields close={()=>setOpenAddField(false)}
                    value={fieldName}
                    onChange={(e)=>{
                        setFieldName(e.target.value)
                    }}
                    submit={HandleAddField}
                    
                    
                    
                    />
                )
            }
        </section>
    );
};

export default UploadProduct;