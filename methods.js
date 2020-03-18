const core = require('@actions/core');
const github = require('@actions/github');
const pinataSDK = require('@pinata/sdk');

const getOptions = () => {
  const bucket = core.getInput('bucket');
  const pinata_name = core.getInput('pinata_name');

  // const unpin = core.getInput('unpin');

  const commit = github.context.payload.head;

  // todo: add textile host_nodes multiaddress
  const options = {
    pinataMetadata: {
        name: pinata_name,
        keyvalues: {
            bucket: bucket,
            commit: commit
        }
    }
  };
  return options
}


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

