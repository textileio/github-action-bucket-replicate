const core = require('@actions/core');
const addPin = require('./addPin');
const getOptions = require('./getOptions');

const run = async () => {
  const cid = core.getInput('cid');
  const options = getOptions();
  addPin(cid, options)
  .catch((err) => {
    //handle error here
    console.log(err);
  });
}

run();
