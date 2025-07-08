import React, { useState } from 'react';
import UploadCategoryModel from '../components/UploadCategoryModel';

const CategoryPage = () => {
    const [openUploadcategoty,setOpenUploadCategory] = useState(false);
    return (
        
        <section>
            <div className='p-2 bg-white shadow-xl flex items-center justify-between rounded-sm'>
                    <h2 className='font-semibold'>Category</h2>
                    <button onClick={()=>setOpenUploadCategory(true)} className='text-sm cursor-pointer  border-amber-400 hover:border-amber-300 hover:bg-amber-300 px-3 py-2 rounded'>Add category</button>
            </div>
            {
                openUploadcategoty && (
                    <UploadCategoryModel close={()=>setOpenUploadCategory(false)}/>
                )
            }
        </section>
    );
};

export default CategoryPage;