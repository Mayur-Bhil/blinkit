import mongoose from "mongoose";
import { useCallback } from "react";

const addressSchema = new mongoose.Schema({
    address_line:{
        type:String,
        default:""
    },
    city:{
        type:String,
        default:""
    },
    state:{
        type:String,
        default:""
    },
    pincode:{
        type:Number,
    },
    country:{
        type:String
    },
    mobile:{
        type:Number,
        default:null
    }
},{
    timestamps:true
})

const Address = mongoose.model('Address',addressSchema);
export default Address;