const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

async function main() {
  const app = express();

  app.use(bodyParser.json());
  app.use(router);

  router.use("/api/", require("../src/routes/index.js"));

  app.listen(process.env.PORT || 3000, async () => {
    console.log("Running in port: " + process.env.PORT);
  });
}

main();
