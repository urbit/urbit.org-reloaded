+++
title = "Overview"
weight = 2
template = "doc.html"
aliases = ["/docs/learn/azimuth"]
+++

Azimuth is a general-purpose public-key infrastructure (PKI) on the Ethereum
blockchain, used as a platform for _Urbit identities_. You need such an identity
to use the Arvo network.

The primary way to interact with Azimuth is through
[Bridge](https://github.com/urbit/bridge) and the node libraries that it depends
on, [azimuth-js](https://github.com/urbit/azimuth-js) and
[urbit-key-generation](https://github.com/urbit/urbit-key-generation). Take a
look at the source and play around, or see [Getting Started](/getting-started/).

## Arvo vs. Azimuth

Urbit is a project, not a single computer system. It has multiple components:
Arvo, the operating system; and Azimuth, the identity system. Let's compare
them.

**Arvo** is an operating system that provides the software for a personal
server. These personal servers together constitute the peer-to-peer Arvo
network. To make this network work on the social level, Arvo is built to work
with a system of scarce and immutable identities.

**Azimuth** is the public-key infrastructure built to be a system of scarce and
immutable identities. It consists of a suite of [smart contracts on the Ethereum
blockchain](https://github.com/urbit/azimuth) as well as [several
apps](/docs/azimuth/l2-flow) run locally on your urbit. Togeter, they determine
which Ethereum addresses own which Urbit ID's as well as the public keys needed
to communicate with those ID's. All identity-related operations, such as
transfers, are governed by Azimuth. Azimuth isn't built strictly for Arvo -- the
smart contracts on Ethereum are sufficient to be used as a generalized identity
system for other projects.

These otherwise-parallel systems meet when you want to connect to the Arvo
network. Your Arvo personal server, called your _ship_, needs to be able to
prove cryptographically that it is who it says it is. This proof comes in the
form of a keyfile, derived from your identity, that you use to start your ship.

A metaphor might help illustrate the relationship between these two systems: the
Arvo network is the neighborhood that you live in; Azimuth is the bank vault
that stores the deed to your house.

## Naive rollups

In 2021, Tlon introduced a new system to Azimuth intended to reduce gas costs
for working with Urbit ID and friction associated with using cryptocurrency in
general called **naive rollups**, often referred to as **layer 2**. This system
allows batches of Azimuth transactions to be submitted together as a single
transaction using an urbit node known as a "roller". The PKI state transitions
resulting from these transactions are computed locally by your urbit rather than
by the [Ethereum Virtual Machine](https://ethereum.org/en/developers/docs/evm/).

Due to the dramatically reduced cost, Tlon offers their own roller that is free
for ordinary public use. This enables new users to get started with a permanent
Azimuth identity without any prior knowledge of Ethereum, cryptocurrency, or
blockchains.

A casual overview of the naive rollups system can be found on the
[blog](/blog/rollups) as well as the Pilot's Manual (insert link). Developers
are encouraged to read our Layer 2 documentation, starting with the [Layer 2
Overview](/docs/azimuth/layer2).

## Other resources

### [Urbit HD Wallet](/docs/azimuth/hd-wallet)

Azimuth has its own optional hierarchical deterministic wallet system, sometimes
referred to as a "master ticket".

### [Life and Rift](/docs/azimuth/azimuth)

An explanation of how Azimuth keeps track of the most recent set of networking
keys necessary to communicate with a ship.

### [Advanced Azimuth Tools](/docs/azimuth/advanced-azimuth-tools)

Expert-level tooling for generating, signing, and sending Azimuth-related
transactions from within Urbit itself.

