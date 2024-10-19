---
title: Dredge Log 3
publishDate: 2024-10-19T04:43:35.619Z
draft: false
archive: false
---

## Before this week

As discussed in the last [dredge-log](https://dhrjarun.com/writing/2024-09-dredge-log-2) that I'll be contacting 100 people actually I failed to do so and in fact I am changing my strategy. Why did I quit on this particular way? The reason might be I find it hard for me, I tend to procrastinate, it drains me. 

I had various sources through which I found couple of developers who seem to be Typescript enthusiast. But i was afraid how would they respond, am I spamming them? Previously when I contacted few people for their advice or to ask a question most of them responded, but now when I asking them to try something I built nobody cares to send me a reply. Maybe this is not how an OSS project should be marketed.

I am not the best person to carry out the process of cold outreach. There were other methods to market and I should have tried those which are aligned to my personality first, this outreach method should be the last one after everything have failed. 

There are few projects like Valibot, tanstack/query which could be used with Dredge, but for that I have to write some code. These project sometime have a page where they list project which could be used together. People will know about Dredge, if it is listed on their favorite tool page.

## This Week

This week, I added support for Valibot and Arktype. I contacted creator of Arktype on discord and he and one other contributor help me with that. I think from those message in their server, few people visited my GitHub and now there are 7 stars. I forget to mention that 2 stars would have came from a [reply to Artem tweet](https://x.com/dhrjarun/status/1845858424111661360) on X. I have been trying to tweet everyday on X, about my work on the project. Tweeted that "now my project support Valibot" and creator of Valibot liked and followed me back. 

I removed the \`route.build()\` method from \`dredgeRoute\`. I have substantial change in my mind which I spend all day thinking, which would remove the \`res.next()\` and \`res.end()\` and add \`res.up\`. There are some redundant and unnecessary API in the project, which has no purpose, but somehow came into existence maybe I copied from somewhere or now I have no idea what problem it was trying to solve. I remember a quote from \[Terence Tao biography]\(https\://mathshistory.st-andrews.ac.uk/Biographies/Tao/), which explain it well the process of creation. 

\>Tao says that his insights arrive, when they do, after much hard work. He gets ideas from reading, from other mathematicians, from taking long walks. Sometimes, one idea reminds him of a similar problem he saw somewhere else that might prove useful now. Most paths lead nowhere, but he learns something even in the cul de sacs. "Once you solve a problem," he continues, "you tend to remember only the short path that got you from A to B. You forget all the dead ends. It's a bit of a shame. It gives the wrong impression that people who are good at mathematics only choose the right steps. But there is a lot of trial and error and really terribly embarrassing ideas. Sometimes there is a 'eureka' moment, but it's more of a hitting-your-head moment: 'Of course, why was I so dense?'
