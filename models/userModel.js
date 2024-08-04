import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, 'userName is required']
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'password is required']
    },
    address:{
        type:Array,
    },
    phone:{
        type:Number,
        required:[true, 'phone number is required']
    },
    userType:{
        type:String,
        required:[true, 'user type is required'],
        default:'client',
        enum:['client', 'admin', 'vendor', 'driver']
    },
    profile:{
        type:String,
        default:'https://th.bing.com/th/id/OIP.MTyBxxrbXBfE353ZBTFN5AHaHa?w=210&h=209&c=7&r=0&o=5&dpr=1.5&pid=1.7'
    },
    answer:{
        type:String,
        required:[true, 'answer is required']
    }
},{timestamps:true})

const User = mongoose.model('User', userSchema);
export default User;