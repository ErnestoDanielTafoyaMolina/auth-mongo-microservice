import { verifyToken } from "../libs/jwt.lib.js";

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del header Authorization
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = verifyToken(token); // Validar el token
      req.user = decoded; // Guardar la información del usuario decodificada
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };