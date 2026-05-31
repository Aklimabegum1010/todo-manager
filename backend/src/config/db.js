import mongoose from 'mongoose'
import {env} from "./env.js";

export const connectdb =  async() => {
    if (mongoose.connection.readyState >= 1) return
    try {
        const connectionDb = await mongoose.connect(env.MONGODB_URI);

        console.log(`mongodb connected ${connectionDb.connection.host}`);
    } catch (error) {
        console.error(`mongodb connection failed ${error.message}`)
        throw error
    }
}
