+++
title = "Bytestring Format"
weight = 8
template = "doc.html"
+++

This document gives the bytestring format for layer 2 transactions and batches.

[Recall](/docs/azimuth/layer2.md) that a layer 2 transaction is a compact
representation of an Azimuth action whose format will be given below, along with
a 65-byte ECDSA signature. A `batch` is an atom that is a concatenation of one or more
layer 2 transactions. This atom is what is posted on the Ethereum blockchain by
a roller. We remark that multiple transactions from a single ship in a
given batch each need their own signature, since data such as the nonce are not
included in the data but are derived from the signature. Thus a ship cannot
generate multiple transactions and generate a single signature for all of them -
a different signature is needed for each transaction.

## Byte format

We describe the byte format of a `batch` and its components in the following.

### Batches {#batch}

A `batch` is an atom that is the concatenation of several raw transactions, which
are themselves atoms. `naive.hoon` starts reading the `batch` from the end and
working backwards. Thus a `batch` looks like:

```
action-n
signature-n
action-(n-1)
signature-(n-1)
...
action-2
signature-2
action-1
signature-1
```

Be careful to distinguish between an "action" and an "unsigned transaction". An
action is a short bytestring that describes an Azimuth action as given in the
following section, while an unsigned transaction is an action plus the nonce,
chain ID, header. Actions are what are submitted to Ethereum, while unsigned
transactions are what are signed and used as the signatures in the above `batch`
format. When `naive.hoon` parses a batch it adds the appropriate nonce, chain
ID, and header to a given action and uses that to verify the corresponding
signature, rather than just the action itself. This reduces the number of bytes
in the batch, making transactions cheaper.

### Actions {#actions}

The hex format of an action as they appear in a `batch` is as
follows. They are parsed by the `+parse-tx` arm in `naive.hoon`.

```
remainder: arguments
7 bits: operation
4 bytes: ship sending the transaction
5 bits: padding
3 bits: proxy
```

The `proxy` is one of:
```
%0  %own
%1  %spawn
%2  %manage
%3  %vote
%4  %transfer
```
Note that `%vote` proxies are not supported by layer 2.

The ship is its `@p` encoded as an `@`.

The operation is one of the following:

```
%0   %transfer-point
%1   %spawn
%2   %configure-keys
%3   %escape
%4   %cancel-escape
%5   %adopt
%6   %reject
%7   %detach
%8   %set-management-proxy
%9   %set-spawn-proxy
%10  %set-transfer-proxy
```

Since the operation is represented with 7 bits, to complete the byte the
arguments either use the remaining bit as a binary flag or as padding.

#### `%transfer-point`

```
20 bytes: address to transfer to
1 bit: reset?
```

#### `%spawn`

```
20 bytes: address to set transfer proxy of spawned ship to
4 bytes: ship to spawn
1 bit: padding
```

#### `%configure-keys`

```
4 bytes: crypto suite
32 bytes: encryption public key
32 bytes: authentication public key
1 bit: breach?
```

#### `%escape`, `%cancel-escape`, `%adopt`, `%reject`, `%detach`

Each of these actions have the same argument - a single ship:

```
4 bytes: ship
1 bit: padding
```

#### `%set-management-proxy`, `%set-spawn-proxy`, `%set-transfer-proxy`

Each of these actions have the same argument - an Ethereum address:

```
20 bytes: address
1 bit: padding
```

### Unsigned transactions {#unsigned}

An unsigned transaction is an atom consisting of the concatentation of an Ethereum signed
message header, an Urbit ID header, a chain ID, a nonce, and an action. This has the following format:

```hoon
%:  cad  3
  26^'\19Ethereum Signed Message:\0a'
  (met 3 len)^len
  14^'UrbitIDV1Chain'
  (met 3 chain-t)^chain-t
  1^':'
  4^nonce
  action
  ~
==
```

Here `+cad` is a gate that concatenates atoms given in `octs` (`(pair @ud @)`) format. The
argument `3` is a `bloq` size meaning `2^3=8` bits (one byte), and the head of
each cell (which are `octs`) in the arguments that follow is the number of blocks (number of bytes
in this scenario) of each entry, with the tail being the actual data. The reason
to use `octs` rather than just atoms is to account for leading zeroes.

`len` is the length measured in bytes of everything following it except the
signature. `chain-t` is the chain ID, which is to distinguish between e.g. the
Ethereum test net and main net, to ensure that transaction used in one cannot be
rebroadcast on the other (see
[EIP-155](https://eips.ethereum.org/EIPS/eip-155)). We note that `len` and
`chain-t` are both ASCII decimals (`@t` in Hoon), while `nonce` and `action` are
`@ud`s.

Again we emphasize that unsigned transactions are _not_ what is submitted in a
batch - an action and a signature are. A ship submitting a layer 2 transaction
to a roller signs an unsigned transaction and this signature is included
along with the action, which does not include the additional data listed above.
When a ship determines whether or not a given layer 2 action is valid, it adds
the additional data to the action and verifies the signature against that.

### Signatures {#signatures}

The signature is a 65-byte ECDSA signature as described in
[EIP-191](https://eips.ethereum.org/EIPS/eip-191) and is compatible with
`personal_sign`. The precise format of the signature depends on which wallet was
used to sign it. Layer 2 supports all major signature formats, including
Metamask, Trezor, Ledger, and others. Signatures in batches are obtained by signing
an [unsigned transaction](#unsigned).

