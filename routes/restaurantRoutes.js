import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import {createRestaurantContoller,  deleteRestaurantContoller,  getAllRestaurantByIdController,  getAllRestaurantController } from "../controllers/restaurantController.js";

const router = express.Router();

router.post('/create', verifyToken, createRestaurantContoller)
router.get('/getAll', getAllRestaurantController)
router.get('/get/:id', getAllRestaurantByIdController)
router.delete('/delete/:id', verifyToken, deleteRestaurantContoller)

export default router;
