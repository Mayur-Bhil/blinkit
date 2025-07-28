import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../utils/useAxios';
import summeryApis from '../common/summuryApi';
import AxiosToastError from '../utils/AxiosToastError';
import Loading from "../components/Loading"
import CartProduct from '../components/CartProduct';
import { useSelector } from 'react-redux';

const ProductListPage = () => {
    const params = useParams();
    console.log("parameters : ",params);
    const Allsubcategory = useSelector((store)=>store.product.allSubcategory);
    console.log(Allsubcategory);
    
    const [data,setData] = useState([]);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);
    const [totalCount,setTotalPageCount] = useState(1);
    const subcategoryLength = params?.subcategory?.split("-")
    const subCategoryName = subcategoryLength?.splice(0,subcategoryLength?.length-1).join("-");
    const categoryId = params.category.split("-").slice(-1)[0]
    const subCategoryId = params.subcategory.split("-").slice(-1)[0];
    const [displaysubCategory,setDisplaySUbCategory] = useState([]);
   
    const fetchProductData = async()=>{
        try {
            setLoading(true);
            const response = await Axios({
                ...summeryApis.getProductByCategoryandSubcategory,
                data:{
                    categoryId,subCategoryId ,page:page,limit:20
                }
            })

            const {data:responseData} = response;
            if(responseData.success){
                setData(responseData.data)
            }
            console.log("data with category subcategory",data);
            
        } catch (error) {
           AxiosToastError(error)
        }finally{
            setLoading(false)
        }
    }   
    
    useEffect(()=>{
        fetchProductData();
    },[params])

    useEffect(()=>{
        const sub = Allsubcategory.filter(sub =>{
            const filterData = sub.category.some(el =>{
                return el._id == categoryId
            })
            return filterData ? filterData : null
        })
        console.log(sub);
        setDisplaySUbCategory(sub)
    },[params,Allsubcategory])

    return (
        // FIXED: Removed sticky positioning and fixed height
        <section className='mt-20 min-h-screen'>
            <div className='w-full mx-auto grid grid-cols-[90px_1fr] lg:grid-cols-[280px_1fr] md:grid-cols-[200px_1fr] min-h-[calc(100vh-80px)]'>
                {/* subCategory */} 
                <div className='bg-red-500 min-h-full'> 
                    {
                        displaysubCategory.map((s,index)=>{
                            return <div key={index} className='p-2'>
                                <div>
                                    <img 
                                        src={s.image} 
                                        alt={"Image"}
                                        className='w-full h-16 object-cover rounded'
                                    />
                                    <p className='text-xs text-white text-center mt-1'>
                                        {s.name}
                                    </p>
                                </div>
                            </div>
                        })
                    }
                </div>

                {/* Product */}
                <div className='flex flex-col'>
                    <div className='bg-white shadow-md p-4'>
                        <h3 className='font-semibold'>{subCategoryName}</h3>
                    </div>
                    <div className='flex-1'>
                        <div className='grid grid-cols-1 p-4 gap-3 md:grid-cols-3 lg:grid-cols-5'>
                            {
                                data.map((product,index)=>{
                                    return (
                                        <CartProduct data={product} key={product._id+"ProductSUbcategory"+index}/>
                                    )
                                })
                            }
                        </div>
                        {
                            loading && (
                                <Loading/>
                            )
                        }
                    </div>
                </div>  
            </div>
        </section>
    );
};

export default ProductListPage;