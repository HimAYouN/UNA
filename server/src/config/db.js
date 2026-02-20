import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'
import { ApiError } from '../utils/ApiError.js';


const connectDB = async () => {
   try {
     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      console.log(" 👀  MongoDB Connected Successfully");
   } catch (error) {
        throw new ApiError(error)
   }
}

export default connectDB