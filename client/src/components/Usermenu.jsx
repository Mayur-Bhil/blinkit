import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Devider from './Devider';
import Axios from '../utils/useAxios';
import summeryApis from '../common/summuryApi';
import { logoutUser } from '../store/userSclice';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

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
        <div>
            <h2 className='font-semibold'>My Account</h2>
              <div className='flex justify-center items-center '>
                <div className='text-neutral-700 text-sm'>{user.name || user.mobile}</div>
                <img className='h-14 w-14 rounded-full' src={user.avatar || "user's Image"} alt="" />
              </div>
              <Devider/>
              <div className='sm grid gap-2'>
                    <Link className=' px-2 hover:bg-amber-300 rounded-xl' to={""}>My orders</Link>
                    <Link className=' px-2 hover:bg-amber-300 rounded-xl' to={""}>Save address</Link>
                    <button to={"/logout"} onClick={handelLogout} className='bg-red-400 text-lg hover:scale-90 rounded-xl text-center'>Logout    </button>
              </div>
        </div>
    );
};

export default Usermenu;