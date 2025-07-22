import React from 'react';
import { useState } from 'react';
import AxiosToastError from "../utils/AxiosToastError"
import Axios from "../utils/useAxios"
import summeryApis from '../common/summuryApi';
import { useEffect } from 'react';
import Loading from '../components/Loading';
import ProductCartAdmin from '../components/ProductCartAdmin';
import { IoSearchOutline } from "react-icons/io5";


const ProductByAdmin = () => {
    const [productData,setproductData] = useState([]);
    const [page,setpage] = useState(1);
    const [loading,setloadig] = useState(true);
    const [totalCount,setTotalCount] = useState(0);
    const [search,setSearch] = useState("");


    const fetchProductData = async()=>{
        try {
            const response = await Axios({
                ...summeryApis.getProduct,
                data:{
                    page:page,
                    limit:12,
                    search:search
                }
            })

            const {data:ResponseData} = response;
            console.log(response);

            if(ResponseData.success){
                setTotalCount(ResponseData.totalCount)
                setproductData(ResponseData.data)
            }
        } catch (error) {
        AxiosToastError(error)
        }finally{
            setloadig(false)
        }
    }


    useEffect(()=>{
        fetchProductData()
    },[page])

    const HandleNext = ()=>{
        if(page !== totalCount){

            setpage(prev => prev+1)
        }
    }

        const HandlePrev = ()=>{
        if(page > 1){

            setpage(prev => prev-1)
        }
    }


    const handleOnChange = (e)=>{
        const {value} = e.target;
        setSearch(value)
        setpage(1)
    }

    useEffect(()=>{
        let flag = true;
        const timer = setTimeout(()=>{
            if(flag){
                 fetchProductData();
                 flag = false;
            }
    
        },300)
        return ()=>{
            clearTimeout(timer);
        }
    },[search])   
    return (
        <section>
            <div className='p-2 h-full bg-white shadow-md flex items-center justify-between gap-4'>
              
                    <h2 className='font-semibold'>Product</h2>
                    <div className='h-full min-w-24 max-w-56 w-full ml-auto bg-blue-50 flex items-center gap-3 px-3 py-2 border-2 focus-within:border-amber-300'>
                        <IoSearchOutline size={20}/>
                        <input onChange={handleOnChange} type="text"
                        placeholder='search'
                        name="" id=""
                        value={search}
                        className='h-full w-full bg-trasparent outline-none border-none '
                        />
                    </div>
                
            </div>
            {
                loading && (
                    <Loading/>
                )
            }
           <div className='p-4 bg-blue-50'>
                <div className='min-h-[55vh]'>
                    <div className=' grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 '>
                {
                productData.map((product,index)=>{
                    return (
                            <ProductCartAdmin data={product} key={index}/>
                    )
                })
                 }
            </div>
                </div>
            <div className='flex justify-between p-2 my-2 bg-white'>
                <button onClick={HandlePrev} className='border border-amber-300 px-4 py-2 hover:bg-amber-200'>Previos</button>
                <button>{page}/{totalCount} </button>
                <button onClick={HandleNext} className='border border-amber-300 px-4 py-2 hover:bg-amber-200'>Next</button>
            </div>
           </div>
        </section>
    );
};

export default ProductByAdmin;