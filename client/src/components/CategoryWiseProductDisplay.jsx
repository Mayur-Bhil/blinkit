import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/useAxios';
import summeryApis from '../common/summuryApi';
import CardLoadig from './CardLoadig';
import CartProduct from './CartProduct';
import { FaAngleLeft,FaAngleRight } from "react-icons/fa6";

const CategoryWiseProductDisplay = ({id,name}) => {
    const [data,setData] = useState([]);
    const [loading,setLoading]= useState(false);
    const LoadingCardNumber = new Array(10).fill(null);
    const containerRef = useRef();


    const fetchCategoryWiseProductData = async()=>{
        try {
            const response = await Axios({
                ...summeryApis.getProductByCategory,
                data:{
                    id:id
                }
            })
            
            const {data:responseData} = response;

            console.log(responseData);

            if(responseData.success){
                setData(responseData.data)
            }
            
        } catch (error) {
           AxiosToastError(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchCategoryWiseProductData();
    },[]);


    const ScrollRight = ()=>{
        containerRef.current.scrollLeft+=300
    }

    const scrollLeft = ()=>{
        containerRef.current.scrollLeft-=300
    }
  return (
    <div>
         <div className='container mx-auto p-4 flex items-center justify-between select-none'>
                    <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
                    <Link className='text-green-500'  >See All</Link>
                </div>
                <div className='flex items-center gap-4 p-4 md:gap-6  lg:gap-8 container mx-auto overflow-x-scroll scrollbar-none lg:overflow-hidden scroll-smooth transition-all ' ref={containerRef}>
                    { loading && 
                        LoadingCardNumber.map((_,index)=>{
                            return (
                                     <CardLoadig key={"CategoryWiseProductDisplay"+index}/>
                            )
                        })
                    }
                    {
                        data.map((product,index)=>{
                            return (
                              
                                    <CartProduct data={product} key={product._id+"CategoryWiseProductDisplay"+index} />
                               
                            )
                        })
                    }

                    <div className='w-full left-0 right-0 container mx-auto absolute hidden lg:flex px-2 justify-between select-none    '>
                        <button onClick={scrollLeft} className='z-10 relative bg-white shadow-lg p-2 cursor-pointer hover:bg-gray-100 rounded-full text-lg'>
                                <FaAngleLeft/>
                        </button>
                        <button onClick={ScrollRight} className='z-10 relative bg-white shadow-lg p-2 cursor-pointer hover:bg-gray-100 rounded-full text-lg'>
                                <FaAngleRight/>
                        </button>
                    </div>
                </div>

    </div>
  )  
}

export default CategoryWiseProductDisplay
