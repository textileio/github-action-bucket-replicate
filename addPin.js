const core = require('@actions/core');
const pinataSDK = require('@pinata/sdk');

const addPin = async (cid, pinata_key, pinata_secret, options) => {
  const pinata = pinataSDK(pinata_key, pinata_secret);
  return pinata.testAuthentication().then(() => {
    return pinata.addHashToPinQueue(cid, options).then((result) => {
      //handle results here
      console.log(result);
      core.setOutput("pinata_id", result.id);
      return result.id;
    })
  })
};

module.exports = addPin;

