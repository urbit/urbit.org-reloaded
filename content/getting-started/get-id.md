+++
title = "Get an Urbit ID"
weight = 2
description = "How to acquire an Urbit ID"
tag = "selfhost"
+++

### Types of ID

There are [five different
types](https://operators.urbit.org/guides/which-id-should-i-buy) of Urbit ID,
but for our purposes we'll only talk about two of them: **comets** and **planets**.

**Comets** are identities that you can issue yourself and are best-suited for
short-term usage. **Planets** are how most people use Urbit and are suitable for
long-term use.

If you're just trying it out, a comet is fine and you can skip to the [Command line instructions](/getting-started/cli).

If you plan to use Urbit regularly you'll want to keep reading.

### Where to get a planet

There are a few ways to get your own planet:

- Receiving one from a friend
- Asking on Twitter (if you're lucky)
- Booting a comet and being friendly in [Urbit Community](https://urbit.org/groups/~bitbet-bolbel/urbit-community)
- Purchasing one from a marketplace

This guide will cover the last case and what to do after receiving one.

### Buying a planet

There are many places to buy a planet using either cryptocurrency or fiat.

Layer 1 planets are the most available through marketplaces, however they can be expensive due to Ethereum gas fees. You will need an Ethereum wallet such as Metamask to purchase these planets, and will later need to sign in to Bridge with your wallet to configure your planet.

Layer 2 planets do not require any crypto wallet management, but are at present less readily available on marketplaces.

Don’t worry, both types work the same on the network.

Here are a few of the places where you can buy planets:
{% table .w-full .my-4 %}
* L1 Planet Markets
* L2 Planet Markets
---
*
    - [Urbitex](https://urbitex.io)
    - [Urbit.live](https://urbit.live)
    - [Urbit.me](https://urbit.me)
* 
    - [azimuth.shop](https://azimuth.shop)
    - [lanlyd](https://lanlyd.net/)
    - [~mocbel house](https://mocbel.house)
    - [\_networked subject](https://subject.network)
    - [Planet Market](https://planet.market)
    - [Wexpert Systems](https://wexpert.systems)
{% /table %}

{% callout %}

**Layer 2 for planets**

Learn more about [layer 2 for planets](/using/id/layer-2-for-planets) in the User's Manual page on the topic.

{% /callout %}


### Claiming your planet

An invitation to claim your planet comes in one of two forms.

The first is an email invitation with an Urbit ID and a Master Ticket.

The second, only recently made available through our [L2 solution](/using/id/layer-2-for-planets), is an activation code or a link to activate on [Bridge](https://bridge.urbit.org), which can be thought of as an Urbit account management tool.

![](https://media.urbit.org/site/getting-started/Server-setup-1.jpg)

Clicking a link to activate a planet on Bridge will take you to page which will generate a Master Ticket for you. Follow the instructions which will prompt you to download a copy of your Passport: your Master Ticket, management proxy, and keyfile. Store your Master Ticket and management proxy somewhere safe, hold on to the keyfile, and proceed to the next step.

{% callout %}

**Claiming L1 planets**

If you’ve purchased an L1 planet, you won’t need to claim it because you already own it as an NFT. Simply log into Bridge using Metamask or your wallet of choice.

{% /callout %}


### Using Bridge to get your keyfile

Now that you have your planet, you can create your keyfile (eg. `sample-palnet.key`), which is the cryptographic signature required to encrypt and decrypt messages on Urbit's P2P network.

- **Claimed L2 planets**  
  If you’ve claimed your L2 Planet then you should already have downloaded your Passport, which contains your Master Ticket and keyfile.

- **Master Ticket holders**  
  If you haven’t downloaded your Passport but have a Master Ticket, then you can simply log in with Bridge using the Master Ticket option with your planet name and Master Ticket password. Click the ID box near the bottom of the page to open the ID page, then click the **Download Passport** button, which contains your keyfile.

- **L1 Planet Purchasers**  
  Log in to Bridge with your Ethereum wallet using Metamask or the wallet of your choice with WalletConnect. Click the “OS” box on the bottom of the page to open the OS page, and then click the **Download Keyfile** button.

### Next Steps

Now that you have a keyfile let's move on to booting the Urbit OS.

TODO: Pagination that points to CLI instructions
