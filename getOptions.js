const core = require('@actions/core');
const github = require('@actions/github');

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

module.exports = getOptions;
