+++
title = "Landscape: A Portrait"
date = 2019-08-27
author = "Matilde Park"
description = "On the latest Urbit user interface, and the interfaces to come."
[taxonomies]
posts = ["Essays"]
+++

Last month, [alongside v0.8.0](https://urbit.org/posts/2019-7-25-update/), we released the latest incarnation of Landscape. Codenamed “Modulo,” it's our vision of an Urbit user interface designed for everyday use. Most importantly, it’s the beginning of an interface that has actual access to the entire Arvo OS, rather than just one facet — as previous iterations of Landscape were to [Hall](https://urbit.org/docs/learn/arvo/hall/).

Served after installation on your ship’s HTTP port, it begins to integrate [Indigo](https://github.com/urbit/indigo), our design language, into your interactions with Arvo. It has a home screen, which pulls ‘tiles’ for each Landscape application from Arvo — each able to integrate and customise information from elsewhere in the system and from the broader internet — and connects them to full-screen, graphical applications.

Its first application set includes _Chat_, a new, streamlined interface for previous Landscape’s duties as a chat client; a basic Weather information tile; an analog clock; and _Publish_, a place for publishing, subscribing, and commenting on ‘notebooks,’ invite-oriented blogs hosted on your ship.

That said, our unofficial mantra, “it’s not finished yet,” is performed for yet another refrain here. But it’s _close_, and it’s something we can now talk with the broader community about — both in our inspirations and visions for its future; and our steps toward enacting that future.

## Entering userspace

As a project, Urbit has been in “research mode” for most of its history. Its kernel has now had extensive work and our kernelspace engineers are the opinionated, confident veterans of the long war you’d expect from an operating system’s early history. The spoils of that war, after rewriting and refactoring several times over, are beginning to really speak for themselves.

Urbit’s kernel is leaving its rebellious period, and with it, its reliance on its parents. That said, its _userspace_ has been in embryo for most of its history. It would be restarted, rescoped into _aspects_ that could weather the awkward growth of the kernel; but it would never quite serve as an interface to the entire operating system. 

Due to one of our latest vane refactors, it’s becoming possible to start that work.

Alongside this latest release of Landscape came the rewrite of the [Eyre](https://urbit.org/docs/learn/arvo/eyre/) vane, which serves the ship’s files and applications over HTTP. Among its improvements came the decision to move from serving from one ‘/web’ folder by default, to an application-specific endpoint declaration. 

That is, a Hoon application, upon being started, now tells Eyre it wants to serve _these files_ at _this endpoint_ over HTTP, and Eyre facilitates that.

Landscape, with this in mind, serves at the root endpoint (you know, at `/`); it pre-authenticates the user, and it provides an API to your ship for applications (and their tiles) to access and poke, peer, and scry the ship with.

Whereas before, a ship had a web server that was good at serving text-dominant pages, but was more obscure for complex (or graphical) applications that made use of the Arvo OS and network; _now_ a ship launches with a web-based interface for the Arvo OS that makes applications much simpler to experiment with and develop.

And if you want, you can just serve files at any endpoint with [a boilerplate](https://github.com/matildepark/urbit-static-page).

The additional bonus? Arvo access and Hoon logic are now, by default, inside their own application on the ship itself — not served as inline code in the front-end, which allows for a magnitude of improvements for the separation of concerns and more complex and performant applications, too.

(If you want to play around, there’s an [experimental tool](https://github.com/urbit/create-landscape-app) you can use to get a full-stack boilerplate running in about 40 seconds.)

All this is fantastic news; and while Landscape-oriented userspace development is now _possible_, it’s still not all the way to being an interface to _an operating system_. For that, we’ve started drawing up specifications and proposals for what it takes to get to that point going forward.

## Rethinking interfaces

Among the inspirations for our team are [the tales of Andy Hertzfeld](https://www.folklore.org/StoryView.py?project=Macintosh&story=Were_Not_Hackers!.txt), working on the Macintosh; and the ongoing [discussions](http://doc.cat-v.org/plan_9/4th_edition/papers/812/) and [decisions](https://research.swtch.com/help.pdf) that went into Plan 9 from Bell Labs. (And sometimes, for fun, we also watch videos about [the Xerox Alto](https://www.youtube.com/watch?v=tngrLvyiNEI).)

The common rationale among these inspirations is that their creators were dealing with really primordial stuff — the font of human-computer interface had really just sprung, and they were _seeing things no one had seen before_ because they _had to_. 

And doing that now — after a lifetime of our reflexive familiarity with the dominant affordances, we have to do the work of _unseeing_. By engaging with what it was like to see for the first time, you can get closer to seeing with those eyes. You work to avoid implicitly categorising the new territory as simply, well, comparative to the old one. 

So while it’s not the same to simply _read_ these dialogues, it can get pretty close when it comes to the kinds of priorities that win our internal debates.

One reason this iteration of Landscape isn’t the last is because — we have to emphasise — this is not the only interface a ship will have. We aren’t creating a web platform. It should be possible to use _just_ the command-line; ideally, it should be possible to just output windowed interfaces from Arvo itself. It should be possible to SSH _and_ SMS into your ship, should you want to.

And after all, we _are_ creating a decentralised platform of personal servers with an entirely new stack from the kernel up. Most of the world’s computers descend from Unix, and Unix was based on [timesharing](https://en.wikipedia.org/wiki/Time-sharing) — multiple users on one computer, all pretending it was theirs — and really, everything since never left that mindset.

So what do we think that new platform now needs from its interface?

**Landscape, and all of Urbit’s future interfaces, need a standardised way to view and edit the filesystem.** We had circumnavigated this by mounting to Unix, but it’s now time to confront that issue.

**Landscape, and all of Urbit’s future interfaces, need a way to easily organise around _cohorts_ of ships, or _groups_,** with shared applications or files and a socially-oriented computing experience in turn — [something always in the vision](https://urbit.org/posts/azimuth-is-on-chain/#aegean), but not quite implemented yet.

And last, **Landscape, and all of Urbit’s future interfaces, need a userspace-specific, software design pattern** to integrate all of this: access to the file system; permissioning shared sets of files; and tying it together with an underlying representation of both data and interface among many computers. 

No more siloed input/output in applications on a ‘timeshared computer’ with your redundant data always belonging to someone else.

## Into the future

We are currently prototyping these features — these massive ideas and almost a decade of userspace debt — as we support and integrate their goods into Landscape. Right now, Landscape applications are still _monolithic_ and geared exclusively toward _single-person computing_. We hope to change that, and keep communication open with developers so it’s easy to have your own development keep pace with ours.

It should be easy to share whatever data with your friends as you like; to permission files programmatically on a server that is permanently, irrevocably _yours_.

It should be easy to read, annotate, and discuss a shared book with a specific set of friends; or only allow another list of people to see files in a specific directory if they meet a requirement you set. The imagination sparks many ideas for the enterprising and entrepreneurial.

We will backport these exploratory developments into Landscape as they continue and evolve. Even in the kernel, as we refactor [Gall](https://urbit.org/docs/learn/arvo/gall/), the userspace handler vane; even as we begin to standardise new, streamlined practices for writing userspace Hoon, like the [async monad](https://groups.google.com/a/urbit.org/forum/#!topic/dev/DDG6gHSG1Lc), which allows you to, for example, not even have to deal with moves at all, or handle each and every response in separate parts of the application. Userspace Hoon should be laconic and parseable, and we’re reifying and communicating that.

Most importantly, we'll continue to iterate how we onboard new developers into Hoon and Arvo. [Hoon School](https://urbit.org/hoonschool) continues to evolve; its first cohort is thriving and friendly. We have a dedicated cast of teachers and ongoing access to much of Tlon through this stream.

And if you’d like to come, you’ll discover a computer that, from the bottom up, you can learn and master. Right now, it is a labyrinth for the intrepid; but for the future, and forever, it is _mappable_. A landscape, after all, doesn’t show a single leaf, but the earth and the horizon ahead.

**Matilde Park** `~haddef-sigwen`