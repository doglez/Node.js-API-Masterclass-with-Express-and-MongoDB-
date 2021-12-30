import express from "express";
import dotenv from "dotenv";
import bootcampsRouter from "./routes/bootcampsRouter.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use("/api/v1/bootcamps", bootcampsRouter);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
  )
);
