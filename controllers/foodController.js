import Food from "../models/foodModel.js";

export const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      foodTags,
      category,
      imageUrl,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;

    if (!title || !description || !price || !restaurant) {
      res.status(200).json({ message: "All fields are required" });
    }

    const newFood = new Food({
      title,
      description,
      price,
      foodTags,
      category,
      imageUrl,
      code,
      isAvailable,
      restaurant,
      rating,
    });

    await newFood.save();
    res.status(201).json({ message: "Food created successfully", newFood });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllFoodController = async (req, res) => {
  try {
    const food = await Food.find({});
    if (!food) {
      return res.status(404).json({ message: "No food found" });
    }

    return res.status(200).json({ totalCount: food.length, food });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getFoodByIdController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).json({ message: "Please provide food id" });
    }
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: "No food found" });
    }

    return res.status(200).json({ food });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getFoodByRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).json({ message: "Please provide id" });
    }
    const food = await Food.find({ restaurant: restaurantId });
    if (!food) {
      return res.status(404).json({ message: "No food found" });
    }

    return res.status(200).json({ message: "food base on restaurant", food });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).json({ message: "Please provide food id" });
    }

    const food = await Food.findById(foodId);
    if (!food) {
        return res.status(404).json({ message: "No food found" });
    }

    const {
      title,
      description,
      price,
      foodTags,
      category,
      imageUrl,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;

    const updateFood = await Food.findByIdAndUpdate(foodId, req.body ,{ new: true });
   
    await updateFood.save()
    return res.status(200).json({ message: "Food updated successfully", food });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
    
  }
};

export const deleteFoodController =  async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).json({ message: "Please provide food id" });
        }
        const deleteFood = await Food.findByIdAndDelete(foodId)
        if (!deleteFood) {
            return res.status(404).json({ message: "No food found" });
            
        }
        return res.status(200).json({ message: "Food deleted successfully", deleteFood });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
        
    }
}

export default {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController
};
