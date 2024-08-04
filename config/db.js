import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Database Connected:${mongoose.connection.host}`);
    } catch (error) {
        console.log('failed', error);
    }
}

export default connectDB