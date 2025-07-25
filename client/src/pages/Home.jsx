import React from 'react'
import banner from "../assets/banner.jpg"
import banner_mobile from "../assets/banner-mobile.jpg"
import { useSelector } from 'react-redux'
import { validUrl } from '../utils/validUrlConvert'
import {Link, useNavigate} from "react-router-dom"

const Home = () => {
  const loadingCategory = useSelector((store)=>store.product.loadingCategory);
  const categoryData = useSelector((store)=>store.product.allcategory);
  const SubcategoryData = useSelector((store)=>store.product.allSubcategory);
  const redirect = useNavigate();



  const handleRedirectListpage = (id,cat)=>{
      console.log(id,cat);
      const subCategory = SubcategoryData.find(sub=>{
          const filterData = sub.category.some(c =>{
            return c._id == id
          })
          return filterData ? true :null
          
      })
      const url = `/${validUrl(cat)}-${id}/{${validUrl(subCategory.name)}-${subCategory._id}}`
      console.log("Url is",url);
      redirect(url)
      
        console.log(subCategory);
      
  }
  return (
    <section className='bg-white'>
        <div className='container mx-auto rounded'>
            <div className={`w-full h-full min-h-48 ${!banner && "animate-pulse my-2" }`}>
                <img src={banner}
                className='w-full h-full hidden lg:block'
                alt="" />

                <img src={banner_mobile}
                className='w-full h-full lg:hidden'
                alt="" />
            </div>
            <div className='container px-4 mx-auto my-3 gap-3 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10'>
                {
                  loadingCategory ? (
                    new Array(12).fill(null).map((c,idx)=>{
                    return (
                     
                            <div key={idx} className='bg-white rounded p-4 min-h-40 grid gap-2 shadow animate-pulse'>
                              <div className='bg-blue-100 min-h-20 rounded'></div>
                              <div className='bg-blue-100 h-8 rounded'></div>
                              <div className='grid grid-cols-2 gap-4'>
                                  <div className='bg-blue-100 h-8 rounded'></div>
                                  <div className='bg-blue-100 h-8 rounded'></div>
                              </div>
                            </div>
                       
                    )
                     })
                  ):(

                        categoryData.map((cat,index)=>{
                          return <div key={index} onClick={()=>handleRedirectListpage(cat._id,cat.name)}>
                                    <div>
                                      <img src={cat.image} alt="" />
                                    </div>
                                </div> 
                      })
                    
                  )
                  
                }
            </div>
        </div>

        {/* Display category wise data cards etc */}
        
        <div> 
                <div className='container mx-auto p-4 flex items-center justify-between'>
                    <h3 className='font-semibold text-lg md:text-xl'>Dairy ,Bread & Eggs</h3>
                    <Link className='text-green-500'  to={""}>See All</Link>
                </div>
                <div>
                  
                </div>
        </div>

    </section>
  )
}

export default Home
