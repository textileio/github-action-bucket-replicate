const core = require('@actions/core');
const pinataSDK = require('@pinata/sdk');

const addPin = async (cid, options, pinata_key, pinata_secret) => {
  const pinata = pinataSDK(pinata_key, pinata_secret);
  const result = await pinata.addHashToPinQueue(cid, options);
  core.setOutput("pinata_id", result.id);
  return result.id;
};

module.exports = addPin;

