import { Outlet } from 'react-router-dom'
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast,{ Toaster } from "react-hot-toast"
import { useEffect } from 'react'
import getUserDetails from './utils/getUserDatails'
import { setUserDetails } from './store/userSclice'
import { useDispatch } from 'react-redux'
function App() {

  const dispatch = useDispatch();

  const fetchUser = async() =>{
      const Userdata = await getUserDetails();
      // console.log("data",Userdata.data.data);
      dispatch(setUserDetails(Userdata.data.data))
            
  }

  useEffect(()=>{
      fetchUser()
  },[])

  return (
    <>
    <Header/>
    <main className='min-h-[80vh] py-[0.1px] bg-sky-100'>
        <Outlet/>
    </main>
    <Footer/>
    <Toaster/>
    </>
  )
} 

export default App
