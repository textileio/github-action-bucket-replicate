const core = require('@actions/core');
const addPin = require('./addPin');
const getOptions = require('./getOptions');

const run = async () => {
  const cid = core.getInput('cid');
  const options = getOptions();
  const pinata_key = core.getInput('pinata_key');
  const pinata_secret = core.getInput('pinata_secret');
  addPin(cid, pinata_key, pinata_secret, options)
  .catch((err) => {
    //handle error here
    console.log(err);
  });
}

run();
