const methods = require('./methods');

test('get options', async() => {
  const options = methods.getOptions();
  expect(options.pinataMetadata).toExist();
});
