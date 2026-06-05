import {ZodError} from 'zod';

export const validate = schema => (req, _res, next) => {
    try {
        const parsed = schema.parse({
            body: req.body
        })
        if ('body' in parsed) req.body = parsed.body
        next()
    } catch (error) {
        if (error instanceof ZodError) {
            error.errors.map(err => ({
                field: err.path.length ? err.path.join('.') : 'unknown',
                message: err.message
            }))
        }
    }
}


// postman a check korar jonno ei code


// import {ZodError} from 'zod';
//
// export const validate = schema => (req, res, next) => {
//     try {
//         const parsed = schema.parse({
//             body: req.body
//         })
//         if ('body' in parsed) req.body = parsed.body
//         next()
//     } catch (error) {
//         if (error instanceof ZodError) {
//             const errors=  error.issues.map(err => ({
//                 field: err.path.length ? err.path.join('.') : 'unknown',
//                 message: err.message
//             }))
//             return res.status(400).json({ errors })
//         }
//         next(error)
//     }
// }

