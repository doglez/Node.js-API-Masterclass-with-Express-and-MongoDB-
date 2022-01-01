import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/connectDB.js";
import bootcampsRouter from "./routes/bootcampsRouter.js";

dotenv.config({ path: "./.env" });

// Connecto to DB
connectDB();

const app = express();

// Body parser
app.use(express.json());

//Dev loggin middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", bootcampsRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
      .yellow.bold
  )
);

// Handle unhandle promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.bgRed);
  server.close(() => process.exit(1));
});
