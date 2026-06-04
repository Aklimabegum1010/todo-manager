import {createAuthRepository} from '../repositories/authRepository.js';

export const createAuthService = (userRepository = createAuthRepository()) => {
    return {
        register: async ({name, email, password}) => {
            const user = await userRepository.create({name, email, password})
            return {
                user
            }
        }
    }
}