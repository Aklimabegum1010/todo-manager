import {ApiError} from '../utils/apiError.js'
import {ApiResponse} from '../utils/apiResponse.js'

export const errorHandler = (err, _req, res, _next) => {
    if (err instanceof ApiError) {
        return new ApiResponse(err.statusCode, {errors: err.errors}, err.message).send(res)
    }

    console.error('Unexpected error:', err)
    return new ApiResponse(500, null, 'Internal server error').send(res)
}