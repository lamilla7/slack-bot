const express = require("express");

const slackBotRouter = express.Router();

const slackBotController = require("../controllers/slackBot");

slackBotRouter.post("/", slackBotController.ProcessBotResponse);

module.exports = slackBotRouter;
