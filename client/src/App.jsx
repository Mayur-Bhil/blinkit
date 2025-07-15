import { Outlet } from 'react-router-dom'
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast,{ Toaster } from "react-hot-toast"
import { useEffect } from 'react'
import getUserDetails from './utils/getUserDatails'
import { setUserDetails } from './store/userSclice'
import { useDispatch } from 'react-redux'
import { setAllCategory } from './store/ProductSclice'
import Axios from './utils/useAxios'
import summeryApis from './common/summuryApi'
function App() {

  const dispatch = useDispatch();
   

  const fetchUser = async() =>{
      const Userdata = await getUserDetails();
      // console.log("data",Userdata.data.data);
      dispatch(setUserDetails(Userdata.data.data))
            
  }
    const fetchCategory = async () => {
      try {
        
        const response = await Axios({
          ...summeryApis.getCategory,
        });
        const { data: responseData } = response;
  
        if (responseData.success) {
            dispatch(setAllCategory(responseData.data))
        }
       
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
      
      }
    };

    
    useEffect(()=>{
      fetchUser()
      fetchCategory();
  },[])

  return (
    <>
    <Header/>
    <main className='min-h-[80vh] py-[0.1px] bg-sky-100'>
        <Outlet fetchCategory={fetchCategory}/>
    </main>
    <Footer/>
    <Toaster/>
    </>
  )
} 

export default App
