import Product from "../models/product.model.js"

export const CreateProductController = async(req,res)=>{
    try {
        console.log(req.body)
        const {
        name,
        Image,
        category,
        sub_category,
        unit,
        stock,
        price,
        discount,
        desecription,
        more_details} = req.body;
        
        console.log("Images:", Image); // Debug Images
        console.log("Subcategories:", sub_category);

        if(!name || !Image?.length || !category?.length || !sub_category?.length || !unit || !price || !desecription){
        return res.status(400).json({
            message: "Enter Required Fields",
            error: true,
            success: false
        })
    }

        const product = new Product({
            name,
            Image,
            category,
            sub_category,
            unit,
            stock,
            price,
            discount,
            desecription,
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