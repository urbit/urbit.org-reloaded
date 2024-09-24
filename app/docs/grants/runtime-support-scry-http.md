---
title: Runtime Support for Scry over HTTP
subtitle: Pull RSS/Atom media into the namespace.
reward: 3
champions:
  - name: ~example
  - name: ~example
id: B0383
date: 2024-07-19T00:00:00
short_description: example
category: Bounty
status: Open
application_link: https://google.com
---

RSS has been an important primitive for Web 1.0, 2.0, and web3, fundamentally unchanged since 2002. There’s been renewed interest in the standard in recent years as “enshittification” became a meme and both creators and consumers more keenly felt the limits of the walled gardens that controlled their media distribution.

Urbit’s personal server model and programmable global namespace stand to unlock RSS’s full potential as a standard for a decentralized, user-owned, peer-to-peer media ecosystem. For a start, a user should be able to subscribe to clearweb RSS (and Atom) feeds and store them in their namespace.


# User Stories

- I can create an `%rss-aggregator` shrub at a given endpoint.
- Browsing to my `%rss-aggregator` shrub provides a UI for browsing an ordered list of `%rss- entrys` that let me click through to the relevant webpage, and a UI for entering a set of subscription endpoint URLs, which will be represented as %rss-subscription children.
- When I enter a new endpoint URL to my %rss-aggregator shrub, it will create an %rss- subscription child whose children will be populated with a backlog of prior entries from that endpoint as %rss-entrys.
- From then on, each new entry from that endpoint will populate in the children of the %rss- subscription as %rss-entrys, fetched via a refresh timer.
- I can add as many new endpoints to my %rss-aggregator shrub as I like, and the shrub will aggregate the subscriptions to each of them and organize them by timestamp.