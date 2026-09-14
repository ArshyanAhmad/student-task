import mongoose from "mongoose";

const connectDB = async () => {
   try {
      const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
      console.log(
         "Database connected successfully",
         connectionInstance.connection.host[0],
      );
   } catch (error) {
      console.log("Database connection error", error.message);
      process.exit(1);
   }
};

export default connectDB;
