---
title:      The War of the Root     # Titles shouldn't be more than 33 chars for good formatting.
subtitle:   DNS Root Authority and why it matters            # Roll over into the subtitle if necessary (optional)
date:       2015-3-23 23:55:53 -400      # 2008-12-14 10:30:00 +0900
layout:     blogspot_post
categories:
- policy
---

A year ago this month, it was announced that [the US would be transferring control of the DNS Root Zone](http://arstechnica.com/tech-policy/2014/03/in-sudden-announcement-us-to-give-up-control-of-dns-root-zone/). As of writing, it is still to be determined who that organization is or what that ownership will look like. This transfer, if it ever actually occurs, stands to have major effects on the internet and control over it.

#### Brief Intro

The Domain Name System (DNS) is what maps domain names like [www.google.com](http://www.google.com) to IP addresses like [`64.233.176.138`](http://64.233.176.138), making it act basically like a large telephone book. To translate domain names to IP addresses, a series of requests are made.

A domain name is broken into a hierarchy. First, your computer sends a request to the root DNS server(s), asking for the location of the `.com` DNS server. It will respond with the IP address of the server that knows all `.com` domains. You make a request to this server, and it responds with the IP address for `google.com`'s DNS server. A request to this server responds with the address for `www.google.com`, and so on as necessary. There is some caching and some more advanced things going on, but that's how it works in essence. 

In the beginning, the ownership of the Root DNS servers, as well as the international TLD servers (`.com`, `.net`, `.org`, etc.) and the control of allocations of domain names and IP addresses was all governed by {% wkipe IANA %} (which was actually just {% wkipe Jon Postel | this guy Jon %}). In 1998, the US government formed {% wkipe ICANN %} and pressured Postel into transferring the duties of IANA to ICANN.

If you're interested the full story, check out Chapter 3 of [*Who Controls the Internet?*](https://global.oup.com/academic/product/who-controls-the-internet-9780195340648) by Jack Goldsmith and [Tim Wu](https://twitter.com/superwuster), my favorite book on internet policy.

#### Why the Root Matters

In addition to the above tasks, ICANN is responsible for the creation of all the new TLDs, which {% wkipe  Coalition for Responsible Internet Domain Oversight | some people %} aren't too happy about.

Censorship is also a major concern. The best way to take down a site is to actually confiscate the servers hosting the content.Some censorship is also done with the help of telecoms, which actually refuse to route connections to blocked IP addresses. 

However, servers are physical objects and are subject to the jurisdiction they reside in. Also only China and Iran (that we know of) actually block network connections through ISPs (which can be countered using [Tor](http://a.wki.pe/Tor)).

Most of the time, "taking down" a site can be done by simply revoking a domain name, as was the case with {% wkipe Wikileaks %} and in the ongoing battle with {% wkipe The Pirate Bay %}. The site is still live in that if you went to the IP address, you'd still see the content. However, even users savvy enough to know what an IP address is still almost surely don't know the specific address of the server in question.

In this sense, authority over namespacing the internet includes the power to influence and even block content.


### So what will happen if ICANN becomes an international body?

The move to international ownership of DNS sets the groundwork for an international internet regulatory body. This will be good in that it will likely fight against the powerful surveillance and intellectual property regimes like the one here, but it will also give censorship regimes like China and Iran a say in internet governance. It is likely that it will give states more power and authority for censorship. 

The US also has some of the strongest free speech laws in the world that many other states (even Western ones) don't agree with. It's possible (although unlikely) that those values may carry over into internet regulation in the far future. On the other hand, it is also possible that lingering effects of our dominance of the internet has changed these values in the young people in other countries, which I think this is a very distinct possibility. We will have to wait and see.

There are also some projects like [Namecoin](http://namecoin.info) which hope to make a P2P replacement for DNS. While I don't believe Namecoin is the most effective solution to the problem (something I may write about in the future), I have high hopes for any project which removes authority from network protocols.

These are {%wkipe David Clark %}'s words on the founding beliefs of the {% wkipe IETF %}:

> We reject kings, presidents and voting. We believe in rough consensus and running code.

The longer the internet can hold onto those values, the better.