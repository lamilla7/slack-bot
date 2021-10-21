const http_nhtsa = require("../helpers/http_nhtsa");
const http_slack = require("../helpers/http_slack");

const ProcessBotResponse = async (req, res) => {
  try {
    let payload = req.body;

    let responseText =
      "Sorry, I didn't understand what you said, can we try it again?";
    let vin = "";
    let make = "";
    let model = "";
    let year = "";
    let fuelType = "";

    msgText = payload.event.text.toLowerCase();

    if (payload.event.type === "message" && msgText != "") {
      if (msgText.search(/\bhello\b/) >= 0 || msgText.search(/\bhi\b/) >= 0) {
        responseText = "Hey there! How are you doing? :wave:";
      } else if (
        msgText.includes("fine") ||
        msgText.includes("you") ||
        msgText.includes("well")
      ) {
        responseText = "That's great :+1:  what can I do for you?";
      } else if (
        msgText.includes("vehicle") ||
        msgText.includes("nhtsa") ||
        msgText.includes("data")
      ) {
        responseText =
          "Please provide vehicle data (VIN, Make, Model, Year or Fuel Type)";
      } else {
        makeArray = msgText.match(/toyota|honda|nissan/); //this would have to be a list, maybe the list from NHTSA or a database and not hardcoded
        if (makeArray != null && makeArray.length > 1) {
          responseText = "Please provide just one Make";
        } else if (makeArray != null && makeArray.length === 1) {
          make = makeArray[0];
        }

        modelArray = msgText.match(/camry|civic|sentra/); //this would have to be a list, maybe the list from NHTSA or a database and not hardcoded
        if (modelArray != null && modelArray.length > 1) {
          responseText = "Please provide just one Model";
        } else if (modelArray != null && modelArray.length === 1) {
          model = modelArray[0];
        }

        fuelTypeArray = msgText.match(/regular|premium/); //this would have to be a list from a database and not hardcoded
        if (fuelTypeArray != null && fuelTypeArray.length > 1) {
          responseText = "Please provide just one Fuel Type";
        } else if (fuelTypeArray != null && fuelTypeArray.length === 1) {
          fuelType = fuelTypeArray[0];
        }

        yearArray = msgText.match(
          /2010|2011|2013|2014|2015|2016|2017|2018|2019|2020|2021/ // this would have to be also a dynamic list based on a definition
        );
        if (yearArray != null && yearArray.length > 1) {
          responseText = "Please provide just one Fuel Type";
        } else if (yearArray != null && yearArray.length === 1) {
          year = yearArray[0];
        }

        arrMessage = msgText.split(" ");
        for (i = 0; i < arrMessage.length; i++) {
          wordArray = arrMessage[i].split(",");
          for (j = 0; j < wordArray.length; j++) {
            vinArray = wordArray[j].toUpperCase().match(/^[^OIQ]{15}$/);
            if (vinArray != null && vinArray.length >= 0) {
              vin = vinArray[0].toUpperCase();
            }
          }
        }

        if (year == "" || vin == "") {
          responseText =
            "Please provide at least VIN and Year to proceed. VIN must be 15 alphanumeric characters without O, I and Q letters :warning:";
        } else {
          responseText =
            "_*Here you have the specifications of the vehicle*_ :information_source:\n";

          let vehicleData = await http_nhtsa.getDecodedVIN(vin, year);
          objVehicleData = JSON.parse(JSON.stringify(vehicleData)).Results;
          responseText +=
            objVehicleData[0].Variable + ": " + objVehicleData[0].Value;

          for (let i = 0; i < objVehicleData.length; i++) {
            value = "";
            if (objVehicleData[i].Value != null) {
              value = objVehicleData[i].Value;
            }
            responseText += objVehicleData[i].Variable + ": " + value + "\n";
          }
        }
      }
    }

    console.log("responseText: ", responseText);

    var body = {
      channel: req.body.event.channel, // Slack user or channel, where you want to send the message
      text: responseText,
    };

    http_slack.botResponse(body);

    res
      .status(200)
      .send({ code: "success", message: "bot responded successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ code: "error", message: "an error occurred" });
  }
};

module.exports = {
  ProcessBotResponse,
};
