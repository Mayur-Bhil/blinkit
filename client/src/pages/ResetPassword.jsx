import React from 'react'
import { useLocation } from 'react-router-dom'

const ResetPassword = () => {


    const location  = useLocation();
    console.log("location",location);
    
  return (
    <div>
        reset Password
    </div>
  )
}

export default ResetPassword
