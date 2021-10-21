const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();

const allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  if (req.method === "OPTIONS") {
    res.send(200);
  } else {
    next();
  }
};

async function main() {
  const app = express();
  app.use(cors());
  app.use(allowCrossDomain);
  app.use(bodyParser.json());
  app.use(router);

  router.use("/", require("./src/routes/app"));
  router.use("/api/", require("./src/routes"));

  app.listen(process.env.PORT, async () => {
    console.log("Running in port: " + process.env.PORT);
  });
}

main();
