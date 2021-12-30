import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bootcampsRouter from "./routes/bootcampsRouter.js";
import logger from "./middleware/logger.js";

dotenv.config({ path: "./.env" });

const app = express();

//Dev loggin middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", bootcampsRouter);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
  )
);
