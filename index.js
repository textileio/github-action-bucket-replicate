const core = require('@actions/core');
const methods = require('./methods')

const run = async () => {
  const cid = core.getInput('cid');
  const options = methods.getOptions();
  methods.addPin(cid, options)
  .catch((err) => {
    //handle error here
    console.log(err);
  });
}

run();
