
import {title_collation, Todo} from "../models/todoModel.js";

export class TodoRepository {
    constructor(model = Todo) {
        this.model = model
    }
    async create(todoData){
try {
    return await this.model.create(todoData)
}catch (error){
    if (error.code === 11000){
        throw new Error('duplicate title')
    }

}
    }


    async insertMany(todos) {
        return this.model.insertMany(todos, {ordered: false, collation:
            title_collation})
    }
}



