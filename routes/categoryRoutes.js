import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import {
  createCategoryContoller,
  deleteCatController,
  getAllCatProduct,
  updateCatController,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/create", verifyToken, createCategoryContoller);
router.get("/getAll", getAllCatProduct);
router.put("/update/:id", verifyToken, updateCatController);
router.delete("/delete/:id", verifyToken, deleteCatController);

export default router;
