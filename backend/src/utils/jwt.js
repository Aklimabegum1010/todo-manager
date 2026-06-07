import jwt from 'jsonwebtoken'
import {env} from "../config/env.js";




export const generateAccessToken = (userId) => {
    return jwt.sign({id: userId}, env.JWT_ACCESS_SECRET)
}
export const verifyAccessToken = token => {
    return jwt.verify(token, env.JWT_ACCESS_SECRET)
}