import express from "express";
import { deleteUserController, getUserController, resetPasswordController, updatePasswordController, updateUserController } from "../controllers/userController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/getuser",verifyToken, getUserController);
router.put("/updateuser", verifyToken, updateUserController)
router.post('/updatePassword', verifyToken, updatePasswordController)
router.post('/resetPassword', verifyToken, resetPasswordController)
router.delete('/deleteUser/:id', verifyToken, deleteUserController)

export default router;
