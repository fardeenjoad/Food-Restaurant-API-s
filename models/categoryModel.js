import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'title is required'],
    },
    imageUrl:{
        type:String,
        default:"https://th.bing.com/th?id=OIP.A1ALUKWUgANtYHLDlNtvbAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
    }
    
},{timestamps:true})
const Category = mongoose.model('Category', categorySchema);
export default Category;