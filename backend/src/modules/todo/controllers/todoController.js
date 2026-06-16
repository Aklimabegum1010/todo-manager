import {asyncHandler} from "../../../utils/asyncHandler.js";
import {createTodoService} from "../services/todoService.js";
import {ApiResponse} from "../../../utils/apiResponse.js";
import {http_status} from "../../../shared/constants.js";


const todoService = createTodoService()


export const createTodo = asyncHandler(async (req, res) => {
const todo = await todoService.create(req.boby)

    new ApiResponse(http_status.created, todo, 'todo created successfully')
        .send(res)

})