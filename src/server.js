import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import { connectDB, disconnectDB } from "./db/connection.js";

dotenv.config(); // setting up env variables (check README.md)

// connecting to database
connectDB()
  .then(() => console.log("Connected to DB"))
  .catch((err) => {
    console.error(err);
    process.exit(1); // exiting on connection error
  });

// setting up middleware
const app = express();
if (process.env.NODE_ENV === "development") app.use(morgan("tiny")); // setting up logger for dev env
app.use(cors()); // to handle cors for decoupled fe-be connection
app.use(helmet()); // security against common attack patterns
app.use(express.json()); // we don't need body-parser package anymore (built-in with express)

const server = app.listen(process.env.PORT, () =>
  console.log(`Server running on port: ${process.env.PORT}`)
);

/*
 * Handle graceful shutdown of server
 * This is done manually here, 3rd party packages like terminus can be used
 * https://www.npmjs.com/package/@godaddy/terminus
 */

// Connection logging - uncomment if needed
// setInterval(
//   () =>
//     server.getConnections((err, connections) =>
//       console.log(`${connections} connections currently open`)
//     ),
//   1000
// );

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);

let connections = [];

server.on("connection", (connection) => {
  connections.push(connection);
  connection.on(
    "close",
    () => (connections = connections.filter((curr) => curr !== connection))
  );
});

async function shutDown() {
  console.log("Received kill signal, shutting down gracefully");

  await disconnectDB()
    .then(() => console.log("DB connection closed"))
    .catch(console.error);

  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);
  connections.forEach((curr) => curr.end());
  setTimeout(() => connections.forEach((curr) => curr.destroy()), 5000);
}
