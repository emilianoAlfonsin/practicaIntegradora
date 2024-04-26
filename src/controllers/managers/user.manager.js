import { createHash } from "../../utils.js";
import userModel from "../../models/user.model.js";

export default class UserManager {
  constructor() {
    console.log("Constructor UserManager");
  }

  getAll = async () => {
    const result = await userModel.find();
    return result;
  };

  getById = async (id) => {
    const result = await userModel.findById(id);
    return result;
  };

  createUser = async (userData) => {
    // Hashear la contraseña antes de crear el usuario
    try {
      userData.password = createHash(userData.password);
      const result = await userModel.create(userData);
      return result;
    } 
    catch (error) {
      console.log(error);      
    }
  };

  updateUser = async (id, userData) => {
    // Hashear la contraseña antes de actualizar el usuario
    try{
      if (userData.password) {
      userData.password = createHash(userData.password);
    }
      const result = await userModel.updateOne({ _id: id }, { $set: userData });
      return result;
    }
    catch (error) {
      console.log(error);
    }
  };

  deleteUser = async (id) => {
    try{
      const result = await userModel.deleteOne({ _id: id });
      return result;
    }
    catch (error) {
      console.log(error);
    }
  };

  // Buscar con carritos incluidos
  getAllUsersWithCart = async () => {
    //logica a implementar
    try{
      const result = await userModel.find().populate("cart.product");
      return result;
    }
    catch (error) {
      console.log(error);
    }
  };

  // Paginación
  getPaginatedUsers = async (page = 1, limit = 10) => {
   //logica a implementar
    try{
    const options = {
      page: parseInt(page),
      limit: parseInt(limit)
    };
    const result = await userModel.paginate({}, options);
    return result;
    }
    catch (error) {
    console.log(error);
    }
  };
}
