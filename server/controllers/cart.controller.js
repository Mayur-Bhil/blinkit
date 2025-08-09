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

const cheackItemCart = await cartProduct.findOne({
    userId:userId,
    productId:productId
})

if(cheackItemCart){
    return res.status(400).json({
        message:"Item Already In Cart"
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


export const getCartItemsController = async (req,res)=>{
    try {
        const userId = req.userId;
        const cartItem = await cartProduct.find({
            userId:userId
        }).populate("productId");

        return res.json({
            data:cartItem,
            success:true,
            error:false
        })
    } catch (error) {
            return res.status(400).json({
                message :error || error.message || "somthing Went wrong",
                error:true,
                success:false
            })
    }
}
