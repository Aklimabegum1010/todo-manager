import {Router} from "express";
import {register} from '../controllers/authController.js';
import {validate} from '../../../middlewares/validateMiddleware.js';
import {registerSchema} from '../validations/authValidation.js';

export const authRoute = Router()
authRoute.post('/register', validate(registerSchema), register)