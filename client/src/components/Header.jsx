import React, { useState } from "react";
import logo1 from "../assets/logo1.png";
import Search from "./Search";
import { Link, useLocation } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoTriangleDown ,GoTriangleUp } from "react-icons/go";
import Usermenu from "./Usermenu";

const Header = () => {

  const [isMobile] = useMobile();
  const [isUserMenuOpen,setUsermenuOpen] = useState(false)
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((store)=>store?.user)
  const redireactToLoginpage = () =>{
        navigate("/login")
  }

  const token = localStorage.getItem("accessToken")
  
const handleMobileClick = ()=>{
  if(!user._id || !token){
        navigate("/login")
    return;
  }else{
    navigate("/user")
  }
}
  return (
    <header className="h-24 z-12 select-none lg:h-20 lg:shadow-md top-0 flex justify-center sticky flex-col gap-1 bg-white lg:select-none ">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-between">
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                src={logo1}
                alt="logo"
                width={169}
                height={60}
                className="hidden lg:block"
              />
              <img
                src={logo1}
                alt="logo"
                width={102}
                height={60}
                className="lg:hidden rounded-lg"
              />
            </Link>
          </div>
          <div className="hidden lg:block">
            <Search />
          </div>
          <div className="">
            {/* Mobile version */}
            <button className="text-neutral-800 lg:hidden" onClick={handleMobileClick}>
                  <FaCircleUser size={34}/>
            </button>
            {/* DeskTop  vsersion */}
                <div className="hidden lg:flex lg:items-center lg:gap-2">
                  {
                    user?._id ? (
                        <div className="relative">
                            <div onClick={()=>setUsermenuOpen(prev => !prev)} className="flex select-none items-center gap-2 font-semibold cursor-pointer">
                                <p>Account</p>
                                {
                                  isUserMenuOpen?(
                                    
                                    <GoTriangleUp size={18} /> 
                                  ):(
                                    <GoTriangleDown size={18} />
                                  )
                                }
                                {
                                  isUserMenuOpen && <div className="absolute -right-3 top-13">
                                    <div className="bg-[#faeeee00] p-2 min-w-52 min-h-20 border rounded-lg lg:shadow-xl">
                                          <Usermenu/>
                                    </div>
                                  </div> 
                                }
                                
                            </div>
                        </div>
                    ):(
                        <div></div>
                    )
                  }
                    <button onClick={redireactToLoginpage}className="cursor-pointer font-semibold">

                      {
                        user._id ? "logout" : "login"
                      }
                    </button>
                    <button className="bg-green-500 flex items-center gap-2 px-2 py-3 rounded-lg ml-2 text-white hover:bg-green-800">
                        {/* add to cart */}
                        <div className="animate-bounce">
                            <BsCart4 size={20} />
                        </div>
                        <div>
                            <p>
                                My cart
                            </p>
                            {/* <p>
                                Total price
                            </p> */}
                        </div>
                    </button>
                </div>
            </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
