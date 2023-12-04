---
layout: post
title: Goodbye, FIXD
---

As I enter the last week at [FIXD Automotive](https://fixd.com), a company I co-founded and built over 8 years, I'm reflecting on the journey; the successes, the learnings (and there were many!), and the friendships.

But I think of all the things I accomplished there, the thing I'm most proud of is the engineering team I built and the culture around it. In the early days when we had no cash, we had to be scrappy. We couldn't recruit people with a high amount of existing experience because we simply couldn't afford them. Instead, we recruited high-potential people early in their careers and grew them internally. And around that team we had a culture I would describe as always willing to help and step up, hungry to learn new things, and thoughtful about balancing scrappiness and reliability in an optimal way. Our team is small and very fast, despite covering a pretty insane spread of products and technologies.

Below I've shared what I think is a summation of that culture. It's our shared Philosophy from our Engineering Handbook (a concept [borrowed from GitLab](https://about.gitlab.com/handbook/)). It covers our (mostly my) opinions on how to build software, much of which was learned the hard way along the way. I'm sharing it here because these are the default set values I plan to bring to future software teams in the future. I realize some of this is specific to FIXD's size, tech stack, market, etc. and YMMV depending on context, but I think this is a healthy starting point for any software team of any size. Note that in some places it links out to other parts of the handbook, which are internal, so I've formatted those as links but removed the hyperlink itself. It's also been gently edited to remove some references that were too company-specific.

It's a bittersweet feeling to be moving on, but I'm excited to focus my attention on new problems. I'm leaving to pursue music technology full-time. Exactly what that will look like I'm unsure of right now, but I can't wait to dive in.

---

<style>
    .broken-hyperlink {
        text-decoration: underline;
    }
</style>

# Engineering Philosophy

This is a collection of values and opinions that you'll find on the engineering team. They certainly aren't rules; every decision depends on context and even if you generally agree with these you can find a situation where the opposite would be the better choice. But these can act as guidelines to aid in technical decision-making.


## People and Processes


### Move fast and break things (in B2C)

Many technical decisions come down to weighing velocity against quality. Moving fast increases the probability of a quality issue that degrades or breaks the customer experience. In B2B, losing a big client can make-or-break a business. But in B2C, we get 100s of new customers every day. Some of them are likely to have a bad experience, and often its easier to give them a refund and move on; there will be more to replace them. If we embrace this, as long as changes can be isolated to a limited number of customers, we can prioritize velocity over quality in many situations and iterate faster.


### One-way vs two-way doors

Many decisions at a company are trivially reversible. The risk of trying new things is low because if it doesn't work out as expected, the decision can be reversed and the changed rolled back to the previous state.  A/B tests of new features rely on two-way doors like this. Some decisions are one-way doors; once a decision is made, rolling back is difficult or impossible. Be quick to pass through two-way doors, and slow to pass through one-way doors.


### 50-20-20-10

When broken down into categories, a healthy Engineering should be spending:

- 50% of their time on net new features and capabilities
- 20% on keeping the lights on (scaling systems, incident response, updating dependencies, etc)
- 20% on quality improvements
- 10% on internal tooling
<!-- TODO: citation needed, I got this from somewhere but lost the source -->


### Strive to be T-shaped

Skills and knowledge can grow in two dimensions: depth and breadth. T-shaped people have basic skills in many areas and very deep knowledge in one area. Never stop learning and stretching out in both directions, but don't try to be square-shaped (deep in everything), you'll stretch yourself thin.


### Run a data team like a product team

{% youtube_embed zoqyefI5VKU %}


### Code reviews

Code review is a valuable step in the software development process as both a quality check and an opportunity for domain knowledge transfer. There's <span class="broken-hyperlink">some basic etiquette to follow</span> on both sides of a code review.

Code reviews are not enforced at FIXD, only recommended. Ultimately you alone are responsible for the correctness of your code. You should ask for a code review because you desire an outside perspective, not because you feel obligated to do so. You don't need to ask for a code review for a small or inconsequential change.


### Accept contributions from anyone at the company

Anyone should be able to submit merge requests, even if they typically work on another project, or perhaps don't even work in engineering at all. There shouldn't be an expectation of this, but the option should be available. Sometimes it's easier to just change an upstream dependency yourself rather than wait for another team to have the bandwidth to make the change for you. In these situations, be sure to get a [code review](#code-reviews) from someone who is more familiar with the particular codebase in case you missed something.

<!-- velocity and latency vs throughput -->


## Tools


### Enforce styles, not tools

Engineers have strong opinions on tools. Give them the freedom to use whatever environment they like as long as the code they contribute matches that of their peers. If the code works and matches the style, it doesn't matter if that code was written in a fancy JetBrains IDE on Windows or `vim` on a Raspberry Pi. See <span class="broken-hyperlink">Developer Machines</span>.

Follow the conventions of the language/framework's community and culture. Use aggressive automated formatting and linting, combined with code review, to enforce code style. Style conventions that are consistent throughout makes the code approachable for other team members. Avoid bike-shedding about things like spaces vs tabs; instead pick a popular, opinionated set of rules from the community (e.g. [standard](https://standardjs.com/#why-should-i-use-javascript-standard-style)) and don't waste time over-configuring it.


### The right tool

Not everything is a nail, so don't always use a hammer. Use the right tool for the job, even if it means introducing a new technology to the stack. The "right" tool depends on context; we should pick [boring tools](https://mcfunley.com/choose-boring-technology) when they aren't core to the business and avoid chasing the shiny new technology if it's not the right tool. But we shouldn't force a familiar technology onto a problem it's not good at solving.

> **Example**
> 
> Data engineers know and love Python, it's where all the tools are. If you make them use Ruby, you'll have a harder time recruiting, spend more time training, and have to re-invent the wheel often.

> **Example**
> 
> The industry is moving towards Flutter and away from native for mobile development, and if we don't keep up it will become very hard to recruit for and maintain.

> **Aside**
> 
> Some companies, notably Mailchimp, have the opposite culture value: they build everything in their chosen framework (PHP) even when a better tool exists in order to keep the stack consistent. This allows developers mobility within the organization, but creates a worse developer experience. Here at FIXD we prefer to use the right tool for the job. We can train people in a new stack if needed.


### Embrace open-source

The entire technology space has flourished on the back of a community that is willing to share advancements and build on each other's work. [The right tool](#the-right-tool) still applies, but given the choice between otherwise equal tools, one closed source and one open, prefer the open one. Open-source is inherently cheaper, contains fewer security issues, and can be adapted if a key feature is missing. But be wary of small projects with minimal support; there's a higher risk of the project being abandoned, and FIXD having to maintain a version until an alternative can be migrated to.

Using open-source software isn't completely free. It comes with a responsibility to contribute back to the community. This could be in the form of pull requests for bug fixes, new features, or improved documentation, or by publishing tools FIXD has created for others to use. Open-sourcing code has benefits beyond just supporting the community. It can be used to build visibility and trust for recruiting, for example. Any code that has been sufficiently abstracted to be free of FIXD-specific content and generally useful to others is open for consideration to be open sourced. Note that by open-sourcing something we are implicitly committing to maintaining the project and engaging with the community, even if we stop using the code ourselves, so the decision should not be taken too lightly. See <span class="broken-hyperlink">open source licensing</span> for directions.


### Debugging > logging

A behavior that clearly separates junior developers from mid/senior developers is the way they debug code that isn't working. Junior developers have a tendency to rely on logging, spreading print statements throughout the code and reviewing the logs to try and find where the behavior deviates from expectations. More experienced engineers use the debugger to step through the code in question, checking state against assumptions at each line. This drastically speeds up the debugging process. If you can do this in a unit test rather than in the running application, the cycle time is even further improved.

> **Example**
> 
> `debugger`/`byebug` in Ruby, `import pdb; pdb.set_trace()` in Python, breakpoints in Android/iOS, etc.

Logging is a useful tool for debugging in production, but excessive logging can be expensive and too much logging can create so much noise that it's hard to narrow down the specific issue. Keep application logging to a minimum, logging only key low-level interactions (e.g. incoming request/responses and background job execution on backends; new screens, high level user behavior, and network requests on front-ends) and errors. Avoid stacktraces for expected errors, only print stacktraces when an error violates defined behavior.


### Debugging in production

Ideally all bugs can be recreated and resolved in development environments. But not infrequently, a bug will arise that seems to only apply to production. As much as we try to keep staging environments consistent in setup with production, issues specific to an environment will always arise. In those situations, being able to debug in production is an incredibly powerful tool. An example of this is being able to open a Rails console in a production container and run arbitrary commands. This allows you to manually call specific parts of the code (even private methods thanks to Ruby's flexible meta-programming) to find what the issue is.

> **Danger**
> 
> With this power comes great responsibility, as a mistake in this environment can have catastrophic effects (nothing is protecting you from wiping the production database, notifying actual customers, or charging real credit cards!). Thus this power should be used judiciously and only granted to engineers who are comfortable and familiar enough with the environment to operate safely. But the ability to respond to a bug in minutes rather than days is worth the risk.

> **Note**
> 
> This power is a strong case for using an imperative language (such as Ruby) for backends rather than a compiled language.

<!-- locode -->

<!-- minimize dependencies where it makes sense -->
<!-- also mention open-source dependency notes: technology/licenses.md#using-open-source-code -->

## Code


### Code for developers first, machines second

Code is a unique form of rhetoric in that it has dual audiences, machines and developers. Machines have strict grammar rules and will interpret writing literally. For machines, code can be objectively correct or incorrect. Developers are more forgiving about grammar but speak machine as a second language, and therefore can struggle to comprehend complex ideas. Correctness for developers is subjective rather than objective. Good code clearly communicates the same idea to both audiences succinctly.


### Readability over performance

Engineering hours are 1+ orders of magnitude more expensive than infrastructure. That means code that is highly performant but hard to understand will net out more expensive most of the time, because the cost of maintaining it is more expensive. For example, Ruby is not a particularly performant language, 100s or 1000s of times slower than C. But it's much easier to write, maintain, and recruit for. Throwing a bit more compute to compensate for performance is much cheaper than writing code in C and allows us to move much faster.

Similarly, code that deals with every possible edge case in a graceful way is more code to maintain. While we should avoid too much undefined behavior, falling back to simple, defined, but sub-optimal behavior for obscure edge cases is easier to maintain and reason about.


### Declarative over imperative

For the purposes of this paragraph, "imperative" code is code that does things (loops, branches, IO), while "declarative" code describes the intended behavior. Put another way, declarative code is that "what" and imperative is the "how". Separating these two things generally leads to code that is easier to read and to change. Make the business rules declarative, and encapsulate the imperative part away from the business logic.

> **Examples**
> 
> - Config files define data or behavior, and application code reads those config files during execution
> - [Domain-specific languages](https://en.wikipedia.org/wiki/Domain-specific_language), an idea popular in Ruby and Kotlin, such as [serializers](https://github.com/fixdauto/simple_schema_serializers)
> - Bundling a collection of infrastructure into a Terraform module, and calling it with configuration arguments for the specific environment

If logic needs to change on-the-fly without a code change and deployment, that logic can be stored in a database. For example, instead of hard-coding every checkout funnel, we can create a Funnel model that describes the behavior, and these models can be created at runtime. But doing so looses the benefits of version control (consistent environments, automated testing of behavior, searchability and readability, code review, etc). Consider if in place of a database model and a UI that allows editing behavior, if instead updating a config file and redeploying code is really that much slower to change.

> **Tip**
> 
> If the declarative code is simple enough, you may even be able to train non-engineers how to [make the change without involving engineering](#accept-contributions-from-anyone-at-the-company). Editing of config files and opening MRs can be done entirely within the GitLab UI.


### No code is sacred

The codebase is a description of the company, and the company is always changing. Things that were once true are not true any longer. While we should always strive to make code extensible, sometimes it's easier to simply rewrite a feature than to learn the existing code well enough to understand how to change it. If the new code better describes the behavior in a way that's at least as maintainable, then it doesn't matter who wrote the original code or how old or new it is, the new code is better.

> **Tip**
> 
> When doing this, test against the old implementation's unit tests as much as possible so that you know the new implementation is consistent.


### Documentation is code, code is documentation

Documentation is a form of code that does not have machine checks like tests or type checking, making it harder to maintain than code handled by a compiler or interpreter. Ideally, code should be straightforward enough to follow without paragraphs of explanation. But because we have to write for [two audiences](#code-for-developers-first-machines-second), sometimes code alone is not enough to communicate an idea to developers. In this case, it's best to put documentation as close to the code as possible (i.e. comments, README, etc). Documentation that is separate from the code (e.g. a wiki), while more searchable, won't be maintained and will soon become incorrect. Incorrect documentation is worse than no documentation at all.


### De-normalize on insert

> **Note**
> 
> This applies to backend apps that wrap a relational database, particularly those written in Rails. YMMV for other contexts.

While backend apps are typically just wrappers around a database, they have some complex logic associated with them, often transforming data read in into a different form on the way out. There are generally two approaches to putting the business logic: before writing to the database or after reading from the database.

1. Follow a fully [normalized database schema design](https://en.wikipedia.org/wiki/Database_design#Normalization), inserting data into logically organized schemas with no duplication, and then write complex queries/read logic to re-organize that data in a form ready for consumption by the UI.
<br/>**Pros**: guarantees about data consistency
<br/>**Cons**: query logic can be slow, and often hard to maintain

2. Write complex insert logic that stores data both in its raw form and in a format optimized for querying, and then perform simple queries to return data to the UI.
<br/>**Pros**: Easy to read later, easier to maintain write logic
<br/>**Cons**: possibility for data inconsistency


> **Note**
> 
> Our [backend code challenge](https://docs.google.com/document/d/16scoQMqIH38pSbNJptckyDayvlsuwdMd9eNRjbm0OzE/edit?usp=sharing) for engineering candidates is designed around this idea, although we don't necessarily look for people that solve the problem the same way we do, but rather if they can think thoughtfully about these trade-offs.

We generally prefer the latter solution, which we often refer to as "de-normalization". For queries beyond selects with a few filters and maybe a few joins, an ORM will break down. And hand-crafting optimized SQL is a maintenance problem; it sucks to write in the moment, it sucks to change later, and it doesn't leverage any language features like type checking or encapsulation. If you structure your data around how it will be consumed at write time, your logic can be less efficient because it only operates on one unit of data at a time rather than possibly the whole set, and results only need to be computed once at creation time rather than repeated on every read request, and you can still leverage the ORM.

The trade-off there is we give up data consistency. There is now more than one way to answer the same question. If the insert logic is flawed, different ways could produce different answers. This terrifies DBAs, but developers are usually okay with this. To avoid data consistency problems, we typically store the raw source data as well as it's structured representation, so that in the case when a mistake is made or a feature needs to change, the structured version can be re-generated. We also rely on aggressive automated testing and database constraints where applicable to avoid these mistakes.

<!-- extensibility -->

<!-- Consistency vs Complexity -->

<!-- Language is important! be thoughtful of what you name things -->

<!-- large methods are a smell of bad design. "large" depends on language/framework -->

<!-- Hacks are sometimes necessary. Create an abstraction and hide them away with a comment explaining why it exists. Don't keep putting the same hack everywhere -->


### If you didn't measure it, it's not a performance improvement

It can be tempting to start optimizing a bit of code for performance when you see an opportunity or suspect a performance problem. Before you dive immediately into optimization mode, measure the performance first, and then compare it to the performance of your more optimized solution. You'll likely encounter cases where what you thought was an issue wasn't actually a big deal. Maybe you gained a small improvement but it wasn't worth the added complexity in maintaining the more optimized solution. Maybe your new solution is actually slower (this happens more often than you think).

Also by measuring you can then brag about it in your merge request.


### One-way data flow UIs

In the mid 2010s, React revolutionized the frontend JS world by designing a framework around the concept of one-way data flows. In this paradigm, UIs are declarative, and pass data down to their children. When data changes, the UIs are simply re-rendered with the new state. Events (typically user interaction) bubble back up or trigger background operations which eventually change the state at a higher level, causing new data to flow downwards and re-render the UI.


{% youtube_embed nYkdrAPrdcw?start=616 %}

React is not the only JS framework that uses this paradigm, and the design pattern can be implemented in any language/framework. Following this pattern makes it easy to reason about and change.

> **Example**
> 
> In frontend JS, we often use Svelte for  this. On mobile, SwiftUI, Jetpack Compose, and Flutter all work this way. This pattern can also be implemented manually in any language.


### Meaning of `TODO`

The term "TODO" implies a task that should be done later. With this understanding, you can make a good case for not leaving `TODO` comments in the code; stuff that is to-do should be put on a task backlog instead.

However, historically in FIXD codebases, `TODO` **does not** mean tasks to-do. Instead, it acts as signpost to other developers about the existence of technical debt. It might indicate a known shortcut or workaround, an extension point for a possible subsequent iteration, or 

It doesn't mean that a change needs to be made now or in the future, just that a change _might_ be necessary in the future depending on how the company or application evolves.

> _"Why use `TODO` if it doesn't mean to-do?"_
>
> Good question. `TODO` is an accepted and well-known comment pattern, and many IDEs and tools support special highlighting or other features for them. A count of TODO comments as a percentage of LOC could be used as an approximation for the level of technical debt in a codebase.


### Versioning with mobile apps

In web environments, typically your backend and frontend deploy together, so there's no need to maintain backwards compatibility of endpoints used by the frontend. Public APIs used by third parties need versioning, but deprecation cycles can pressure users to migrate to the latest version.

Mobile apps are unfortunately a different breed. End users are terrible about keeping apps up-to-date. Even if the app store pressures users to have auto-update on, users can still turn it off manually, and there's a transition period during rollout where multiple versions can be simultaneously active, as updates often happen during times of low usage, such as night charging. A long tail of users will stay on incredibly old versions indefinitely, and even if you drop support for these users, you need a solution for phased rollouts.

FIXD deals with these problems using a couple of conventions:

1. The backend reserves the right to add additional properties to models and additional optional arguments at any time. Clients should not break if a new property is added. This allows backward-compatible changes without versioning when additional functionality is added (the most common case).
2. In situations where backwards-incompatible changes need to be made, we use <span class="broken-hyperlink">a migration pattern</span> to support older implementations while encapsulating and hiding these older implementations from the main codebase. These change files operate as middleware, transforming old input data into new input format and new output data into old output format. Really old versions can travel through multiple layers of transforms. This adds a slight performance overhead to clients on an old version but makes it trivial to support old versions indefinitely if necessary.

> **Tip**
> 
> At FIXD we use per-endpoint versioning using dates in headers. Path-based versioning is difficult to maintain. Per-endpoint versioning means that not every endpoint has to update for one change. It also means that clients can selectively opt-in to some changes but not others, which provides some flexibility. And using dates rather than integers adds useful contextual information about the change to developers.


### Make the change easy, then make the easy change

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">for each desired change, make the change easy (warning: this may be hard), then make the easy change</p>&mdash; Kent Beck 🌻 (@KentBeck) <a href="https://twitter.com/KentBeck/status/250733358307500032?ref_src=twsrc%5Etfw">September 25, 2012</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

Often a behavior change requires rethinking the underlying architecture which didn't account for this new use-case. In those cases, refactor the underlying architecture first, then implement the simple change under the new architecture. This can be harder but will scale the architecture along with the application, and will create less bugs.


## Testing and Quality

### Automated, not manual, QA

Manual QA is much more expensive than automated QA. While manual QA is more flexible to system changes, it doesn't necessarily catch more issues. Running quality checks earlier in the product lifecycle (["shift left"](https://en.wikipedia.org/wiki/Shift-left_testing)) allows teams to move faster, but often manual QA has to be farther to the right, slowing down development. Most importantly, a manual QA team that is separate from the development team creates a toxic culture, where developers are tempted to throw bad code over the wall and let the QA team deal with it, and QA feels that the developers are incompetent. Automated checks are harder to write at first and can be hard to maintain, but create better outcomes and find issues faster. The more testable your application is, the less it tends to need tests.


### Follow the testing pyramid

Small, isolated tests are easy to write and maintain, but they don't tell you that the whole system works together correctly. As tests grow cover more surface area or realistic cases, they become increasingly more brittle, eventually reaching a point where the cost of maintaining them outweighs their value.

The testing pyramid is a way to conceptualize striking a balance between these. It indicates that you should have many small, focused, isolated tests (such as unit tests), some medium-complexity tests (e.g. integration), and a few complex tests (e.g. UI).

![The testing pyramid. At the bottom are unit tests, integration tests in the middle, and UI tests at the top](/images/testing-pyramid.png)

On the backend for example, you might add a dozen unit tests that cover all the functionality for your core service class, 2-3 controller/request tests of the happy path and any expected edge paths, and a single Cypress test that renders the content in the browser and tests the happy path end-to-end.

UI tests can be really difficult to maintain, but the confidence that good UI tests give you to push code to production quickly is worth the headache. If a UI test breaks, fix it early; it's the strongest defense you have against a catastrophic mistake.


### Recreate the bug in a test before you fix it

Find a bug? Before you fix it, take the time to write a test to recreate it. It shouldn't take you very long, proves you understand the bug, and most importantly keeps it from popping up again later.

You can also write the test after the fix, then temporarily revert the fix to make sure the test fails without it.

Not all bugs can be easily reproduced in a unit test, but I highly recommend doing this for the ones you can.


### Tests are documentation

Most (if not all) unit test frameworks in FIXD projects are of the "spec" variety; tests are written using `describe`/`context`/`it`. This pattern allows your tests to function as documentation of the behavior under test, saving you from having to explain behavior in comments and ensuring that the "documentation" is always in sync with the code (since the tests will fail otherwise).

When writing unit tests, think about all the cases worth covering, and then write tests as if you're describing their behavior to your peers. Behaviors that are _not_ supported by a class can be just as important as behavior that _is_, so you might write a test for that also.


## Infrastructure

### Monolith over microservices (at our scale)

For a small team, a monolith is much easier to deploy and reason about. Microservices make systems complicated and create a network of fragile dependencies. The benefit of microservices is that it clearly delineates code boundaries, so that teams can remain small and focused. This is necessary and worthwhile only at the scale of massive teams with 100s of developers. Resist microservices for as long as is reasonable. Use [modular monolith](https://medium.com/@dan_manges/the-modular-monolith-rails-architecture-fb1023826fc4) practices until the team reaches the size that microservices is inevitable.


### Infrastructure as code

Tools like Terraform and Cloudformation enable infrastructure configuration to be [declarative](#declarative-over-imperative). This makes infrastructure easy to reason about, change, and recreate, enables version control and code reviews, and also serves as documentation.


### Automate security scans

Even the most senior engineers aren't necessarily trained to approach or evaluate solutions with security in mind, and don't have the bandwidth to review every change for security issues. At a small company, we don't necessarily have the resources for a dedicated security person, and even if we did, they can't possibly keep up with everything.

We can supplement manual review with automated security checks. Plenty of free SAST tools can evaluate code for common security issues like SQL injection. Other tools can check dependencies against known CVE databases looking for packages that may introduce vulnerabilities. Other more powerful automations exist but these two are relatively easy to implement and maintain and will go a long way to catching issues.


### Make vendors interchangeable, but don't change them

It should be possible to change critical pieces of infrastructure, e.g. switch from Postgres to MySQL, move to GCP from AWS, etc. The fact that this change could be hypothetically made is a sign of a good, declarative architecture. But you should never do it in practice unless a problem is existential to the company.


<!-- saved links, some of much may be valuable but I haven't re-read yet: -->
<!-- https://staffeng.com/guides/staff-archetypes -->
<!-- https://compilerqueen.substack.com/p/when-growth_stage-pupa -->
<!-- https://www.getdbt.com/blog/we-the-purple-people/ -->
<!-- https://mikkeldengsoe.substack.com/p/roi-of-data-work -->
<!-- https://www.nngroup.com/articles/ux-debt/ -->
<!-- https://www.nngroup.com/articles/pareto-principle/ -->
<!-- https://en.wikipedia.org/wiki/Feature-driven_development -->
<!-- https://www.nngroup.com/articles/design-systems-101/ -->
<!-- Eisenhower-Decision-Matrix -->
<!-- https://medium.com/codex/anti-patterns-of-automated-software-testing-b396283a4cb6 -->
<!-- https://eng.snap.com/dont-rewrite-your-app-unless-you-have-to -->
<!-- steve C McConnell "quick and dirty" quote -->
<!-- https://novoda.com/blog/ -->
<!-- https://angel.co/blog/engineers-hate-your-take-home-project-heres-how-to-fix-it -->
<!-- https://web.archive.org/web/20220528205603/https://blog.novoda.com/no-time-to-test/ -->
