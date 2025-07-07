import React, { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import UserProfileAvatarUpload from '../components/UserProfileAvatarUpload';

const Profile = () => {
    const user = useSelector((store)=>store.user);
    const [openProfileAvatarEdit,SetopenProfileAvatarEdit] =  useState(false);
    console.log(user);
    
    return (
        <div>
           <div className='w-14 h-14 bg-red-500 flex items-center justify-center rounded-full  overflow-hidden drop-shadow-2xl'>
                {
                    user.avatar ? ( 
                        <img src={user.avatar} alt={user.name} />
                    ) : (
                        <FaRegUserCircle size={50} />
                    )
                }
           </div>
           <button onClick={()=>SetopenProfileAvatarEdit(true)} className='text-sm border min-w-14 px-3 py-1 mt-4 border-amber-300 hover:bg-amber-200 rounded-full'>edit</button>
           {
                openProfileAvatarEdit && (
                    <UserProfileAvatarUpload close={()=>SetopenProfileAvatarEdit(false)}/>
                )
           }
        </div>
    );  
};

export default Profile;