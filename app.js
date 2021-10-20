const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.post("/", (req, res) => {
  console.log("req.body: ", req.body);
  res.status(200).send(req.body);
});

app.listen(process.env.PORT || 3000);
