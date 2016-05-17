---
sort: 3
type: post
title: Address space
author: Galen Wolfe-Pauly + Curtis Yarvin
image: http://urbit.s3.amazonaws.com/16-3-10/blog-3.jpg
preview: An overview of the Urbit address-space.  Urbit address space is a new kind of cryptographic property, sort of like digital land.  
layout: urbit,post
navmode: navbar
navdpad: false
navselect: posts
navpath: /
navhome: /
navclass: urbit
---

# The Urbit address space and identity model

## Basics

Urbit contains a lot of new technology.  As an ordinary user, all you
need to understand is Urbit's identity model.  If you're in a hurry,
just read these simplified basics.

An Urbit identity, or "ship," is a string like `~firbyr-napbes`.  It
means nothing, but it's easy to remember and say out loud.
`~firbyr-napbes` is actually just a 32-bit number, like an IP address.
We turn this number into a string that sounds like a name in a foreign
language.  

Technically, a ship is a secure digital identity that you own and
control with a cryptographic key, like a Bitcoin wallet.  As in
Bitcoin, the supply of ships is mathematically limited.  This keeps
the network friendly, by making spam and abuse expensive.

The only way to start a ship is with permission from a ‘parent’,
another ship on the network with a shorter name.  A 32-bit ship is
called a "planet."  A 16-bit ship is a "star." An 8-bit ship is a
"galaxy.

A planet is an identity for a human.  Stars and galaxies are network
infrastructure.  A ship is independent after it's launched, but the
right to launch belongs to its parent.  So each star can create
`65.535` planets; each galaxy can create `255` stars, or (indirectly)
`16.776.960` planets.

Urbit is born as a centralized network whose address space is entirely
owned by its creators, who own the root galaxy `~zod`.  But this
address space is worthless until distributed.  And as it becomes
decentralized, it becomes free and independent.  The goal is a world
completely unlike the one we live in today, where our digital
identities are owned by giant corporations.  

Your Urbit ship is like a digital passport or social security number
for a virtual city in the cloud.

## Details

That should be sufficient to understand the high-level goals of the
address space.  If you want to dive a bit deeper, keep reading.

### Design goals

If you know much about identity systems, you know the problem of
"Zooko's triangle."  An identity system has three goals: a name wants
to be secure, human-meaningful, and decentralized.  Zooko’s triangle
says that a practical identity system can achieve any two of these
goals.

We attack an unsolvable problem of this type by making tradeoffs.
Urbit's goals: to be secure, human-memorable, and eventually
decentralized.  We sacrifice meaning (Urbit is not competing with the
DNS), and postpone decentralization.  In turn, we get a simple system
that can actually be built.

### Comparison to existing identity layers

The Internet doesn't have anything like Urbit ships, so you may need
to stretch your brain a little here.

There are three levels of naming on the Internet: raw, numeric IP
addresses IP addresses (like `126.78.92.112`), domain names (like
`foobar.com`), and user identities (like `galen@tlon.io` or
`@galenwp`).

Urbit (or more precisely, its Ames protocol) squashes all three of
these layers into one.  At the network level, Urbit is a P2P overlay
network; your ship is your network address.  It's also the name of
your server, and your secure digital pseudonym.

One way to use Urbit is as an identity for the Internet, which doesn't
have a standard system of secure authentication.  Urbit has a
single-signon API which lets any Web server accept Urbit logins, like
a normal social login -- but not captive to anyone's corporate
mainframe.

### Cryptographic ownership

You own an Urbit ship cryptographically, like a Bitcoin wallet.  But
Urbit doesn't use a blockchain or mining.

You transfer a ship by signing a new public key with the old private
key, then broadcasting the signature.  Any urbit that receives this
new certificate will no longer trust the old key.

Urbit is digital land, not digital money.  A currency needs to support
high-frequency, zero-friction transfers.  Real estate transfers are
low frequency and high friction, so the "double spend" problem (which
mining solves) is much less pressing.

## Moons and comets

In the general case, a ship is actually a 128-bit number.  A full
table of ship classes:

```
8 bits    galaxy  router  ~syd
16 bits   star    router  ~delsym
32 bits   planet  human   ~mighex-forfem
64 bits   moon    device
~dabnev-nisseb-nomlec-sormug
128 bits  comet   bot
~satnet-rinsyr-silsec-navhut--bacnec-todmeb-harwen-fabtev
```

Moons are for clients and connected devices: a laptop, a phone, a
digital thermostat.  A moon is not independent; its parent planet has
to sign its key updates.  (We don't want rogue clients floating
randomly around the universe.)

A comet's address is the hash of its initial public key.  Anyone can
launch a comet.  Nothing stops you from using a comet as your
identity, except that the name is a mouthful and everyone will assume
you're a bot.

### Scarcity, reputation, friendliness and trust

A crucial difference between Urbit and other networks is that planets
are scarce.  Even when the network is fully populated, there are only
4 billion.  Early in Urbit's life, most stars and galaxies are not yet
operating, so far fewer are available.  No one will ever be able to
get planets trivially and for free.

Urbit is a *friendly network*: a network on which you can assume that
a stranger is nice until proven nasty.  Friendliness is a direct
consequence of scarce, individually owned identities.  We're not
changing human nature, just creating the right economic incentives.

Most forms of network abuse are "Sybil attacks": they rely on an
infinite supply of new identities.  Scarcity makes reputation work.
Spam is a business; if the cost of a new planet exceeds the amount of
money you can make by spamming from that planet until its reputation
is trashed, there will be no spam.

Shady stars and galaxies that sell blocks of planets to spammers will
also develop reputations as "bad neighborhoods," damaging the value of
the whole block.  Abuse at any level is designed to be
counterproductive and economically self-terminating.

Urbit has no reputation system at all at the moment, simply because
we're so small that friendliness is automatic.  The clear and rigorous
structure of the address space is not a reputation system; it is a
platform on which any number of such systems can and should be built.
But we can't build one until we need one.

### Initial allocation and rationale

In cryptocurrency terms, Urbit is "100% premined."  Why?  Three
reasons.  

One, Urbit doesn't need mining.  Two, Urbit is a much more ambitious
software project than Bitcoin or even Ethereum.  To fund its own
development, the project needs to capture the potential value of its
own real estate.  

Three, most theories of property agree that anyone whoever creates or
discovers new property starts out by owning it.  Because galaxies are
premined, Urbit starts as a centralized system.  But it has two strong
motivations to decentralize.

One, the more decentralized Urbit is, the more Urbit is worth.  Two,
the only way for Urbit to fund its own development is to homestead its
own real estate.

Urbit was made by Curtis Yarvin, who has distributed the 256 galaxies
as follows (allocation as of June 1, 2016):

95, to the [Tlon Corporation](company).  50, to urbit.org, the future
community foundation.  40, to Tlon employees and their family members
(24 to Curtis, who started in 2002; 16 to everyone else, who started
in 2014).  34, to outside investors in Tlon.  37, to 33 other
individuals, who donated to the project, contributed code, won a
contest, or were otherwise in the right place at the right time.

What's important is that the whole system is unlikely to collapse back
into a single landlord.  This is why we've intentionally scattered
Urbit's ownership across a diverse set of entities.

Furthermore, we've defined informal conventions designed to motivate a
healthy ownership structure by punishing violators with reputation
cost.  Address blocks should only split, never merge; galaxies and
stars should be owned by different parties; galaxies should be owned
by true individuals, not corporations.  Urbit does not live up to
these ideals at present, but must progress toward them rather than
away.

### Federated services, adoption and escape

Urbit is a peer-to-peer network.  Urbits that live behind a firewall
or on a home network need "supernodes" to help them route packets.
The supernode is the parent.  So a parent's work isn't done once it's
launched all its children.  

There's no way to enforce this responsibility.  So a star or planet
can be *adopted* by a new parent of the same class, letting it escape
from a bad default parent.  If your parent stops serving you, and no
other parent is willing to adopt you, you're probably a bad actor.

Supernode routing is just one example of why you need a parent.  A
mature Urbit will naturally develop all kinds of other *federated
services* -- from technical standardization and update approval, to
certificate update broadcast, to reputation and friend lookup.  All
these services are delivered by cooperating stars and galaxies.  Bad
actors at this level should be rare.

Especially when Urbit is young, the level of trust that a child places
in its parent is extremely high.  The trust implied by automatic
kernel updates is essentially infinite.  (Ideally we will be able to
freeze the Arvo kernel, like Nock, and turn off these totipotent
updates; but this will take years at least.)

### Code is law: seeing like a pattern language of great cities

Constitutional innovation is extremely dangerous.  Our vision of
digital governance isn't ours, but is synthesized as best we can from
the work of four great 20th-century thinkers: the legal scholar
Lawrence Lessig, the political scientist James C. Scott, the urbanist
Jane Jacobs and the architect Christopher Alexander.

All decentralized computation systems rely to some extent on Lessig's
principle: "code is law."  Where law uses human interpretation to
determine an outcome, code uses mathematics.  It is code, not law,
that decides who owns a Bitcoin wallet.

But all these systems, including Bitcoin, need governance.  They need
as little as possible, but not none.  In the digital world as in the
real world, *laissez-faire* is always necessary, never sufficient.
Governance is a human universal.

That's why we call Urbit a "virtual city."  And as a city, it can't be
a corporate gated community.  It might start as that, but it has to
grow up into a true city-state: a self-governing digital republic.
This pattern is not just blind clinging to Anglo-American tradition;
like every prudent constitution, it fits the actual virtues and vices
of its target population.

Urbit's galactic hierarchy resembles the natural patterns we find in
many existing human political systems.  As Alexander wrote:

> Wherever possible, work toward the evolution of independent regions
in the world, each with its own natural and geographic boundaries;
each with its own economy; each one autonomous and self-governing;
each with a seat in a world government, without the intervening power
of larger states or countries.

We adapt Alexander's vision to a digital republic as the pattern that
*authority is proportional to property*.  This pattern already has a
name in the cryptocurrency community, which calls it *proof of stake*.

Another governance pattern, a political cliche but no less valuable
for it, is the system of checks and balances.  The address space of
Urbit is covered by three independent tiers, galaxies, stars and
planets; which should govern?  The obvious design is a three-chambered
legislature balanced against itself.

For more on Urbit's governance design, see our [beliefs and
principles]() and our [interim constitution]().
