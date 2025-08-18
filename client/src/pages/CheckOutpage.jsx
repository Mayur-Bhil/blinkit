import React, { useMemo, useState } from 'react'
import { PriceInruppees } from '../utils/DisplayPriceinRuppes'
import { useGlobalContext } from '../provider/global.provider';
import { useSelector } from 'react-redux';
import AddressAdd from '../components/AddressAdd';
import Devider from "../components/Devider"

const CheckOutpage = () => {
  const { notDiscountprice, totalPrice, isLoading } = useGlobalContext();
  const cartItems = useSelector((store) => store?.cart?.cart || []);
  const [OpenAddress,setOpenAddress] = useState(false);
  const [selectedAddress,setSelectedAddress] = useState(0);
    const savings = useMemo(() => {
      if (!notDiscountprice || !totalPrice) return 0;
      return notDiscountprice - totalPrice;
    }, [notDiscountprice, totalPrice]);

  const memoizedCartItems = useMemo(() => {
    return Array.isArray(cartItems) ? cartItems : [];
  }, [cartItems]);
const address = useSelector((store)=>store?.address?.addressList);
console.log("Address",address );

  return (
      <section className='bg-blue-50 min-h-[80vh]'>
          <div className='container mx-auto p-4 flex w-full gap-4 justify-between lg:flex-row'>
                  <div  className='w-full cursor-pointer lg:flex-3 py-4 px-2'>
                      {/* address Part */}
                    <h3 className='text-lg font-semibold'>Coose Your address  </h3>
                      <div className='bg-white p-2 grid gap-3'>
                        {
                          address.map((address,index)=>{
                              return ( 
                                <label htmlFor={'address'+index}>

                              <div>
                              <div className='rounded p-3 flex gap-3 items-center border-1 hover:bg-zinc-50 cursor-pointer'>
                                  <div>
                                      <input type='radio'
                                      onChange={(e)=>setSelectedAddress(e.target.value)
                                      }
                                      className='cursor-pointer' value={index} id={'address'+index} name='address' />
                                    </div>
                              <div id='address' key={`${index}+"Address"`} className=' p-2'>
                                            <p>{address?.address_line}</p>
                                            <p>{address?.city}</p>
                                            <p>{address?.state}</p>
                                            <p>{address?.country} - {address?.pincode}</p>
                                            <p>{address?.mobile}</p>
                                    </div>
                              </div> 
                              <Devider/>
                              </div>
                          </label>
                              )
                          }) 
                        }
                      <div onClick={()=>setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex items-center justify-center'>
                          Add address
                    </div>
                    </div>
                    
                  </div>
                  <div className='w-full max-w-md lg:flex-2 py-4 px-2'>
                      {/* summary  Part */}
                      <h3 className='text-lg- font-semibold '>Summary</h3>
                      <div className='p-2 flex-shrink-0'>
                                  {/* Bill Details */}
                                  <div className='bg-white rounded-lg p-3 border border-gray-200 mb-3'>
                                    <h3 className='font-semibold text-gray-800 mb-3 text-sm'>Bill Details</h3>
                                    
                                    <div className='space-y-2 text-sm'>
                                      {/* Items Total */}
                                      <div className='flex justify-between items-center'>
                                        <span className='text-gray-600'>Items Total ({memoizedCartItems.reduce((sum, item) => sum + (item?.quantity || 1), 0)} items)</span>
                                        <span className='font-medium'>{PriceInruppees(totalPrice || 0)}</span>
                                      </div>
                                      
                                      {/* Delivery Charges */}
                                      <div className='flex justify-between items-center'>
                                        <span className='text-gray-600'>Delivery Charges</span>
                                        <span className={`font-medium ${(totalPrice || 0) >= 500 ? 'text-green-600' : 'text-gray-800'}`}>
                                          {(totalPrice || 0) >= 500 ? 'FREE' : PriceInruppees(40)}
                                        </span>
                                      </div>
                                      
                                      {/* Free delivery message */}
                                      {(totalPrice || 0) < 500 && (
                                        <p className='text-xs text-orange-600 bg-orange-50 p-2 rounded'>
                                          Add {PriceInruppees(500 - (totalPrice || 0))} more for FREE delivery
                                        </p>
                                      )}
                                      
                                      {/* Savings */}
                                      {savings > 0 && (
                                        <div className='flex justify-between items-center text-green-600'>
                                          <span>Total Savings</span>
                                          <span className='font-medium'>-{PriceInruppees(savings)}</span>
                                        </div>
                                      )}
                                      
                                      {/* Divider */}
                                      <hr className='border-gray-200 my-2' />
                                      
                                   
                                      <div className='flex justify-between items-center font-semibold text-base'>
                                        <span className='text-gray-800'>Grand Total</span>
                                        <span className='text-green-600'>{PriceInruppees((totalPrice || 0) + ((totalPrice || 0) >= 500 ? 0 : 40))}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                       <div className='w-full max-w-sm flex flex-col gap-4 items-center'>
                                              <button className='py-2 px-4 font-bold rounded text-green-500 cursor-pointer border-2 bg-white border-green-400 hover:bg-green-400 hover:text-white'>Online Payment</button>
                                              <button className='py-2 px-4 font-bold rounded text-green-500 cursor-pointer border-2 bg-white border-green-400 hover:bg-green-400 hover:text-white'>Cash on delivery</button>
                                        </div> 
                    </div>
          </div>
          {
            OpenAddress && (
                <AddressAdd close={()=>setOpenAddress(false)}/>
            )
          }
      </section>
  )
}

export default CheckOutpage