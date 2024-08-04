import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv, { config } from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import foodRoutes from "./routes/foodRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

connectDB()

const port = process.env.PORT;

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/restaurant', restaurantRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/food', foodRoutes)
app.use('/api/v1/order', orderRoutes)

app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
