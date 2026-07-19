import z, {object} from "zod";
import {pagination, validation} from "../../../shared/constants.js";
import {priority_status, valid_todo_status} from "../../../shared/enums.js";



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


     //----------- get er kaj -----------//

export const getTodosQuerySchema = z.object({
    query: z.object({
        page: z.string()
            .optional()
            .transform(val => val !== undefined ? parseInt(val, 10) : 1)
            .pipe(z.number().int().min(pagination.default_page, 'page must be at least  1')),

        limit: z.string()
            .optional()
            .transform(val => val !== undefined ? parseInt(val, 10) : pagination.default_limit)
            .pipe(z.number().int().min(pagination.default_page).max(pagination.max_limit, `limit cannot exceed ${pagination.max_limit}`)),

        status: z.enum(valid_todo_status)
            .optional(),

        priority: z.enum(priority_status)
            .optional(),

        search: z.string()
            .trim()
            .max(100, 'search query cannot exceed 100 characters')
            .optional(),

        overdue: z.enum(['true', 'false'])
            .optional()
            .transform(val => val === 'true')
    })
})


//get todo with id //
export const getTodoParamSchema = z.object({
params: z.object({id: z.string({required_error: 'ID is required'})
        .trim()
        .regex(/^[a-f\d]{24}$/i, 'Invalid ID format')
})
})

