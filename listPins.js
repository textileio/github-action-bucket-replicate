const pinataSDK = require('@pinata/sdk');

const listPins = async (bucket, commit, pinata_key, pinata_secret) => {
  const pinata = pinataSDK(pinata_key, pinata_secret);


  const metadataFilter = {
    keyvalues: {
      bucket: {
        value: bucket,
        op: 'eq'
      }
    }
};
  const filters = {
    status : 'pinned',
    pageLimit: 1000,
    metadata: metadataFilter
  };

  console.log(JSON.stringify(filters));

  return pinata.pinList(filters)
};

module.exports = listPins;

