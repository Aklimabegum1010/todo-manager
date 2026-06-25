import {asyncHandler} from "../../../utils/asyncHandler.js";

import {ApiResponse} from "../../../utils/apiResponse.js";
import {http_status} from "../../../shared/constants.js";
import {TodoService} from "../services/todoService.js";


const todoService = new TodoService()

export const createTodo = asyncHandler(async (req, res) => {
    const todo = await todoService.create(req.body)
    new ApiResponse(http_status.created, todo, 'todo created successfully')
        .send(res)
})