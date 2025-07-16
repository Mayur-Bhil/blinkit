import subCategory from "../models/subCategory.model.js";

export const addSubCategoryController = async(req,res)=>{
    try {
        const {name,image,category } = req.body;
        if(!name || !image || !category[0]){
            return res.status(400).json({
                message:"Provide Name ,image and categoty",
                error:true,
                success:false
            })
        }

        const payload = {
            name,
            image,
            category
        }

        const createSubctegory = new subCategory(payload);
        const save = await createSubctegory.save();


        return res.status(200).json({
            message:"Sub Category Created successFully",
            data:save,
            error:false,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}