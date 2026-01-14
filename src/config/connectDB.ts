import mongoose from "mongoose";

export const connectDb = async () => {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("database connected");
}