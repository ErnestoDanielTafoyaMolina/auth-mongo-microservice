import bcrypt from 'bcryptjs';
import { generateToken } from "../libs/jwt.lib.js";
import { User } from "../models/user.model.js";
const handleLogin = async (req, res) => {
    try {
        // Obtén el username y la contraseña del cuerpo de la solicitud
        const { email, password } = req.body;

        // Verifica si el usuario existe y está activo
        const user = await User.findOne({ email, status: 'active' });
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found or inactive.' });
        }

        // Compara la contraseña proporcionada con la almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password.' });
        }

        // Genera un token JWT con el ID del usuario
        const token = generateToken(user._id);

        // Devuelve el token al cliente
        return res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Error during login' });
    }
};

const handleLogOut = async (req, res) => { 
    return res.status(200).json("logout success")
}

export default {
    handleLogOut,
    handleLogin
}