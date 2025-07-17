import React, { useEffect, useState } from 'react';
import UploadSubCategory from '../components/UploadSubCategory';
import Axios from '../utils/useAxios';
import summeryApis from '../common/summuryApi';
import DisplayTable from '../components/DisplayTable';
import {createColumnHelper} from "@tanstack/react-table"
import ViewImage from '../components/ViewImage';
import { TiPen } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import EditSubCategoryModel from '../components/EditSubCategoryModel';
import AxiosToastError from '../utils/AxiosToastError';
const SubCategoryPage = () => {
    const [openSubcategory,setOpenSubcategory] = useState(false); 
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const columnHelper = createColumnHelper()
    const [getImageUrl,setImageUrl] = useState();
    const [openEdit,setOpenEdit] = useState(false); 
    const [editData,setEditData] = useState({
        _id:""
    })

    const fetchSubCategory = async () => {
        try {  
            setLoading(true) 
            const response = await Axios({
                ...summeryApis.getsubCategory
            })
            
            const {data : responseData} = response;

            if(responseData.success){
                setData(responseData.data)
                
            }
        } catch (error) {
            AxiosToastError(error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchSubCategory();
    },[])

    console.log("subctegory",data);
    
    const column = [
        columnHelper.accessor("name",{
            header:"Name",
        }),
        columnHelper.accessor("image",{
            header:"Image",
            cell:({row})=>{
                const image = row?.original?.image;
                const name = row?.original?.name;
                
                return <div className='flex justify-center items-center'>
                    <img
                    src={image}
                    alt={name}
                    className='w-10 h-10 mt-5 cursor-pointer'
                    onClick={()=>{
                        setImageUrl(image)
                    }}
                />
                </div>
            }
        }),
        columnHelper.accessor("category",{
            header:"Category",
            cell:({row})=>{
                return (
                    <>
                    {
                        row.original.category.map((c,index)=>{
                            return (
                                <p key={c._id+"table"}
                                className='shadow-xl px-1 inline-block'
                                >{c.name}</p>
                            )
                        })
                    }</>
                )
            }
        }),
        columnHelper.accessor("_id",{
            header:"Action",
            cell:({row})=>{
                return <div className='flex items-center justify-center gap-6'>
                        <button onClick={()=>{
                            setOpenEdit(true)
                            setEditData(row.original)
                        }} className='p-2 bg-green-200 rounded-full hover:text-green-700 cursor-pointer'><TiPen  size={20}/></button>
                        <button className='p-2 bg-red-200 rounded-full hover:text-red-500 cursor-pointer'><MdDelete size={20}/></button>
                </div>
            }
        })
    ]
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
        <div>
            {
                <DisplayTable
                     data={data}
                    column={column}
                />
            }
        </div>
        {
            openSubcategory && (
                <UploadSubCategory close={()=>setOpenSubcategory(false)}/>
            )
        }
        {   

            getImageUrl  &&    <ViewImage url={getImageUrl} close={()=>setImageUrl("")}/>
        }

        {
           openEdit &&     <EditSubCategoryModel data={editData } fetchData={fetchSubCategory} close={()=>setOpenEdit(false)}  />
        }
 </section>
      

    );
};

export default SubCategoryPage;