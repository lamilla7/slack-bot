const router = require("express").Router();

const slackBot = require("./slackbot");

router.use("/slack/bot", slackBot);

module.exports = router;
