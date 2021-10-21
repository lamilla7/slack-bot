const request = require("request");
const axios = require("axios");

const botResponse = async (body) => {
  var url = "https://slack.com/api/chat.postMessage";
  var auth_token = process.env.BOT_TOKEN;
  var headers = {
    "Authorization": "Bearer " + auth_token,
    "Content-Type": "application/json",
  };

  var resp = true;

  let promise = new Promise((resolve, reject) => {
    axios
      .post(url, body, {
        headers: headers,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        console.log("err: ", err);
        reject(err);
      });
  });

  let result = await promise;
  if (!result.data.ok) resp = false;

  return resp;
};

exports.botResponse = botResponse;
