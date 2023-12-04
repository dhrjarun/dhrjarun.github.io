---
title: My 4-months journey in opensource
publishDate: 2022-12-29
draft: false
---

Once when I was new to web, I read the codebase of [Chakra UI](https://github.com/chakra-ui/chakra-ui). That was the first time I ever read someone else code. The Second time I read the codebase of [style-dictionary](https://github.com/amzn/style-dictionary). I must say I learned a lot just by reading the codebase. Reading someone's code can teach you that no tutorial can. It's like learning from the artist by studying their art.

That is why I wanted to get into the world of open source.

I knew all the basics of open source like you have to read the CONTRIBUTING.md file. Follow their commit naming convention. You should first ask instead of directly submitting the pull request. And I was quite familiar with git and GitHub.

Four months ago before September, I came across a tweet by [Tanner Linsley](https://x.com/tannerlinsley). The tweet was about [Sachin Raja](https://x.com/s4chinraja). He was sponsoring him for his contribution to react-query. I visited Sachin Raja's profile and found he is one of the core members of [trpc](https://github.com/trpc/trpc).

On 1st September, I DMed Sachin Raja asking about his journey in open source. And he was kind enough to reply with a couple of paragraphs. Gave me some points on how to approach and what not to do.

As he said, start with the library, you have the dependency and contribute to one which has fewer contributors. I started with [Mantine UI](https://mantine.dev), went to their issue page but wasn't able to figure out what to work on. So I DMed Vitaly Rtishchev(creator of Mantine UI) and he gave me a couple of good-first-issue to work on. I did my best and submitted the pull request the next day and yeah It got merged. I was very happy. I even [tweeted](https://x.com/dhrjarun/status/1568225208397611008?s=20) about it.

I was a big fan of [Tanner Linsley](https://twitter.com/tannerlinsley) and [react-query](https://github.com/TanStack/query) so I wanted to make some contribution. That's why I started to work on fixing a bug in react-query. I submitted the PR and yepp once again it got merged. My desire was to make some more contributions to react-query but couldn't figure out what to work on. So I pinged [Tk Dodo](https://x.com/TkDodo) on discord asking about what to contribute next, sadly I didn't get any response.

The creator of Chakra-UI, [Segun Adebayo](https://twitter.com/thesegunadebayo) was working on [ZagJs](https://zagjs.com/), still working on it. Since I wasn't getting any reply from Tk Dodo. I messaged in ZagJs discord server asking for any contribution I can do. And here too I had to face disappointment.

That I guess was the lowest phase in my open-source journey. I again messaged Sachin explaining my situation. He said just focus on one project at a time and don't ping someone directly, It can be taken as rude.

I followed the advice and put my focus on Mantine. I made some big contributions there. The Rating Component in Mantine-UI is built by me. I wrote code, tests and even the docs which I fear the most. I didn't know about that but they gave me the contributor badge on discord.

The feeling that your code is being used by some developers out there is awesome. I had an npm package which was some plugin to some old library. Because of some reason I needed to remove it. But since It had just one developer using it ( I know because he created some issues on GitHub), It was very difficult for me to delete.
After two months in open source, I had one big wisdom that I would like to share.

Don't consider contributing to some mature project like what I did in the case of react-query. React-query is already built, It has all the features it needs, It is well known, and a lot of developers are there to contribute. In such projects, you can't make any big impact.

Now there was nothing to do in Mantine for me so, I was in search of something big, some project which is just starting out and there are a lot that needed to be implemented.

I found [Rome](https://github.com/rome/tools) because of [Alex Kondov's](https://twitter.com/alexanderkondov) [article](https://alexkondov.com/we-need-better-tooling/). Rome is all in one frontend tooling library. It is going to be a formatter, linter, bundler, test runner and many more with very less configuration. Currently, only formatter and linter are implemented so there's a lot to be done there.

Rome is written in rust and I didn't know rust. So for a week, I read the rust documentation. Then started reading the Rome codebase. At first, I was just clueless. I started to learn about the parser, compiler, AST, CST, and grammar. Specifically, the [videos](https://youtube.com/playlist?list=PLhb66M_x9UmrqXhQuIpWC5VgTdrGxMx3y) of [Aleksey Kladov](https://github.com/matklad) were helpful since many crates in Rome are forked from rust-analyzer.

After spending 2 weeks on all this, I thought of making some real contribution. I found a good first issue. It was something to do with Rome's playground. In the PR I didn't write rust, I wrote typescript.

After the merge of pr, I searched for another issue to work on in Rome, but couldn't figure it out. I tried a few things to implement but couldn't do it.

I guess I was kind of exhausted from the reading Rome codebase, and learning about rust, compiler, and parser. So I took a break from Rome.

After that, I got to know about [Evidence](https://github.com/evidence-dev/evidence) through [HackerNews](https://news.ycombinator.com). I thought its an amazing project, I read the codebase they were using svelte. So I learned svelte and kind of loved it. I built a Funnel Component for Evidence.

In the meanwhile, I got the idea of my own open-source project, so I started working on that, currently, it's private, I will make it open after the completion of the first version.

Two weeks ago, I got a mention from [Micha Reiser](https://twitter.com/MichaReiser)(He is a core team member of Rome) asking if I want to implement JSON array formatting, I agreed and gave my best in implementing that.

Currently, I am working on implementing a linting rule in Rome.

Next year(2023), on 1st February, my exams will start, that's why I am not working on my project.
So that is it, my journey in open source. In the future, I guess I'll work on Rome and my project.
