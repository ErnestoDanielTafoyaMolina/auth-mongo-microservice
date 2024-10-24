import { Router } from "express";
import UserControllers from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/auth.js";
const router = Router();


router.route('/user')
    .get ( authMiddleware, UserControllers.getUser)
    .post( UserControllers.createUser )
    .put( authMiddleware,UserControllers.editUser )
    .delete( authMiddleware, UserControllers.deleteUser );

export default router;