const core = require('@actions/core');
const github = require('@actions/github');
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

  const bucket = process.env.bucket;
  expect(bucket).toEqual('bucket');
  const cid = process.env.cid;
  const pinata_name = process.env.pinata_name;
  const commit = github.context.payload.head;

  const pinata_key = process.env.pinata_key;
  const pinata_secret = process.env.pinata_secret;
  const options = {
    pinataMetadata: {
        name: pinata_name,
        keyvalues: {
            bucket: bucket,
            commit: commit
        }
    }
  };
  expect.assertions(1);
  return expect(addPin(cid, pinata_key, pinata_secret, options)).resolves.not.toEqual('');
});
