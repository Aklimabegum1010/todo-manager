import {http_status} from "../shared/constants.js";


const errorMiddleware =(err, _req, res, _next) => {
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
}



















