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
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import reviewsRouter from "./routes/reviewsRouter.js";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";

dotenv.config({ path: "./.env" });

// Connecto to DB
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

//Dev loggin middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileUpload());

// Sanitize data Prevent NoSQL Injection & Sanitize Data
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

// Set security header with helmet
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
const __dirname = process.cwd();
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/v1/bootcamps", bootcampsRouter);
app.use("/api/v1/courses", coursesRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewsRouter);

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
