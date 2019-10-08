+++
title = "Contributing"
template = "page_indiced.html"
+++

## How can I contribute? {#how}

The Urbit project is a global community of developers, users, and fans. If you’re interested in getting involved, there’s space for you; you don’t have to be a developer to be a part of the project.

### Developer contributions

If you *are* a developer, then you’ll want to get started either in core development or application development. For core developers, the Arvo operating system has contribution opportunities for operating system developers; programming language creators; and smart contracts experts, among others.

If you have experience writing user-facing applications, you’ll most likely be interested in writing your peer-to-peer applications on Urbit.

Either way, you should check out our [Developer Guide](@/develop.md).

### Running stars and galaxies

There are two ways to participate in the Arvo network: as a user running a planet and as an infrastructure provider running a galaxy or a star.

For planets, Urbit is a peer-to-peer network where users can interact with each other via Landscape, or using custom applications that anyone can write.

Running a planet helps build Urbit’s community, surfaces bugs, and helps core developers improve Urbit under realistic conditions.

Stars and galaxies, however, have additional responsibilities and play a role in peer discovery as well as star and planet distribution. You can think of stars and galaxies as similar to the DNS system in the modern Internet. Most users don’t know it exists, but without it, the web wouldn’t work at all.

Running a reliable galaxy or star, and spawning stars and planets from them, are excellent ways to help bootstrap the Urbit network.

If you’re interested in running a galaxy or star, you’ll be reliably providing peer discovery for your children just by running your node – and we’re doing our best to make this both easy and profitable. If you’re interested in this, see [Operating Galaxies and Stars](#galaxies-and-stars) below.

If you’re interested in distributing planets, read on.

### Distribute points

Want to get your friends and family into Urbit? Distribute planets using Bridge with a feature called **delegated sending**.

Here’s how it works: any star can grant a number of invites to any of its child planets. Those planets can then send one-time-use invite codes via email to anyone of their choosing.

For instructions on how to grant and send invites, check out [Using Bridge](@/operations.md#using-bridge).

## Operating Galaxies and Stars {#galaxies-and-stars}

To boot your galaxy or star, follow our [installation instructions](@/install.md).

### Hosting your star

If you plan to distribute planets in any capacity, you must keep your star running. If you fail to do so, those planets will become orphans that are unable to communicate with the network. 

To make this as simple as possible, we’re building Terraform-based tooling for star and planet hosting via Google Cloud Platform. Once it’s ready we’ll open source the tooling so you can host stars and planets for yourself and others. 

In the meantime, there are existing instructions for those familiar with booting a Linux instance on GCP, AWS, Digital Ocean, etc. 

### Distributing planets

You can distribute planets from your star via Bridge. As a reminder if you do distribute planets, please boot and run your star on the Arvo network, otherwise those planets won't be able to connect, which has a negative effect on the network as a whole, as orphan planets are left with very limited functionality. 

### Software updates 

By default, your star accepts software updates from its galaxy and routes them to its planets. You can use this mechanism to push custom software to your planets. Keep in mind that planets expect functional, non-breaking software updates, and generally want to be able to communicate with planets that are sponsored by other stars.

#### Breaches

To ensure new planets can connect to you, you're expected to participate in network-wide breaches, by updating to the latest Urbit version, deleting (or archiving) your pier, and then booting your ship. If you don’t participate, you will be left behind by the rest of the network and won’t be able to communicate with anyone who has updated to the new era.


### Star-owner etiquette 

If you distribute planets, boot and run your star on the Arvo network, or the planets won't be able to boot for the first time or connect.

A star is networking infrastructure. For that reason, the machine running your star or galaxy must have sufficient bandwidth and processing power for your dependent planets.

When messaging others, communicate using your star only when speaking in an official/infrastructural capacity. Otherwise, use your personal planet.


### Taxes 

Urbit address space has value, which means the distribution of address space has tax implications. You should speak with your tax advisor about these implications. 


### What to expect from Tlon

#### Contributor calls

We host regular contributor calls where you can discuss the technical matters of Urbit with Tlon engineers and community developers. We’d love for you to join; If you’re interested, please email support@urbit.org.

#### The urbit-dev mailing list 

Those interested in developing on Urbit are encouraged to add themselves to the urbit-dev mailing list:https://groups.google.com/a/urbit.org/forum/#!forum/dev.

#### Support 

We are a small team, but we do our best to answer support related inquiries. Please email us at support@urbit.org with questions.

#### Roadmap for further development 

We periodically publish our ongoing development roadmap. You can find the latest here: [https://urbit.org/posts/2019-10-3-roadmap/].


## Governance {#governance}

Our goal is to design Urbit simply, such that as many decisions as possible are made by the architecture of the system itself – that is, code should be law whenever possible. Code can’t anticipate every eventuality, however, and so the system design must include mechanisms that allow decisions to be made outside of the code.

Within Urbit, this form of governance is conducted by two groups: the senate of galaxies, and the body of core developers. The senate of galaxies is empowered to make changes to the solidity contracts which define Azimuth, Urbit’s PKI, by majority vote. This process is defined by the contracts themselves.

An owner of a galaxy (or a delegate) can propose a new iteration of the contract logic. The proposal can then be voted on for a period of thirty days. Once that period is over, if at least a quarter of the galaxies has voted, and the majority is in favor, the old logic contract will hand over the reigns to the new one.

In a similar process, document hashes can be proposed. While their off-chain documents can't be "technically enforced", this mechanism is useful for the Senate to record more abstract decisions.

For off-chain process around proposals, as suggested by core developers, please see [senate.md](https://github.com/urbit/azimuth/blob/master/senate.md).

The group of core developers manages Urbit’s [GitHub repository](https://github.com/urbit/), which controls Arvo, Urbit’s operating system. Changes and upgrades are decided upon by consensus. 

You can participate in the governance of the senate by acquiring a galaxy. If you would like to be involved with the governance of Arvo, check out our [developer guide](@/develop.md) to learn how you can contribute to core development. 


