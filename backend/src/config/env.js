
import z from  'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    PORT: z.coerce.number().int().min(1).max(65535).default(5000),
    MONGODB_URI: z.string().min(1, 'Mongodb uri is required'),
    JWT_ACCESS_SECRET: z.string().min(10, 'jwt access secret must be at least 10 characters'),
    JWT_REFRESH_SECRET: z.string().min(10, 'jwt refresh secret must be at least 10 characters')
})
const parsed = envSchema.safeParse(process.env)
export const env = Object.freeze(parsed.data)