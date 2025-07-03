import { Outlet } from 'react-router-dom'
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast,{ Toaster } from "react-hot-toast"
function App() {

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
