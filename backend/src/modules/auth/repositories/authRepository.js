// import {User} from "../models/userModel.js";
//
// export const createAuthRepository = () => {
//     return {
//         create: async (userData) => {
//             const user = await User.create(userData)
//             const {password, ...userWithoutPassword} = user.toObject()
//             return userWithoutPassword
//         },
//         findById: async id => {
//             return User.findById(id)
//         },
//         findByEmail: async  email => {
//             return User.findOne({email}).select('password').lean()
//         }
//     }
// }




import {User} from "../models/userModel.js";

export class UserRepository {
     constructor(model = User) {
        this.model = model
    }

    async findByEmail(email){
        return this.model.findOne({email}).select('+password')
    }
    async create(userData){
        return this.model.create(userData)
    }
    async findById(id, selectFields = '') {
         return this.model.findById(id).select(selectFields)
    }
}


