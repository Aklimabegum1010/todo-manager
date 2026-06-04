import {Router} from "express";
import {authRoute} from "../modules/auth/routes/authRoute.js";


export const router = Router()

router.use('/auth', authRoute)