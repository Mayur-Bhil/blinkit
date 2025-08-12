import { createContext, useContext, useEffect, useState } from "react";
export const GlobalContext = createContext(null);
import summuryapi from "../common/summuryApi.js"
import Axios from "../utils/useAxios.js"
import { addToCart } from "../store/Cartslice.js";
import { useDispatch, useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError.js";
import toast from "react-hot-toast";
import summeryApis from "../common/summuryApi.js";
import { priceWithDisCount } from "../utils/DisCountCunter.js";

export const useGlobalContext = () => useContext(GlobalContext);



export const GobalContextProvider = ({children})=>{
    const dispatch = useDispatch();
    const [totalPrice,setTotalPrice] = useState(0);
    const [totalQty,setTotalQty] = useState(0);
    const cartItems = useSelector((store) => store?.cart?.cart || []);
    const token = localStorage.getItem("accessToken")

    const user = useSelector((store)=>store?.user);
  




    useEffect(()=>{
      const totalQuantity = cartItems.reduce((prev,curr)=>{
        return prev + curr.quantity
      },0)
      setTotalQty(totalQuantity)
    
      const totalPrice = cartItems.reduce((prev,curr)=>{
        const priceAfterDiscount  = Number(priceWithDisCount(curr?.productId?.price,curr?.productId?.discount));
        return prev +  priceAfterDiscount * curr.quantity;
      },0);
      setTotalPrice(totalPrice);
    
      
    
    },[cartItems]);

    
   
    

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

    useEffect(() => {
    if (user?._id && token) {
        // User is logged in - fetch cart data
        fetchCartData();
    } else {
        // User is logged out - reset totals immediately
        setTotalQty(null);
        setTotalPrice(null);
    }
    }, [user?._id, token, fetchCartData]);



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


   const deleteCartItems = async(cardId)=>{ 
        try {
            const response = await Axios({
                ...summeryApis.deleteCartItem,
                data:{
                    _id:cardId
                }
            })
            const {data:responceData} = response;

            if(responceData.success){
                toast.success(responceData.message);
                await fetchCartData();
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
            updateQuntity,
            deleteCartItems,
            totalPrice,totalQty
            
            
            
        }}>
            {children}
        </GlobalContext.Provider>
    )
}


export default GobalContextProvider;