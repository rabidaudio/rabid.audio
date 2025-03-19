---
layout: blogspot_post
title: Static hosting with AWS
subtitle: Host a simple site for pennies a month

categories:
  - software
---

Create an S3 bucket:

https://console.aws.amazon.com/s3/home

Put in a name and select a region close to you (or the majority of your readers)

Upload your compiled site files using 


```json
{
  "Version": "2012-10-17",
  "Id": "Policy1481386227931",
  "Statement": [
    {
      "Sid": "Stmt1481386199200",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::rabid-audio-site/*"
    }
  ]
}
```

```xml
<RoutingRules>
    <RoutingRule>
        <Condition>
            <KeyPrefixEquals>blog/</KeyPrefixEquals>
            <HttpErrorCodeReturnedEquals>404</HttpErrorCodeReturnedEquals>
        </Condition>
        <Redirect>
            <ReplaceKeyWith>blog/error/</ReplaceKeyWith>
        </Redirect>
    </RoutingRule>
</RoutingRules>
```

Create a cloudfront distribution

https://console.aws.amazon.com/cloudfront/home

but in the address of the static site provided above, NOT the recommended s3 bucket

(the difference is web server versus just files)

leave origin path blank

give it some name for origin id

HTTP / HTTPS

 you may want to wait to know everything works with HTTP before setting up HTTPS

Enter your domain name in Alternate Domain Names (CNAMEs)

distro takes ages to set up as it propigates files all over the world

In your DNS hosting provider, add a CNAME record to the cloudfront distro

Once you know it works, you can add your SSL cert to the cloudfront distribution and enable redirect HTTP to HTTPS

because it is 2016 (almost 2017!) and you should be using HTTPS everywhere

AWS provides certs for free

https://console.aws.amazon.com/acm/home

Be sure to add wildcard domain so you can use it if you ever add subdomains to your site

It will send a validation email to a number of addresses associated with your site, for example webmaster@yourdomain.com.

Click the link in the email and you now have a free certificate. Granted it's only usable on AWS services (you can't download
the certificate files), but it is way better than paying $20-50 a year (common for wildcard certs) or working with letsencrypt which is awesome but is still a little ways from user-friendly

You can also use AWS as your domain provider using Route 53

https://console.aws.amazon.com/route53/home

You will need to go to your domain registrar and change the DNS servers to the ones provided to you by Amazon


updates will require you to invalidate cloudfront. AWS discourages you from doing this frequently (they charge a few dollars for every 1000 inalidations). you can use fingerprinting of files like rails does to avoid this: http://guides.rubyonrails.org/asset_pipeline.html#what-is-fingerprinting-and-why-should-i-care-questionmark

then you never have to invalidate


Costs

s3 is likely free (assuming your site is less than 1 GB and you get less than a million requests to s3, which is likely thanks to cloudfront)

As long as you aren't makeing thousands of invalidations, cloudfront is likely to run less than .50

Also, if you are on the AWS free tier, your S3 and CloudFront usage probably fall within the free limits. 

using Route 53 as your DNS will cost around another dollar per month
