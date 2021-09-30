+++
title = "Smart Contracts"
weight = 4
template = "doc.html"
aliases = ["/docs/learn/azimuth"]
+++

This document summarizes the Ethereum smart contracts that
govern Azimuth, as well as presents some raw data about them.

Azimuth consists of the following smart contracts:

 - [Azimuth.eth](https://etherscan.io/address/azimuth.eth)
   `0x223c067f8cf28ae173ee5cafea60ca44c335fecb`: contains all on-chain state for
   Azimuth. Most notably, ownership and public keys. Can't be modified directly,
   you must use the Ecliptic.
 - [Ecliptic.eth](https://etherscan.io/address/ecliptic.eth):
   `0x9ef27de616154FF8B38893C59522b69c7Ba8A81c ` is used as an interface for
   interacting with your points on-chain. Allows you to configure keys, transfer
   ownership, etc.
 - [Polls](https://etherscan.io/address/0x7fecab617c868bb5996d99d95200d2fa708218e4):
   `0x7fecab617c868bb5996d99d95200d2fa708218e4` registers votes by the Galactic
   Senate on proposals. These can be either static documents or Ecliptic
   upgrades.
 - [Linear Star
   Release](https://etherscan.io/address/0x86cd9cd0992f04231751e3761de45cecea5d1801):
   facilitates the release of blocks of stars to their owners over a period of
   time.
 - [Conditional Star
   Release](https://etherscan.io/address/0x8c241098c3d3498fe1261421633fd57986d74aea):
   `0x8c241098c3d3498fe1261421633fd57986d74aea` facilitates the release of
   blocks of stars to their owners based on milestones.
 - [Claims](https://etherscan.io/address/0xe7e7f69b34d7d9bd8d61fb22c33b22708947971a):
   `0xe7e7f69b34d7d9bd8d61fb22c33b22708947971a` allows point owners to make
   claims about (for example) their identity, and associate that with their
   point.
 - [Censures](https://etherscan.io/address/0x325f68d32bdee6ed86e7235ff2480e2a433d6189):
   `0x325f68d32bdee6ed86e7235ff2480e2a433d6189` simple reputation management,
   allowing galaxies and stars to flag points for negative reputation.
 - [Delegated
   Sending](https://etherscan.io/address/0xf6b461fe1ad4bd2ce25b23fe0aff2ac19b3dfa76):
   enables network-effect like distributing of planets.
 
 We give a more in-depth look at a few of them below.

## [Azimuth.eth](https://etherscan.io/address/azimuth.eth)

This contract is used for storing all data related to Azimuth points and their
ownership, and should be considered to be the ledger for Azimuth. This contract
is only a data store - it only contains the bare minimum of business logic. See
[the Ecliptic](#ecliptic) for the contract containing the business logic for
this ledger. `Azimuth.eth` cannot be modified directly by [galaxy
vote](/docs/glossary/upgrade) - they are only eligible to modify the Ecliptic.

Urbit ID's are formalized as [ERC-721 non-fungible
tokens](https://eips.ethereum.org/EIPS/eip-721). The
data associated to a given Urbit ID is known as a `point`. A `point` is the
following `struct`:

```
  struct Point
  {
    //  encryptionKey: (curve25519) encryption public key, or 0 for none
    //
    bytes32 encryptionKey;
  //
    //  authenticationKey: (ed25519) authentication public key, or 0 for none
    //
    bytes32 authenticationKey;
  //
    //  spawned: for stars and galaxies, all :active children
    //
    uint32[] spawned;
  //
    //  hasSponsor: true if the sponsor still supports the point
    //
    bool hasSponsor;

    //  active: whether point can be linked
    //
    //    false: point belongs to prefix, cannot be configured or linked
    //    true: point no longer belongs to prefix, can be configured and linked
    //
    bool active;

    //  escapeRequested: true if the point has requested to change sponsors
    //
    bool escapeRequested;

    //  sponsor: the point that supports this one on the network, or,
    //           if :hasSponsor is false, the last point that supported it.
    //           (by default, the point's half-width prefix)
    //
    uint32 sponsor;

    //  escapeRequestedTo: if :escapeRequested is true, new sponsor requested
    //
    uint32 escapeRequestedTo;

    //  cryptoSuiteVersion: version of the crypto suite used for the pubkeys
    //
    uint32 cryptoSuiteVersion;

    //  keyRevisionNumber: incremented every time the public keys change
    //
    uint32 keyRevisionNumber;

    //  continuityNumber: incremented to indicate network-side state loss
    //
    uint32 continuityNumber;
  }
```

We remark that `uint32` is a 32-bit integer, and that 32 bits is the size of the
Urbit address space. Thus each ID is ultimately a 32-bit number, which one can
check in dojo with `\`@\`~sampel-palnet` or `\`@ub\`~sampel-palnet` to see it
written in binary. Thus `spawned`, `sponsor`, and `escapeRequestedTo` are
`uint32`'s referring to a particular Urbit ID.

The owner of an Urbit ID may also set several [proxies](/docs/using/id/proxies)
by modifying their `Deed`:

```
struct Deed
  {
    //  owner: address that owns this point
    //
    address owner;

    //  managementProxy: 0, or another address with the right to perform
    //                   low-impact, managerial operations on this point
    //
    address managementProxy;

    //  spawnProxy: 0, or another address with the right to spawn children
    //              of this point
    //
    address spawnProxy;

    //  votingProxy: 0, or another address with the right to vote as this point
    //
    address votingProxy;

    //  transferProxy: 0, or another address with the right to transfer
    //                 ownership of this point
    //
    address transferProxy;
  }
```

Finally, each owner of an Urbit ID may set for itself a number of `operators`,
as defined and required by the ERC-721 standard. These are for third party
brokers/wallets/auctioneers/etc such as [OpenSea](http://opensea.io).

The ledger also contains some other state—domain names by which the IP
address of a galaxy may be looked up, e.g. `zod.urbit.org` resolves to
`35.247.119.159`. This is used for bootstrapping the network from DNS. Three
domains may be listed here, but as of today they are all `urbit.org`. This may
only be updated by the owner of Ecliptic, but arguably each galaxy ought to be
able to set its own domain name and so we do not expect this to remain the case
forever.

All data in this ledger is stored and processed locally on your ship by the
[`%azimuth` Gall agent](/docs/azimuth/l2-flow#azimuth), including [layer
2](/docs/azimuth/layer2) data. Because state transitions resulting from layer 2
transactions are not included in this ledger, in general the local store will
differ from what is kept in Azimuth.eth.

## [Ecliptic.eth](https://etherscan.io/address/ecliptic.eth) {#ecliptic}

Ecliptic.eth holds the business logic for the ledger kept by Azimuth.eth. It may
be modified by [galaxy vote](/docs/glossary/upgrade). This determines things
such as what the various proxies are capable of, how keys are changed, or
verifying that a request is valid.

You can read about [Urbit's first
upgrade](https://github.com/urbit/azimuth/pull/35) to Ecliptic, which occurred
in the summer of 2021, [here](https://urbit.org/blog/first-contract). The
[second](https://github.com/urbit/azimuth/pull/43) occurred later in the year
and consisted of several small modifications to ready the PKI for the
introduction of naive rollups.

There are currently 17 events which may be called in Ecliptic, which we explain
in the following. Most of these have a corresponding [layer 2
action](/docs/azimuth/l2-actions), and most of them may be performed using
[Bridge](/using/id/using-bridge). We describe how this is so where applicable.

### `doEscape`

Corresponds to `%adopt` on layer 2. 

This action may be performed using Bridge.

Allows a potential sponsor to accept a `setEscapeRequest` from a potential
sponsee. Planets may only be adopted by stars, and stars may only be adopted by
galaxies.

### `setSpawnProxy`

Sets the spawn proxy for a point.

This action may be performed using Bridge.

Corresponds to `%set-spawn-proxy` on layer 2.

### `setTransferProxy`

Sets the transfer proxy for a point.

This action is performed by Bridge when transferring a point from one address to
another. This makes transferring into a two-step process in order to reduce the
likelihood of accidental transfer. 

Corresponds to `%set-transfer-proxy` on layer 2.

### `renounceOwnership`

Renounces ownership of the Ecliptic contract. This leaves the contract with no
owner, and thus it would no longer possible to call functions with the
`onlyOwner` modifier. This action may only be performed by the owner of
Ecliptic, 

### `activatePoint`

### `setManagementProxy`

### `setVotingProxy`

### `setEscapeRequest`

### `setDnsDomains`

### `loseSponsor`

### `setOperator`

### `registerSpawned`

### `cancelEscape`

### `setOwner`

### `transferOwnership`

Transfers ownership of the Ecliptic contract to a new owner. This may only be
performed by the owner of the contract, and is not available in Bridge or layer 2.

### `incrementContinuityNumber`

### `setKeys`

