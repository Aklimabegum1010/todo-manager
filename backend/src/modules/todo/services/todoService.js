import {createTodoRepository} from "../repositories/todoRepository.js";

export const todoService = (todoRepository = createTodoRepository()) => {
    return{
        create: async (todoData) => {
            try {
              return await todoRepository.create(todoData)
            } catch (err) {
                console.error(err.message)

            }
        }
    }
}