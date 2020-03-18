const pinataSDK = require('@pinata/sdk');

const listPins = async (bucket, commit, pinata_key, pinata_secret) => {
  const pinata = pinataSDK(pinata_key, pinata_secret);

  const filters = {
    metadata: {
      keyvalues: {
        bucket: {
            value: bucket,
            op: 'eq'
          }
      }
    }
  }

  console.log(JSON.stringify(filters));

  return pinata.pinList(JSON.stringify(filters))
};

module.exports = listPins;

