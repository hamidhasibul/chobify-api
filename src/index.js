import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import "dotenv/config";

import { PORT } from "./utils/constants.js";
import { corsOptions } from "./configs/cors-options.js";
import routes from "./routes/index.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(routes);

// Test

app.get("/test", async (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Hello from the server-side!" });
});

app.listen(PORT, () => {
  console.log(`server initiated @http://localhost:${PORT}`);
});
