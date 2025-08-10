import { createContext, useContext, useEffect } from "react";
export const GlobalContext = createContext(null);
import summuryapi from "../common/summuryApi.js"
import Axios from "../utils/useAxios.js"
import { addToCart } from "../store/Cartslice.js";
import { useDispatch } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError.js";
import toast from "react-hot-toast";

export const useGlobalContext = () => useContext(GlobalContext);



export const GobalContextProvider = ({children})=>{
    const dispatch = useDispatch();

    const fetchCartData = async() => { 
        try {
      console.log("maknking an PI call");
      
       const response = await Axios({
            ...summuryapi.getCartDetails
       })
       console.log("Made the API clall");
       const { data: responseData } = response;
        console.log("The Data is",responseData );
       if(responseData.success){
         console.log("items From cart:", responseData.data);
          dispatch(addToCart(responseData.data));
       }
     } catch (error) {
       console.error("Cart fetch error:", error);
     }
   }


   const updateQuntity = async(id,qty)=>{
        try {   
            const response = await Axios({
                ...summuryapi.updateQunatity,
                data:{
                    _id:id,
                    qty:qty,
                }
            })
            const {data:responseData} = response;


            if(responseData.success){
                toast.success(responseData.message);
                await fetchCartData()
            }
        } catch (error) {
            AxiosToastError(error)
        }
   }


   
   
   useEffect(()=>{
        fetchCartData();
   },[])

    return (
        <GlobalContext.Provider value={{
            fetchCartData,
            updateQuntity
            
            
            
        }}>
            {children}
        </GlobalContext.Provider>
    )
}


export default GobalContextProvider;