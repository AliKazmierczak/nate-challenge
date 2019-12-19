const express = require("express");
const app = express();
const port = 3000;
const pages = require("./routes/pages");
const cors = require("cors");

app.use(cors());

app.use("/", pages);

app.listen(port, () =>
  console.log(`Word counting app listening on port ${port}!`)
);
