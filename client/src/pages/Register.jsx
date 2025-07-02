import React, { useState } from 'react'
import { data } from 'react-router-dom';
import { IoEyeOff ,IoEye} from "react-icons/io5";

const Register = () => {

    const [data,setData] = useState({
        name: "",
        email :"",
        password:"",
        confirmpassword:""
    });

    const [showPassword,setShowpassword] = useState(false);
    const [showconfirmpassword,setShowConfirmPassword] = useState(false);

    const handelChange = (e) =>{
        const {name,value} = e.target;
        setData((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        })

    }
    const validateData = Object.values(data).every(el => el)
    
  return (
    <section className="w-full container flex justify-center mx-auto px-2 ">
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-4'>
                    <p>Welcome to Blinkit</p>
                    <form action="" className='grid gap-2 mt-5'>
                        <div className='grid gap-1' >
                            <label htmlFor="name">Name :</label>
                            <input 
                            id='name'
                            type="text"
                            autoFocus
                            className='bg-blue-50 p-1 border-2 outline-none rounded-sm focus:border-amber-300 font-semibold '
                            value={data.name}
                            onChange={handelChange}
                            name='name'
                            placeholder='Enter name'
                            />

                        </div>
                        <div className='grid gap-1' >
                            <label htmlFor="email">Email :</label>
                            <input 
                            id='email'
                            type="email"
                            className='bg-blue-50 p-1 outline-none border-2 rounded-sm focus:border-amber-300 font-semibold'
                            value={data.email}
                            onChange={handelChange}
                            name='email'
                            placeholder='Enter Email'
                            />
                        </div>
                        <div className='grid gap-1' >
                            <label htmlFor="password">password :</label>
                            <div className='bg-blue-50 p-1 border-2 rounded-sm flex items-center justify-between focus-within:border-amber-300 font-semibold'>
                                <input 
                            id='password'
                            type={showPassword ? "text" : "password"}
                            autoFocus
                            className='w-full outline-none'
                            value={data.password}
                            onChange={handelChange}
                            name='password'
                            placeholder='******'
                            />
                            <div className='cursor-pointer mx-2' onClick={()=>setShowpassword(prev=> !prev)}>
                                {
                                    showPassword ?(
                                        <IoEye />
                                    ):(
                                        <IoEyeOff />
                                    )
                                }
                            </div>
                            </div>

                        </div>
                         <div className='grid gap-1' >
                            <label htmlFor="confirmpassword">Confirm Your password :</label>
                            <div className='bg-blue-50 p-1 border-2 rounded-sm flex items-center justify-between focus-within:border-amber-300 '>
                                <input 
                            id='confirmpassword'
                            type={showconfirmpassword ? "text" : "password"}
                            autoFocus
                            className='w-full outline-none'
                            value={data.confirmpassword}
                            onChange={handelChange}
                            name='confirmpassword'
                            placeholder='******'
                            />
                            <div className='cursor-pointer mx-2' onClick={()=>setShowConfirmPassword(prev=> !prev)}>
                                {
                                    showconfirmpassword ?(
                                        <IoEye />
                                    ):(
                                        <IoEyeOff />
                                    )
                                }
                            </div>
                            </div>

                        </div>
                        <button className={`${validateData?"bg-green-400":"bg-gray-500"} text-white tracking-wide py-2 rounded-lg font-semibold`}>Register</button>
                    </form>
            </div>
    </section>
  )
}

export default Register
