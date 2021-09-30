+++
title = "Smart Contracts"
weight = 4
template = "doc.html"
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
