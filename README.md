Extra Network Replication for Textile Buckets
===============================

All Textile Bucket updates are automatically pinned on the IPFS network. However, for some applications that rely on extremely responsive DHT/Network requests for their content, it can be helpful to replicate your IPFS pins across multiple nodes (and providers). This GitHub Action combines with the Bucket Publish action to pin your content on Textile and Pinata networks. 

# Get Started with Buckets

## Install the Textile CLI

You'll need to install Textile on your local machine. To do so, download the binary for your computer here, [https://github.com/textileio/textile/releases/latest](https://github.com/textileio/textile/releases/latest).

_Apple users: Textile is not signing the build with Apple developer keys, you'll need to authorize the app to run in your security settings. Download the Darwin build and go through the install steps (untar, cd, `./install`). Next, run a Textile command once, e.g. `textile --help`. This will fail due to permissions. Go to System Preferences -> Security. In the bottom right, click to allow Textile to run anyway. Run `textile --help` again, confirm your decision, and you'll not be prompted again._

## Create a Textile login and team

Textile uses passwordless login for all users, giving them remote IPFS pinning for their projects.

`textile login`

Follow the instructions.

`textile whoami`

Should now show you your account. If you think you'll want to collaborate with others, you should create a team and then enter you team before creating projects and buckets.

`textile team add <NAME>`

Followed by

`textile switch`

## Initialize a Textile Project

All Buckets are part of Projects. To make Project management easy, you can initialize a Project in the any directory. Then, each time you are working in that directory with Textile, it will know which project it is working with.

`cd <PROJECT DIRECTORY>`

`textile project init <UNIQUE PROJECT NAME>`

This will create a file `./.textile/config.yml`. If you are using Git, you should commit this file to your code history.

## Push your project to a Bucket

This example assumes that the content you want to push is contained in a subdirectory, `public` in your project. This is the directory you will push to a Bucket.

`textile bucket push public/* <UNIQUE BUCKET NAME>`

That's it! You now have the contents of your `public` folder pinned to a remote IPFS node. You can explore the data using the data explorer. Your Bucket URL can be found using,

`https://cloud.textile.io/dashboard/<PROJECT NAME>/<BUCKET NAME>`

Your site will be rendered on the Gateway. You can view your live site using the URL,

`https://<BUCKET NAME>.textile.cafe/`

## Add Continuous Integration

If you are using GitHub, you can use GitHub Actions to update your Bucket automatically now. Here's how you can do it.

### Setup your Textile permissions

1. Get your Auth token. You're account auth token can be found at `$HOME/.textile/auth.yml`. That file will contain the string `token:<YOUR_PRIVATE_TOKEN>. Copy that value. 
2. Add a Secret to your GitHub project. Go to your GitHub project. Click Settings. Click Secret. Add a secret named, `TEXTILE_AUTH_TOKEN`. For the value, enter the string from `YOUR_PRIVATE_TOKEN` above.
3. Be sure you've committed and pushed the `.textile/config.yml` folder and file to your GitHub project. 

### Add GitHub Actions

Textile curates a few Actions in the GitHub Marketplace. If your site uses the default Hexo build settings, this step should be easy.

You can copy the setup in this Repo, using the job called `integration`. Here is what it looks like,

```yml
...
  integration:
    runs-on: ubuntu-latest
    name: Runs the real action
    env:
      BUCKET_NAME: 'test-ci-bucket'
    steps:
      # To use this repository's private action, you must check out the repository
      - name: Checkout
        uses: actions/checkout@v2

      - name: Bucket push action
        id: push
        uses: textileio/github-action-bucket-push@master
        with:
          bucket-name: '${{ env.BUCKET_NAME }}'
          path: 'public/*'
          token: ${{ secrets.TEXTILE_AUTH_TOKEN }}
          
      - name: Bucket Replication
        uses: ./ # Uses an action in the root directory
        id: replicate
        with:
          cid: ${{ steps.push.outputs.cid }}
          bucket: 'gatsby-ipfs-blog'
          pinata_key: ${{ secrets.PINATA_KEY }}
          pinata_secret: ${{ secrets.PINATA_SECRET }}
          pinata_name: 'ci-test-pin'
```

Above, we take the contents of the public folder, update our bucket (named stored in BUCKET_NAME). Next, we take the resulting changes and push them to Pinata's pinning queue. 