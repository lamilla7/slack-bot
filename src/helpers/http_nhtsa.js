// const https = require("https");
const request = require("request-promise");

const getDecodedVIN = async (vin, year) => {
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
};

exports.getDecodedVIN = getDecodedVIN;