import React, { useEffect, useState } from 'react';
import UploadCategoryModel from '../components/UploadCategoryModel';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import Axios from '../utils/useAxios';
import summeryApis from '../common/summuryApi';

const CategoryPage = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false); // Fixed variable name
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);

    const fetchCategory = async() => {
        try {
            setLoading(true)
            const response =await Axios({
                ...summeryApis.getCategory
            })
            const {data:responseData} = response;

            if(responseData.success){
                setCategoryData(responseData.data)
            }
            console.log(responseData);
            
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategory();
    }, [])

    return (
        <section>
            <div className='p-2 bg-white shadow-xl flex items-center justify-between rounded-sm'>
                <h2 className='font-semibold'>Category</h2>
                <button 
                    onClick={() => setOpenUploadCategory(true)} 
                    className='text-sm cursor-pointer border-amber-400 hover:border-amber-300 hover:bg-amber-300 px-3 py-2 rounded'
                >
                    Add category
                </button>
            </div>
            
            {/* Fixed: use lowercase 'loading' variable */}
            {
                !categoryData[0] && !loading && (
                    <NoData/>
                )
            }
            <div className='p-4 grid grid-cols-7'>
                {
                categoryData.map((category,index)=>{
                    return (
                        <div className='w-fit rounded shadow flex h-45 object-scale-down overflow-hidden bg-red-600'>
                                <img
                                alt={category.name}
                                src={category.image}
                                className='w-32 object-scale-down'
                                />
                        </div>
                    )
                })
            }
            </div>

            {
                loading && <Loading/>
            }
            
            {/* Fixed: use consistent variable name */}
            {
                openUploadCategory && (
                    <UploadCategoryModel fetchData={fetchCategory} close={() => setOpenUploadCategory(false)}/>
                )
            }
        </section>
    );
};

export default CategoryPage;