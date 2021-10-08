+++
title = "Clojure Urbit Client"
date = "2021-10-07"
[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev - Other"]
[extra]
image = ""
description = "Urbit client baasd on the Clojure programming language"
reward = 3
assignee = ""
id = ""
completed = false
link = ""
+++

## Clojure Urbit Client

Clojure is a functional dynamically typed lisp which runs on the JVM. It lends itself very well to designing correct, situated programs and can easily benefit from the JVM ecosystem. Being functional and immutable by default makes Clojure a good fit for building concurrent event driven systems.

### Design

With the end goal of an alternative, cross platform desktop client for Urbit, the steps are as follows:

- A SSE client in Clojure
- An Urbit client library built on top of the SSE client
  -- Should at least be able to programmatically communicate with chat app and query graph store
  -- The client should also be usable from Java
- GUI
  -- Why run a browser at all? Urbit is all about APIs
  -- Will need to choose between JafaFX and SKIA
  _ JafaFX: mature, stable, has cljfx which provides an excellent model
  _ SKIA: up and coming framework, has native capabilities, less mature
  -- Will run on any platform which can run Java
  -- If one day Urbit is ported to Java, imagine the possibilities of running the GUI and server in the same process

Regarding the amount of stars below, I believe the first milestone is simple and does not merit a reward at all.

The second justifies a star when it allows one to send and receive chat messages

The last is a significant achievement (first non js graphical client?), which is worth at least 2 stars when chats work.

Further work might justify more stars.

## Milestones

### Milestone 1 - Create client and send/recieve messages

Expected completion:

Payment: 1 star

### Milestone 2 - Develop and deploy GUI

Expected completion:

Payment: 2 stars
