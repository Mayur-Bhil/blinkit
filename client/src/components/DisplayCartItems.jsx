import React, { useMemo, useCallback } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../provider/global.provider'
import { PriceInruppees } from '../utils/DisplayPriceinRuppes'
import { FaCaretRight } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import AddtoCart from './AddtoCart' // Import the AddtoCart component
import { priceWithDisCount } from '../utils/DisCountCunter' // Import discount utility

const DisplayCartItems = ({ close }) => {
  // Get context values with destructuring to prevent unnecessary re-renders
  const { notDiscountprice, totalPrice, isLoading } = useGlobalContext();
  
  // Use shallow equality check for cartItems
  const cartItems = useSelector((store) => store?.cart?.cart || []);
  
  // Memoize the savings calculation
  const savings = useMemo(() => {
    if (!notDiscountprice || !totalPrice) return 0;
    return notDiscountprice - totalPrice;
  }, [notDiscountprice, totalPrice]);

  // Memoize cart items to prevent unnecessary re-renders
  const memoizedCartItems = useMemo(() => {
    return Array.isArray(cartItems) ? cartItems : [];
  }, [cartItems]);

  // Memoize image error handler
  const handleImageError = useCallback((e, imageUrl) => {
    console.log('Image failed to load:', imageUrl);
    // Hide broken image or set placeholder
    e.target.style.display = 'none';
    // Alternative: set a placeholder image
    // e.target.src = '/placeholder-image.png';
  }, []);

  // Memoize close handler to prevent recreation
  const handleClose = useCallback(() => {
    if (close) close();
  }, [close]);

  // Show loading state if needed
  if (isLoading && memoizedCartItems.length === 0) {
    return (
      <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 opacity-80 flex items-center justify-center z-50'>
        <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto flex items-center justify-center'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto'></div>
            <p className='mt-2 text-gray-600'>Loading cart...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 opacity-95 flex items-center justify-center z-50'>
      <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-3 shadow-md'>
          <h1 className='font-semibold'>Cart ({memoizedCartItems.length})</h1>
          
          {/* Mobile close button */}
          <Link 
            to="/"
            onClick={handleClose}
            className='lg:hidden'
          >
            <IoClose size={25} />
          </Link>

          {/* Desktop close button */}
          <button 
            onClick={handleClose}
            className='hidden lg:block hover:bg-gray-100 rounded-full p-1 transition-colors'
          >
            <IoClose size={25} />
          </button>
        </div>

        {/* Content */}
        <div className='max-h-[75vh] lg:max-h-[calc(100vh-120px)] h-full min-h-[80vh] bg-blue-50 flex flex-col gap-4 p-2'>
          {/* Savings display - only show if there are savings */}
          {savings > 0 && (
            <div className='flex items-center p-2 bg-blue-200 text-blue-500 rounded-full px-4 py-2 justify-between'>
              <p>Your total savings</p>
              <p className='font-semibold'>{PriceInruppees(savings)}</p>
            </div>
          )}

          {/* Cart items container */}
          <div className='bg-white rounded-lg p-2 flex-1 overflow-auto'>
            {memoizedCartItems.length > 0 ? (
              <div className='space-y-3'>
                {memoizedCartItems.map((item, index) => {
                  // Safely get product data
                  const product = item?.productId;
                  const quantity = item?.quantity || 1;
                  
                  // Calculate discounted price
                  const originalPrice = product?.price || 0;
                  const discount = product?.discount || 0;
                  const discountedPrice = discount > 0 ? 
                    Number(priceWithDisCount(originalPrice, discount)) : 
                    (product?.sellingPrice || originalPrice);
                  
                  return (
                    <div 
                      key={`${product?._id || index}-${index}`} 
                      className='flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow'
                    >
                      {/* Image container */}
                      <div className='w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center'>
                        {product?.Image ? (
                          <img 
                            src={product.Image[0]} 
                            alt={product?.name || 'Product'}
                            className='w-full h-full object-cover'
                            onError={(e) => handleImageError(e, product.Image[0])}
                            loading="lazy"
                          />
                        ) : (
                          <div className='text-gray-400 text-xs text-center p-1'>
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Product details */}
                      <div className='flex-1 min-w-0'>
                        <h3 className='font-medium text-sm text-gray-900 truncate mb-1'>
                          {product?.name || 'Unknown Product'}
                        </h3>
                        
                        {/* Price section */}
                        <div className='flex items-center gap-2 mb-2'>
                          <span className='text-green-600 font-semibold text-sm'>
                            {PriceInruppees(discountedPrice)}
                          </span>
                          {discount > 0 && originalPrice > discountedPrice && (
                            <>
                              <span className='text-gray-500 line-through text-xs'>
                                {PriceInruppees(originalPrice)}
                              </span>
                              <span className='text-red-500 text-xs font-medium bg-red-50 px-2 py-1 rounded'>
                                {discount}% OFF
                              </span>
                            </>
                          )}
                        </div>
                        
                        {/* Quantity controls and total */}
                        <div className='flex items-center justify-between'>
                          <div className='flex-shrink-0'>
                            <AddtoCart data={product} />
                          </div>
                          {quantity > 1 && (
                            <div className='text-right'>
                              <p className='text-xs text-gray-500 mb-1'>
                                {quantity} × {PriceInruppees(discountedPrice)}
                              </p>
                              <p className='text-sm font-semibold text-gray-900'>
                                {PriceInruppees(discountedPrice * quantity)}
                              </p>
                              {discount > 0 && (
                                <p className='text-xs text-green-600'>
                                  Saved: {PriceInruppees((originalPrice - discountedPrice) * quantity)}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className='flex items-center justify-center h-full'>
                <div className='text-center text-gray-500'>
                  <div className='text-4xl mb-2'>🛒</div>
                  <p className='font-medium'>Your cart is empty</p>
                  <p className='text-sm mt-1'>Add some items to get started</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Checkout section - only show if there are items */}
        {memoizedCartItems.length > 0 && (
          <div className='p-2'>
            <div className='bg-green-600 text-white p-3 px-4 font-bold rounded flex justify-between items-center gap-4 hover:bg-green-700 transition-colors'>
              <div>
                <p className='text-sm opacity-90'>Total</p>
                <h3 className='text-lg'>{PriceInruppees(totalPrice || 0)}</h3>
              </div>
              <button className='flex items-center gap-1 cursor-pointer bg-opacity-20 px-4 py-2 rounded hover:bg-opacity-30 transition-all'>
                <span>Proceed</span>
                <FaCaretRight />
              </button>
            </div>
          </div>
        )}
      </div>  
    </section>
  );
};

// Wrap with React.memo to prevent unnecessary re-renders from parent
export default React.memo(DisplayCartItems);