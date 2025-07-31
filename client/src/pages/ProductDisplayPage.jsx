    import React, { useEffect, useRef, useState } from 'react'
    import { useParams } from "react-router-dom"
    import AxiosToastError from '../utils/AxiosToastError';
    import Axios from '../utils/useAxios';
    import summeryApis from '../common/summuryApi';
    import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
    import {PriceInruppees} from "../utils/DisplayPriceinRuppes"
    import Devider from "../components/Devider"
    import img1 from "../assets/minute_delivery.png"
    import img2 from "../assets/Best_Prices_Offers.png"
    import img3 from "../assets/Wide_Assortment.png"

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
      ImageContainer.current.scrollLeft+=300
  }

  const handleScrollLeft = () => {
        ImageContainer.current.scrollRight-=300
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
                    <div className='grid select-none relative'>
                        <div ref={ImageContainer} className='flex scroll-smooth transition gap-3 m-1 relative z-10 cursor-pointer w-full h-full overflow-x-auto scrollbar-none p-4'>
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
                            {
                              data.stock === 0  ? (
                                  <p className='text-lg text-red-500'>stock : Out of stock</p>
                              ):(
                                <p className='text-lg text-orange-400 py-2'>stock avilable : {data.stock} pices</p>
                              )
                            }
                            <button className='my-4 px-4 py-2 bg-green-300 hover:bg-green-400 rounded'>Add</button>
                            <div><Devider/></div>
                            <h2 className='font-semibold'>
                              Why shop from Blinkit ?
                            </h2>
                                <div>

                                  <div className='flex gap-4 items-center my-4'>
                                    <img className='w-20 h-20' src={img1} alt='Super fast deliviery'/>
                                    <div className='text-sm'>
                                        <div className='font-semibold'>Superfast delevery</div>
                                        <p>Get your order deleviered to your doorstep at the earliest form dark stores near you</p>
                                    </div>
                                  </div>
                                  <div className='flex gap-4 items-center my-4'>

                                    <img className='w-20 h-20' src={img2} alt='best Prices Offer'/>
                                    <div className='text-sm'>
                                        <div className='font-semibold'>Best Prices Offer</div>
                                        <p>We offres the best price and delevery from the Manufacturers</p>
                                    </div>
                                  </div>
                                    <div className='flex gap-4 items-center my-4'>

                                    <img className='w-20 h-20' src={img3} alt='best Prices Offer'/>
                                    <div className='text-sm'>
                                        <div className='font-semibold'>Wide Assortment</div>
                                        <p>Choose from 5000+ products across food personal care and household</p>
                                    </div>
                                  </div>
                                </div>
                            </div>
            
          </section>
      )
    }

    export default ProductDisplayPage
