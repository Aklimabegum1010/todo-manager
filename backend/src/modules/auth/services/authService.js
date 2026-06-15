import {createAuthRepository} from '../repositories/authRepository.js';
import {generateAccessToken, generateRefreshToken} from "../../../utils/jwt.js";
import bcrypt from "bcryptjs";


export const createAuthService = (userRepository = createAuthRepository()) => {

const generateTokenPair = async (userId) => {
const accessToken = generateAccessToken(userId)
    const refreshToken = generateRefreshToken()
    return{
    accessToken,
        refreshToken
    }
}

    return {
        register: async ({name, email, password}) => {
            const user = await userRepository.create({name, email, password})
            const tokens = await generateTokenPair(user._id)
            return {
                user,
                ...tokens
            }
        },
        login: async ({email, password}) => {
            const user = await userRepository.findByEmail(email)
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch){
                console.error('invalid email or password')

            }
            const {password: _, ...userWithOutPassword} = user
            const tokens = await generateTokenPair(user._id)
            return{
                user: userWithOutPassword,
                ...tokens
            }
        }
    }
}

