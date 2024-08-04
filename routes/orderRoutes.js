import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import {placeOrderController,  orderStatusController } from "../controllers/orderController.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";


const router = express.Router();

router.post('/place-order', verifyToken, placeOrderController)

router.post('/order-status/:id', verifyToken, adminMiddleware, orderStatusController)


export default router;
