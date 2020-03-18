const getOptions = require('./getOptions');

test('get options', async() => {
  const options = getOptions();
  expect(options.pinataMetadata).toBeTruthy();
  expect(options.pinataMetadata.name).toEqual('ci-test-pin');
});
