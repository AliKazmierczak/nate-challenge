const express = require("express");
const app = express();
const port = 3000;
const pages = require("./routes/pages");

app.use("/", pages);

app.listen(port, () =>
  console.log(`Word counting app listening on port ${port}!`)
);
