import mongoose from "mongoose";

export const connectDB = async () => {
  const { DB_CONNECTION } = process.env;
  const url = DB_CONNECTION;
  return await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

export const disconnectDB = async () => {
  return mongoose.connection.close();
};
