import mongoose from 'mongoose'

export const connectdb =  async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("mongodb connected");
    }
    catch(error){
        console.log(`mongodb connection faild ${error.message}`);
        throw error
    }
}