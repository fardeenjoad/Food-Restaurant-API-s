import Category from "../models/categoryModel.js";

export const createCategoryContoller = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCategory = new Category({
      title,
      imageUrl,
    });

    await newCategory.save();

    res
      .status(201)
      .json({ message: "Category created successfully", newCategory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllCatProduct = async (req, res) => {
  try {
    const category = await Category.find({});

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ totalCount: category.length, category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateCatController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updateCategory = await Category.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );

    if (!updateCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res
      .status(200)
      .json({ message: "Category updated successfully", updateCategory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteCatController = async (req, res) => {
  try {
    const deleteCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deleteCategory) {
      return res
        .status(404)
        .json({ message: "Category not found & please provide category id" });
    }

    res
      .status(200)
      .json({ message: "Category deleted successfully", deleteCategory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  createCategoryContoller,
  getAllCatProduct,
  updateCatController,
  deleteCatController,
};
