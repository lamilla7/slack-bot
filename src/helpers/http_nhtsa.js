// const https = require("https");
const request = require("request");

const getDecodedVIN = async (vin, year) => {
  try {
    var url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json&modelyear=${year}`;
    var headers = {
      "Content-Type": "application/json",
    };
  
    return new Promise(function (resolve, reject) {
      request.get(
        {
          url: url,
          headers: headers,
        },
        (err, response, body) => {
          if (err) {
            reject(err);
          } else {
            resolve(body);
          }
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getDecodedVIN = getDecodedVIN;
