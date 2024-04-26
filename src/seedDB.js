// import mongoose from "mongoose";
import UserModel from "./models/user.model.js";
import ProductModel from "./models/product.model.js";
import CategoryModel from "./models/category.model.js";
import {generateUniqueUsers, generateRandomProduct} from "./utils.js";
import dbConnection from "./config/db.config.js";

// Conexión a la base de datos
dbConnection()


// Definir las categorías a insertar
const categoriesToInsert = [
  {
    name: "Electrónicos",
    description: "Productos electrónicos de última generación",
  },
  {
    name: "Ropa",
    description: "Prendas de vestir para todas las edades",
  },
  {
    name: "Hogar",
    description: "Artículos para el hogar y decoración",
  },
  {
    name: "Deportes",
    description: "Equipamiento deportivo para diferentes actividades",
  },
  {
    name: "Juguetes",
    description: "Juguetes y juegos para niños y niñas",
  },
];

// Insertar las categorías en la base de datos
// CategoryModel.insertMany(categoriesToInsert)
//   .then((categories) => {
//     console.log("Categorías insertadas exitosamente:", categories);
//   })
//   .catch((error) => {
//     console.error("Error al insertar categorías:", error);
//   });


// Función para cargar usuarios
const loadUsers = async () => {
  try {
    // Generar 10 usuarios únicos
    const users = await generateUniqueUsers(10);
    // Guardar los usuarios en la base de datos
    const savedUsers = await UserModel.insertMany(users);
    console.log("Usuarios cargados exitosamente:", savedUsers);
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }
};

// Función para cargar productos

const loadProducts = async () => {
  try {
    const categories = await CategoryModel.find(); // Busca todas las categorías existentes
    console.log(categories);
    for (let i = 0; i < 30; i++) {
      const productData = generateRandomProduct();
      const randomCategory = categories[Math.floor(Math.random() * categories.length)]; // Selecciona aleatoriamente una categoría
      productData.category = randomCategory._id; // Asigna el ID de la categoría al producto
      const newProduct = new ProductModel(productData);
      await newProduct.save();
    }
    console.log("Productos cargados exitosamente.");
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};


// Ejecutar funciones para cargar usuarios y productos
// loadUsers();
loadProducts();
