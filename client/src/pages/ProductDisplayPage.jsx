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
      <section className='container mx-auto p-4 grid lg:grid-cols-3 bg-white'>
          <div className='col-span-1'>
                <div className='bg-zinc-50 lg:min-h-[70vh] lg:max-h-[70vh] rounded min-h-56 max-h-56 h-full w-full'>
                    <img
                      src={data.Image[image]}
                      className='h-full w-full object-scale-down'
                    
                    />
                </div>
                <div>
                    {
                      data.Image.map((img,index)=>{
                          return <div className={`bg-blue-300`}>
                              dasdas
                              </div>
                      })
                    }
                </div>
          </div>
          <div>

          </div>
      </section>
  )
}

export default ProductDisplayPage
