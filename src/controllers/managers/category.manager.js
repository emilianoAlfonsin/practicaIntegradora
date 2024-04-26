import Category from "../../models/category.model.js";

export default class CategoryManager {
  constructor() {
    console.log("Constructor CategoryManager");
  }

  getAll = async () => {
    try {
      const result = await Category.find();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  getById = async (id) => {
    try {
      const result = await Category.findById(id);
      return result;
    }
    catch (error) {
      console.log(error);
    }
  };

  createCategory = async (category) => {
    try {
      const result = await Category.create(category);
      return result;
    }
    catch (error) {
      console.log(error);
    }
  };

  updateCategory = async (id, categoryData) => {
    try {
      const result = await Category.updateOne(
        { _id: id },
        { $set: categoryData }
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  deleteCategory = async (id) => {
    try {
      const category = await Category.findById(id);
      if (!category) {
        throw new Error("Category not found");
      }
    }
    catch (error) {
      console.log(error);
    }
  };
}
