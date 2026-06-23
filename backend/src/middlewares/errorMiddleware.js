import {http_status} from "../shared/constants.js";


const errorMiddleware =(err, _req, res, _next) => {
let statusCode = err.statusCode || http_status.internal_server_error
    let message = err.message || 'internal server error'
    let errors = err.errors || []
}
















