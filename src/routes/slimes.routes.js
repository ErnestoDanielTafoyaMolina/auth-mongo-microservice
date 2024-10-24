import { Router } from 'express';
import axios from 'axios';

const router = Router();

// Ruta para obtener Slimes
router.get('/slimes', async (req, res) => {
  try {
    const response = await axios.get('https://slime-rancher.vercel.app/api/slime');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching slimes:', error);
    res.status(500).json({ message: 'Error fetching slimes' });
  }
});

// Ruta para obtener Food (aquí deberías cambiar la URL por la API correcta si existe)
router.get('/food', async (req, res) => {
  try {
    const response = await axios.get('https://slime-rancher.vercel.app/api/food');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching food:', error);
    res.status(500).json({ message: 'Error fetching food' });
  }
});

export default router;
