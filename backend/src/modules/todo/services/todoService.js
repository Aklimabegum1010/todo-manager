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

export class TodoService {
    constructor(repository = new TodoRepository()) {
    }
}

