const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

async function main() {
  const app = express();
  app.use(bodyParser.json());
  app.use(router);

  router.use("/", require("./src/routes/app"));
  router.use("/api/", require("./src/routes"));

  app.listen(process.env.PORT, async () => {
    console.log("Running in port: " + process.env.PORT);
  });
}

main();
