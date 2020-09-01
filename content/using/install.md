+++
title = "Install + Setup"
weight = 1
description = "How to install Urbit."
template = "page_indiced.html"
aliases = ["/docs/getting-started/"]
+++

Urbit is not yet ready for everyday users — but if you're technically inclined or generally intrepid, feel free to try it out. It's a good place to explore.

## Overview

There are two major components of the Urbit ecosystem: **Urbit OS** and **Urbit ID**.

The the Urbit peer-to-peer (p2p) network is composed of instances of Urbit OS -- called **ships** -- that are virtual machines that run on any Unix platform.

Urbit works as a p2p network where others fail because ships are associated with persistent and scarce identities that we refer to as Urbit IDs. The Urbit ID registry is deployed on the Ethereum blockchain, and individual IDs exist as non-fungible ([ERC-721](https://eips.ethereum.org/EIPS/eip-721)) tokens.

On the network, Urbit IDs function as network addresses, represented by pronounceable names like `~padmyn-pasnux`. There are a few kinds of Urbit ID, but ones meant for typical users are called **planets**. Anyone who has a planet can be thought of as a full "citizen" of the Urbit network. But to run your ship on the network, you need to start it with a piece of cryptographic information from its Urbit ID. This guide walk you through getting onto Urbit with an ID.

There are also free IDs meant for temporary use called **comets**. They are good for bots and people who are new to Urbit and want to check out the network, but they aren't good for building a reputation as a friendly and responsible peer. Their long names make them difficult to remember and their low default reputation makes them less likely to get over the air updates. Some communities ban comets to prevent spam, but they're still a good way to see what Urbit is about before buying your own planet.

### Stars and Galaxies

In addition to comets and planets, two other types of ships are **stars** and **galaxies**. Together these perform essential infrastructural roles for Urbit OS network and for Urbit ID.

On the Urbit ID side, galaxies are at the top of the ID hierarchy, with 256 in existence. Each galaxy can distribute 256 stars, and each star can distribute 65,536 planets. So any given planet ultimately came from a specific star, which itself came from a specific galaxy.

On the Urbit OS side, stars help route packets, kind of like an ISP. And galaxies are like DNS root servers or ICANN members. The difference is that Urbit IDs are owned cryptographically by many different people and accrue reputation independently.

If you're trying to get your star or galaxy set up, skip to [this section](#supernode).

## Installing Urbit

The Urbit binary runs on a Unix-like operating system – Ubuntu, Fedora, or macOS, for example.

We have different installation instructions for different platforms. To install and run Urbit OS, and its binary, run the commands that are listed for your operating system.

Once you've followed the appropriate install instructions, you can check if everything went right by running the `./urbit` command. Installation was successful if you get a block of output that begins with the line below:

```
Urbit: a personal server operating function
```

### macOS

```sh
curl -O https://bootstrap.urbit.org/urbit-v0.10.8-darwin.tgz
tar xzf urbit-v0.10.8-darwin.tgz
cd urbit-v0.10.8-darwin
./urbit
```

### Linux (64-bit)

```sh
curl -O https://bootstrap.urbit.org/urbit-v0.10.8-linux64.tgz
tar xzf urbit-v0.10.8-linux64.tgz
cd urbit-v0.10.8-linux64
./urbit
```

To access your Urbit via HTTP on port 80 on Ubuntu, you may need to run the following:

```sh
sudo apt-get install libcap2-bin
sudo setcap 'cap_net_bind_service=+ep' /path/to/urbit
```
(Where `urbit` is the urbit executable downloaded with `curl` prior)

### Windows

> Please note that this method of installing Urbit is experimental, and we may not be able to assist you if you encounter issues related to WSL 2. These instructions have been tested and verified for WSL 2 + Ubuntu 18.04 LTS.

Urbit cannot run on Windows itself, but there is a convenient way to run a Linux distro using the [Windows Subsystem for Linux 2](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux) on Windows 10. For Urbit to work, it is necessary to [install WSL 2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-install) and not just WSL.

Once WSL 2 is installed, open a Linux terminal in Windows and then follow the Linux installation instructions above. For performance reasons, do not install Urbit in the mounted Windows volume, but install it in the Linux file system. For example, in your home directory, by typing `cd ~`.

## Launching Urbit

Now that you have Urbit installed you can start it up with an ID.

If this is your first time using Urbit, it'll be easiest to start with a comet in order to get on the network.

### Comet: Install and Setup {#comet}

If you don't have your own Planet ID, but still want to try out the Urbit network you can launch a comet.

**Comets** are temporary 128-bit or 16 syllable Urbit IDs, that look like:

`~dasres-ragnep-lislyt-ribpyl--mosnyx-bisdem-nidful-marzod`

Comets are disposable, free identities that anyone can make to join the live network and try things out.

### Booting a comet

To boot your comet, go into the command line and run the following command from the directory that was created during Urbit installation:

```sh
$ ./urbit -c mycomet
```

This will take a few minutes to an hour, and will spin out a bunch of boot messages. It will also create a directory called `mycomet` in the Unix directory that you ran the command from.

Toward the end of the boot process, you'll see something like:

```
ames: on localhost, UDP 31337.
http: live (insecure, public) on 8080
http: live ("secure", public) on 8443
http: live (insecure, loopback) on 12321
~sampel_commet:dojo>
```

When your ship is finished booting, you will see either the `~sampel_commet:dojo>` or `~sampel_commet:chat-cli/` prompt. If you're seeing `:chat-cli` press `Ctrl-x` to switch into Dojo. At that point, you should permanently erase your keyfile from your machine.

To exit Urbit, use `Ctrl-d`. To start your ship up again, run  `./urbit mycomet` from the directory that you first booted from. Now let's do some basic commands from inside your ship.

### The Dojo

Welcome to your comet! Let's try our first command in the Dojo, the Urbit OS command line and Hoon REPL, to get oriented.

Type `(add 2 2)` into the Dojo. You should see the following:

```
~sampel-palnet:dojo> (add 2 2)
```

When you press Enter, you should see this:

```
> (add 2 2)
4
```

Good, your Dojo is working correctly. Now let's run our first useful command in the Dojo. The first thing you generally want to do with a new ship is to **mount** it. A ship being mounted means that it has a presence on your Unix filesystem, allowing files to be shared between Unix and your ship. To mount your ship, type `|mount %` at the Dojo prompt.

```
|mount %
>=
```

The `>=` output means that a command was successful. Now you can see your ship's files in its Unix directory.

### Using Landscape

Landscape is the Urbit web interface, and it's the best way to interact with your ship. Chrome and Brave are the recommended browsers for using Landscape. To get onto Landscape:

1. Start your ship. In the boot messages, look for a line that says something like `http: live (insecure, public) on 80`. The number given is the port that your ship is using.
2.  If the port given is 80, simply type `localhost` into your browser's address bar. If the given port is a different number, such as `8080`, you would type `localhost:8080`. You'll be met with a login prompt.
3. Type `+code` into your comet's Dojo. Copy-paste the returned code into the field asking for it in the browser page.
4. You're in! Now you can explore apps such as Chat for messages, Publish for blogging, and Weather.

### Join a Chat

Now that you're on landscape, let's join the Urbit Community chat, a great place for newcomers to ask questions.

Click that `Chat` type on your Landscape home page, and then click the `Join Chat` column. Then, enter `~bitbet-bolbel/urbit-community` into the field and press the `Join Chat` button.

You can send and receive messages here, just like any other chatroom.

## Getting an Urbit ID (Planet or Star)

Tlon doesn't currently sell or distribute Urbit IDs, but there are a few ways to get your own:

- Getting an invitation from a friend
- Purchasing an Urbit ID from a third party, such as [urbit.live](https://urbit.live), [OpenSea](https://opensea.io), [planet.market](https://planet.market/), or [Urbit Marketplace](https://urbitmarketplace.com/).

Tlon occasionally selects candidates to distribute invitations, and users operating galaxies and stars can spawn and distribute a finite number of stars and planets, respectively.

### Using your Urbit ID (Planet or Star) {#id}

If you have an Urbit ID, you'll use the [Bridge](https://bridge.urbit.org) client to get your ship's *keyfile* before you can [boot your ship](#booting-your-ship).  Your keyfile is a cryptographic secret that allows your Urbit instance to authenticate itself on the network, so you can't boot your planet without it. Your keyfile is deterministically derived from your other cryptographic secrets.

### The Urbit ID Wallet

Your Urbit ID is actually yours. As long as you control its cryptographic secrets, nobody can take it away from you. That's why it's important to know a little bit about the cryptographic architecture of Urbit secrets.

Urbit ID secrets operate as a system of separate but hierarchically realted Ethereum key-pairs. For any given ID, this system of key-pairs is referred to as a **Hierarchical Deterministic (HD) Wallet**. the Urbit HD wallet. Each of these Ethereum addresses have different powers over the same identity, from setting networking keys for communicating in the Urbit network to transferring ownership of identities. Important elements of the HD wallet:

- **Master Ticket**: The "password" at the top of the hierarchy that determines the ownership. All other secrets are derived from this. If the rest of the wallet is lost or compromised, the master ticket can rederive everything. You'll log into Bridge with this. Always keep your master ticket extremely safe.

- **Management Proxy**: Derived from the master ticket. Can perform non-ownership related operations such as configuring Urbit OS networking keys.

- **Keyfile**: Derived from the management proxy. Used as crytographic proof that your Urbit ship it is who it says it is. You use it to start up your ship for the first time.

### Getting Your Keyfile {#keyfile}

As mentioned previously, there are a few ways to acquire a planet. All methods, however, should result in you receiving at least one secret, such as a **master ticket**. If you received an email invite to Urbit, the master ticket should a `.pdf` the passport folder that you downloaded.

1. To connect to Bridge, go to https://bridge.urbit.org.
2. Enter the name of your planet and the associated master ticket in the appropriate fields. If you received your secret is in another form, such as a dictionary mnemonic, click the `Metamask, Mnemonic, Hardware Wallet...` button for alternate login methods.
3. Once you're logged in, click the `OS` option.
4. In resulting page, click the `Download Arvo Keyfile` button. You should receive a `.key` file that contains the secret needed to boot your ship. Hold on to this file.

## Hosting

There are two supported ways of running an Urbit ship: using a cloud service, or running it locally on your own machine. Most users run things locally at first, but we recommend using a cloud service for Urbit because it allows your ship to be accessed from anywhere on multiple devices. Hosting your ship in the cloud also allows it to always be online and ready for OTA updates. It's technically possible to run your Urbit ship on a home server, but ISPs often restrict this to business plans and opening up your home network to the internet can be unsafe if done improperly.

Using a cloud service costs money, but it's more convenient to use than a local install.

We have a guide for [hosting your ship on DigitalOcean](@/using/operations/hosting.md) which we've found works well, but any cloud hosting service should work.

### Booting Your Planet

You'll be booting your ship with the keyfile that you downloaded from Bridge [earlier in this document](#id).

Note that this section is only for booting a ship that uses the live Urbit network.

#### Step 1: Find Your Urbit ID

This will look something like `~lodleb-ritrul`. You can see the name of your Urbit ID when you log into your wallet using the [Bridge client](#id).

#### Step 2: Find the path to your keyfile

Find the absolute path to the keyfile that you downloaded from Bridge. Copy it.

#### Step 3: Run the boot command

If you are not already within the directory you installed above, enter it by running `cd urbit-v0.10.8-darwin` (for Mac) or `cd urbit-v0.10.8-linux64` (for Linux) from where you ran the install commands. It contains your Urbit binary, and your ship will be installed here as well.

Once you're inside, run the command below, except with `sampel-palnet` replaced by the name of your
Urbit identity, and `path/to/my-planet.key` replaced with the path to your keyfile:

```sh
./urbit -w sampel-palnet -k path/to/my-planet.key
```

Or, if you'd prefer to copy your key in, you can run:

```sh
./urbit -w sampel-palnet -G rAnDoMkEy
```

Either command will create a directory called `sampel-palnet/` and begin building your ship. It may take a few minutes.

When your ship is finished booting, you will see either the `~sampel-palnet:dojo>` or `~sampel-palnet:chat-cli/` prompt. If you're seeing `:chat-cli` press `Ctrl-x` to switch into Dojo. At that point, you should permanently erase your keyfile from your machine.

To shut down your ship, use `Ctrl-d`. To start your ship up again, run `./urbit sampel-palnet/` from the directory where your Urbit binary is saved. Note that in this usage, `sampel-palnet/` is the path of a folder, which by default is located in the same folder as the Urbit binary. This folder is called your ship's **pier**, and you can put it wherever you like.

Never boot multiple instances of your ship at the same time. You can prevent this from happening on accident by only ever keeping a single copy of your pier.

**Important:** once a key has been used to boot a ship onto the network, it cannot be used to boot that ship again later - doing so will cause communication problems with other ships. For this reason you should **delete the keyfile from your machine once your ship has booted successfully**. (If you do use the same key twice, you'll need to conduct a [personal breach](#breaches) to restore your ship to full functionality).

### Updating to the latest binary

Most updates to Urbit are downloaded and applied automatically as OTA (Over the Air) updates. Occasionally it would be infeasible to distribute an update this way, and a new `urbit` binary is released. This is announced in the [urbit-dev](https://groups.google.com/a/urbit.org/forum/#!forum/dev) Google Group when it occurs (as are all OTA updates). To update to the latest binary, follow the same process outlined above to download and extract it into a new folder. (the binary linked on this page will always be the latest). Then run it as before with `./urbit path/to/sampel-palnet/`.

### Breaches

An important concept on the Urbit network is that of continuity. Continuity refers to how ships remember the order of their own network messages and the network messages of others -- these messages are numbered, starting from zero. A breach is when ships on the network agree to forget about this sequence and treat one or more ships like they are brand new.

There are two kinds of breaches: personal breaches and network breaches.

A personal breach can fix many problems with your ship, but should be used as a last resort. A network breach happens when there's a major software update and you must download a new binary.

For details on breaching, please read the [Guide to Breaches](@/docs/tutorials/guide-to-breaches.md) documentation.

### Reporting Bugs

If you find a bug, please report it as an Issue at https://github.com/urbit/urbit/issues/new/choose. Give as much detail as possible with your bug report so the engineer team can fix it.

## Running a Star or Galaxy {#supernode}

Setting up and running a star or galaxy is a little bit different from setting up and running a planet.

### Getting a Star or Galaxy

Stars are valuable cryptographic assets. They can be bought in one of two ways.

- Transacting privately with a star owner.
- Buying a star on a marketplace like [OpenSea](https://opensea.io/collection/urbit-id)

Galaxies are rare and extremely valuable, meaning that there is no liquid market for them. If you want to buy a galaxy, you'll have to find an individual galaxy owner and transact with them.

### A Note Regarding Security

As mentioned before, stars are valuable. You are solely responsible for safeguarding your seeds and secret keys, and arming yourself with the computer-security knowledge that is attendant upon that safeguarding. You act at your own risk in reliance upon the contents of the manual. In no way is the Tlon Corporation responsible for the actions, decisions, or other behavior taken or not taken by you in reliance upon this manual.

It’s a good idea to store your keys redundantly: for example, on both a hardware wallet and engraved on steel in a safe place, in case one of those methods fails. If you deem a key to be valuable enough, you can shard it into thirds and store each third in secure, geographically distributed locations. Consider these storage media options:

- Storing the secret on a hardware wallet (such as a Trezor or Ledger) that is never connected to a networked machine.
- There are products that let you store the key on steel (such as Cryptosteel or BILLFODL). This medium is resistant to both water damage and fire damage.


### Getting a Star's Keyfile

1. To connect to Bridge, go to https://bridge.urbit.org.
2. Enter the name of your star and the associated master ticket in the appropriate fields. If you received your secret is in another form, such as a dictionary mnemonic, click the `Metamask, Mnemonic, Hardware Wallet...` button for alternate login methods.
3. Once you're logged in, click the `OS` option.
4. In resulting page, click the `Download Arvo Keyfile` button. You should receive a `.key` file that contains the secret needed to boot your ship. Hold on to this file.

### Star: Setup And Install

Because of their need for near-perfect uptime Stars should use cloud services. 

We have a guide for [hosting on DigitalOcean](@/using/operations/hosting.md), but any cloud provider should work.


#### Maintaining a Star

Being an infrastructure node, a star has certain responsibilities to the Urbit network.

By default, your star accepts software updates from its galaxy and routes them to its planets. You can use this mechanism to push custom software to your planets. Keep in mind that planets expect functional, non-breaking software updates, and generally want to be able to communicate with planets that are sponsored by other stars.

To ensure new planets can connect to your ship, users are expected to participate in network-wide breaches by updating to the latest Urbit version, deleting (or archiving) your pier, and then booting your ship using the new binary. If you don’t participate, you won’t be able to communicate with anyone on the network who has updated to the new era.

Network-wide breaches are distinct from personal breaches, wherein an individual ship cycles its personal network keys using bridge.

See our [Guide to Breaches](@/docs/tutorials/guide-to-breaches.md) for more information and for instructions on breaching.

### Running a Galaxy

A galaxy is at the top of the hierarchy in terms of importance. Thus, if you're interested in running one, please contact support@urbit.org, and we will give you personalized assistance in getting set up.
