  import React, { useEffect, useRef, useState } from 'react'
  import { useParams } from "react-router-dom"
  import AxiosToastError from '../utils/AxiosToastError';
  import Axios from '../utils/useAxios';
  import summeryApis from '../common/summuryApi';
  import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
  import {PriceInruppees} from "../utils/DisplayPriceinRuppes"
  import Devider from "../components/Devider"
  const ProductDisplayPage = () => {
    const params = useParams();
    let productId = params.product.split("-").slice(-1);
    const [image,setImage] = useState(0);
    const [data,setData] = useState({
      name:"",
      Image:[]
    });
    const [loading,setLoading] = useState(false);
    const ImageContainer = useRef();
  
    const handleScrollRight = () => {
  ImageContainer.current.scrollBy({
    left: 100,
    behavior: 'smooth'
  })
}

const handleScrollLeft = () => {
  ImageContainer.current.scrollBy({
    left: -100,
    behavior: 'smooth'
  })
}
  
    const fetchProductDetails = async()=>{
      try {
        setLoading(true)
          const res = await Axios({
            ...summeryApis.getProdctDetails,
              data:{
                productId : productId
              }     
          })

          const {data:ResponseData} = res;
            if(ResponseData.success){
              setData(ResponseData.data)
              
          }
      } catch (error) {
          AxiosToastError(error)  
        }finally{
          setLoading(false)
        } 
    }
    

    useEffect(()=>{
      fetchProductDetails();
    },[params]);

  console.log(data);


    return (
        <section className='container mx-auto p-4 grid lg:grid-cols-2'>
            <div className=''>
                  <div className='bg-zinc-50 lg:min-h-[58vh] lg:max-h-[58vh] rounded min-h-56 max-h-56 h-full w-full'>
                      <img
                        src={data.Image[image]}
                        className='h-full w-full object-scale-down'
                      
                      />
                  </div>
                  <div className='flex justify-center items-center gap-3 p-2 cursor-pointer'>
                      {
                        data.Image.map((img,index)=>{
                        
                            return <div key={img+index+"Images"} className={`bg-amber-50 rounded-full w-10 h-10 ${index === image && "bg-amber-200" }`}>
                                    
                                </div>
                        })
                      }
                  </div>
                  <div ref={ImageContainer} className='grid select-none relative'>
                      <div className='flex gap-3 m-1 relative z-10 cursor-pointer w-full h-full overflow-x-auto scrollbar-none p-4'>
                            {
                              data.Image.map((img,index)=>{
                              
                                  return <div key={img+index} className='min-h-20 min-w-20  flex items-center justify-center  object-scale-down'>
                                                <img className='' src={img}
                                                alt='Mini-images-of-products'
                                                onClick={()=>setImage(index)}
                                                />
                                          </div>
                              })
                            }
                      </div> 
                            <div className='absolute w-full flex justify-between h-full -ml-3 items-center '>
                                <button onClick={handleScrollLeft} className='bg-white p-1 rounded-full z-10 cursor-pointer relative shadow-lg'><FaAngleLeft /></button>
                                <button onClick={handleScrollRight} className='bg-white p-1 rounded-full z-10 cursor-pointer relative shadow-lg'><FaAngleRight /> </button>
                            </div>
                    </div>
                </div>
                <div className='p-4'>
                  <p className='bg-green-300 rounded-xl w-fit p-2'>10 min</p>
                          <h2 className='text-lg font-semibold lg:text-3xl'>
                            {data.name}
                          </h2>
                          <p className='py-4'>Unit: {data.unit}</p>
                          <div><Devider/></div>
                          <div>
                              <p>Price</p>
                              <div className='border border-green-500 px-4 py-2 rounded bg-green-100 w-fit'>
                                <p className='font-semibold text-lg lg:text-xl'>{PriceInruppees(data.price)}</p>
                              </div>
                          </div>
                </div>
          
        </section>
    )
  }

  export default ProductDisplayPage
