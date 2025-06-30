import React from 'react'
import logo1 from "../assets/logo1.png"
import Search from './Search'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='h-20 shadow-md sticky top-0 '>
        <div className='container mx-auto flex items-center h-full px-2 justify-between'>
           <div classname="h-full">
            <Link to={"/"} className='h-full flex justify-center items-center'>   
                <img src={logo1} 
                alt="logo"
                width={169}
                height={60}
                className='hidden lg:block'
                />
                <img src={logo1} 
                alt="logo"
                width={102} 
                height={60}
                className='lg:hidden'
                />
            </Link>
        </div>
        <div>
            <Search/>
        </div>
        <div>
            cart
        </div>
    </div>
    </header>
  )
}

export default Header
