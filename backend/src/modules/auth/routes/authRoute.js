import {Router} from 'express';
import {login, register} from '../controllers/authController.js';
import {validate} from "../../../middlewares/validateMiddleware.js";
import {loginSchema, registerSchema} from '../validations/authValidation.js';


export const authRoute = Router()

authRoute.post('/register', validate(registerSchema), register)
authRoute.post('/login', validate(loginSchema), login)


