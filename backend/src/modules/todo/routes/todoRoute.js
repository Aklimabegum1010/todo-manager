import {Router} from "express";
import {
    bulkCreateTodosSchema,
    createTodoSchema,
    getTodoParamSchema,
    getTodosQuerySchema, updateTodoSchema
} from "../validations/todoValidation.js";
import {validate} from "../../../middlewares/validateMiddleware.js";
import {
    bulkCreateTodos,
    createTodo, deleteAllTodos,
    deleteTodo,
    getTodoById,
    getTodos,
    updateTodo
} from "../controllers/todoController.js";
import {protect} from "../../../middlewares/authMiddleware.js";

export const todoRoute = Router()
todoRoute.use(protect)

todoRoute.post('/create', validate(createTodoSchema), createTodo)
todoRoute.post('/bulk', validate(bulkCreateTodosSchema), bulkCreateTodos)
todoRoute.get('/getTodos', validate(getTodosQuerySchema), getTodos)
todoRoute.get('/getTodos/:id', validate(getTodoParamSchema), getTodoById)
todoRoute.put('/updateTodos/:id', validate(updateTodoSchema), updateTodo)
todoRoute.patch('/updateTodos/:id', validate(updateTodoSchema), updateTodo)
todoRoute.delete('/deleteTodo/:id', validate(getTodoParamSchema), deleteTodo)
todoRoute.delete('/deleteAll', deleteAllTodos)