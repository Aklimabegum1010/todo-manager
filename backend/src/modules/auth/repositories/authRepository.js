import {User} from '../models/userModel.js';

export const createAuthRepository = () => {
    return {
        create: async (userData) => {
            const user = await User.create(userData)
            const {password, ...userWithoutPassword} = user.toObject()
            return userWithoutPassword
        },
        findById: id => {
            return User.findById(id)
        }
    }
}