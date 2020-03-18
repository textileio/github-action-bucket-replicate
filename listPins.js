const pinataSDK = require('@pinata/sdk');

const listPins = async (bucket, commit, pinata_key, pinata_secret) => {
  const pinata = pinataSDK(pinata_key, pinata_secret);

  const filters = {
    status: 'pinned',
    metadata: {
      keyvalues: {
        bucket: {
              value: bucket,
              op: 'eq'
          },
          commit: {
              value: commit,
              op: 'ne'
          }
      }
    }
  }

  return pinata.pinList(filters)
};

module.exports = listPins;

