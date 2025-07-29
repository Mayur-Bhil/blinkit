import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/useAxios';
import summeryApis from '../common/summuryApi';
const ProductDisplayPage = () => {
  const params = useParams();
  let productId = params.product.split("-").slice(-1);
  const [image,setImage] = useState(0);
  const [data,setData] = useState({
    name:"",
    Image:[]
  });
  const [loading,setLoading] = useState(false);
 
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
      <section className='container mx-auto p-4 grid lg:grid-cols-3'>
          <div className='col-span-1'>
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
                 <div className='grid'>
                    <div className='flex gap-3 m-1 cursor-pointer w-full h-full  overflow-x-auto scrollbar-none '>
                          {
                            data.Image.map((img,index)=>{
                            
                                return <div key={img+index} className='min-h-20 min-w-20  flex items-center justify-center shadow-gray-500 shadow-2xl object-scale-down'>
                                              <img className='' src={img}
                                              alt='Mini-images-of-products'
                                              onClick={()=>setImage(index)}
                                              />
                                        </div>
                            })
                          }
                    </div>
                  </div>
              </div>  
         
      </section>
  )
}

export default ProductDisplayPage
