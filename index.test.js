const core = require('@actions/core');
const github = require('@actions/github');
const addPin = require('./addPin');
const listPins = require('./listPins');

test('replicate bucket', async () => {
  const bucket = `${process.env.bucket}`;
  expect(bucket).toEqual('jekyll-ipfs-blog');
  const cid = process.env.cid;
  // const pinata_name = process.env.pinata_name || 'textile_bucket_ci';
  const commit = `${github.context.payload.head}`;

  const pinata_key = process.env.pinata_key;
  const pinata_secret = process.env.pinata_secret;
  const options = {
    pinataMetadata: {
        keyvalues: {
            bucket: bucket,
            commit: commit
        }
    }
  };

  const job = await addPin(cid, options, pinata_key, pinata_secret);
  expect(job).not.toEqual('');

  const pinList = await listPins(bucket, commit, pinata_key, pinata_secret);
  expect(pinList.length).toEqual(11110)
});
