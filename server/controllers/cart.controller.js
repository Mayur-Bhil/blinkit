import cartProduct from "../models/cartProduct.model.js";
import User from "../models/user.model.js"


export const addtoCartController = async(req,res)=>{
 try {
    const userId = req.userId;
    const { productId } = req.body;
    if(!productId){
    return res.status(402).json({
        message:"Provide product Id",
        error:false,
        succes:true
    })
}

const cartItem = new cartProduct({
    quantity:1,
    userId:userId,
    productId:productId,
})

const save = await cartItem.save();

const updatecartUSer = await User.updateOne({_id:userId},{
    $push:{
        shopping_cart:productId  
    }
})

return res.json({
    data:save,
    message :"Item Added SuccessFully",
    error:false,
    success:true

})

} catch (error) {
    
        return res.status(500).json({
            message:error.message || error || "Something went wrong",
            error:true,
            success:false
        })
     }   


}