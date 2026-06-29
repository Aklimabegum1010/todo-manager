import {Router} from "express";
import {bulkCreateTodosSchema, createTodoSchema} from "../validations/todoValidation.js";
import {validate} from "../../../middlewares/validateMiddleware.js";
import {bulkCreateTodos, createTodo} from "../controllers/todoController.js";
import {protect} from "../../../middlewares/authMiddleware.js";

export const todoRoute = Router()
todoRoute.use(protect)

todoRoute.post('/create', validate(createTodoSchema), createTodo)
todoRoute.post('/bulk', validate(bulkCreateTodosSchema), bulkCreateTodos)