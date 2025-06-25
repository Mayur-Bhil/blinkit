import mongoose, { Mongoose } from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,

    },
    Image:{
        type:Array,
        default:[]
    },
    category:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Category"
        }
    ],
    sub_category:[{
        type:mongoose.Schema.ObjectId,
        ref:"subCategory"
    }],
    unit:{
        type:String,
        default:"",
    },
    stock:{
        type:Number,
        default:null
    },
    price:{
        type:Number,
        default:null
    },
    discount:{
        type:Number,
        default:null
    },
    desecription:{
        type:String,
        default:""
    },
    more_details:{
        type :Object,
        default:{}
    },
    publish:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

const product = mongoose.model("Product",productSchema);
export default product;