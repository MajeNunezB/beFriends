const path = require("path");
const express = require("express");

const PORT = 8000;

var app = express();

app.use(express.json());

app.get("/hello", (req, res) => {
  res.status(200).json({ message: "this is the beginning yeah!!" });
});
app.listen(PORT, function () {
  console.info("🌍 Listening on port " + PORT);
});
