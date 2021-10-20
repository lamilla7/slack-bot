const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.post("/", (req, res) => {
  res.status(200).send(req.body.challenge);
});

app.listen(process.env.PORT || 3000);
