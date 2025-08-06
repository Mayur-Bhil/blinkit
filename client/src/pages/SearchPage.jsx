import React, { useEffect, useState } from 'react'
import CardLoading from '../components/CardLoading';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/useAxios';
import summeryApis from '../common/summuryApi';
import CategoryPage from './CategoryPage';
import CartProduct from '../components/CartProduct';
import InfiniteScroll from 'react-infinite-scroll-component';
const SearchPage = () => {
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(true);
  const loadingCardsArray = new Array(10).fill(null);
  const [page,setPage] = useState(1); 
  const [totalPage,setTotalPage] = useState(1)

  const fetchData = async()=>{
      try {
        setLoading(true)
        const responce = await Axios({
          ...summeryApis.searchProducts,
          data:{
            search :'',
            page:page
          }
        })
        const {data:responseData} = responce;

        if(responseData.success){
            if(responseData.page == 1){
              setData(responseData.data)
            }else{
              setData((prev)=>{
                return [
                    ...prev,
                    ...responseData.data
                ]
              })
            }
            console.log(responseData);
        }
        
      } catch (error) {
          AxiosToastError(error )
      }
      finally{
        setLoading(false)
      }
  }

useEffect(()=>{
  fetchData();
},[page])

const handleFetchMoreProducts = ()=>{
  if(totalPage > page){
        setPage(prev => prev+1)
  }
}

  return (
        <section className='bg-white'>
             <div className='container mx-auto p-4'>
                <p className='font-semibold p-2'>Search Results :{data.length}</p>
                 <InfiniteScroll
                  dataLength={data.length}
                  hasMore={true}
                  next={handleFetchMoreProducts}

                  >
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 lg:gap-4 gap-3' >
                   
                      {
                      data.map((p,index)=>{
                        return (
                            <CartProduct data={p} key={p._id+"searchProduct"+index}/>
                        )
                      })
                    }

                      {/* Loading Data shows Here */}
                      {
                        loading && (
                            loadingCardsArray.map((_,index)=>{
                                return (
                                    < CardLoading key={"loadingCard"+index}/>
                                  )
                                })
                              )
                      } 
                </div>
          </InfiniteScroll>
             </div>
        </section>
  )
}

export default SearchPage
