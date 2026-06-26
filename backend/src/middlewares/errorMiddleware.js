import {http_status} from "../shared/constants.js";
import {env} from "../config/env.js";


export const errorMiddleware =(err, _req, res, _next) => {
let statusCode = err.statusCode || http_status.internal_server_error
    let message = err.message || 'internal server error'
    let errors = err.errors || []

    if (err.name === 'CastError') {
        statusCode = http_status.bed_request
        message = `invalid ${err.path} : ${err.value}`
    }
    if (err.code === 11000){
        statusCode = http_status.conflict
        const field = Object.keys(err.keyValue).join(', ')
        message = `duplicate value for ${field}`
    }
    if (err.name === 'ValidationError'){
        statusCode = http_status.bed_request
        errors = Object.values(err.errors).map(e => ({field: e.path, message: e.message}))
        message = 'Validation failed'
    }
    if (err.name === 'JsonWebTokenError') {
        statusCode = http_status.unauthorized
        message = 'invalid token'

    }
    if (err.name === 'TokenExpiredError') {
        statusCode = http_status.unauthorized
        message = 'token expired'

    }
    if (statusCode >= 500) {
        console.error({err}, message)

    }
    if (env.NODE_ENV === 'production' && statusCode === 500 && !err.isOperational) {
     message = 'internal server error'
    }
res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,
    ...(env.NODE_ENV === 'development' && {stack: err.stack})
})


}



















