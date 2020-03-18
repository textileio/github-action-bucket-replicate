const pinataSDK = require('@pinata/sdk');

const addPin = async (cid, options, pinata_key, pinata_secret) => {
  const pinata = pinataSDK(pinata_key, pinata_secret);
  const result = await pinata.addHashToPinQueue(cid, options);
  return result.id;
};

module.exports = addPin;

