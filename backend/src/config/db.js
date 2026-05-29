import mongoose from 'mongoose'

export const connectdb =  async() => {
    if (mongoose.connection.readyState >= 1) return
    try {
        const connectionDb = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`mongodb connected ${connectionDb.connection.host}`);
    } catch (error) {
        console.error(`mongodb connection failed ${error.message}`)
        throw error
    }
}
