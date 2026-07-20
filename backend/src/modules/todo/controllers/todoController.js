import {asyncHandler} from "../../../utils/asyncHandler.js";
import {ApiResponse} from "../../../utils/apiResponse.js";
import {http_status} from "../../../shared/constants.js";
import {TodoService} from "../services/todoService.js";


const todoService = new TodoService()

export const createTodo = asyncHandler(async (req, res) => {
    const todo = await todoService.create(req.body, req.user?._id)
    new ApiResponse(http_status.created, todo, 'todo created successfully')
        .send(res)
})


export const bulkCreateTodos =asyncHandler(async (req, res ) => {
const todos = req.body?.todos || []
    const bulkTodo = await todoService.bulkCreate(todos, req.user?._id)
    new ApiResponse(http_status.created, bulkTodo, `${bulkTodo?.count || 0} todos created successfully`)
        .send(res)
})


export const getTodos = asyncHandler(async (req, res) => {
    const todo = await todoService.getAll(req.query || {} , req.user?.id)
    new ApiResponse(http_status.ok, todo, 'todo retrieved successfully').send(res)
})


export const getTodoById = asyncHandler(async (req,res) => {
const todo = await todoService.getById(req.params?.id, req.user?.id)
new ApiResponse(http_status.ok, todo, 'Todo retrieved successfully').send(res)
})


