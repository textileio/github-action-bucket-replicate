const core = require('@actions/core');
const github = require('@actions/github');
const addPin = require('./addPin');

const run = () => {
  const cid = core.getInput('cid');
  const pinata_key = core.getInput('pinata_key');
  const pinata_secret = core.getInput('pinata_secret');


  const bucket = `${core.getInput('bucket')}`;
  const pinata_name = core.getInput('pinata_name');

  // const unpin = core.getInput('unpin');

  const commit = `${github.context.payload.head}`;

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

  addPin(cid, options, pinata_key, pinata_secret).then((result) => {
    return result
  });
}

run();
