import React from "react";
import logo1 from "../assets/logo1.png";
import Search from "./Search";
import { Link, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const Header = () => {

  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const redireactToLoginpage = () =>{
        navigate("/login")
  }

  return (
    <header className="h-24 lg:h-20 lg:shadow-md top-0 flex justify-center sticky flex-col gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-between">
          <div classname="h-full">
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
            <button className="text-neutral-800 lg:hidden">
              <FaRegUserCircle size={35} />
            </button>
            {/* DeskTop  vsersion */}
                <div className="hidden lg:flex lg:items-center lg:gap-2">
                    <button onClick={redireactToLoginpage}className="cursor-pointer">Login</button>
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
