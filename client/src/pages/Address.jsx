import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Devider from '../components/Devider';
import AddressAdd from '../components/AddressAdd';
import { MdDelete, MdEditDocument } from "react-icons/md";

const Address = () => {
    const address = useSelector((store)=>store?.address.addressList);
    const [addressOpen,setAddressOpen] = useState(false);
    console.log("Address page",address );
    return (
        <div className='bg-white p-2 grid gap-3'>
                            <div className='bg-white px-2 py-2 flex justify-between gap-2 items-center shadow-md font-semibold '>
                                <h2>Address</h2>
                                <button 
                                onClick={()=>setAddressOpen(true)}
                                className='bg-white text-amber-200 px-3 py-3 border border-amber-300 rounded-full cursor-pointer hover:text-black hover:bg-amber-200'>
                                    Add address
                                </button>
                            </div>
                        {
                          address.map((address,index)=>{
                              return ( 
                              <div>
                              <div className='rounded p-3 flex gap-3 items-center  border-1 hover:bg-zinc-50 cursor-pointer'>
                                  
                              <div id='address' key={`${index}+"Address"`} className='w-full  p-2'>
                                            
                                            <p>{address?.address_line}</p>
                                            <p>{address?.city}</p>
                                            <p>{address?.state}</p>
                                            <p>{address?.country} - {address?.pincode}</p>
                                            <p>{address?.mobile}</p>
                                         
                                    </div>
                                    <div className='m-2'>
                                      <MdDelete size={25} />
                                      <MdEditDocument size={25} />
                                    </div>
                              </div> 
                              <Devider/>
                              </div>
                          
                              )
                          }) 
                        }
                      <div onClick={()=>setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex items-center justify-center'>
                          Add address
                    </div>
                    {
                        addressOpen && (
                            <AddressAdd close={()=>setAddressOpen(false)}/>
                        )
                    }
                    </div>
    );
};

export default Address;  