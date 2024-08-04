import User from "../models/userModel.js"

export const adminMiddleware = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.id);
        if(user.userType !== "admin"){
            return res.status(401).json({ message: "Unauthorized! Only Admin can Access " });
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Error in Admin Middleware" });
        
    }
}

export default adminMiddleware