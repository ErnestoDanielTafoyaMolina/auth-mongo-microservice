import { Router } from "express";
import AuthControllers from '../controllers/auth.controllers.js'
const router = Router();

router.post('/login', AuthControllers.handleLogin );
router.post('/logout', AuthControllers.handleLogOut);

export default router;