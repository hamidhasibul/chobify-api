import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import "dotenv/config";
import { corsOptions } from "./configs/cors-options.js";

import { PORT } from "./utils/constants.js";

import errorHandler from "./middlewares/error-handler.middleware.js";

import routes from "./routes/index.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(routes);

// Test

app.get("/test", async (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Hello from the server-side!" });
});

app.all("*", (req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} in this server!`);
  error.success = false;
  error.statusCode = 404;

  next(error);
});

// Error Handler

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server initiated @http://localhost:${PORT}`);
});
