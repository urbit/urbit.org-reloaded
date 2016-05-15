---
sort: 1
type: post
title: Urbit overview
author: Galen Wolfe-Pauly
image: http://urbit.s3.amazonaws.com/16-3-10/blog-0.jpg
preview: A simple system is easier to maintain, easier to develop for, and easier to understand.
layout: urbit,post
navmode: navbar
navdpad: false
navselect: blog
navpath: /
navhome: /
navclass: urbit
---

Urbit is a personal cloud computing platform.  You can install Urbit on any Unix-based system to turn it into a self-hosted node on a new decentralized network.  

We have a computer on our desks or our laps, and a smaller one in our pockets, but our computing is actually spread across the cloud services we depend on.  These services all look pretty similar.  They each keep track of your identity, store your data and provide some interface to compute with.  Your Urbit is designed to provide these same features — but on a single server that you own and control, running on a secure decentralized network.

When centered around the individual a computer can be a vehicle for invention and exploration;  a tool for one to discover what’s possible.  A computer should be an open-ended device for the advancement of our thought, our relationships and in turn, our society.

Urbit is designed to be such a computer, intended to restore the possibility of general-purpose computing for our cloud-permanent future.  We look forward to a world where each person has a single place where they store their data and decide what software to run, on a platform they cryptographically own, and can both program and control.  

Your Urbit is your digital identity, permanent personal archive, general-purpose computing platform and secure network of devices.  The convenience of cloud computing is fantastic, but it need not come at the cost of our privacy, control and, most importantly, creativity.  

## Platform as product

At its core Urbit is a system for others to invent on top of — to reimagine what a computer should be.  Urbit is a general-purpose personal computing platform for the cloud designed to make computing on the network simple enough for an ordinary user.

The first thing Urbit is good for is taking control of your existing cloud services.  Your Urbit allows you to program and control your cloud services as if they were all part of a single system.  Sort of like IFTTT if it were a piece of systems software.  A simple stateful tool that can `ls` your GMail, or send a tweet when a GitHub issue gets closed.  We're working to make the Urbit programming environment treat web APIs like I/O.

Urbit is also currently a simple self-hosted publishing and communication tool.  Your Urbit hosts your static content in a way that’s flexible.  It's quick to create a blog o website just by creating a tree of markdown files.  Today we all create a variety of different kinds of content, but find it permanently tethered to the service we created it with.  As a publishing tool Urbit is designed to bring our content together into a single customizable system.

These first steps are just the beginning.  At first, your Urbit is a transparent layer to the things you already have.  Next it’s a reliable archive all your data.  Over time your Urbit grows into a world all its own.  One in which you have a single digital identity, never lose data, can run any software you like — without any cost of switching — and don’t have to worry about privacy or security.  We go into more detail about this in a longer post on [product futures](../2016-3-7).

## Approach

The foundation of the cloud is a Unix box with an internet connection — a pair dating back to the 1970s.  In the 70s there was no universally available broadband, no global layer of 99.99999% uptime data centers, nor any concept of social networking.  We have outgrown the original architecture of the internet as we have discovered and invented what the web is useful for.  The tools for building apps and services are quite mature, but they’re designed for a centralized model.  Anyone who wants to run their own computer in the cloud has to learn to use a bare unix server, which is full-time job.

Our approach is to provide the same suite of services that we have come to expect from the server side, but for an individual to own and control independently.  Urbit bridges the gap between Unix and the application layer with a single simple system instead of a toolbox of interlocking parts (aka 'the stack').  Each Urbit is a self-contained system that's independently controlled, but seamlessly a part of a global network.  

Urbit treats the cloud like the internet treated the phone system.  Our system runs on any Unix box with an internet connection, providing a clean and simple platform for individuals to independently compute in the cloud on top.  

## The system

Urbit’s design is a bit like a mechanical device: simple, pared down and optimized for flexibility and durability.  

Practically Urbit has three layers: Arvo, our operating environment; Hoon, our programming language and Nock, our virtual machine.  Arvo is composed of kernel modules familiar from the web stack: a global, immutable revision-controlled filesystem, a build system, a web server, a typed networking protocol and an application model.  Hoon is a strict, typed functional language similar to Haskell but without the math.  Nock is a simple combinator that’s the Urbit equivalent of the lambda calculus.  The entire system fits in about 20K lines of code and can be understood in its entirety by a determined engineer.

Just a few of our techncial wins:
- Deterministic computing.  Your Urbit's state is a fixed function of its event history.  Need to replay a few million events?  No problem.  We arrive at the same byte-for-byte state every time.
- Single-level store.  Urbit makes no distinction between memory and disk.  Your program state lives forever since the entire system acts like a database.
- Typed, exactly-once networking.  Urbit networking is designed to make calling remote functions the same as doing local computation.
- Typed, global, immutable revision-control.  The entire Urbit network shares a single filesystem.  

Urbit today is a proof of concept.  It runs, works pretty well, and will happily entertain any interested developer.  There’s lots to work on and lots to explore.  To learn more and get set up head over to [the docs](/docs).

## Address space

The foundation of Urbit is the address space.  The Urbit network / PKI is a decentralized, finite, global address space where each address is a piece of cryptographic property.  If bitcoin is money and ether is law, Urbit is land.  An Urbit address is a short, memorable name that you can route packets to.  It's kind of like a username, IP address and domain name all rolled into one name that you keep forever.  Since there's a finite number of them, all of which can only be transferred a limited number of times, addresses cost money.  How much?  More than you’d make spamming and abusing the network.

At first that cost is nearly zero.  The network is young and unpopulated.  Urbit solves this problem by dividing address space into blocks.  The first 2^8 can invite the following 2^16 who can invite the remaining 2^32.  Early blocks are designed to be nodes of trust.  They perform routing tasks (p2p discovery) for their children, and also sign the keys for new nodes.  Child nodes are free to change parents, but will always need to find a parent who will take them on.

For us, this is a feature.  To build a sane network we think the right approach is to create multiple decentralized bottlenecks for entrance.  In this design authority never resides in one place, and accountability between nodes is preserved.  The network is inescapably driven towards decentralization since individual nodes are incentivized to give away their invitations.

The address space is intended to become what a network ought to be: reputation infrastructure. A network where addresses represent actual humans would be a fantastic achievement.  Identity is a basic primitive completely unsolved by the web today.  We have centralized systems of identity authority (Facebook, Twitter, Google) — but they’re hardly digital passports.  An Urbit is a secure, verifiable digital identity system with no central point of control.

Learn more about the address space in [the network architecture doc](2016-3-9).
