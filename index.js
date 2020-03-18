const core = require('@actions/core');
const addPin = require('./addPin');

try {
  const cid = core.getInput('cid');
  const pinata_key = core.getInput('pinata_key');
  const pinata_secret = core.getInput('pinata_secret');


  const bucket = `${core.getInput('bucket')}`;
  const pinata_name = `${core.getInput('pinata_name') || 'textile_bucket'}`;

  // const unpin = core.getInput('unpin');

  const jobId = `${(new Date()).getTime()}`;

  // todo: add textile host_nodes multiaddress
  const options = {
    name: pinata_name,
    pinataMetadata: {
        keyvalues: {
            bucket: bucket,
            jobId: jobId
        }
    }
  };

  return addPin(cid, options, pinata_key, pinata_secret).then((result) => {
    console.log(result);
    return result
  })
} catch (error) {
  core.setFailed(error.message);
}
