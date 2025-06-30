import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const Search = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchPage,setisSearchPage] = useState(false);

    useEffect(()=>{
        const page = location.pathname === "/search"
        setisSearchPage(page)
    },[location])

    const redirectedToSearchPage = ()=>{
        navigate("/search")
    }

  return (
    <div className='search w-full border flex items-center p-1 overflow-hidden min-w-[300px] lg:min-w-[420px] h-12 rounded-lg text-neutral-500' >
        <button className='flex cursor-pointer justify-center items-center h-full p-3 text-neutral-600 bg-slate-50'>
            <FaSearch  size={20}  />
        </button>
        <div className='w-full'>
                {
                    !isSearchPage? (
                            <div onClick={redirectedToSearchPage}>
            <TypeAnimation
            sequence={[
                'Search "Milk"', // Types 'One'
                1000, // Waits 1s
                'Search "bread"', // Deletes 'One' and types 'Two'
                1000, // Waits 2s
                'Search "sugar"',
                3000,
                'Search "paneer"', // Types 'Three' without deleting 'Two'
                () => {
                console.log('Sequence completed');
                },
            ]}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                />
        </div>
                    ):(
                        // i ws on search page
                        <div className='w-full h-full'>
                            <input className='bg-transparent w-full h-full outline-none' autoFocus type="text" placeholder='search for atta dal and more' />
                        </div>
                    )
                }
        </div>
        
    </div>
  )
}

export default Search
