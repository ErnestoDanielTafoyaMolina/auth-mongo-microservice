import { generateToken } from "../libs/jwt.lib.js";
import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
// Crear un nuevo usuario y devolver un token
const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verificar si ya existe un usuario con el mismo username o email
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hashear la contraseña antes de guardar
        const salt = await bcrypt.genSalt(10); // Generar un salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hashear la contraseña

        // Crear el nuevo usuario con la contraseña hasheada
        const user = new User({ username, email, password: hashedPassword });
        
        // Guardar el usuario en la base de datos
        await user.save(); 

        // Generar el token
        const token = generateToken(user); // Generar el token usando tu función

        return res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        console.error(error); // Mostrar el error en la consola para depuración
        return res.status(400).json({ message: 'Error creating user', error: error.message }); // Enviar un mensaje de error
    }
};
const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id, status: 'active' });
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error al obtener el usuario');
    }
};

const editUser = async (req, res) => {
    try {
        const userData = req.body;

        // Verificar si se proporciona una nueva contraseña
        if (userData.password) {
            // Hashear la nueva contraseña
            const salt = await bcrypt.genSalt(10); // Generar un salt
            const hashedPassword = await bcrypt.hash(userData.password, salt); // Hashear la nueva contraseña
            userData.password = hashedPassword; // Asignar la contraseña hasheada a userData
        }

        // Actualizar el usuario en la base de datos
        const user = await User.findByIdAndUpdate(req.user.id, userData, { new: true });
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }
        return res.status(200).send('Usuario actualizado');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error al actualizar el usuario');
    }
};


const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, { status: 'inactive' }, { new: true });
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }
        return res.status(200).send('Usuario eliminado');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Error al eliminar el usuario');
    }
};

export default {
    createUser,
    getUser,
    editUser,
    deleteUser
}

