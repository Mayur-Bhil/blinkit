import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
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

export const GobalContextProvider = ({children}) => {
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    const [notDiscountprice, setnotDiscountPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    // Use shallow equality check to prevent unnecessary re-renders
    const cartItems = useSelector((store) => store?.cart?.cart || []);
    const user = useSelector((store) => store?.user);
    const token = localStorage.getItem("accessToken");

    // Memoize the fetchCartData function to prevent recreation on every render
    const fetchCartData = useCallback(async() => {
        // Prevent multiple simultaneous API calls
        if (isLoading) return;
        
        try {
            setIsLoading(true);
            // console.log("making API call");
            
            const response = await Axios({
                ...summuryapi.getCartDetails
            });
            
            const { data: responseData } = response;
            
            if (responseData.success) {
                // console.log("items From cart:", responseData.data);
                dispatch(addToCart(responseData.data));
            }
        } catch (error) {
            console.error("Cart fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, isLoading]); // Only depend on dispatch and loading state

    // Calculate totals only when cartItems actually change
    useEffect(() => {
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            setTotalQty(0);
            setTotalPrice(0);
            setnotDiscountPrice(0);
            return;
        }

        const totalQuantity = cartItems.reduce((prev, curr) => {
            return prev + (curr?.quantity || 0);
        }, 0);
        
        const totalPrice = cartItems.reduce((prev, curr) => {
            if (!curr?.productId?.price || !curr?.quantity) return prev;
            
            const priceAfterDiscount = Number(
                priceWithDisCount(curr.productId.price, curr.productId.discount)
            );
            return prev + priceAfterDiscount * curr.quantity;
        }, 0);
        
        const notDiscountprice = cartItems.reduce((prev, curr) => {
            if (!curr?.productId?.price || !curr?.quantity) return prev;
            return prev + (curr.productId.price * curr.quantity);
        }, 0);

        // Only update if values actually changed
        setTotalQty(prev => prev !== totalQuantity ? totalQuantity : prev);
        setTotalPrice(prev => prev !== totalPrice ? totalPrice : prev);
        setnotDiscountPrice(prev => prev !== notDiscountprice ? notDiscountprice : prev);
        
    }, [cartItems]); // Only depend on cartItems

    // Fetch cart data only when user login status changes
    useEffect(() => {
        if (user?._id && token) {
            // User is logged in - fetch cart data
            fetchCartData();
        } else {
            // User is logged out - reset totals immediately
            setTotalQty(0);
            setTotalPrice(0);
            setnotDiscountPrice(0);
        }
    }, [user?._id, token]); // Remove fetchCartData from dependencies

    // REMOVE THIS useEffect - it's causing continuous calls
    // useEffect(() => {
    //     fetchCartData();
    // }, [])

    const updateQuntity = useCallback(async(id, qty) => {
        if (isLoading) return; // Prevent multiple calls
        
        try {
            setIsLoading(true);
            const response = await Axios({
                ...summuryapi.updateQunatity,
                data: {
                    _id: id,
                    qty: qty,
                }
            });
            
            const {data: responseData} = response;

            if (responseData.success) {
                toast.success(responseData.message);
                 fetchCartData();
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setIsLoading(false);
        }
    }, [fetchCartData, isLoading]);

    const deleteCartItems = useCallback(async(cardId) => {
        if (isLoading) return; // Prevent multiple calls
        
        try {
            setIsLoading(true);
            const response = await Axios({
                ...summeryApis.deleteCartItem,
                data: {
                    _id: cardId
                }
            });
            
            const {data: responceData} = response;

            if (responceData.success) {
                toast.success(responceData.message);
                await fetchCartData();
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setIsLoading(false);
        }
    }, [fetchCartData, isLoading]);

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        fetchCartData,
        updateQuntity,
        deleteCartItems,
        totalPrice,
        totalQty,
        notDiscountprice,
        isLoading
    }), [
        fetchCartData,
        updateQuntity, 
        deleteCartItems,
        totalPrice,
        totalQty,
        notDiscountprice,
        isLoading
    ]);

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GobalContextProvider;