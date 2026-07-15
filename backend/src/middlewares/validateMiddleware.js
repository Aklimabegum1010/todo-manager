import {ZodError} from 'zod';
import {ApiError} from '../utils/apiError.js';
import {http_status} from "../shared/constants.js";

export const validate = schema => async (req, _res, next) => {
    try {
        const parsed = await schema.parseAsync({
            body: req.body,
            query: req.query
        });
        // if ('body' in parsed) req.body = parsed.body

            ['body' , 'query'].forEach(key => {
            if (key in parsed) {
                Object.defineProperty(req, key, {
                    value: parsed[key],
                    writable: true,
                    configurable: true,
                    enumerable: true
                })
            }
        })


        next()
    } catch (error) {
        if (error instanceof ZodError) {
            const errors = error.issues.map(err => ({
                field: err.path.length ? err.path.join('.') : 'unknown',
                message: err.message
            }))
            return next(new ApiError(http_status.bad_request, 'Validation failed', errors))
        }
        next(error)
    }
}

