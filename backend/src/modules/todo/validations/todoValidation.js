import z from "zod";
import {validation} from "../../../shared/constants.js";
import {valid_todo_status} from "../../../shared/enums.js";



const todoItemSchema = z.object({
    title: z.string()
        .trim()
        .min(1, 'title is required')
        .max(validation.title_max_Length, `title cannot be exceed 
          ${validation.title_max_Length} characters`),


    description: z.string()
        .trim()
        .min(1, 'description is required')
        .max(validation.description_max_Length, `description cannot be exceed 
          ${validation.description_max_Length} characters`),


    status:z.enum(valid_todo_status, {
        message:`status must be one of ${valid_todo_status.join(', ')}`
    })
        .optional()
})
export const createTodoSchema = z.object({
    body: todoItemSchema
})



export const bulkCreateTodosSchema = z.object({
    body: z.object({
        todos: z.array(todoItemSchema)
            .min(1, 'todos array cannot be empty')
            .max(validation.bulk_create_max, `cannot create more then
             ${validation.bulk_create_max} todos at once`)
    })
})

