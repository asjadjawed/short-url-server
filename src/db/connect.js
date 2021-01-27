import mongoose from "mongoose";
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.promise = global.Promise;

export const connectDB = async () => {
  const { DB_ADDRESS, DB_NAME, DB_USER, DB_PASS } = process.env;
  const url = `${DB_ADDRESS}${DB_NAME}`;

  return await mongoose.connect(url, {
    auth: {
      authSource: "admin",
    },
    user: DB_USER,
    pass: DB_PASS,
  });
};

export const disconnectDB = async () => {
  return mongoose.connection.close();
};
