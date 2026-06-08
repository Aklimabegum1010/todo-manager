import {createAuthRepository} from '../repositories/authRepository.js';
import {generateAccessToken} from "../../../utils/jwt.js";





export const createAuthService = (userRepository = createAuthRepository()) => {


const generateTokenPair = async (userId) => {
const accessToken = generateAccessToken(userId)
    return{
    accessToken
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
        }
    }
}

