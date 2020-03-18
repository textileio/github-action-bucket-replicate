const core = require('@actions/core');
const github = require('@actions/github');
const addPin = require('./addPin');
const listPins = require('./listPins');

test('replicate bucket', async () => {
  expect.assertions(3);
  const bucket = `${process.env.bucket}`;
  expect(bucket).toEqual('jekyll-ipfs-blog');
  const cid = process.env.cid;
  const pinata_name = process.env.pinata_name || 'textile_bucket_ci';
  const commit = `${github.context.payload.head}`;

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

  const job = await addPin(cid, options, pinata_key, pinata_secret);
  expect(job).toNotEqual('');

  return listPins(bucket, commit, pinata_key, pinata_secret).then((pinList) => {
    return expect(pinList.length).toEqual(11110);
  })
});
