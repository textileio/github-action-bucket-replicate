const core = require('@actions/core');
const addPin = require('./addPin');
const getOptions = require('./getOptions');

const run = () => {
  const cid = core.getInput('cid');
  const pinata_key = core.getInput('pinata_key');
  const pinata_secret = core.getInput('pinata_secret');
  const options = getOptions();
  addPin(cid, options, pinata_key, pinata_secret).then((result) => {
    return result
  });
}

run();
