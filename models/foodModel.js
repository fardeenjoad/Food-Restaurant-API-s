import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'title is required'],
    },
    description:{
        type:String,
        required:[true, 'description is required'],
    },
    price:{
        type:Number,
        required:[true, 'price is required'],
    },
    imageUrl:{
        type:String,
        default:"https://th.bing.com/th?id=OIP._zHSsdDI6X5LnwpnBOMTswAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
    },
    foodTags:{
        type:String,
    },
    code:{
        type:String,
    },
    category:{
        type:String,
    },
    isAvailable:{
        type:Boolean,
        default:true,
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant'
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5
    },
    ratingCount:{
        type:Number,
    }
    
},{timestamps:true})
const Food = mongoose.model('Food', foodSchema);
export default Food;