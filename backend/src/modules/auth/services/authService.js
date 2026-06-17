// import {createAuthRepository} from '../repositories/authRepository.js';
// import {generateAccessToken, generateRefreshToken} from "../../../utils/jwt.js";
// import bcrypt from "bcryptjs";
//
//
// export const createAuthService = (userRepository = createAuthRepository()) => {
//
// const generateTokenPair = async (userId) => {
// const accessToken = generateAccessToken(userId)
//     const refreshToken = generateRefreshToken()
//     return{
//     accessToken,
//         refreshToken
//     }
// }
//
//     return {
//         register: async ({name, email, password}) => {
//             const user = await userRepository.create({name, email, password})
//             const tokens = await generateTokenPair(user._id)
//             return {
//                 user,
//                 ...tokens
//             }
//         },
//         login: async ({email, password}) => {
//             const user = await userRepository.findByEmail(email)
//             const isMatch = await bcrypt.compare(password, user.password)
//             if (!isMatch){
//                 console.error('invalid email or password')
//
//             }
//             const {password: _, ...userWithOutPassword} = user
//             const tokens = await generateTokenPair(user._id)
//             return{
//                 user: userWithOutPassword,
//                 ...tokens
//             }
//         }
//     }
// }

import {UserRepository} from "../repositories/authRepository.js";
import {ApiError} from "../../../utils/apiError.js";
import {http_status} from "../../../shared/constants.js";
import {generateAccessToken, generateRefreshToken} from "../../../utils/jwt.js";

export class AuthService {
    #userRepository
    constructor(userRepo = new UserRepository()) {
        this.#userRepository = userRepo
    }

async #generateTokenPair(userId) {
if (!userId){
    throw new Error('userId is required for token generation')
}
const accessToken = generateAccessToken(userId)
const refreshToken = generateRefreshToken(userId)
    return{
        accessToken, refreshToken
    }
}


async register({name, email, password}) {
const existingUser = await this.#userRepository.findByEmail(email)
    if (existingUser){
throw new ApiError(http_status.conflict, 'user email already exists')
    }
    const user = await this.#userRepository.create({name, email, password})
    const tokens = await this.#generateTokenPair(user._id)
    return {
        user,
        ...tokens
    }
}

}


