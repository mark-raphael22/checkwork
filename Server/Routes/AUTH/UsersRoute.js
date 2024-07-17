import express from "express";
import { forgotPasswordController, passwordRequiredController } from "../../Controller/UsersCrud/User.PostController.js";

 
import auth from "../../Authentication/UserAuth.js"

import {
    register,
    login,
} from '../../Controller/Auth/UserSign.js' 

const router = express.Router()

import {
    changePasswordRequiredController,
    changePasswordController
} from "../../Controller/UsersCrud/User.putController.js"


router.post('/register', register);
router.post('/login', login);  



router.post('/forgot-password', forgotPasswordController, passwordRequiredController);
router.put("/change-password", auth, changePasswordController, changePasswordRequiredController);

export default router 