import express from "express";
import cors from "cors";
import jobRoutes from "./routes";
import { initStore } from "./store";
import { startWorker } from "./worker";

const app = express();

app.use(cors());
app.use(express.json());

initStore(); //initialisate the JSON file if it doesn't exist
startWorker(); //start the worker that will process jobs

app.use("/jobs", jobRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});