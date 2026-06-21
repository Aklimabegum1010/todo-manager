// import {createTodoRepository} from "../repositories/todoRepository.js";
//
// export const createTodoService = (todoRepository = createTodoRepository()) => {
//     return{
//         create: async (todoData) => {
//             try {
//               return await todoRepository.create(todoData)
//             } catch (err) {
//                 console.error(err.message)
//
//             }
//         }
//     }
// }


import {TodoRepository} from "../repositories/todoRepository.js";
import {ApiError} from "../../../utils/apiError.js";
import {http_status} from "../../../shared/constants.js";

export class TodoService {
    constructor(repository = new TodoRepository()) {
        this.todoRepository = repository
    }
    async create(todoData) {
        try {
            return await this.todoRepository.create({...todoData})
        } catch (error) {
           if (error.message === 'duplicate title') {
               throw new ApiError(http_status.conflict, 'title already exists')
           }
           throw error
        }
    }
}

