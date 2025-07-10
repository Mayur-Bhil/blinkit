import Category from "../models/category.model.js"


export const UploadCategoryController = async(req,res)=>{
    try {
        const {name,image} = req.body;
        if(!name || !image){
            return res.status(400).json({
                message:"Enter Required fields",
                error:true,
                success:false
            })
        }

        const AddTocategory = new Category({
            name,
            image
        })
        const saveCategory = await AddTocategory.save();
        

        if(!saveCategory){
            return res.status(400).json({
                message: "not created Category",
                error:true,
                success:false
            })
        }

        return res.json({
            message:"added Category",
            data:saveCategory,
            success:true,
            error:false
        })
    } catch (error) {
       res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
       })
    }
}


export const getCategoryController = async (req,res)=>{
    try {
        const data = await Category.find();

        return res.json({
            data: data,
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

export const updateCategoryController = async (req,res)=>{
    try {
        const { categoryId,name,image } = req.body;
        const update = await Category.updateOne({
            _id:categoryId,
        },{
            name,
            image
        })
        return res.json({
            message: "Updated category",
            data: update,
            error: false,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            message: "Something went wrong",
            error:true,
            success:false
        })
    }
}