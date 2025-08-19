import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import summuryapi from "../common/summuryApi.js"
import Axios from "../utils/useAxios.js"
import { addToCart } from "../store/Cartslice.js";
import { useDispatch, useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError.js";
import toast from "react-hot-toast";
import summeryApis from "../common/summuryApi.js";
import { priceWithDisCount } from "../utils/DisCountCunter.js";
import { addAddress } from "../store/Address.slice.js";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

export const GobalContextProvider = ({children}) => {
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    const [notDiscountprice, setnotDiscountPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    // Single source of truth for cart items
    const cartItems = useSelector((store) => store?.cart?.cart || []);
    const user = useSelector((store) => store?.user);

    // Clear cart data function
    const clearCartData = useCallback(() => {
        setTotalQty(0);
        setTotalPrice(0);
        setnotDiscountPrice(0);
        dispatch(addToCart([]));
    }, [dispatch]);

    // Fetch address data - moved outside and made it a separate function
    const fetchAddress = useCallback(async() => {
        const currentToken = localStorage.getItem("accessToken");
        if (!user?._id || !currentToken) {
            return;
        }

        try {
            const response = await Axios({
                ...summeryApis.getAddress
            });

            const {data: responseData} = response;
            if(responseData.success){
                dispatch(addAddress(responseData.data));
            }
        } catch (error) {
            console.error("Address fetch error:", error);
            // Only show error toast for non-auth errors
            if (error.response?.status === 401 || error.response?.status === 403) {
                // Don't show toast for auth errors
            } else {
                const errorMessage = error.response?.data?.message?.trim() || error.message?.trim();
                if (errorMessage) {
                    AxiosToastError(error);
                }
            }
        }
    }, [dispatch, user?._id]);

    // Fetch cart data from API
    const fetchCartData = useCallback(async() => {
        const currentToken = localStorage.getItem("accessToken");
        if (!user?._id || !currentToken || isLoading) {
            return;
        }
        
        try {
            setIsLoading(true);
            
            const response = await Axios({
                ...summuryapi.getCartDetails
            });
            
            const { data: responseData } = response;
            
            if (responseData.success && Array.isArray(responseData.data)) {
                // Ensure we're setting clean data
                const cleanCartData = responseData.data.filter(item => 
                    item && item.productId && item.quantity > 0
                );
                dispatch(addToCart(cleanCartData));
            }
        } catch (error) {
            console.error("Cart fetch error:", error);
            if (error.response?.status === 401 || error.response?.status === 403) {
                clearCartData();
            }
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, user?._id, isLoading]); // Remove clearCartData from dependencies

    // Calculate totals whenever cart items change
    useEffect(() => {
        if (!Array.isArray(cartItems)) {
            setTotalQty(0);
            setTotalPrice(0);
            setnotDiscountPrice(0);
            return;
        }

        // Filter out invalid items first
        const validItems = cartItems.filter(item => 
            item && 
            item.productId && 
            item.quantity && 
            item.quantity > 0 &&
            item.productId.price
        );

        if (validItems.length === 0) {
            setTotalQty(0);
            setTotalPrice(0);
            setnotDiscountPrice(0);
            return;
        }

        let totalQuantity = 0;
        let calculatedTotalPrice = 0;
        let calculatedNotDiscountPrice = 0;

        validItems.forEach((item) => {
            const quantity = parseInt(item.quantity) || 0;
            const originalPrice = parseFloat(item.productId.price) || 0;
            const discount = parseFloat(item.productId.discount) || 0;
            
            totalQuantity += quantity;
            
            const priceAfterDiscount = discount > 0 ? 
                Number(priceWithDisCount(originalPrice, discount)) : 
                (item.productId.sellingPrice || originalPrice);
            
            calculatedTotalPrice += priceAfterDiscount * quantity;
            calculatedNotDiscountPrice += originalPrice * quantity;
        });

        // Batch state updates to prevent multiple re-renders
        setTotalQty(totalQuantity);
        setTotalPrice(calculatedTotalPrice);
        setnotDiscountPrice(calculatedNotDiscountPrice);
        
    }, [cartItems]);

    // Handle user authentication changes
    useEffect(() => {
        const currentToken = localStorage.getItem("accessToken");
        
        if (user?._id && currentToken) {
            fetchCartData();
            fetchAddress();
        } else if (!user?._id || !currentToken) {
            clearCartData();
        }
    }, [user?._id]);

    // Update quantity with better error handling
    const updateQuntity = useCallback(async(id, qty) => {
        const currentToken = localStorage.getItem("accessToken");
        if (!user?._id || !currentToken) {
            toast.error("Please login to update cart");
            return false;
        }

        if (qty < 0) {
            toast.error("Invalid quantity");
            return false;
        }
        
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
                // Refresh cart data immediately
                await fetchCartData();
                return true;
            }
            return false;
        } catch (error) {
            AxiosToastError(error);
            if (error.response?.status === 401 || error.response?.status === 403) {
                clearCartData();
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [user?._id, fetchCartData, clearCartData]);

    // Delete cart items with better error handling
    const deleteCartItems = useCallback(async(cardId) => {
        const currentToken = localStorage.getItem("accessToken");
        if (!user?._id || !currentToken) {
            toast.error("Please login to delete cart items");
            return false;
        }
        
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
                // Refresh cart data immediately
                await fetchCartData();
                return true;
            }
            return false;
        } catch (error) {
            AxiosToastError(error);
            if (error.response?.status === 401 || error.response?.status === 403) {
                clearCartData();
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [user?._id, fetchCartData, clearCartData]);

    // Logout function
    const handleLogout = useCallback(() => {
        localStorage.clear();
        clearCartData();
        toast.success("Logged out successfully");
    }, [clearCartData]);

    // Add a function to get actual cart count
    const getCartItemCount = useCallback(() => {
        if (!Array.isArray(cartItems)) return 0;
        return cartItems.filter(item => 
            item && 
            item.productId && 
            item.quantity && 
            item.quantity > 0
        ).length;
    }, [cartItems]);

    // Memoize context value
    const contextValue = useMemo(() => ({
        fetchCartData,
        updateQuntity,
        deleteCartItems,
        handleLogout,
        clearCartData,
        getCartItemCount,
        fetchAddress, // Now properly defined
        totalPrice,
        totalQty,
        notDiscountprice,
        isLoading,
        cartItemsCount: getCartItemCount() // Add this for consistency
    }), [
        fetchCartData,
        updateQuntity, 
        deleteCartItems,
        handleLogout,
        clearCartData,
        getCartItemCount,
        fetchAddress, // Now properly included
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