import React from 'react';
import Devider from '../components/Devider';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../utils/useAxios';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { logoutUser } from '../store/userSclice';
import summeryApis from '../common/summuryApi';
import { IoCloseSharp } from 'react-icons/io5';
import { LuLink } from 'react-icons/lu';

const UserMobileMenupage = () => {
    const user = useSelector((store)=>store.user);
    const navigate = useNavigate();
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
                        navigate("/")
                        
                        
                }
            } catch (error) {
                    AxiosToastError(error)
            }
    }
    return (
        <section className='bg-white relative h-full w-full rounded-lg'>
            <button onClick={()=>window.history.back()} className=' block absolute ml-auto right-2 py-4'>
                <IoCloseSharp size={20} />
            </button>
            <div className='container mx-auto p-3 h-full w-full py-12'>
                <h2 className='font-semibold'>My Account</h2>
                              <div className='flex items-center '>
                                <span>{user.name || user.mobile}</span>
                                                    <Link to={'/dashboard/profile'} className='hover:text-amber-300'>
                                                        <LuLink size={12} />
                                                    </Link>
                              </div>
                              <Devider/>
                              <div className='sm grid gap-2'>
                                    <Link className=' px-2 hover:bg-amber-300 rounded-xl' to={""}>My orders</Link>
                                    <Link className=' px-2 hover:bg-amber-300 rounded-xl' to={""}>Save address</Link>
                                    <button  onClick={handelLogout} className='bg-red-400 text-white text-lg hover:scale-90 rounded-xl text-center'>Logout    </button>
                              </div>
            </div>
        </section>
    );
};

export default UserMobileMenupage;