---
title:      Doing it Wrong
subtitle:   Thoughts on asking the *right* interview questions
date:       2014-9-8 16:42:00 -500
layout:     post
published:  true
category:   other
tags:
- software
- jobs
- interview
- soapbox
mathjax:    false       # enable this if you want to use LaTeX
---

Somehow at all my past employers (with the exception of my highschool retail job), I've been asked to assist in the interview process for new employees. This was in spite of the fact that these were all intern jobs. Maybe this is common practice, but I get the impression that it isn't. In any case, it should be. I've learned a lot not just about how to interview well, but about how to find and recognize talent. If you own a company and your interns don't sit in on interviews, at least for new interns so they can answer questions about the experience, you should absolutely consider it. 

Anyway, here are some things I've noticed, come to look for, etc.


## Don't ask *those* questions. 


You know. Questions like

> When would you use the Singleton pattern?

or

> How would you implement a priority queue in `[insert my language]`?

These questions are either the kind of thing you might have seen in an undergrad class, assuming you took it and remember it, or they are things that panicked interviewees look up the answers to and memorize before a technical interview. They tell you nothing about the applicant's practical problem solving skills.

In fact, it doesn't even tell you if they know specifics of your language/framework's patterns or syntax- just how thorough their CS education was and how good their memorization skills are. You risk tossing out a lot of self-taught coders with practical skills in exchange for developers with a lot of theory who have never built anything the way software actually gets built. The software industry is notorious for these kinds of questions, but I suspect it happens in other technical industries too. 


## What's really important


### 1. Do they naturally pick up new skills? 


This is the single most important skill for an engineer. It is more important than experience, and knowledge, combined. My mother could take classes at the Iron Yard and learn Ruby on Rails in a matter of weeks (you should seriously do it Mom!). Anyone can code. Everyone _should_ learn to code. But not everyone has the ability to pick up skills naturally. In fact, I believe the people who do already have those skills got them on their own. No one running a business should hire someone who's only experience is taking a class, unless they demonstrate their ability to adapt. 


### 2. How do they approach problems?


This is the one area where I advocate asking specific technical questions. Google and others like to ask off-the-wall questions like

> How much would it cost to wash the windows of all the skyscrapers in Atlanta?

or

> How many golf balls can you fit in a school bus?

Some people absolutely hate these questions, but I really enjoy them. There are only two wrong answers to this question. One is to say "I don't know" and move on, and the other is to guess an answer with no support. These are for interviewees to show off the way they think.

So my answer is usually to pull out a piece of paper and start making approximations- "Well, a golf ball is around 1 inch in diameter, so..." But of course there are other perfectly good answers, such as pulling out your phone and Googling it. This shows a high pragmatism and desire for efficiency, both of which are great traits for engineers. So if you decide to ask a question like this, be sure to look at what the answer says about the person, not what the answer is.

Even though I love getting asked those off-the-wall questions, asking them feels a little hokey, so instead I usually set up a very specific scenario and ask how they would approach it. More technical questions will slightly mask the fact that it is a problem-approach question. This should make the answers more representative of actual thought processes, so I will throw it between a couple of tech knowledge questions. Be sure you leave the problem broad enough for there to be many solutions. Don't fish for an answer, and certainly don't count off for them offering a different solution than what you expected (you want this!).

For example, here's one I've used before:

> You have a large music library of MP3 files. How would you determine the total number of minutes of music you have?

I'd be expecting a bash one-liner answer because that's how I'd solve the problem, but if someone said they'd find a Python package or Ruby gem for getting MP3 track info and then write a script, that answer is just as valid. In this case, it tells you they know their platform and they don't rewrite things that already exist. This is very different from someone who decompresses all the files to WAV and uses bit depth and sample rate to convert file bytes to minutes, which is very different from someone who exports the library data to a spreadsheet and adds up the column. All totally valid solutions with very different approaches.


### 3. Can they communicate well enough to teach others?


One thing I will do is ask a naive, broad question about a field the applicant clearly knows a lot about. Ideally, I'd know the answer already, but sometimes I've asked things I've sincerely been curious about. I have to be sure to phrase the question in a way that sets up a teaching interaction. For example, I might say,

> I honestly don't know the answer to this, so maybe you can teach me: What's the purpose of the `/lost+found` directory on linux?

This works particularly well for me, considering nowadays I'm younger and less experienced than the person I'm interviewing. I play the "just an intern" card. If you are the engineering manager in that field, you probably can't get away with this. But if you can, you learn a few things. Can they break down the problem into parts that are appropriate for the learner's knowledge level or domain? Can they express them in a way that is coherent, or even better, with a unique perspective? Can they do it without coming off as derisive or the opposite- uncertain? Are they willing to admit the limits of their knowledge, and defer to other resources? If they get excited when you ask the question, that means they love to teach, or they have a real passion for the topic (or likely both)- any of which is a very good sign.