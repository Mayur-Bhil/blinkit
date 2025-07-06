import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Devider from './Devider';

const Usermenu = () => {
    const user = useSelector((store)=>store.user)
    return (
        <div>
            <h2 className='font-semibold'>My Account</h2>
              <div className='flex justify-center items-center '>
                <div className='text-neutral-700 text-sm'>{user.name || user.mobile}</div>
                <img className='h-14 w-14 rounded-full' src={user.avatar || "user's Image"} alt="" />
              </div>
              <Devider/>
              <div className='sm grid gap-2'>
                    <Link to={""}>My orders</Link>
                    <Link to={""}>Save address</Link>
                    <Link className='bg-red-400 text-lg rounded-xl text-center'>Logout    </Link>
              </div>
        </div>
    );
};

export default Usermenu;