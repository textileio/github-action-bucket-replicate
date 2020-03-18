const core = require('@actions/core');
const addPin = require('./addPin');
const getOptions = require('./getOptions');

test('get options', async() => {
  const bucket = core.getInput('bucket');
  const options = getOptions();
  expect(options.pinataMetadata).toBeTruthy();
  expect(bucket).toEqual('bucket');
  expect(options.pinataMetadata.keyvalues.bucket).toEqual(bucket);
});

test('replicate bucket', () => {
  const cid = core.getInput('cid');
  const options = getOptions();

  expect.assertions(1);
  return expect(addPin(cid, options)).resolves.not.toEqual('');
});
