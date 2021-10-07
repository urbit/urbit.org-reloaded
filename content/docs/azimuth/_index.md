+++
title = "Azimuth"
weight = 700
sort_by = "weight"
template = "sections/docs/chapters.html"
insert_anchor_links = "right"
+++


### [Azimuth](/docs/azimuth/azimuth)

An overview of the Ethereum-based public key infrastructure utilized by Urbit.

### [Urbit HD Wallet](/docs/azimuth/hdwallet)

Azimuth has its own optional hierarchical deterministic wallet system, sometimes
referred to as a "master ticket".

### [Life and Rift](/docs/azimuth/azimuth)

An explanation of how Azimuth keeps track of the most recent set of networking
keys necessary to communicate with a ship.

### [Advanced Azimuth Tools](/docs/azimuth/advanced-azimuth-tools)

Expert-level tooling for generating, signing, and sending Azimuth-related
transactions from within Urbit itself.

## Layer 2

Documentation of the technical details of naive rollups, our Layer 2 solution
for the reduction of Urbit ID gas prices and friction associated with the usage
of cryptocurrency.

### [Layer 2 Overview](/docs/azimuth/layer-2)

A high-level technical description of the functionality of the naive rollups
"Hoon smart contract" and associated apps, such as Bridge and the roller.

### [Layer 2 Actions](/docs/azimuth/l2/l2-actions)

An exhaustive list of what Azimuth actions can be performed for any given tuple
`(ship rank, layer 2 status)`.

### [Data Flow]

Diagrams and explanations of how data flows between Bridge and the various
components inside Urbit involved with layer 2.

### [Bytestrings](/docs/azimuth/l2/bytestring)

The bytestring format for layer 2 transactions and batches.

### [Roller HTTP RPC API](/docs/azimuth/l2/layer2-api)

Documentation on the HTTP RPC API used for Urbit to communicate with Bridge to
manage layer 2 transactions.
