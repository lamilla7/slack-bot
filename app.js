const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("hello world");
  res.status(200).json({ message: "hello world" });
});

app.listen(process.env.PORT || 3000);
