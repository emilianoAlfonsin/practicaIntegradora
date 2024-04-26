import productModel from "../../models/product.model.js";

export default class ProductManager {
  constructor() {
    console.log("Constructor ProductManager");
  }
  
  getAll = async () => {
    try{
      const result = await productModel.find();
      return result;
    }
    catch(error){
      console.log("No se pudo obtener los productos", error);
    }
  };
  getById = async (id) => {
    try {
      const result = await productModel.findById(id);
      return result;
    } catch (error) {
      console.log("No se pudo obtener el producto", error);      
    }
  };

  createProduct = async (product) => {
    try {
      const result = await productModel.create(product);
      return result;
    } catch (error) {
      console.log("No se pudo crear el producto", error);
    }
  };

  updateProduct = async (id, productData) => {
    try {
      const result = await productModel.updateOne(
        { _id: id },
        { $set: productData }
      );
      return result;
    }
    catch (error) {
      console.log("No se pudo actualizar el producto", error);
    }
  };

  deleteProduct = async (id) => {
    try {
      const result = await productModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      console.log("No se pudo eliminar el producto", error);
    }
  };

  //buscar con categorias incluidas
  getAllProductsWithCategories = async () => {
    //lógica a implementar
    try {
      const result = await productModel.find().populate("category");
      return result;
    }
    catch (error) {
      console.log("No se pudo obtener los productos poblados",error);
    }
  };
  
  //paginate
  getPaginatedProducts = async (page = 1, limit = 10) => {
    //lógica a implementar
    try {
      const options = {
        page: parseInt(page),
        limit: parseInt(limit)
      };
      const result = await productModel.paginate({}, options);
      return result;
    }
    catch (error) {
      console.log("No se pudo obtener los productos paginados",error);
    }
  };
}
