const axios = require("axios");

const getDecodedVIN = async (vin, year) => {
  var url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json&modelyear=${year}`;
  
  let promise = new Promise((resolve, reject) => {
    axios.get(url)
    .then(response => {
      resolve(response)
    }).catch(err => {
      console.log("err: ", err);
      reject(err);
    })
  })

  let result = await promise
  return result.data
};

exports.getDecodedVIN = getDecodedVIN;
