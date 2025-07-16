import { createSlice } from "@reduxjs/toolkit";
const innitialvalue = {
    allcategory:[],
    subcategory:[],
    product:[]
}
const productSclice = createSlice({
    name:"product",
    initialState:innitialvalue,
    reducers:{
        setAllCategory:(state,action)=>{
           
            
               state.allcategory = [...action.payload] 
        }
    }
})




export const  {setAllCategory} = productSclice.actions;
export default productSclice.reducer;