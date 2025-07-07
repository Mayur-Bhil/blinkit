import React from 'react';
import Usermenu from '../components/Usermenu';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <section className='bg-white '>
                <div className='container mx-auto p-3 grid lg:grid-cols-[260px_minmax(0,1fr)]'>
                    
                        {/* left Side part */}
                        <div className='sticky top-24 p-4 overflow-y-auto hidden lg:block'>
                            <Usermenu/>
                        </div>
                        
                    {/* right side part */} 
                           <div className='bg-white p-4'>
                            <Outlet/>
                            </div>  
                    
                </div>
        </section>
    );
};

export default Dashboard;