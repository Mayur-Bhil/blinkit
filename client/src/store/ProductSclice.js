import { createSlice } from "@reduxjs/toolkit";
const innitialvalue = {
    allcategory:[],
    allSubcategory:[],
    product:[]
}
const productSclice = createSlice({
    name:"product",
    initialState:innitialvalue,
    reducers:{
        setAllCategory:(state,action)=>{
           
            
               state.allcategory = [...action.payload] 
        },
        setAllSubCategory:(state,action)=>{
            state.allSubcategory = [...action.payload]
        }
    }
})




export const  {setAllCategory,setAllSubCategory} = productSclice.actions;
export default productSclice.reducer;