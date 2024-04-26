import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { faker } from '@faker-js/faker';
import userModel from "./models/user.model.js";

// Clave secreta para firmar el token JWT
const JWT_SECRET = "secret";

//hasheo de password
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//validar password
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

// Generar un token JWT
export const generateToken = (email) => {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    return token;
}


// Función para generar usuarios únicos
export const generateUniqueUsers = async (count) => {
    try {
        const users = [];
        for (let i = 0; i < count; i++) {
            const user = {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                age: faker.number.int({ min: 18, max: 65 }),
            };
            // Verificar si el correo electrónico ya existe en la base de datos
            const existingUser = await userModel.findOne({ email: user.email });
            if (!existingUser) {
                // Si el correo electrónico no existe, agregar el usuario a la lista
                users.push(user);
            } else {
                // Si el correo electrónico ya existe, decrementar el contador para volver a intentar
                i--;
            }
        }
        // Insertar los usuarios en la base de datos
        const result = await userModel.insertMany(users);
        return result;
    } catch (error) {
        console.error("Error al generar usuarios:", error);
        return null;
    }
};

// Función para generar productos aleatorios utilizando faker
export const generateRandomProduct = () => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.number.float({ min: 10, max: 100, multipleOf: 0.02 }),
        brand: faker.company.name(),
        model: faker.commerce.productAdjective(),
        colors: [faker.color.human(), faker.color.human(), faker.color.human()],
        sizes: faker.helpers.arrayElement([1, 2, 3, 4, 5], { min: 2, max: 4 }),
        images: [
            { color: faker.color.human(), url: faker.image.urlLoremFlickr() },
            { color: faker.color.human(), url: faker.image.urlLoremFlickr() },
            { color: faker.color.human(), url: faker.image.urlLoremFlickr() }
        ]
    };
};


export default __dirname;