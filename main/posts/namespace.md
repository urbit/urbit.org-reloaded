---
sort: 3
type: post
title: Address space
author: Galen Wolfe-Pauly
image: http://urbit.s3.amazonaws.com/16-3-10/blog-3.jpg
preview: Urbit address space is like digital land.
layout: urbit,post
navmode: navbar
navdpad: false
navselect: blog
navpath: /
navhome: /
navclass: urbit
---

Urbit addresses are like a combination of an IP address, a domain name and a username.  Your Urbit name looks something like `~talsur-todres`, which is an address you can route packets to, use as an authentication token and quickly commit to memory.  

Urbit addresses are cryptographic property.  You own them like bitcoin or ethereum.   Addresses are issued by having a parent node sign your initial key.  Urbit does not use a blockchain — address space is digital land, not digital money.  Child nodes are independent after their initial key is signed.  The goal of the address space architecture is to incentivize the network to grow continuously towards decentralization over time.

The IP + DNS identity scheme on the internet worked well in the early days, on a small network.  Today we rely on cloud services to store our identities.  The network layer is both too complicated and full of spam to be usable by ordinary people.  The result is that we have separate accounts, with separate passwords, on each of our services.  We don’t own these identities in any meaningful way, and we certainly don’t own the reputation data that’s associated with them.

The Urbit design emphasizes the separation between identity and reputation.  Your Urbit address functions as a universal identity infrastructure.  Your Urbit can hold the keys to your services and authenticate with them, as well as provide the platform for reputation systems to be built on top.

Your Urbit address is your home on the network.  A fixed point in cyberspace to anchor your identity.  

## Design

“Wherever possible, work toward the evolution of independent regions in the world [...] each with its own natural and geographic boundaries; each with its own economy; each one autonomous and self-governing; each with a seat in a world government, without the intervening power of larger states or countries.” [0]

The Urbit address space is designed to evolve towards a decentralization harmoniously.  In spirit this design is like the design for a city prior to its existence.  All of the contingencies haven’t been accounted for, but the general structure is in place.  As a city grows so do its regulations, but they can’t be anticipated at the outset.  Our main goal is building a network that balances cultural trust and technical specificity.  If the early internet required extremely high trust between participants and bitcoin requires almost no trust Urbit falls squarely in the middle.  This is intentional.

The design of the Urbit address space uses two pressures to ensure that the address remains spam-free and high trust: scarcity and the distribution of responsibility.

For any digital identity primitive to work it must be scarce.  Any network where addresses are disposable quickly succumbs to sybil attacks.  When there’s no cost imposed on bad actors they proliferate quickly.  An Urbit address should cost more than one would make sending spam from it.  Since Urbit addresses are permanent they’re easy to blacklist.  Bad actors are easily punished.

In a young network scarcity isn’t sufficient, since an Urbit address is initially worth nothing.  A young network is populated by pioneers and homesteaders.  At first individual addresses aren’t valuable, but blocks are.  Since our goal is a completely decentralized mature network we distribute address space in blocks at the beginning.  This begins the process of decentralization by spreading responsibility among early adopters while preserving scarcity.

## Implementation

The Urbit address blocks are nested into one another.  The top 2^8 (256) ‘galaxies’ are written into the kernel.  Each galaxy can issue 2^16 ‘stars’, each star can issue 2^16 ‘planets’ and each planet can issue 2^32 ‘moons’.  The 2^128 ‘Comets’ sign their own certificates and are presumed to be disposable.  

```
8 bits    galaxy  infrastructure  ~syd
16 bits   star    infrastructure  ~delsym
32 bits   planet  human           ~mighex-forfem
64 bits   moon    device          ~dabnev-nisseb-nomlec-sormug
128 bits  comet   robot           ~satnet-rinsyr-silsec-navhut--bacnec-todmeb-sars
```

Galaxies and stars provide routing infrastructure for the network.  Planets are assumed to be for humans and moons for their devices.  Galaxies, stars and planets are all independent once issued.  They sign their own key updates and aren’t dependent on a specific parent.  The hierarchy exists solely as a system for ensuring fair distribution.  The owner of a galaxy can independently distribute 2^16 stars, and so on down the chain.

## Relationship to BTC, Ethereum and the blockchain

Blockchain systems are great for formalizing exchange of value.  The blockchain is like a trust superconductor: able to safely carry assets with low overhead.  Urbit address space isn’t intended to be traded or used as a currency.  The Urbit address space requires trust to exist between parties making an exchange.  This is intentional.  As the foundation for a civilization we want engaged parties to communicate and cooperate.  When the transaction is finished, however, your Urbit address is as much yours as your Bitcoin wallet.

Blockchain systems still suffer from centralization at the fringes.  Where do you keep your keys safely on the network?  Are there other reliable means of data transfer that don’t have a cost?  Urbit’s simple computing model makes it a great decentralized communication layer.  Being able to seamlessly switch bands to the blockchain would make these two systems complimentary in the way they should be.  

Your Urbit is your home on the network.  It isn’t built to enforce contracts or to send money, but it gives you a safe place that’s universally available on the network to do those things from.
