import {ZodError} from 'zod';
import {ApiError} from '../utils/apiError.js';

export const validate = schema => (req, _res, next) => {
    try {
        const parsed = schema.parse({
            body: req.body
        })
        if ('body' in parsed) req.body = parsed.body
        next()
    } catch (error) {
        if (error instanceof ZodError) {
            const formattedErrors = error.errors.map(err => ({
                field: err.path.length ? err.path.join('.') : 'unknown',
                message: err.message
            }))
            return next(new ApiError(400, 'Validation failed', formattedErrors))
        }
        next(error)
    }
}

