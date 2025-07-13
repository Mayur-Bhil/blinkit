import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Devider from './Devider';
import Axios from '../utils/useAxios';
import summeryApis from '../common/summuryApi';
import { logoutUser } from '../store/userSclice';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { LuLink } from "react-icons/lu";
import isAdmin from '../utils/isAdmin';

const Usermenu = () => {
    const user = useSelector((store)=>store.user);
    const dispatch = useDispatch();

    const handelLogout = async()=>{
            try {
                const res = await Axios({
                    ...summeryApis.logout
                })
                if(res.data.success){
                        dispatch(logoutUser())
                        localStorage.clear()
                        toast.success(res.data.message)
                }
            } catch (error) {
                    AxiosToastError(error)
            }
    }
    return (
        <div className='backdrop-blur-[8px] p-2 bg-gradient-to-br from-white/10 to-white/5  border-white/20 shadow-xl rounded-2xl'>
            <h2 className='font-semibold'>My Account</h2>
              <div className='flex justify-center items-center'>
                <div className='text-neutral-700 text-sm flex items-center'>
                    <span>{user.name || user.mobile}</span>
                    <Link to={'/dashboard/profile'} className='hover:text-blue-800 m-2'>
                        <LuLink size={12} />
                    </Link>
                    {isAdmin(user.role) && (
                        <span className='text-[13px] text-cyan-500'>[{ user.role }]</span>
                    )}
                    </div>
                <img className='h-14 w-18 rounded-full ml-2' src={user.avatar || "user's Image"} alt={user.name} />
              </div>
              <Devider/>
              <div className='sm grid gap-2 transition'>
                    {
                        isAdmin(user.role) && (
                            <>
                            <Link className=' px-2 hover:bg-amber-300 rounded-xl' to={"/dashboard/category"}>Category </Link>
                            <Link className=' px-2 hover:bg-amber-300 rounded-xl' to={"/dashboard/upload-products"}>upload Product</Link>
                            <Link className=' px-2 hover:bg-amber-300 rounded-xl' to={"/dashboard/sub-category"}>sub Category </Link>
                            <Link className=' px-2 hover:bg-amber-300 rounded-xl' to={"/dashboard/upload-products"}>Product</Link>

                                
                            </>

                        )
                    }
                    <Link className=' px-2 hover:bg-amber-300 rounded-xl' to={"/dashboard/myorders"}>My orders</Link>

                    <Link className=' px-2 hover:bg-amber-300 rounded-xl' to={"/dashboard/address"}>Save address</Link>
                    <button onClick={handelLogout} className='bg-red-400 cursor-pointer  text-lg transition-all hover:scale-90 rounded-xl text-center'>Logout    </button>
              </div>
        </div>
    );
};

export default Usermenu;