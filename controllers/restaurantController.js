import Restaurant from "../models/restaurantModel.js";

export const createRestaurantContoller = async (req, res) => {
  const {
    title,
    imageUrl,
    foods,
    time,
    pickup,
    delivery,
    isOpen,
    logoUrl,
    rating,
    ratingCount,
    code,
    coords,
  } = req.body;

  if (!title || !coords) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newRestaurant = new Restaurant({
    title,
    imageUrl,
    foods,
    time,
    pickup,
    delivery,
    isOpen,
    logoUrl,
    rating,
    ratingCount,
    code,
    coords,
  });
  await newRestaurant.save();
  res.status(200).json({ message: "Restaurant created successfully" });
};

export const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});

    if (!restaurants) {
      return res.status(404).json({ message: "No restaurants found" });
    }

    return res.status(200).json({
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).json({ message: "Please Provide restaurant id" });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "No restaurant found" });
    }

    return res.status(200).json({ restaurant });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteRestaurantContoller = async (req, res) => {
  try {
    const deleteRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if(!deleteRestaurant){
      return res.status(404).json({ message: "No restaurant found" });
    }
    return res
      .status(200)
      .json({ message: "Restaurant deleted successfully", deleteRestaurant });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  createRestaurantContoller,
  getAllRestaurantController,
  getAllRestaurantByIdController,
  deleteRestaurantContoller,
};
