import {http_status} from "../shared/constants.js";
import {env} from "../config/env.js";


export const errorMiddleware =(err, _req, res, _next) => {
let statusCode = err.statusCode || http_status.internal_server_error
    let message = err.message || 'internal server error'
    let errors = err.errors || []



    // MongoDB তে invalid ID দিলে এই error আসে
    // যেমন: /user/abc123xyz — এটা valid ObjectId না
    // Response: invalid _id : abc123xyz

    if (err.name === 'CastError') {
        statusCode = http_status.bed_request
        message = `invalid ${err.path} : ${err.value}`
    }


    // Database এ unique field এ same value দিলে আসে
    // যেমন: একই email দিয়ে দুইবার register করলে

    if (err.code === 11000){
        statusCode = http_status.conflict
        const field = Object.keys(err.keyValue).join(', ')
        message = `duplicate value for ${field}`
    }


    // Mongoose schema validation fail হলে আসে
    // যেমন: required field missing, wrong type ইত্যাদি

    if (err.name === 'ValidationError'){
        statusCode = http_status.bed_request
        errors = Object.values(err.errors).map(e => ({field: e.path, message: e.message}))
        message = 'Validation failed'
    }




    // JsonWebTokenError → Token tampered/invalid হলে
    // TokenExpiredError → Token এর time শেষ হয়ে গেলে

    if (err.name === 'JsonWebTokenError') {
        statusCode = http_status.unauthorized
        message = 'invalid token'

    }
    if (err.name === 'TokenExpiredError') {
        statusCode = http_status.unauthorized
        message = 'token expired'

    }


    // 500+ মানে server এর নিজের সমস্যা
    // এগুলো server এর console এ log করা হয় debugging এর জন্য
    // 400 level errors log করা হয় না — ওগুলো client এর ভুল

    if (statusCode >= 500) {
        console.error({err}, message)

    }



    // Production এ sensitive error details hide করা হয়
    // isOperational: false মানে unexpected/unknown error
    // Client কে শুধু generic message দেখানো হয় — security এর জন্য

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



















