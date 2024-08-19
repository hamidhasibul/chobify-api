import express from "express";
import { PORT } from "./utils/constants.js";

const app = express();

app.listen(PORT, () => {
  console.log(`server initiated @http://localhost:${PORT}`);
});
