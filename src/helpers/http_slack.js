const request = require("request");

const botResponse = (body) => {
  var url = "https://slack.com/api/chat.postMessage";
  var auth_token = process.env.BOT_TOKEN; //Your Bot's auth token
  var headers = {
    "Authorization": "Bearer " + auth_token,
    "Content-Type": "application/json",
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
    }
  );
};

exports.botResponse = botResponse;
