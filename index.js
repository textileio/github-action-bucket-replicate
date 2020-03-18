const core = require('@actions/core');
const github = require('@actions/github');
const pinataSDK = require('@pinata/sdk');

try {
  const cid = core.getInput('cid');
  const bucket = core.getInput('bucket');
  const pinata_key = core.getInput('pinata_key');
  const pinata_secret = core.getInput('pinata_secret');
  const unpin = core.getInput('unpin');
  const pinata_name = core.getInput('pinata_name');

  const pinata = pinataSDK(pinata_key, pinata_secret);

  const commit = github.context.payload.head;

  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);

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
  pinata.addHashToPinQueue(cid, options).then((result) => {
      //handle results here
      console.log(result);
      core.setOutput("pinata_id", result.id);
  }).catch((err) => {
      //handle error here
      console.log(err);
  });
} catch (error) {
  core.setFailed(error.message);
}
