import { Outlet } from 'react-router-dom'
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast,{ Toaster } from "react-hot-toast"
import { useEffect } from 'react'
import getUserDetails from './utils/getUserDatails'
import { setUserDetails } from './store/userSclice'
import { useDispatch } from 'react-redux'
import { setAllCategory ,setAllSubCategory, setloadingCategory} from './store/ProductSclice'
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
      dispatch(setloadingCategory(true))
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
        dispatch(setloadingCategory(false))
      }
    };

   const fetchSubCategory = async()=>{
    try {
                 
       const response = await Axios({
          ...summeryApis.getsubCategory,
        });
        const { data: responseData } = response;
           
        if (responseData.success) {
            dispatch(setAllSubCategory(responseData.data))
        }
              
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
             
      }
   }

   const fetchCartItems = async ()=>{
    try {
      console.log("Fetching cart items...");
      
      const response = await Axios({
        ...summeryApis.getCartItem,
      })
      
      console.log("Cart API Response:", response);
      
      const {data: responseData} = response;
      
      console.log("Cart Response Data:", responseData);
      
      if(responseData.success){
        console.log("Cart items data:", responseData.data);
        // You might want to dispatch cart items to Redux store here
        // dispatch(setCartItems(responseData.data))
      } else {
        console.log("Cart API call unsuccessful:", responseData.message || "No message provided");
      }
      
    } catch (error) {
      console.error("Error fetching cart items:", error);
      console.log("Full error details:", error.response || error);
    }
   }
          
   useEffect(()=>{
      fetchUser()
      fetchCategory();
      fetchSubCategory();
      fetchCartItems();
         
   },[])
     
   return (
    <>
    <Header/>
    <main className='min-h-[80vh] py-[0.1px]'>
        <Outlet/>
    </main>
    <Footer/>
    <Toaster/>
    </>
   )
}

export default App