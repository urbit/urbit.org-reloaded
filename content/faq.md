+++
title = "FAQ"
+++

## Contents

<details><summary class="fs5 medium pb3 pt4">The Urbit Project</summary>
[Why Urbit?](#why-urbit)
[How secure is Urbit right now?](#how-secure-is-urbit-right-now)
[How can I contribute to Urbit?](#how-can-i-contribute-to-urbit)
[What is Tlon?](#what-is-tlon)
[Who Works at Tlon?](#who-works-at-tlon)
</details>

<details><summary class="fs5 medium pb3 pt4">Grants</summary>
[What are the different types of grants](#what-are-the-different-types-of-grants)
[How do I get a gift?](#how-do-i-get-a-gift)
[How often are gifts awarded?](#how-often-are-gifts-awarded)
[What happens if a user does not complete a proposal but meets some milestones?](#what-happens-if-a-user-does-not-complete-a-proposal-but-meets-some-milestones)
[Can I create a bounty?](#can-i-create-a-bounty)
[How are proposals approved?](#how-are-proposals-approved)
[If I win a proposal, do I have an exclusive claim on the project?](#if-i-win-a-proposal-do-i-have-an-exclusive-claim-on-the-project)
[Will milestones be embedded in a smart contract?](#will-milestones-be-embedded-in-a-smart-contract)
[Do I have to pay taxes on stars?](#does-reputation-play-a-role-in-the-assessment-of-grants)
[I completed a proposal. When will I receive payment?](#i-completed-a-proposal-when-will-i-receive-payment)
[Can I see the proposals of others that have been accepted?](#can-i-see-the-proposals-of-others-that-have-been-accepted)
[How do I safely store my stars?](#how-do-i-safely-store-my-stars)
[Can I delegate a bounty or proposal to someone else?](#can-i-delegate-a-bounty-or-proposal-to-someone-else)
</details>

<details class="pt4"><summary class="fs5 medium pb3">Azimuth</summary>
[What is Azimuth?](#what-is-azimuth)
[What are stars, galaxies, and planets?](#what-are-star-galaxies-and-planets)
[How many planets, stars, and galaxies are active?](#how-many-planets-stars-and-galaxies-are-active)
[What are comets and moons?](#what-are-comets-and-moons)
[What is a `@p`? Why is my username generated for me?](#what-is-a-p-why-is-my-username-generated-for-me)
[Can I change my `@p`?](#can-i-change-my-p)
[How do I get an identity?](#how-do-i-get-an-identity)
[How do I send an identity to someone else?](#how-do-i-send-an-identity-to-someone-else)
[What is the best way to access Azimuth?](#what-is-the-best-way-to-access-azimuth)
</details>

<details class="pt4"><summary class="fs5 medium pb3">Urbit HD Wallet</summary>
[What is the Urbit HD Wallet?](#what-is-the-urbit-hd-wallet)
[What is a master ticket?](#what-is-a-master-ticket)
[What is an ownership address?](#what-is-an-ownership-address)
[What are proxies?](#what-are-proxies)
[What are seeds?](#what-are-seeds)
[What does it mean to “set public keys”?](#what-does-it-mean-to-set-public-keys)
[What do I do if I want to own multiple points?](#what-do-i-do-if-i-want-to-own-multiple-points)
[How should I take care of my Urbit HD Wallet?](#how-should-i-take-care-of-my-urbit-hd-wallet)
[I have a galaxy or star with lockup conditions. How does this work?](#i-have-a-galaxy-or-star-with-lockup-conditions-how-does-this-work)
</details>

<details class="pt4"><summary class="fs5 medium pb2">Arvo</summary>
[What is Arvo?](#what=is-arvo)
[What is unique about Arvo?](#what-is-unique-about-arvo)
[How is Arvo connected to Ethereum?](#how-is-arvo-connected-to-ethereum)
[Will the Arvo network survive if Ethereum dies?](#will-the-arvo-network-survive-if-ethereum-dies)
[How do I install Arvo?](#how-do-i-install-arvo)
[How do I use Arvo?](#how-do-i-use-arvo)
[How do over-the-air updates work?](#how-do-over-the-air-updates-work)
[What is Landscape?](#what-is-landscape)
[I have a point, now what?](#i-have-a-point-now-what)
</details>

## The Urbit project

### Why Urbit?

The internet began as a friendly, peer-to-peer network: friendly because the people with the ability to use such a thing were the same sort of nerds, and peer-to-peer because those nerds knew how to run their own servers. But, as the internet’s appeal spread to everyday people in the 90s, it was unrealistic for everyone to be the administrators of their own complex machines. So this peer-to-peer network was divided into clients (people) and servers (large corporations), a relationship that’s been solidifying ever since.

But one intervening development presents hope. Platforms like Amazon Web Services turn previously heterogeneous networking infrastructure into commodities. Now anyone can use it almost as easily as a faucet.

What’s missing, however, is a peer-to-peer software stack that everyone can use. That’s what Urbit is. We’re reimagining the internet as a peer-to-peer network that is designed to stay that way, even at a large scale, which is something that’s never been done before. All previous attempts to re-decentralize the internet have only attempted to solve certain corners of the problem, and thus have failed. Only a technical upheaval of the entire stack can bring back this dream. Urbit does just that, and already exists in a working state.

In combining the determinism of Arvo, our OS, and the security of identity of Azimuth, our identity layer, we’ve done something that’s never been done before: we’ve created an encrypted peer-to-peer network where you can be sure that your message is secure: not tampered with, and sent exactly once.

The internet anticipated by Urbit is a much friendlier one. You’re always “logged in” to your online services, without the need to remember usernames or passwords. Problems that are unsolvable in our current internet -- spam, fake reviews, malware-spreading, harassment -- are made uneconomical, since there’s a limited number of Urbit identities that function as reputation primitives.

### How secure is Urbit right now?

Azimuth, the Urbit identity layer, is ready for serious use. Its contracts have been audited by trustworthy third parties. We encourage everyone to use Azimuth as an identity solution, and to build software projects on top of it.

The rest of the Urbit project is still in research-mode. Arvo is a fun operating system to play with, but it’s not yet a safe place to store sensitive data.

### How can I contribute to Urbit?

We encourage outside contributors to become a part of the project. The best way to do this is to check out [the Urbit GitHub](https://github.com/urbit) and look at the pinned repositories. Feel free to open issues and make pull requests.

You’re also invited to join the [urbit-dev](https://groups.google.com/a/urbit.org/forum/#!forum/dev) Google group and public mailing list.

### What is Tlon?

Tlon is the San Francisco-based company that develops Urbit. Tlon doesn’t own Urbit, since Urbit is an open-source project with decentralized ownership.

### Who works at Tlon?

You can see who we are at [tlon.io](https://tlon.io/).

## Grants

### What are the different types of grants?

There are three ways to receive a grant of stars for your contribution to the Urbit ecosystem.
- You can submit a **Proposal** if you’re interested in working on a project of your own creation for a number of stars that you pitch.
- You can apply to claim a **Bounty.** Bounties are requests for work created by Tlon that are claimable by the public, with a predetermined number of stars as the reward.
- The **Gifts** program, which is Tlon’s informal way of rewarding contributions that don’t fall into the above categories. There is no way to apply for a gift.

### How do I get a gift?

Make useful and substantial contributions to Urbit. These can be contributions to the project itself, or they can be outside tools that aren’t part of the Urbit codebase. There’s no formal system for determining who gets a gift; it’s at the discretion of employees at Tlon. Nothing is guaranteed, but you can get an idea for what kinds of contributions results in gifts by looking at the [gifts history.](grant.urbit.org/history)

### How often are gifts awarded?

Gifts are awarded semiannually.

### What happens if a user does not complete a proposal but meets some milestones?

You must complete the proposal to be guaranteed to receive the star grant. Partial star payouts can be negotiated for incomplete work, but such payouts are at the discretion of Tlon.

However, either party may terminate a proposal on seven days’ written notice. In such a scenario, you may be paid pro rata for any portion of the proposal that has been completed.

### Do I have to pay taxes on stars?

Yes. If you are American, we need your W-9 before we can pay you your stars. If you’re not an American, you don’t need to get us any forms, but you do need to personally follow the relevant tax laws in your jurisdiction.

### Can I create a bounty?

No. Bounties are only created by Tlon, but we draw inspiration for bounties from various sources, including the community. If you want to pitch a project, use the Proposals system.

### How are proposals approved?

The manager of the Grants program approves them after consulting with the relevant members of the engineering team. This proposal can be accepted, rejected, or accepted with changes by Tlon. The proposal’s star payout can also be adjusted.

### If I win a proposal, do I have an exclusive claim on the project?

You have a claim to the reward of the project as long as milestones are met to the satisfaction of Tlon. However, Tlon may allow another developer to work on the same project in parallel, for a separate reward.

### Will milestones be embedded in a smart contract?

No.

### Does reputation play a role in the assessment of grants?

Yes. We consider this to be a feature.

### I completed a proposal. When will I receive payment?

We will pay you within a 30-day window.

### Can I see the proposals of others that have been accepted?

Yes. Check out our (proposals page.)[grant.urbit.org/proposals]

### How do I safely store my stars?

We recommend storing each star in its own in its own Ethereum wallet. The private keys to these wallets should be stored on physical media that is not connected to a networked computer. Redundancies don’t hurt!

### Can I delegate a bounty or proposal to someone else?

No. Not unless explicitly authorized by Tlon.

## Azimuth

### What is Azimuth?

Azimuth is a general-purpose identity system. It is the Urbit identity base-layer. This system is implemented as a suite of smart contracts on the Ethereum blockchain, and it determines which Ethereum addresses own which Urbit identities, called points. There is a fixed number of possible points, and they exist in three classes. Urbit uses it in Arvo, the Urbit OS.

### What are stars, galaxies, and planets?

Points come in three classes: galaxies, stars, and planets. The length of a point’s name will tell you its class. Galaxies are 8-bit and have names like `~mul`. Galaxies issue 16-bit stars (`~dacmul`), which can themselves issue 32-bit planets (`~laptel-holfur`).

Planets are intended for everyday use by an adult human, and there are 4.3 billion of them (2 to the 32nd power). Stars and galaxies, on the other hand, are meant to act as network infrastructure: on the Arvo network they provide routing and are responsible for distributing software updates.

### How many planets, stars, and galaxies are active?

The raw data on most Azimuth events that have occurred can be found [here](https://azimuth.network/stats/events.txt). We’re currently working on generalized tooling for viewing these events.

### What are comets and moons?

In addition to the three classes of Azimuth points mentioned above, there are two other kinds of Urbit identities that are not registered on Azimuth.

Moons are 64 bits, are issued by planets, and have names like `~doznec-salfun-naptul-habrys`. Moons are meant for connected devices: phones, desktops, smart TVs, digital thermostats. Moons are subordinated to their parent planet.

Comets are 128 bits and have no parents. They can be launched by anyone. They are temporary, disposable identities. Being disposable and essentially unlimited, they will likely not be trusted by default by others on the Arvo network. They have long, hard-to-memorize names, like `~racmus-mollen-fallyt-linpex--watres-sibbur-modlux-rinmex`.

### What is a `@p`? Why is my username generated for me?

A `@p` (pronounced *pat-pee*) is a name like `~zod` or `~lodleb-ritrul` composed of pronounceable, three-letter phonemic elements like `zod`, `lod`, `leb`, `rit` and `rul`. Shorter names, such as `~zod` and `~marzod` are assigned to ships with special duties on the Arvo network ([stars and galaxies](/./docs/concepts/galaxies-stars-and-planets/), respectively. Longer names like `~palfun-foslup` are identities for typical users.

These names are pre-generated because they map directly to a number in the urbit address space. Galaxies occupy the 8-bit address space, so any galaxy is actually a number between zero to 255. Stars occupy the 16-bit address space, and planets occupy the 32-bit address space.

### Can I change my `@p`?

Unfortunately not, there is a 1:1 mapping between name and point.

### How do I get an identity?

Find someone to give you one. This will probably involve purchasing one and having it transferred to an Ethereum address that you own. We recommend using our [Bridge](https://github.com/urbit/bridge/releases) software to access the address that the point is transferred to.

### How do I send an identity to someone else?

Access the Ethereum address that holds the point you wish to transfer via [Bridge](https://github.com/urbit/bridge/releases).

### What is the best way to access Azimuth?

We recommended using [Bridge](https://github.com/urbit/bridge/releases) for all Azimuth-related operations. It’s great for managing your points, as well as for viewing information about points you don’t own. We have seen publicly hosted versions of Bridge online and we do not recommend using these websites for security and privacy reasons.

## Urbit HD Wallet

### What is the Urbit HD Wallet?

The Urbit Hierarchical Deterministic (HD) Wallet is a system that uses public-key cryptography to secure the ownership of Urbit assets. This means that the wallet system uses public/private key-pairs to make sure that only you have access to it. Such a key-pair has two components: a public key that may be disseminated widely, and a private key that only the owner should know. The former should be treated like a login, and the latter should be treated like a password.

The Urbit HD Wallet is different from cryptocurrency wallets that you may be familiar with. The Urbit HD Wallet is not a single Ethereum key-pair that holds full power over its assets, but a system of many related Ethereum key-pairs that have distinct powers. To learn about the specifics, check out our [HD Wallet documentation](/./docs/concepts/azimuth#the-urbit-hd-wallet).

### What is a master ticket?

In the context of the Urbit HD Wallet, master ticket is the entropy seed from which all of your other keys are derived. It should be treated like a master password: **you should never share it with anyone, and you must store it very securely (see our practices below).** This ticket can derive your ownership address and all of your proxy keys. You’ll have a ticket if you used the Urbit Wallet Generator or claimed a ship on our hosted version of Bridge.

### What is an ownership address?

An ownership address is an Ethereum address that has full rights over points assigned to it. It can transfer points to other people, meaning that it’s very important to secure its associated private key.

### What are proxies?

Proxies are Ethereum addresses that can be thought of as sibling sub-wallets of your ownership address. They are meant to be used much more often than the ownership address, and have more restrictive, less valuable rights than the ownership address. These rights include  spawning child points, voting, and setting networking keys.
- Management Proxy: Can configure or set Arvo networking keys and conduct sponsorship related operations.
- Voting Proxy: Galaxies only. Galaxies are the part of the galactic senate, and this means they can cast votes on new proposals including changes to the Ecliptic.
- Spawn Proxy: For stars and galaxies only. Can create new child points.

### What are seeds?

All Ethereum key-pairs in the Urbit wallet system, including proxies, are produced by 128-bit values called seeds. These seeds are yours alone. An ownership key key-pair is derived from an ownership seed. Also derived from the ownership seed are various proxy seeds, which proxy key-pairs are themselves derived from.

### What does it mean to “set public keys”?

This means registering the public keys of your point's encryption and authentication keys (together known as "networking keys") with Azimuth, so that others can discover them. The corresponding private keys can then be used to, for example, run a ship on the Arvo network.

You want to reset these keys if they are compromised, and periodically for maximum security.

### What do I do if I want to own multiple points?

We recommend using different HD Wallets for each point. You are able to assign any number of points to a single Ethereum address, however.

### How should I take care of my Urbit HD Wallet?

Urbit points have accompanying security realities that must be taken seriously. Cryptographic assets are unique among things of value, because all of the responsibility for keeping those assets safe rests with the party that owns them.

But the nature of decentralization means that there is no authority that has the power to restore any lost or stolen wallet. Neither can anyone force you to follow good security practices. At most, they can give you recommendations. **Remember:** if critical items, such as your ownership key, are lost or compromised, your assets are likely gone forever.

Below we list some good practices for storing keys, strictest first. Higher-value assets should be secured with stricter measures.

**Security Tier 1: Cold Storage**

Cold storage refers to any method in which secrets are stored in a way that is not accessible to any network. Cold-stored keys should only ever be generated offline.

Cold storage media options:
- Printing the secret on a piece of paper. However, paper wallets are vulnerable to various forms of physical damage, such as rot, water damage, smoke, or fire. Laminating the paper can mitigate some of these risks, but the lamination can potentially trap moisture. Make sure that you trust the printer: some have memory and network connections.
- Storing the secret on a brand-new USB stick or hardware wallet that is never connected to a networked machine.
- Engraving the secret on a strip of stainless steel. This medium is resistant to both water damage and fire damage.

Places to store your cold-storage media:
- A hidden safe in your home.
- A safe-deposit box at a bank.

It’s a good idea to store your keys redundantly; for example, on both a USB stick and a piece of paper in the safe, in case one of those methods fails. If you deem a key to be valuable enough, you can **shard** it into thirds (or other splits) and store each third in secure, geographically distributed locations.

**Security Tier 2: Hardware Wallet**

A hardware wallet is a digital storage device that’s purpose-built to store cryptographic secrets. They are unaffected by typical key-stealing malware, and have built-in security mechanisms that other digital devices lack. Do research and make sure that you are buying an authentic device manufactured by trustworthy, technically competent security experts with a good reputation. Trezor and Ledger are two popular brands of hardware wallets.

At this tier, it’s permissible to connect a hardware wallet to your networked machine.

**Security Tier 3: On Your Computer**

This tier includes any method where secrets are stored on an everyday computing platform. Some such methods are:

- Encrypted PDFs containing a secret on your desktop’s drive.
- Storing secrets on a cloud account protected by multi-factor authentication.

This method is risky for a number of reasons. Networked computers can contain malware. Computers that see common use are also prone to crashes and data loss. Storing secrets on cloud accounts mitigates the risk of data destruction, but it exposes a much larger attack surface to malicious actors.

For all of these reasons, make sure that you only use Tier 3 methods for the storage of low-value secrets.

### I have a galaxy or star with lockup conditions. How does this work?

There are two kinds of release schemes for locked up assets: linear and conditional.

In either scheme, you start out being able to take one star out of lockup, regardless of the terms set around the lockup as a whole. This way, you get to participate with a star right away. Become useful!Go do something cool!

If your lockup involved a galaxy, all its stars will be locked up, but you will have immediate, lock-free control of the galaxy. You will likely need it to use that star.

Note that the "releasing" of stars just means that they become available for you to claim. They don't automatically get transferred to you, you have to withdraw them from the appropriate lockup contract.

Linear release is the simplest, and does exactly what it sounds like. Your stars will be released linearly over a period of time. Most commonly, this is a period of four years. If you have four stars in lockup, that means you will be able to withdraw one star per year. In many cases, there is also an initial windup period, which has to pass before the linear releasing begins. Usually, this is one year. Since Azimuth launched in January 2019, this means the linear release will begin in January 2020.

Conditional release is a bit more complicated. If your stars are in conditional lockup, they're likely divided over three so-called tranches. Each of these unlocks only after a unique condition is met. Since it's difficult to verify things about the real world using smart contracts, we instead have the Galactic Senate verify that they've been met. Once the Senate marks a condition for a tranche as cleared, it starts releasing linearly over the period of a year.

## Arvo

### What is Arvo?

Arvo is the Urbit operating system. Unlike conventional operating systems, it’s functional and deterministic. Arvo is written in Hoon, our purely functional programming language.

Instances of the Arvo operating system, called ships, communicate as peers on what we refer to as “the Arvo network.” The Arvo network succeeds where other peer-to-peer networks have failed. Using Azimuth, Arvo ships can prove their identities to one another.

### What is unique about Arvo?

Arvo is much different from other operating systems because of its determinism. Processing in the system happens in a unique way: when an event happens, a transition function takes that event and the old state of Arvo, and then produces an effect and a new state of Arvo. To visualize:

[event, old state] -> [effects, new state]

Thus, all events are permanently logged in the system, and you can always go back and see the state of the system at any point in time.

### How is Arvo connected to Ethereum?

When an Arvo ship (instance) is started for the first time, you must use a key-file containing the private keys for your Azimuth point's networking keys. Azimuth uses the Ethereum blockchain as its decentralized ledger.

See our [Getting Started](/./docs/getting-started/) guide to learnhow to get your ship onto the Arvo network.

### Will the Arvo network survive if Ethereum dies?

Yes. It would be annoying, but Azimuth would be ported to another kind of decentralized ledger.

### How do I install Arvo?

Check out our guides [here](/./docs/getting-started/)

### How do I use Arvo?

The [Using](/./docs/using/) section of the documentation will help you out.

### How do over-the-air updates work?

Your sponsor, a star or galaxy that your ship “lives” under, may send you new source code for your system. When you receive new source code from your sponsor, your system recompiles itself using that code, performs any necessary data migrations, and keeps running. Ideally this happens seamlessly without the user even noticing, although there is sometimes a slowdown while rebuilding the system from source.

### What is Landscape?

Landscape is the Arvo web interface that includes social functions such as chat and message boards. You can access Landscape by navigating to <your-planet>.arvo.network, where <your-planet> is your running ship that’s connected to the Arvo network.

### I have a point, now what?

Follow our guide on how to boot a ship [here](/./docs/getting-started/booting-a-ship).  

Get on the [mailing list](/./#mc_embed_signup). Learn [Hoon](/./docs/learn/hoon). [Make stuff](@/docs/getting-started/contributing.md).
