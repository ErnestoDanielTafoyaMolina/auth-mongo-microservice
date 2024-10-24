import jwt from 'jsonwebtoken';
import config from '../util/config.js';
export const generateToken = (user) => {
    const payload = {
      id: user._id,          // Usamos el ID del usuario
      username: user.username // Puedes incluir más datos si lo necesitas
    };
  
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' }); // Token válido por 1 hora
  };
  
  // Función para validar el token
  export const verifyToken = (token) => {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      throw new Error('Invalid token');
    }
};