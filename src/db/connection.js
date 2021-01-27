import mongoose from "mongoose";

export const connectDB = async () => {
  const { DB_CONNECTION } = process.env;
  console.log(DB_CONNECTION);
  const url = DB_CONNECTION;
  return await mongoose.connect(url);
};

export const disconnectDB = async () => {
  return mongoose.connection.close();
};
