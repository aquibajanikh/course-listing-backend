const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const mongoose = require("mongoose");
const PORT = 3001;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello!</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
