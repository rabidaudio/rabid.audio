---
layout: post
title: Introducing chicy.online
categories:
- software
---

## Background

I'm a big fan of static sites. Why so much of the web uses Wordpress with it's bulky, error-prone, and insecure PHP backend to store what's effectively just some HTML and CSS never made sense to me.

Tooling for this sort of site is incredibly flexible. This blog is created using  [Bridgetown](https://www.bridgetownrb.com/), and an earlier iteration of it used [Jekyll](https://jekyllrb.com/). Site generators allow a really pleasant and flexible abstraction for creating content that can then be packaged into static HTML/CSS/JS/etc files for deployment. My personal links site [okaysure.cool](https://okaysure.cool) is literally [just a single html file](https://github.com/rabidaudio/okaysure.cool).

The great benefit is without a backend server, hosting can be accomplished entirely through a CDN, making it incredibly cheap to run. There's no reason a low-traffic site like this should need a $20/month server running constantly in the cloud waiting to handout files which are [public](https://github.com/rabidaudio/rabid.audio/).

Unfortunately, actually hosting this somewhere is kind of a pain. GitHub has [Pages](https://docs.github.com/en/pages), a free and popular option. But deploying to it is trickier than it should be. For a long time, this blog was [compiling code and committing the results to another repo](https://github.com/rabidaudio/rabid.audio/blob/0ccdef12dd0df9e7f986d71ca567640d165c59d9/.github/workflows/gh-pages.yml), where [it would then trigger another CI job to update the site](https://github.com/rabidaudio/rabidaudio.github.io/deployments).

Meanwhile, for some simpler sites I was using [Kinsta](https://kinsta.com), a for-profit company offering a free static hosting service as a lead-gen for their other products, which is [going through some changes](https://kinsta.com/docs/service-information/sevalla-overview/#sevalla-migration-faqs) and is dependant on the graciousness of a for-profit company.

At FIXD, we had a Terraform module that would set up an S3 bucket configured as a web host with CloudFront in front of it. Since there were no backend servers and S3 storage is so cheap, this was an essentially free way to run a static site. Since then I've wanted an easy way to do that for myself and my friends.

## `chicy init`

Introducing [`chicy.online`](https://github.com/rabidaudio/chicy.online), a hosting service for static sites and a CLI for managing them.

Getting started is easy. Simply install the CLI from NPM:

```bash
npm install --save-dev chicy.online
```

Next, create a new site:

```bash
npx chicy init --name "My Cool Site"
```

#### Authentication

The first time you use it, it will send you to GitHub to authenticate. I needed some way to keep track of users, and GitHub OAuth seemed like the best approach. The app only stores your login and email, it does not request or require any access to your account or any of your repositories.

#### Deploy Key

Once authenticated, `chicy` will create a site for you, giving you a unique subdomain on `sites.chicy.online`, e.g. `teeny-angle-dwas5`. It will generate a deploy key which you can use with CI/CD to publish your files. If you aren't using CI/CD you can ignore this, as you can publish from your own machine using the GitHub authentication you've already performed. This deploy key is only shown once, but you can regenerate a new one later with `chicy regenerate`.

#### Config file

It will also generate you a `.chicy.json` file that you can use to configure the site. We'll come back to it later.

## `chicy deploy`

Next, compile your assets (if needed), and upload them:

```bash
chicy deploy path/to/dist --wait
```

This will create a tarball of all the assets and upload them to S3, attaching them
to a new deployment, with an ID like `d_00001122334455aabbccddee`.

Behind the scenes, `chicy` creates an [S3-backed git repository](https://github.com/awslabs/git-remote-s3) and commits your files to it. The `--wait` flag (optional)
waits for this process to complete. Depending on the size of your site, this can take a little while.

You can verify the files that are going to be uploaded with `--dry-run`. This will print
the paths for all files to be uploaded.

## `chicy promote`

By default, new deployments are staged and not immediately published. To publish your
site, a deployment needs to be promoted:

```bash
chicy promote d_00001122334455aabbccddee --wait
```

Under the hood, this will check out the S3 git repository at the given deployment and
load the assets into place to be served by CloudFront. This will also trigger an
invalidation of all assets so that CloudFront will begin serving your updated site. This process can also take a while.

You can promote and deploy as one command. For example on CI you might do:

```bash
npm run build
CHICY_DEPLOY_KEY=dk_ac3d... npx chicy deploy dist/ --promote --wait
```

## Custom domains

At this point your site should be live on your unique subdomain, e.g. `teeny-angle-dwas5.sites.chicy.online`. But no static site service would be complete if it didn't let you bring your own domain. `chicy` will automatically provision and validate an SSL certificate and serve your site via HTTPS.

### DNS Records

You'll need to set a CNAME record pointing your custom domain to the site subdomain. Check
with your DNS provider for directions on how to do this.

```
www.example.com CNAME teeny-angle-dwas5.sites.chicy.online
```

{% img full %}2026-03-27-introducing-chicy-online/cname.png{% endimg %}

If you're using a subdomain like `www.example.com`, that is the only record you need.

### Apex records

Unfortunately, if you want to run your site at the root/apex of your domain instead (e.g. `example.com`), CNAME records are not supported at the root. You can still do it, it just requires more steps.

First, you'll need to find the CloudFront distribution domain. As of writing this is `dwuuvq1nesgb7.cloudfront.net` but should I need to re-deploy the server it could change in the future. You can check it on the API health check endpoint: [api.chicy.online](https://api.chicy.online/)

Then you'll need to create 3 records. First, you'll want A and AAAA records for the IP addresses of the Cloudfront distribution, which you will need to look up:

```bash
dig dwuuvq1nesgb7.cloudfront.net A   
dig dwuuvq1nesgb7.cloudfront.net AAAA
```

Create records for all the IPv4 and IPv6 addresses.

```
example.com	A	18.64.236.128
example.com	A	18.64.236.93
example.com	A	18.64.236.57
example.com	A	18.64.236.79


example.com AAAA	2600:9000:2335:4000:16:ea16:e4c0:93a1
example.com AAAA	2600:9000:2335:6200:16:ea16:e4c0:93a1
example.com AAAA	2600:9000:2335:7a00:16:ea16:e4c0:93a1
example.com AAAA	2600:9000:2335:fe00:16:ea16:e4c0:93a1
example.com AAAA	2600:9000:2335:c000:16:ea16:e4c0:93a1
example.com AAAA	2600:9000:2335:6a00:16:ea16:e4c0:93a1
example.com AAAA	2600:9000:2335:7800:16:ea16:e4c0:93a1
example.com AAAA	2600:9000:2335:3c00:16:ea16:e4c0:93a1
```

If you're using AWS as your DNS provider, you can do this [through alias records instead](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-cloudfront-distribution.html).

Finally we'll need to validate ownership. Normally CloudFront can verify domain ownership through the CNAME record but if using A records you'll need to verify using a TXT record pointing `_cf-challenge` to the Cloudfront distribution.

```
_cf-challenge.example.com TXT dwuuvq1nesgb7.cloudfront.net
```

### Attaching domain

Once the necessary record(s) are created, simply associate your domain with the site:

```bash
chicy configure --domain www.example.com
```

You can do this before or after your first deployment. If you've already got a deployment published, your site should be available on your custom domain!

If you want to remove it later, you can do `chicy configure --no-domain`.

## Rollbacks

To roll back to an earlier version of the site, simply `promote` an earlier deployment.

```bash
chicy deployments # list the deployments for the site
chicy rollback d_00001122334455ffffffffff --wait # `rollback` is simply an alias for `promote`
```

## Config file

When you run `chicy init`, a config file is generated for your site. The default template looks like this:

```js
{
  "siteId": "teeny-angle-dwas5",
  "exclude": [],
  "retain": [],
  "rewriteRules": [
    {
      "match": "^$",
      "replace": "/index.html",
      "last": true,
      "flags": ""
    },
    {
      "match": "^(.*?)/$",
      "replace": "${1}/index.html",
      "last": true,
      "flags": ""
    },
    {
      "match": "^(.*?)/([^.]+)$",
      "replace": "${1}/${2}/index.html",
      "last": true,
      "flags": ""
    }
  ]
}
```

**`siteId`**

Most commands require a `--site` flag to know which site we are working with. This can
be inferred if using a Deploy Key, or if this config file is in the current working
directory. If not specified, the CLI will prompt you to select a site.

**`exclude` / `retain`**

Both of these options are a list of globs relative to the upload path.

`exclude` (in addition to the `--exclude` CLI flag) will skip files from your asset directory from being uploaded to the site.

Use `retain` to specify file paths that should be carried over between deployments, even if they aren't included in subsequent deployments. For example, if you use cache-busting asset fingerprinting like `script-{hash-of-content}.js`, you can keep the earlier versions of the asset around for any clients still using them.

**`rewriteRules`**

Rewrite rules allow you to alter URLs to point to different files in your deployment. It's loosely based on [Apache's `mod_rewrite`](https://httpd.apache.org/docs/current/mod/mod_rewrite.html). Rules are evaluated in defined order. If the passed in URI path (only the path; hostname and query parameters are not included) matches the `match` regex, the rule will be evaluated. The path will change to the value of `replace`. Any group replacements (e.g. `${1}`) will be replaced with the corresponding capture `(...)`  index from the `match` regex. Rules will continue to be evaluated with the new path, unless `last` is set to true, which stops rule evaluation with the matched rule. The regular expressions use [Javascript syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions).

The default set of rules will redirect any bare directory roots to an `index.html` file within that directory which is often the desired behavior for websites. For example, the top-level `example.com` will return `/index.html` and `/posts` will return `/posts/index.html`.

To add a prefix to all your paths, add a rule early in execution which appends the prefix to the beginning of the path, for example `/page.html` to `/contents/page.html`:

```json
{ "match": "^/(.*)$", "replace": "/contents/${1}" }
```

That's pretty much all there is to it!

## Under the hood

In order to avoid having a backend server running, all the processing is done with Lambda functions and AWS resources. State is stored in DynamoDB, content is stored in S3, and served with CloudFront's (relatively new) multi-tenant feature, which allows multiple domains with just one distribution. The app uses the [Serverless framework](https://serverless.com) to manage deployments, and CloudFormation to define all the AWS assets (I much prefer Terraform but using the native functionality meant less dependencies and complication). The URL rewrite feature is implemented using CloudFront's Functions and Key-Value Stores, which allow a small amount of state and Javascript to run in a limited environment before every request. There's also Lambda@Edge which I might switch to later but it [doesn't play very nicely with Serverless](https://www.serverless.com/framework/docs/providers/aws/events/cloudfront).

Lambda functions can execute for up to 15 minutes, but API Gateway calls must complete within 6 seconds. For this reason, longer tasks are triggered by S3 events. When a deployment is created, temporary AWS credentials are generated which have only permission to write to a particular deployment file in S3. The CLI then uses these credentials to place a tarball of the site content at that location. When the object is placed, a Lambda function is invoked which downloads the tarball and clones the site's internal git repository. It deletes any existing files, unzips the tarball in place, makes a new commit for the deployment, and pushes the repository back to S3.

On promotion, a dummy file is placed into S3 to trigger the promotion (this is dirty but simpler than other methods of invocation). It clones the repository, checks out the desired deployment, and copies the files into the directory on S3 that acts as an origin for CloudFront. The site configuration at the time of the deployment is pulled out of DynamoDb and put into CloudFront's Key-Value Store by domain name. When a request is made, the Function looks up this configuration by requested hostname and applies any rewrite rules before handing the request to CloudFront.

Lambda functions make sense for small and/or bursty traffic because it's billed per-call. For low traffic volumes the price-per-call is less than having a server sitting idle waiting for requests. And when traffic is unpredictable, serverless applications are able to scale instantly. But if your volume is constant and predictable, having a dedicated server running becomes cheaper. Fortunately because the Lambda handler is just a wrapper for a Node.js server, it would be trivial to run it with a server later.

## Costs

S3 storage, at the least-optimized on-demand tier, is as of writing only $0.023/GB/mo. Amazon is really pushing their new flat-rate pricing (probably to compete with CloudFlare) but I'm pretty sure at scale it's a bad deal. Outside of the generous free tier, serving content is $0.085/GB + $0.020/GB transfer + $0.0100 per 10K requests. There's also a charge of $0.10/tenant/mo for the multi-tenant feature. Invalidations are $0.005/path. CF Functions are $0.10 per 1 million invocations and KVS is $0.03 per 1 million reads. DynamoDB on-demand pricing is complicated, but $0.625 per million write request units $0.125 per million read request units plus $0.25/GB/mo of storage. Lambda is $0.0000166667 for every GB-second and $0.20 per 1M requests.

If we estimate liberally that a site uses 5GB of storage, deploying 1GB of assets once a week, each requiring 100 API calls and 10m of Lambda execution time, and receives a 100K page views a month at an average of 200kb for a total of 20GB transferred:

```
0.023*5 + 0.085*1 + 0.020*20 + (100,000/10,000)*0.0100 + 0.10 + 4*0.005 + (0.10 + 0.03)*(100,000/1,000,000) + 4*(20*0.625 + 200*0.125)/1,000,000 + 0.25*(1/1024/1024) + 4*10*60*(256/1024)*0.0000166667 + 4*(100/1000000)*0.20 = 0.8432
```

...comes out to just shy of $1/site/month. And this is excluding the volume discounts and large free-tier benefits. The largest of this is by far the cost per-10K Cloudfront requests.

I'd like to confirm this at scale (cloud pricing is incredibly hard to estimate by design), but ideally I'd love to charge around $1 per month per site to users (probably billed annually due to transaction costs). Currently I haven't built any user limits or billing infrastructure so if you want to test it out you can do it for free (just please don't rack up my AWS bill thanks).

## Self-hosting

It is possible to not use my deployment of this infrastructure and instead deploy it yourself, giving you your own private API and Cloudfront distribution to host your sites with. I haven't documented this yet as I haven't built out all the features for it, but if you're interested you can probably read the code and figure things out. You'll need to set up an AWS Hosted Zone for the domain you want to run on and pass in a couple of arguments via environment variables to serverless when you deploy:

```env
HOSTED_ZONE_ID=Z093471597392O2DOAPL
BASE_DOMAIN=yourstatichost.com
# Create a Github App for authentication
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# for the CLI you'll want to override the API endpoint to point to your deployment
API_HOST=https://api.yourstatichost.com
```

Eventually I want to make multiple authentication backends, one of which is a single root user which you could use for private deployments.

## Future

The app is usable today as-is. This blog you're reading now as well as [my personal links site](https://okaysure.cool) are both now running on `chicy`. But there's still more work I have planned.

The biggest is to make a web interface as an alternative to the CLI, hosted as a single-page app on `sites.chicy.online` itself. If it starts to scale I'd also want to build out subscriptions and user limits so that I can manage the costs. Some additional minor features include support for custom error pages (e.g. `/404.html`) and the ability to squash old deployments for storage optimization.

I had previously started a similar project [linky](https://github.com/rabidaudio/linky) which was a Linktree-like single page site generator which would then host sites on a similar multi-tenant distribution. Momentum stalled when there wasn't yet a Terraform interface for creating multi-tenant distributions. But I may revive that project as a simple layer on top of this.

## One last thing, what's with the name?

IDK. I was originally going for something like "static-chick" but I typo'd the first domain (`static-chic.online`) and didn't want to fix it. When it came time to make a CLI I wasn't sure what to name it so `chicy` came out of that. It's short and there wasn't already a package named that on NPM. How to pronounce it is an exercise for the reader. It could be "sheek-e" (like the French word "chic") or "chickey" or "cheeky". I'll accept any of these.
