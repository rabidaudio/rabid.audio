---
layout: plain
stylesheets:
- github-markdown-css/github-markdown.css
page_class: markdown-body
---

<style>
main {
  margin: 10px;
}

@media print {
  main {
    font-size: 0.7em;
    margin: 0;
  }
  .markdown-body h1, .markdown-body h2, .markdown-body h3,
  .markdown-body h4, .markdown-body h5, .markdown-body h6 {
    margin-top: 17px;
    margin-bottom: 8px;
  }
}
</style>

# CJK

[`rabid.audio`](https://rabid.audio) \| [`github.com/rabidaudio`](https://github.com/rabidaudio) \| [`linkedin.com/in/cjulianknight`](https://www.linkedin.com/in/cjulianknight)

## Education

__Georgia Institute of Technology__ - Atlanta, GA<br/>
B.S. in Electrical Engineering, Fall 2012 - Spring 2015

__Berry College__ - Rome, GA<br/>
B.A. Dual-Degree Program, Fall 2009 - Spring 2012

## Experience

### Co-founder & Chief Technical Officer, [FIXD Automotive](https://www.fixdapp.com)
__August 2015 - August 2023__ | Atlanta

FIXD Automotive is a company that makes car ownership as easy and affordable as possible for the everyday driver. The flagship product is a Bluetooth [OBD-II](https://en.wikipedia.org/wiki/On-board_diagnostics) sensor and mobile app that diagnoses car problems, explaining error codes in simple language. While there, the company grew rapidly, being the [fastest growing lower middle-market company in Georgia](https://www.acg.org/atlanta-60) in 2018. As of Q3 2023 it had grown to around 30 employees, graduated from [ATDC](https://atdc.org/), and sold around 2 million units, all while remaining profitable and never raising any outside capital.

- Wrote the initial production versions of both [Android](https://play.google.com/store/apps/details?id=com.fixdapp.two) and [iOS](https://itunes.apple.com/us/app/fixd/id957168651?mt=8) native mobile applications, and the REST-ful API backend in [Ruby on Rails](http://rubyonrails.org/) to power them. Also worked on projects in [Nodejs](https://nodejs.org/en/), [Go](https://go.dev/), [Python](https://www.python.org/), [Svelte](https://svelte.dev/), and [Flutter](https://flutter.dev/).
- Managed the release of multiple iterations of the FIXD Sensor, a dual-band Bluetooth device. The latest generation model reduced the original cost-of-goods by ~75%. Worked closely with our manufacturer in Shenzhen, China to ensure product quality, having visited the facility on multiple occasions.
- Designed the cloud infrastructure on AWS using established best-practices for cloud deployments, leveraging Docker containers and [Convox](https://convox.com/) PaaS for application deployments. Provisioned using infrastructure-as-code practices via [Terraform](https://www.terraform.io/). Services include EC2, RDS, S3, ECS, CloudFormation, Lambda, Athena, CloudWatch. Grew to 125 vCPUs across 5 separate organizational accounts.
- Reverse-engineered diagnostic protocols used by vehicles, information that ranges from sparse to proprietary. Researched, documented, and coded interfaces to access both standardized and proprietary data for tens of thousands of year-make-models. As odometer is not mandated by OBD-II, designed a proprietary algorithm for predicting the mileage for a vehicle based on other outputs from the car.
- Recruited, trained, and grew the Engineering team to a size of 13 split across 4 teams. Focused on developing talent over recruiting experience. Steered culture through one-on-ones, code review, and creation of an Engineering Handbook [modeled after GitLab](https://handbook.gitlab.com/handbook/about/). Defined software development processes and practices based on Agile methodologies. Combined git flow with a robust CI/CD pipeline to enable developers to deploy code constantly while still ensuring the product met our quality standards.
<!-- Lynx -->
<!-- CarRx -->
- Built a data platform, and later a team to maintain it, around the open-source "modern data stack." Extracted GB of data per week from dozens of data sources into [Snowflake](https://www.snowflake.com/en/), applied business logic, reported KPIs for the company, and provided tools and training for employees to perform their own analyses. Stack included [Meltano](https://meltano.com/), [DBT](https://www.getdbt.com/), [Dagster](https://dagster.io/), and [Metabase](https://www.metabase.com/). Personally was a major contributor to these young tools, sending dozens of pull requests and playing a part in design and direction.
- Developed and migrated to our own in-house e-commerce platform from [Shopify](https://www.shopify.com/) in only 12 weeks, which outperformed the previous one in KPIs. Included highly-optimized direct-to-checkout experience, with support for one-click post-purchase up-sells and subscription-based products. The company plans to productize the platform and begin offering it to other companies in 2024.
- Set policies and ensured compliance around IT security and user privacy. As Data Protection Officer, brought company into compliance with [GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) and [CCPA](https://en.wikipedia.org/wiki/California_Consumer_Privacy_Act), and automated customer data deletion requests.

<!-- <div style="page-break-after: always"></div> -->

### Lead Software Engineer, [TechJect](http://techject.com/)
__May 2015 - August 2015__ | Atlanta

Returned to TechJect after completing my undergrad program. Lead a team of 3 software engineers. The team overcame several technical challenges:

- Implemented a control interface via SPI to allow a drone's flight control board to communicate with the Android SoC board. This interface was used to send flight control commands and receive sensor and telematics data.
- Optimized the performance of the live video streams, allowing 20-25 FPS at 1080p resolution while maintaining a low latency, simultaneously with the video feed from the small ground-facing flight control camera.
- Implemented a [Kalman Filter](https://en.wikipedia.org/wiki/Kalman_filter), a sensor fusion algorithm which combined GPS and sensor data from the Android board with the sensor data from the flight control board, providing a more accurate determination of the drone's position.
- Configured and administered an on-site build server for improving Android OS and firmware build times, reducing the build time by over a factor of 18.

### Consultant, RabidAudio
__May 2015 - August 2015__ | Atlanta

After completing my undergraduate degree, I founded a technology development consultancy. Embedded electronics and software development, specializing in IoT and Bluetooth electronics products, pro-audio projects, and full-stack web design.

### Electrical & Computer Engineer, [TechJect](http://techject.com/)
__May 2014 - December 2014__ | Atlanta

TechJect designed consumer drones, including the [Robot Dragonfly](https://www.indiegogo.com/projects/robot-dragonfly-micro-aerial-vehicle), which was the first crowd-funded project to break $1 million in funding. The company was run and largely staffed by Electrical Engineering PhDs. Joined the company as the only non-firmware software engineer while still in undergrad.

- Worked on development of an embedded ARM SoC development board with a quad-core CPU, a basic sensor suite, GPS, WiFi, Bluetooth, and dual 12MP cameras. Interacted with off-shore manufacturers and maintained the firmware and kernel drivers for the board, which ran a custom build of the [Android](https://developer.android.com/) operating system.
- Created micro-UAV control Android applications, including system code running on the drone and and an end-user application for controlling it without the need for an RC remote. In addition to providing complete drone flight controls over WiFi or Bluetooth, the application was capable of streaming live video from two cameras over WiFi with sub-200 millisecond latency. It also contained a basic [PID control](https://en.wikipedia.org/wiki/PID_controller) algorithm, allowing the drone to maintain it's altitude automatically.
- Developed and administered the email server and a collection of [Wordpress](https://wordpress.org/) sites including a [WooCommerce](https://woocommerce.com/) e-commerce site and customer support sites, and wired the office with CAT 6.
- Introduced peers to `git` and implemented version control practices for the company.

### Developer, [GetNotes](http://www.getnotes.co/)
__January 2014 - June 2014__ | Atlanta

Joined an [Atlanta Ventures](http://www.atlantaventures.com/)-funded startup during their progress through the [Flashpoint accelerator](http://flashpoint.co/) at Georgia Tech. The company offered crowd-sourced audio-to-text transcription as a service. Worked directly with the CTO to build and manage a web application in the [Zend PHP Framework](https://framework.zend.com/). Implemented new application features and patched bugs in a rapid development cycle. Advised on technologies and company direction, lead initial research into machine-learning algorithms for automated transcription. Through the Flashpoint program, learned a rigorous customer discovery processes.

<!-- <div style="page-break-after: always"></div> -->

### Distributed Systems/AIX Co-Op, [Norfolk Southern Corporation](http://www.nscorp.com/content/nscorp/en.html)
__September 2012 - August 2013__ | Atlanta

Worked on a number of different projects over two co-op sessions.

- Developed an application using Visual Basic to connect to a database of datacenter inventory and generate a Visio document for visualizing datacenter layout and rack contents. While working on that project, shadowed administrators of the 10,000 sq. ft. datacenter, and worked with the diagnostic reporting and resource inventory database team to collect and correct data.
- Developed several internal department applications in [Microsoft SharePoint](https://en.wikipedia.org/wiki/SharePoint). There was no documentation in the organization for how to create applications for Sharepoint, so after determining best practices, wrote an extensive guide and documentation for developing such applications.
- Deployed and solely administered a [DokuWiki](https://www.dokuwiki.org/dokuwiki) server for departmental documentation. This included writing several custom DokuWiki plug-ins in PHP and and training employees on proper usage.
- Wrote server automation scripts, both shell and Perl, for server administration and worked closely with AIX administrators managing QA and Production servers.


### Student Supervisor, Technical Support Desk, [Berry College OIT](https://www.berry.edu/oit/bits)
__Aug 2009 - April 2012__ | Mount Berry, Georgia

Provided technical support for faculty, staff, and students via phone, email, and in person. Created and managed service requests and directed departmental calls.

<!-- UPS store -->

## Awards

#### Forbes [30 Under 30](https://www.forbes.com/profile/fixd), 2019

Included along with co-founders on the 30U30 list in the Manufaturing & Industry category in recognition of the growth of FIXD Automotive.

#### Finalist, [Static Showdown 2015](https://2015.staticshowdown.com/winners)

Solo submission for Static Showdown 2015, a 48-hour hackathon for static apps. [QuickComments.js](https://github.com/rabidaudio/ss15-team32), a drop-in comments system for websites. Built comments system, Grunt tasks, documentation, and demo website. Roughly three times faster than [Disqus](https://disqus.com/).

#### Winner, [Music Hack ATL 2014](https://hypepotamus.com/news/beat-goes-meet-music-hack-winners/)

As part of team of 4, in 24 hours, created [Rockscör](https://github.com/rabidaudio/rockscor), an aggregator of data for bands to estimate their audience size and influence in different markets for marketing and tour planning. Wrote entire application as the only technical team member, integrating data from 5 REST APIs.

#### Best Hardware, HackBurdell 2014

Solo submission for Georgia Tech Invention Studio hackathon that served as precursor to HackGT. Built an MP3 player for attachment to car stereo, with driver-friendly interface.

<!-- 	Startup Weekend Maker Edition 2013 (award name?) -->

## Organizations

#### Admin, [Fourth Strike](https://fourth-strike.com/)
__November 2023 - Present__

Fourth Strike is a not-for-profit record label with the goal of promoting queer music. Building a custom tool for tracking accounting and royalties owed and paid for hundreds of artists across dozens of records, and leading an audit of existing records.

#### Volunteer, [Code for Atlanta](http://http://codeforatlanta.org/)
__January 2017 - March 2020__

Code For Atlanta, a local brigade of Code for America, is a group of civic-minded technologists, designers, and topic experts using our skills to improve Atlanta and the world. As a Project Lead volunteer, lead teams working on various projects during our regular hack nights.

<!-- Atlanta Maker Faire volunteer? 2014,2015,2016,2018? -->

#### Organizer, [Startup Exchange](http://www.startup.exchange/)
__August 2013 - May 2015__

Startup Exchange is a student organization to foster entrepreneurship and hacker culture at Georgia Tech. Co-founded the Maker team. Developed and maintained the website, taught classes on web development with [Ruby on Rails](http://rubyonrails.org/) to students, organized three and attended over a dozen hackathons.


## Talks

- ["Kotlin Coroutines in Android"](https://speakerdeck.com/rabidaudio/kotlin-coroutines-in-android-1), [Atlanta Android Club](https://www.meetup.com/atlanta-android-club/events/248023794/) - Atlanta, GA, March 2018
- ["Kotlin Coroutines in Android"](https://speakerdeck.com/rabidaudio/kotlin-coroutines-in-android), [Connect.Tech](https://2017.connect.tech/) - Atlanta, GA, September 2017
- "Custom modular synthesizer", Atlanta Tech Demo Night - Atlanta, GA, May 2015
- ["Error Correction Over Noisy Channels"](https://speakerdeck.com/rabidaudio/error-correction-over-noisy-channels), Berry College - Rome, GA, March 2012
