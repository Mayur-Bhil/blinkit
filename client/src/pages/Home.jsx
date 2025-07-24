import React from 'react'
import banner from "../assets/banner.jpg"
import banner_mobile from "../assets/banner-mobile.jpg"
import { useSelector } from 'react-redux'

const Home = () => {
  const loadingCategory = useSelector((store)=>store.product.loadingCategory)
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
            <div className='container px-4 mx-auto my-3 gap-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
                {
                  loadingCategory ? (
                    new Array(20).fill(null).map((c,idx)=>{
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
                      <div>
                          <div>
                            <img  alt="" />
                          </div>
                      </div>
                  )
                  
                }
            </div>
        </div>
    </section>
  )
}

export default Home
