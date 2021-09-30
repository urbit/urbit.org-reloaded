+++
title = "Ecliptic.eth"
weight = 6
template = "doc.html"
+++

[Ecliptic.eth](https://etherscan.io/address/ecliptic.eth) holds the business
logic for the ledger kept by Azimuth.eth. It may be modified by [galaxy
vote](/docs/glossary/upgrade). This determines things such as what the various
proxies are capable of, how keys are changed, or verifying that a request is
valid.

You can read about [Urbit's first
upgrade](https://github.com/urbit/azimuth/pull/35) to Ecliptic, which occurred
in the summer of 2021, [here](https://urbit.org/blog/first-contract). The
[second](https://github.com/urbit/azimuth/pull/43) occurred later in the year
and consisted of several small modifications to ready the PKI for the
introduction of naive rollups.

There are currently [28 functions](#write) which may be called to write to
the Ecliptic, and [17 functions](#read) to read data from the Ecliptic. Many of these
have a corresponding [layer 2 action](/docs/azimuth/l2-actions), and/or can be
performed using [Bridge](/using/id/using-bridge). We note these facts where applicable.

## Write functions {#write}

Here we briefly describe each function in the Ecliptic which allows one to write
data to Ethereum. These can be called using
[Etherscan](https://etherscan.io/address/ecliptic.eth#writeContract), but
the most common functions may be called from within Bridge.

### `startDocumentPoll`

#### Accepts

`uint8 _galaxy, bytes32 _proposal`

#### Action

Starts a [document poll](/docs/glossary/docvote). Galaxies only. `_galaxy` is
the calling galaxy, and `_proposal` is a keccak-256 hash of any arbitrary
document or string of text.

### `detach`

A sponsor may call this on a sponsee to set `hasSponsor` for their `Point` to
`false`.


### `approve`

### `updateDocumentPoll`

### `onUpgrade`

### `transferPoint`

### `transferFrom`

### `createGalaxy`

### `setTransferProxy`

Sets the `transferProxy` for a `Point`. This action may only be performed by the
owner of the `Point` or their transfer proxy.

This action is performed by Bridge when transferring a point from one address to
another. This makes transferring into a two-step process in order to reduce the
likelihood of accidental transfer. 

Corresponds to `%set-transfer-proxy` on layer 2.

### `safeTransferFrom`

### `configureKeys`

### `castUpgradeVote`

### `updateUpgradePoll`

### `castDocumentVote`

### `renounceOwnership`

Renounces ownership of the Ecliptic contract. This leaves the contract with no
owner, and thus it would no longer possible to call functions with the
`onlyOwner` modifier. This action may only be performed by the owner of
Ecliptic.

### `setManagementProxy`

Sets the `managementProxy` for a `Point`. This action may only be performed by the
owner of the `Point` or their management proxy.

This action may be performed using Bridge.

Corresponds to `%set-management-proxy` on layer 2.

### `startUpgradePoll`

### `spawn`

### `setApprovalForAll`

### `setVotingProxy`

Sets the `votingProxy` for a `Point`. This action may only be performed by
galaxies, by either their owner or their voting proxy.

This action may be performed using Bridge.

This action does exist on layer 2 as `%set-voting-proxy`, however since galaxies
cannot be deposited to layer 2 they cannot set a layer 2 voting proxy.

### `setSpawnProxy`

Sets the `spawnProxy` for a `Point`. This action may only be performed by stars and
galaxies, by either their owner or their spawn proxy.

This action may be performed using Bridge.

Corresponds to `%set-spawn-proxy` on layer 2.

### `safeTransferFrom`

### `setDnsDomains`

Sets `dnsDomains`. This may only be done by the owner of the contract. This may
not be done using Bridge and has no corresponding action on layer 2.

### `reject`

### `escape`

Sets `escapeRequested` to `true` and `escapeRequestedTo` to a given `uint32`
indexing a `Point`. This action may only be performed by planets and stars, by
either the owner of the `Point` or their management proxy.

This action may be performed in Bridge.

Corresponds to `%escape` on layer 2.

### `adopt`

Corresponds to `%adopt` on layer 2. 

This action may be performed using Bridge.

Allows a potential sponsor to accept a `setEscapeRequest` from a potential
sponsee. Planets may only be adopted by stars, and stars may only be adopted by
galaxies.

### `cancelEscape`

### `transferOwnership`

Transfers ownership of the Ecliptic contract to a new owner. This may only be
performed by the owner of the contract, and is not available in Bridge or layer 2.



