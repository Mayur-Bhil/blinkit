import Product from "../models/product.model.js"

export const CreateProductController = async(req,res)=>{
    try {
        const {
        name,
        image,
        category,
        subcategory,
        unit,
        stock,
        price,
        discount,
        description,
        more_details} = req.body;

        if(!name || !image[0] || !category[0] || !subcategory[0] || !unit || !price || !description){
            return res.status(400).json({
                message: "Enter Required Fields",
                error: true,
                success: false
            })
        }

        const product = new Product({
            name,
            image,
            category,
            subcategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details
        })

        const SaveProduct = await product.save();
        
        return res.json({
            message: "Product Created SuccessFully",
            data: SaveProduct ,
            error: false,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            success:false,
            message: error.message || error || "Something went wrong"
        })
    }
}