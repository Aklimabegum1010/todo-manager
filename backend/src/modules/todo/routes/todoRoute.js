import {Router} from "express";
import {createTodoSchema} from "../validations/todoValidation.js";
import {validate} from "../../../middlewares/validateMiddleware.js";
import {createTodo} from "../controllers/todoController.js";

export const todoRoute = Router()
todoRoute.post('/create', validate(createTodoSchema), createTodo)