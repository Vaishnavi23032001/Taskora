import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
import { setServers } from "node:dns";

setServers(["8.8.8.8", "8.8.4.4"]);
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Taskora API running on port ${PORT}`);
  });
};

startServer();