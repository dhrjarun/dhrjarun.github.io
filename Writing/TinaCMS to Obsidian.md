---
title: Migrating from TinaCMS to Obsidian
publishDate: 
draft: false
archive: false
---

I had setup up [TinaCMS](2024-07-integrating-cms-to-my-blog) to make it easier to write and post blog. It made it easy thought but to be frank I did not like it much. The reason could be many, but the main would be I wanted something local. 

Here are some other reasons:
- editor is not a native markdown editor.
- I store all my content on GitHub, with Tina all my content was authored by their bot not by me in git history. This might not be a big issue for some but it irritated me.
- I do not like their library to setup it in Astro site. I would much prefer Astro content collection and now with Astro 5 content collection layer, it made everything simple.

I wanted to keep content and code in separate repositories. I was thinking for a ways to do this perfectly for a while, considering writing my own solution. Suddenly Astro released the content layer and it made things easy. Current solution of mine is not perfect but it works. I am using obsidian, employing few plugins to make my life easier like templater and git. 


I have a few things to implement in the site. Like RSS, fetching comments from other platforms like Bsky and Mostodon. I came across [IndieWeb](https://indieweb.org/). I like the ideas there. Adding projects pages.