const express = require("express");
const { PORT } = require("./utils/constants");

const app = express();

app.listen(PORT, () => {
  console.log(`server initiated @http://localhost:${PORT}`);
});
