import mongoose from "mongoose";

const connectDB = async (uri) => {
  try {
    console.log(uri);

    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    // process.exit(1); // Exit the application if the DB connection fails
  }
};

export default connectDB;
