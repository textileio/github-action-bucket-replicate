const process = require('process');
const core = require('@actions/core');
const getOptions = require('./getOptions');

test('get options', async() => {
  const pinata_name = core.getInput('pinata_name');
  process.env['pinata_name'] = pinata_name;
  const options = getOptions();
  expect(options.pinataMetadata).toBeTruthy();
  expect(options.pinataMetadata.name).toEqual('ci-test-pin');
});
