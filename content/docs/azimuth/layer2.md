+++
title = "Layer 2 Overview"
weight = 5
template = "doc.html"
+++

PR:  https://github.com/urbit/azimuth/pull/43

This document provides technical detail on Azimuth's "Layer 2" scaling solution
for Azimuth, known more formally as "naive rollups". We focus here primarily on the
"Hoon smart contract" located at `/lib/naive.hoon` in your ship's pier, as well
as other proximal topis.

This is intended for developers that desire a deeper understanding of how this
protocol works, how secure it is, and how to extract data from layer 2 to obtain
a complete picture of the Arvo network.

This is not intended for everyday users who only wish to know how
to either transfer their ship to layer 2 or perform layer 2 actions. For that,
see ((bridge documentation yet to be written)). For a casual overview of the
rationale and functionality of layer 2, please see this [blog
post](/blog/rollups).

This page is also not where to find instruction on how to run your own "aggregator"/"roller".
Documentation for this process is forthcoming. However, this page does contain
essential background information for anybody in this category.

## Summary

Naive rollups were developed in response to rising gas costs for performing
Azimuth actions.

### Layer 1

We first review how "Layer 1", i.e. the [Azimuth](/docs/glossary/azimuth) smart
contract suite, functions. This happens with four steps.

 1. A transaction is posted to the Ethereum blockchain.
 2. The [Ethereum Virtual MAchine](https://ethereum.org/en/developers/docs/evm/)
    calculates the resulting state transition and checks its validity, then
    updates the state if it is a valid transition.
 3. Your urbit downloads the new state from an Ethereum node.
 4. Your urbit makes the final decision on whether the new state is valid.

In practice, this step four never occurred but has always been possible in
theory. By default, your urbit accepts the Azimuth state obtained from the
blockchain as valid.

### Layer 2

Layer 1 still works identically today as it did before naive rollups. Naive
rollups work via the following process.

 1. A batch of one or more transactions is posted to the Ethereum blockchain by
    an urbit node called a roller or aggregator.
 2. Your urbit downloads the transactions from an Ethereum node.
 3. Your urbit computes the resulting state transitions from the transactions
    and checks them for validity.
 4. Your urbit updates your locally stored Azimuth state with state transitions
    from the batch that have been deemed valid.
    
 In comparison with Layer 1, the EVM no longer checks the validity or computes
 the state transitions for any given transaction. It is now being used solely as
 a database of submitted transactions, and the business logic of computing what
 these transactions mean has been offloaded to your urbit. Thus we think of
 `naive.hoon` as being the first "Hoon smart contract". You could also consider
steps 3 and 4 of the Layer 2 process as being a fattening of the trivial step 4
 of the layer 1 process.

Here we briefly elaborate on the layer 2 steps, but see below for more technical
detail.

A roller is any urbit node - even a moon, comet, or fakezod will do - to which
batches of transactions are submitted. You could use your own ship as a roller
if you wanted. The roller collects batches of transactions from whichever
parties they choose, and submits them to the Ethereum blockchain all at once.
We expect this to either happen on a regular interval, or once some minimum
threshold of transactions is reached, but the decision on when to submit is
ultimately up to the roller.

Computing the resulting state transitions obtained from downloaded Ethereum
transactions is done using `naive.hoon`, which is a gate that accepts both layer
1 transactions and layer 2 batches, and then computes the resulting state
transitions and updates the ship's internal Azimuth data accordingly.

### Savings in gas costs

There are several dimensions by which naive rollups saves on gas over layer 1.
They are:

 1. Gas is not spent on instructing the EVM to compute state transitions and
    confirm validity.
 2. Layer 2 Azimuth state is not stored on Ethereum, so the only data storage
    gas costs is for the transactions themselves.
 3. Layer 2 transactions are written in a highly compressed form. E.g., instead
    of calling the spawn action by name, it is simply referred to as action `1`.
 4. By collecting multiple layer 2 transactions and submitting them as a single
    "batch transaction", additional gas savings are achieved by not needing to
    duplicate information such as which smart contract the transactions are
    intended for.
    
Put together, these create a reduction in gas costs of at least 65x.

### One way trip

NOTE: Depositing to L2 clears proxies to get a gas cost discount. It also zeroes
out escapes, keys, and claims? I'm guessing these all still remain on L2 though.

## Interacting with L2

Layer 2 affects all Azimuth points on the network, even if they are on layer 1. Here we
outline what the changes are to each class. How sponsorship works on layer 2 is
more complex, and has its own [section](#sponsorship).

### Planets

A layer 1 planet can move to layer 2 by transferring ownership of the planet to
the layer 2 deposit address. The owner will still utilize the same private keys
they used before this transfer to perform actions. This includes both the
ownership address as well as the management proxy, if it has one. It is not
possible to transfer only the management proxy to layer 2; it may only happen as
a side-effect of transferring ownership to layer 2.

Once on layer 2, the planet may perform all Azimuth actions utilizing their
ownership key. This includes transferring ownership to a new address and setting
a management proxy. Their management proxy may be utilized to perform all
actions allowed by the management proxy - changing keys, breaching, and changing
sponsors.

### Stars

Naive rollups permit three possible states for stars. They may exist entirely on
layer 1, they may have their ownership and management proxy on layer 1 with
their spawn proxy on layer 2, or they may exist entirely on layer 2.

#### Layer 2 spawn proxy

A star may change its spawn proxy to layer 2. This allows the star to spawn
planets directly on layer 2 with the accompanying gas cost savings. A star with
its spawn proxy on layer 2 will no longer be able to spawn layer 1 planets, but
any layer 1 planets sponsored by the star will remain so. This action is
currently irreversible - the only further change to layer 2 status that is
possible would be to transfer ownership to layer 2 as well. All actions besides
spawning and sponsorship (see [below](#sponsorship)) must be performed on layer 1.

#### Layer 2 ownership

A star entirely on layer 1, or a star on layer 1 with a layer 2 spawn proxy, may
transfer ownership to layer 2 by transferring ownership to the layer 2 deposit
address. This will allow the star to perform all Azimuth actions as layer 2
actions with the associated gas cost savings.

Transferring ownership to layer 2 automatically moves the spawn proxy to layer 2
(if it is not already there), as well as the management proxy. Thus the star
owner may then perform management proxy tasks on layer 2. Layer 1 actions are no
longer accessible to a star whose ownership exists on layer 2.

### Galaxies

Note: actually maybe galaxies can put their spawn proxy on layer 2?

Galaxies may not have ownership, managment, spawn, or voting proxy on layer 2.
They must remain entirely on layer 1. However, they are still eligible to
perform layer 2 sponsorship actions - see the following section.

### Sponsorship

Due to the possibility of sponsors and sponsees existing on different layers,
the exact logic on how sponsorship works is complex. The short summary is that
if either the sponsor or sponsee are on layer 2, then sponsorship actions must occur on
layer 2. If both sponsor and sponsee are on layer 1, then sponsorship actions
may occur on either layer. For most scenarios, this is sufficient. However there are
a number of edge cases that make this more complicated.

For instance, what happens if a layer 1 planet has an oustanding escape that has
not yet been accepted, and then transfers to layer 2. Is the escape still valid?
All potential scenarios are outline as follows. The typical user need not
concern themselves with these complications - this is primarily for developers.

## Azimuth state

## Processing L1 transactions

## Processing L2 batches

## Aggregators

## Security measures

