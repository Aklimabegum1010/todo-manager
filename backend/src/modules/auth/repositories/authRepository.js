
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
   

