const router = require("express").Router();

const slackBot = require("../routes/slackBot");

router.use("/slack/bot", slackBot);

module.exports = router;
