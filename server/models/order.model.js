import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    orderId:{
        type:String,
        required:[true,"Provide orderId"],
        unique:true
    },
    
})