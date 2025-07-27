import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../utils/useAxios';
import summeryApis from '../common/summuryApi';
import AxiosToastError from '../utils/AxiosToastError';

const ProductListPage = () => {
    const params = useParams();
    console.log("parameters : ",params);

    const [data,setData] = useState([]);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);
    const [totalCount,setTotalPageCount] = useState(1);

   
    const fetchProductData = async()=>{
        const categoryId = params.category.split("-").slice(-1)[0]
        const subCategoryId = params.subcategory.split("-").slice(-1)[0]

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
    return (
        <section className='sticky top-24 h-20'>
            <div className='w-full mx-auto grid grid-cols-[90px_1fr] lg:grid-cols-[280px_1fr] md:grid-cols-[200px_1fr]'>
                {/* subCategory */} 
                <div className='bg-red-500 min-h-[80vh]'> 
                    subcategory
                </div>

                {/* Product */}
                <div className='bg-green-600 min-h-[80vh]'>
                            product
                </div>
            </div>
        </section>
    );
};

export default ProductListPage;