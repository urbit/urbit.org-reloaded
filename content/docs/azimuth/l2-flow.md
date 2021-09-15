+++
title = "Azimuth Data Flow"
weight = 7
template = "doc.html"
+++

This document summarizes the various components involved with Azimuth and
how they communicate with each other. This also constitutes an explanation for
how Urbit implements the data flow of naive rollups.

The following diagram illustrates the high-level structure of Azimuth as seen
from the perspective of Urbit.

![High level overview](https://media.urbit.org/docs/layer2/l2-high.svg)

## Bridge

The primary way in which users interact with Layer 2 is via Bridge. Bridge is
responsible for collecting transactions from users, signing them, and forwarding
them to a roller via an HTTP API.

## Azimuth

Azimuth is a set of smart contracts that exists on Ethereum that defines the
state and logic of the PKI. With the advent of naive rollups, this has also come
to include the set of components used for dealing with the PKI within Urbit. The
following sections outline what each component is responsible for and how it
communicates with the others.

![Azimuth overview](https://media.urbit.org/docs/layer2/l2-azimuth.svg)

As seen in the above diagram, there are three Gall agents responsible for
managing the PKI state: `azimuth.hoon`, `aggregator.hoon`, and `aggregator-rpc.hoon`.

### `azimuth.hoon`

`/app/azimuth.hoon` is a Gall agent and thread handler responsible for keeping
track of the PKI state, and exposing that data via scries.

The following diagram illustrates `azimuth.hoon`'s role in the system.

![Azimuth components](https://media.urbit.org/docs/layer2/l2-azimuth-azimuth.svg)

The state held in `azimuth.hoon` is the following.

```hoon
++  app-state
  $:  %3
      url=@ta
      whos=(set ship)
      nas=^state:naive
      own=owners
      logs=(list =event-log:rpc:ethereum)
  ==
```

`whos` is the set of ships currently known by Azimuth. `nas` is the PKI state,
as defined in [`naive.hoon`](#naive). `own` is a `jug` of Ethereum addresses and
the set of ships owned by that address. `logs` is a list of all Azimuth-related
Ethereum event logs known by the ship.

Scries can be inferred from the `+on-peek` arm:

```hoon
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+  path  (on-peek:def path)
      [%x %logs ~]  ``noun+!>(logs.state)
      [%x %nas ~]   ``noun+!>(nas.state)
      [%x %dns ~]   ``noun+!>(dns.nas.state)
      [%x %own ~]   ``noun+!>(own.state)
  ==
```

### `eth-watcher.hoon`

`/app/eth-watcher.hoon` is responsible for listening to an Ethereum node and
collecting Azimuth related transactions. It sends collected transactions to
`+on-agent` in `azimuth.hoon`, which then obtains the resulting PKI transitions
from them using `naive.hoon`.

### `naive.hoon` {#naive}

`/lib/naive.hoon` is a gate whose sample is a `verifier`, `chain-id=@ud`,
`state`, and `input`, which outputs a cell of `[effects state]`. This is the
transition function which updates the state of the PKI stored in `azimuth.hoon`
which handles state transitions caused by both layer 1 and layer 2 transactions.
A high-level overview of how `naive.hoon` functions can be found
[here](/docs/azimuth/layer2#layer-2).

A `verifier` is a gate of the form

```hoon
+$  verifier  $-([dat=octs v=@ r=@ s=@] (unit address))
```

It runs the keccak hash function on `dat` to verify that `dat` is data signed by
the ECDSA signature given by the `[v r s]` tuple, according to the format for
signed transactions outlined in the [bytestring
format](/docs/azimuth/bytestring) documentation.

`chain-id` is the ID used by the Ethereum blockchain, which is `1337`. See [bytestring
format](/docs/azimuth/bytestring) for more information.

`state` is the current state of the PKI:

```hoon
+$  state
  $:  =points
      =operators
      dns=(list @t)
  ==
+$  points     (tree [ship point])
++  point
  $:  ::  domain
      ::
      =dominion
      ::
      ::  ownership
      ::
      $=  own
      $:  owner=[=address =nonce]
          spawn-proxy=[=address =nonce]
          management-proxy=[=address =nonce]
          voting-proxy=[=address =nonce]
          transfer-proxy=[=address =nonce]
      ==
      ::
      ::  networking
      ::
      $=  net
      $:  rift=@ud
          =keys
          sponsor=[has=? who=@p]
          escape=(unit @p)
      ==
  ==
+$  dominion  ?(%l1 %l2 %spawn)
+$  operators  (jug address address)
```
`points` should be self-explanatory if you are already familiar with the
structure of Urbit ID. The only new addition is `dominion`, which is a record of
whether a ship is on layer 1, layer 2, or layer 1 with a layer 2 spawn proxy.
See [Layer 2 actions](/docs/azimuth/l2-actions) for an overview of how
`dominion` determines the actions available to a ship.

`operators` already existed on layer 1 and are defined as a part of the [ERC-721
standard](https://eips.ethereum.org/EIPS/eip-721).

`dns` is a list of DNS entries associated to galaxy IP addresses. At present, this
is always `~['urbit.org' 'urbit.org' 'urbit.org']`.

### `aggregator.hoon`

`/app/aggregator.hoon` is a Gall agent responsible for collecting and submitting batches of
layer 2 transactions to the Ethereum blockchain. This app is also called the
roller. Among other things, it keeps track of a list of pending transactions to
be sent, transactions it has sent that are awaiting confirmation, history of
transactions sent organized by Ethereum address, and when the next batch of
transactions will be sent.

![Aggregator](https://media.urbit.org/docs/layer2/l2-aggregator.svg)

`aggregator.hoon` has a number of scries available, intended primarily to
display data to the end user in Bridge. They can be inferred from the `+on-peek`
arm:

```hoon
  ++  on-peek
    |=  =path
    ^-  (unit (unit cage))
    |^
    ?+  path  ~
      [%x %pending ~]       ``noun+!>(pending)
      [%x %pending @ ~]     (pending-by i.t.t.path)
      [%x %tx @ %status ~]  (status i.t.t.path)
      [%x %history @ ~]     (history i.t.t.path)
      [%x %nonce @ @ ~]     (nonce i.t.t.path i.t.t.t.path)
      [%x %spawned @ ~]     (spawned i.t.t.path)
      [%x %next-batch ~]    ``atom+!>(next-batch)
      [%x %point @ ~]       (point i.t.t.path)
      [%x %points @ ~]      (points i.t.t.path)
      [%x %config ~]        config
      [%x %chain-id ~]      ``atom+!>(chain-id)
    ==
```

This app is not responsible for communicating with Bridge via HTTP. Instead, that is
handled by `aggregator-rpc.hoon`. The scries are also communicated to Bridge via
`aggregator-rpc.hoon`.

### `aggregator-rpc.hoon`

`/app/aggregator-rpc.hoon` is a very simple Gall app responsible for receiving HTTP RPC-API
calls, typically sent from other Urbit ID users via Bridge. It then translates
these API calls from JSON to a format understood by `aggregator.hoon` and
forwards them. This app
does not keep any state - its only purpose is to act as an intermediary between
Bridge and `aggregator.hoon`. See [here](/docs/azimuth/layer2-api) for more
information on the JSON RPC-API.

