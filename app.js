const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.json());

app.post("/", (req, res) => {
  console.log("req.body: ", req.body);

  var url = "https://slack.com/api/chat.postMessage";
  var auth_token = process.env.BOT_TOKEN; //Your Bot's auth token
  var headers = {
    "Authorization": "Bearer " + auth_token,
    "Content-Type": "application/json",
  };

  console.log(auth_token);

  var body = {
    channel: req.body.event.channel, // Slack user or channel, where you want to send the message
    text: "Your text goes here.",
  };

  request.post(
    {
      url: url,
      headers: headers,
      body: JSON.stringify(body),
    },
    (err, response, body) => {
      if (err) {
        reject(err);
      }
      console.log("response: ", JSON.stringify(response));
      console.log("body: ", body);
    }
  );

  res.status(200).send({code: 'success', message: 'bot responded successfully'});
});

app.listen(process.env.PORT || 3000);
