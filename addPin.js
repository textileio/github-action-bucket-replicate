const core = require('@actions/core');
const pinataSDK = require('@pinata/sdk');

const addPin = async (cid, options) => {
  const pinata_key = core.getInput('pinata_key');
  const pinata_secret = core.getInput('pinata_secret');
  const pinata = pinataSDK(pinata_key, pinata_secret);
  return pinata.addHashToPinQueue(cid, options).then((result) => {
      //handle results here
      console.log(result);
      core.setOutput("pinata_id", result.id);
  })
};

module.exports = addPin;

