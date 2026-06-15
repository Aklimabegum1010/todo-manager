import {Todo} from "../models/todoModel.js";

export const createTodoRepository = () => {
    return{
        create : async todoData => {
            try {
                const todo = await Todo.create(todoData)
                return{
                    todo
                }
            } catch (err) {
                console.error()

            }
        }
    }
}