const github = require('@actions/github');
const addPin = require('./addPin');
const listPins = require('./listPins');

test('replicate bucket', async () => {
  const bucket = `${process.env.bucket}`;
  expect(bucket).toEqual('jekyll-ipfs-blog');
  const cid = process.env.cid;
  const pinata_name = process.env.pinata_name || 'textile_bucket_ci';
  const commit = `${(new Date()).getDate()}`;

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


  const pinList = await listPins(bucket, commit, pinata_key, pinata_secret);
  console.log(pinList)
  expect(pinList.count).toEqual(1)

  const job = await addPin(cid, options, pinata_key, pinata_secret);
  expect(job).not.toEqual('');

});
