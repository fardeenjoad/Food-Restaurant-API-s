import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import {
  createFoodController,
  deleteFoodController,
  getAllFoodController,
  getFoodByIdController,
  getFoodByRestaurantController,
  updateFoodController,
} from "../controllers/foodController.js";

const router = express.Router();

router.post("/create", verifyToken, createFoodController);
router.get("/getAll", getAllFoodController);
router.get("/get/:id", getFoodByIdController);
router.get("/getByRestaurant/:id", getFoodByRestaurantController);
router.put("/update/:id", verifyToken, updateFoodController);
router.delete('/delete:id', verifyToken, deleteFoodController)

export default router;
