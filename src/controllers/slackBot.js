const http_nhtsa = require("../helpers/http_nhtsa");
const http_slack = require("../helpers/http_slack");

const ProcessBotResponse = async (req, res) => {
  try {
    let payload = req.body;

    let responseText = "";
    let vin = "";
    let make = "";
    let model = "";
    let year = "";
    let fuelType = "";

    msgText = payload.event.text.toLowerCase();

    if (payload.event.bot_id == undefined) {
      if (payload.event.type === "message" && msgText != "") {
        if (msgText.search(/\bhello\b/) >= 0 || msgText.search(/\bhi\b/) >= 0) {
          responseText = "Hey there! How are you doing? :wave:";
        } else if (
          msgText.includes("fine") ||
          msgText.includes("ok") ||
          msgText.includes("well")
        ) {
          responseText = "That's great :+1: what can I do for you?";
        } else if (
          msgText.includes("bad") ||
          msgText.includes("sad") ||
          msgText.includes("mad")
        ) {
          responseText = "That's sad :slightly_frowning_face: cheer up :raised_hands: what can I do for you?";
        } else if (
          msgText.includes("vehicle") ||
          msgText.includes("nhtsa") ||
          msgText.includes("info") ||
          msgText.includes("data")
        ) {
          responseText =
            "Please provide vehicle data (VIN, Make, Model, Year or Fuel Type)";
        } else {
          //read and validate make
          makeArray = msgText.match(/toyota|honda|nissan/); //this would have to be dynamic, maybe the list from NHTSA or a database
          if (makeArray != null && makeArray.length > 1) {
            responseText = "Please provide just one Make";
          } else if (makeArray != null && makeArray.length === 1) {
            make = makeArray[0];
          }
  
          //read and validate model
          modelArray = msgText.match(/camry|civic|sentra/); //this would have to be dynamic, maybe the list from NHTSA or a database
          if (modelArray != null && modelArray.length > 1) {
            responseText = "Please provide just one Model";
          } else if (modelArray != null && modelArray.length === 1) {
            model = modelArray[0];
          }
  
          //read and validate fuel type
          fuelTypeArray = msgText.match(/regular|premium/);
          if (fuelTypeArray != null && fuelTypeArray.length > 1) {
            responseText = "Please provide just one Fuel Type";
          } else if (fuelTypeArray != null && fuelTypeArray.length === 1) {
            fuelType = fuelTypeArray[0];
          }
  
          //read year
          yearArray = msgText.match(
            /2000|2001|2002|2003|2004|2005|2006|2007|2008|2009|2010|2011|2013|2014|2015|2016|2017|2018|2019|2020|2021/ // this would have to be dynamic based on a definition
          );
          if (yearArray != null && yearArray.length > 1) {
            responseText = "Please provide just one Fuel Type";
          } else if (yearArray != null && yearArray.length === 1) {
            year = yearArray[0];
          }
  
          //read and validate VIN
          arrMessage = msgText.split(" ");
          for (i = 0; i < arrMessage.length; i++) {
            wordArray = arrMessage[i].split(",");
            for (j = 0; j < wordArray.length; j++) {
              vinArray = wordArray[j].toUpperCase().match(/^[^OIQ]{17}$/);
              if (vinArray != null && vinArray.length >= 0) {
                vin = vinArray[0].toUpperCase();
              }
            }
          }
  
          //at leat vin and year to consume NHTSA endpoint
          if (vin === "" && make === "" && model === "" && year === "" && fuelType === "") {
            responseText = "Sorry, I didn't understand what you said, can we try it again?"
          } else if (year == "" || vin == "") {
            responseText =
              "Please provide at least VIN and Year to proceed. VIN must be 17 alphanumeric characters without O, I and Q letters :warning:";
          } else {
            responseText =
              "_*Here you have the specifications of the vehicle*_ :information_source:\n";
  
            //execute NHTSA endpoint
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
        channel: req.body.event.channel,
        text: responseText,
      };
  
      //execute slack endpoint to send message
      slackMessageSent = await http_slack.botResponse(body);
      
      if (!slackMessageSent) {
        res
          .status(400)
          .send({ code: "error", message: "could not send slack message" });
      } else {
        res
          .status(200)
          .send({ code: "success", message: "bot responded successfully" });
      }
    } else {
      res
          .status(200)
          .send({ code: "success", message: "bot message, nothing to do" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ code: "error", message: err });
  }
};

module.exports = {
  ProcessBotResponse,
};
