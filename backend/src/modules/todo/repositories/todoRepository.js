// import {Todo} from "../models/todoModel.js";
//
// export const createTodoRepository = () => {
//     return{
//         create : async todoData => {
//             try {
//                 const todo = await Todo.create(todoData)
//                 return{
//                     todo
//                 }
//             } catch (err) {
//                 console.error()
//
//             }
//         }
//     }
// }



import {Todo} from "../models/todoModel.js";

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
}



