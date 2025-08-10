import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/global.provider';
import summeryApis from '../common/summuryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/useAxios';
import { useSelector } from 'react-redux';
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const AddtoCart = ({data}) => {
        const [loading,setLoading] = useState(false); 
        const { fetchCartData } = useGlobalContext();
        const cartItems = useSelector((store) => store?.cart?.cart || []);
        console.log("Cart-Items",cartItems );
        const [isAvailableCart,setUSeAvailableCart] = useState(false);
        const [qty,setQty] = useState(0);
     const handleAddToCart = async(e) => {
          e.preventDefault();
          e.stopPropagation(); // Fixed typo: was stopPropagination
          
          setLoading(true); // Set loading to true at the start
          
          try {
               const response = await Axios({
                    ...summeryApis.addTocart,
                    data: {
                         productId: data?._id
                    }
               })
               const {data: responseData} = response;

               if(responseData.success){
                    toast.success(responseData.message)
                    await fetchCartData();
               }    
          } catch (error) {
               AxiosToastError(error);
          } finally {
               setLoading(false)
          }
     }

     useEffect(() => {
    const checkCartItems = cartItems.some((item) => item.productId._id === data._id);
    setUSeAvailableCart(checkCartItems); // Fix: Use checkCartItems, not hardcoded true
    
    if (checkCartItems) {
        const product = cartItems.find(item => item.productId._id === data._id);
        console.log("Product quantity", product);
        
        // Fix: Set the quantity from the found product
        if (product && product.quantity !== undefined) {
            setQty(product.quantity);
        }
    } else {
        setQty(0); 
    }
    
     }, [data, cartItems])

     return (
    <div>
     {
          isAvailableCart ? (
               <div className='flex items-center justify-between bg-gray-100 rounded-full gap-4 '>
                    <button>
                              <FaMinus size={12} />
                    </button>
                    <p>{qty}</p>
                    <button><FaPlus  size={12}/></button>
               </div>
          ):(
               <button
                         className={`bg-green-400 cursor-pointer hover:bg-green-600 text-white px-4 py-1 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} // Add loading state styling
                         onClick={handleAddToCart}
                         disabled={loading} // Disable button when loading
                         >
                                        {loading ? "Adding": 'Add'} {/* Show loading text */}
               </button>
          )
     }
      
    </div>
  )
}

export default AddtoCart;
