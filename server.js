import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/connectDB.js";
import bootcampsRouter from "./routes/bootcampsRouter.js";
import coursesRouter from "./routes/coursesRouter.js";
import fileUpload from "express-fileupload";
import path from "path";
import authRouter from "./routes/authRouter.js";

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

// File uploading
app.use(fileUpload());

// Set static folder
const __dirname = process.cwd();
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/v1/bootcamps", bootcampsRouter);
app.use("/api/v1/courses", coursesRouter);
app.use("/api/v1/auth", authRouter);

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
