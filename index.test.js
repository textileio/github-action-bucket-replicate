const core = require('@actions/core');
const getOptions = require('./getOptions');

test('get options', async() => {
  const bucket = core.getInput('bucket');
  const options = getOptions();
  expect(options.pinataMetadata).toBeTruthy();
  expect(options.pinataMetadata.keyvalues.bucket).toEqual(bucket);
});
