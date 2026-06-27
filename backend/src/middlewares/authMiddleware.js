import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {http_status} from "../shared/constants.js";

export const protect = asyncHandler(async (req, _res, next) => {
const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(http_status.unauthorized, 'not authorized and no token provided')

    }

    next()
})