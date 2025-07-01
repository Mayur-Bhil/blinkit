import React, { useState } from 'react'
import { data } from 'react-router-dom';

const Register = () => {

    const [data,setData] = useState({
        name: "",
        email :"",
        password:"",
        confirmpassword:""
    });
    const handelChange = (e) =>{
        const {name,value} = e.target;
        setData((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        })

    }
  return (
    <section className="w-full container flex justify-center mx-auto px-2 ">
            <div className='bg-white my-4 w-full max-w-lg rounded p-4'>
                    <p>Welcome to Blinkit</p>
                    <form action="" className='grid gap-2 mt-5'>
                        <div className='grid gap-1' >
                            <label htmlFor="name">Name :</label>
                            <input 
                            id='name'
                            type="text"
                            autoFocus
                            className='bg-blue-50 p-1 border rounded-sm'
                            value={data.name}
                            onChange={handelChange}
                            name='name'
                            />
                        </div>
                    </form>
            </div>
    </section>
  )
}

export default Register
