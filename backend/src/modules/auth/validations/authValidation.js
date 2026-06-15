import {z} from 'zod';
import {validation} from '../../../shared/constants.js';




const  emailFiled = z.string()
        .trim()
        .min(1, 'Please provide an email') //empty email check
        .toLowerCase()
        .max(100, 'Email address is too long')
        .pipe(z.email('Please provide a valid email'))// email format validation


const passwordField = z.string()
    .min(validation.passwordMinLength, `Password must be at least ${validation.passwordMinLength} characters`)
    .max(120, `Password cannot exceed 120 characters`)
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')


export const registerSchema = z.object({
    body: z.object({
        name: z.string()
            .trim()
            .min(1, 'Name is required')
            .max(50, 'Name cannot exceed 50 characters'),
        email: emailFiled,
        password: passwordField
    })
})



export const loginSchema = z.object({
    body: z.object({
        email: emailFiled,
        password: passwordField
    })
})








