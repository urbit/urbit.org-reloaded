+++
title = "Urbit ID"
description = "An overview of the Urbit ID system"
weight = 2
[extra]
flatten_pagination = "true"
hide_next_title = "true"
hide_previous_title = "true"
image = "https://media.urbit.org/site/understanding-urbit/urbit-id/urbit-id-cards%402x.png"
+++

Even assuming if Urbit OS is simple enough for an ordinary user to own and operate, how do they log in? How do people identify one another on this new network? When people want to get data, files and messages to one another, how do they do it?  And how do you prevent spam?

Urbit ID is the answer to all these questions. Urbit ID is a decentralized addressing and public key infrastructure designed for Urbit OS. 

Let’s talk first about what an Urbit ID is and does. Then we’ll cover its design goals and how the system works overall.

![](https://media.urbit.org/site/understanding-urbit/your-last-computer/your-last-computer-waves%402x.png)

Your Urbit ID is a short, four-syllable name like `~ravmel-ropdyl` that you own with an eight-syllable master passkey like `~palfun-foslup-fallyn-balfus`. This name and key lets you log into Urbit OS, and it’s used to encrypt packets you send over the Urbit network. Soon it will also be the master key for a keychain that allows holding and sending of Bitcoin and other cryptocurrencies. Your Urbit ID and passkey belong to you like any other cryptographic assets. No one can take them away from you — just make sure to store the key safely.

The Urbit ID registry is live and deployed to the Ethereum blockchain. Urbit ID isn’t specifically wedded to Ethereum – someday we’d like it to be hosted by Urbit OS itself. Also, Urbit ID is the only component of the stack using Ethereum – your Urbit OS node is hosted wherever you choose. Anyway, the Urbit ID registry keeps track of who owns what, which keys are associated with which names, and enforces the rules of address distribution. We’ll get into the details a bit more below.

First, let’s talk about Urbit ID’s implementation and design goals, then about where we envision it going in the future.

If you’re curious to see exactly how this system works, the code is of course [open source](). Including the source for our [phonemic naming system]() and the [visual representations](). There’s even a [Figma plugin]() for using them. There’s also an interface for interacting with Urbit ID whose source is [open too]().

Since the Urbit ID registry is live and deployed you can even [look at the chain]().

![](https://media.urbit.org/site/understanding-urbit/your-last-computer/your-last-computer-waves%402x.png)

Each Urbit ID is really just a number. From that number we generate a pronounceable name and a visually identifiable sigil. ~dalwel-fadrun is 3,509,632,436, for example.

Urbit IDs are distributed by a sponsorship tree. At the top of the tree are 2^8 (256) galaxies. Each galaxy issues 2^8 stars, making a total of 2^16 (65K). Stars then each can issue 2^16 planets, making for 2^32 (~4B). As you might expect, each planet issues 2^32 moons.

You can also call stars ‘infrastructure nodes’ and galaxies ‘governance nodes’, since those are more descriptive names for their roles. Stars help route packets, kind of like an ISP. And galaxies are a bit like DNS root servers or ICANN members. The difference, of course, is that Urbit IDs are owned cryptographically by many different people and accrue reputation independently.

And that's it. It's a simple system. What's important is why it is the way it is. Let's take a look at that.

![](https://media.urbit.org/site/understanding-urbit/your-last-computer/your-last-computer-waves%402x.png)

At a high level, there are three important things to understand about the overall Urbit ID system design.

First, scarcity: there are only 2^32 (~4B) Urbit IDs, so they cost something. Since they cost something, people are less likely to use them to spam or abuse the network. And, when you meet a stranger with an Urbit ID, you know they have some skin in the game (even without leaking personal data in either direction). Each Urbit ID is purely pseudonymous. `~dalwel-fadrun`, for example, is only proof of some stake in the network.

Second, decentralization: Urbit IDs are distributed by a sponsorship tree. Each sponsor issues a fixed number of addresses. Since there are lots of sponsors, there are lots of ways to get an Urbit ID — not just one central authority.

Urbit IDs need a sponsor even after they’re issued (primarily for peer discovery on the Urbit network), but you can always change sponsors and sponsors can always reject children. This means bad actors can be banned and abusive sponsors can be ignored. We think this strikes a nice balance between accountability and freedom.

Finally, governance: galaxies (the top of the sponsorship tree) form a senate that can upgrade the logic of the Urbit ID system by majority vote. We think Urbit ID will last for quite a long time, but if it ever needs to be changed, the galaxies can vote to approve, reject, or propose changes to the contracts. Code may be law, but ultimately we acknowledge that human judgment can’t be factored out.

The Urbit ID sponsorship tree is not intended to be a social system in any way. Interactions between people and communities on the Urbit network are peer-to-peer, entirely organic and completely uncontrolled by the address hierarchy. Urbit ID is simply an authentication substrate upon which reputation and communication systems can be built.

For this reason, we’ve even considered renaming stars and galaxies ‘infrastructure’ and ‘governance’ nodes, respectively. Your relationship with your sponsor should be sort of like your ISP or a utility provider: a passive, non-invasive relationship. If it isn’t to your liking, moving to a new one should be very easy.

![](https://media.urbit.org/site/understanding-urbit/your-last-computer/your-last-computer-waves%402x.png)

Urbit IDs are property, and we think of the entire registry of Urbit IDs as a vast territory of digital land.

The scarcity of Urbit ID address space gives it value and in turn helps bootstrap decentralization even while the project is young. Broad distribution is important – If Urbit is going to last a long time and succeed as neutral infrastructure, it has to be owned and controlled by a wide variety of people.

When we launched the Urbit ID system, in January of 2019, there were a couple thousand different star and galaxy holders acting as stewards of this digital land. Since then, that number is steadily on the rise.

![](https://media.urbit.org/site/understanding-urbit/your-last-computer/your-last-computer-waves%402x.png)

Ultimately, we want your Urbit ID to feel like a civilizational key. If your Urbit ID were a piece of hardware, you could tap it to unlock a door, swipe it to buy a coffee, and plug it into any computer to log in. Your Urbit ID should be a unique, beautiful object that’s both an address and a wallet. It’s a key to a secret club and the ticket to your digital life.

Moving on, let’s talk about what we want this whole stack to feel like as a user experience.