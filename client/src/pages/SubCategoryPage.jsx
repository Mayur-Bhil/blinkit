import React, { useState } from 'react';
import UploadSubCategory from '../components/UploadSubCategory';

const SubCategoryPage = () => {
    const [openSubcategory,setOpenSubcategory] = useState(false); 
    return (
        <section>
     <div className="p-2 bg-white shadow-xl flex items-center justify-between rounded-sm">
            <h2 className="font-semibold">Sub Category</h2>
            <button
            onClick={() => setOpenSubcategory(true)}
            className="text-sm cursor-pointer border-amber-400 hover:border-amber-300 hover:bg-amber-300 px-3 py-2 rounded"
            
            >
            Add Sub Category
            </button>
        </div>
        {
            openSubcategory && (
                <UploadSubCategory close={()=>setOpenSubcategory(false)}/>
            )
        }
 </section>
      

    );
};

export default SubCategoryPage;