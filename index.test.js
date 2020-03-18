const core = require('@actions/core');
const addPin = require('./addPin');
const getOptions = require('./getOptions');

test('get options', async() => {
  const bucket = core.getInput('bucket');
  const options = getOptions();
  expect(options.pinataMetadata).toBeTruthy();
  expect(options.pinataMetadata.keyvalues.bucket).toEqual(bucket);
});

test('replicate bucket', async() => {
  const cid = core.getInput('cid');
  const options = getOptions();

  expect.assertions(1);
  return addPin(cid, options)
    .then(result => expect(result.id).toNotEqual(''));
});
