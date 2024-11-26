import mongoose from "mongoose";

const uri = "mongodb://172.30.55.119:27017";

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
