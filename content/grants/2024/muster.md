+++

title = "Muster — An Urbit Browser"
date = "2024-03-15"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps"]

[extra]
image = ""
description = "The ground-up browser hooked to Urbit"
reward = "20 Stars"
assignee = ["~togsyn-lablev"]
champion = ["~wolref-podlex"]
grant_id = "R0370"
completed = false
canceled = true

+++

# Overview 
Muster is a ground-up browser that integrates with Urbit. Initially available for MacOS, it will
eventually extend its compatibility to Windows and Linux platforms.

The browser allows for seamless navigation across Web2 domains, Web3 domains, and
even Urbit IDs, all directly accessible by typing in the address bar.

# Background
Today's browsers were conceived decades ago and have significant limitations. Although
they serve as "windows" for accessing the Internet and provide a view into the colorful world
of the web, they suffer from a number of critical shortcomings:

1. No one-on-one engagement between the website & the visitor - As the old
saying goes, "On the Internet, nobody knows you're a dog." Engagement channels are
typically attributed to third-party applications, rather than the browser itself. [Classical
Problem]

2. Privacy Concerns - Modern browsers generate extensive logs, history records, and
cache data, which are stored locally. This data is a vital asset to the user but remains
vulnerable to privacy breaches. Ultimately, users neither own nor control their own
data. [Classical Problem]

3. Non recognition of Web3 routes - Existing browsers lack the navigational
capabilities needed to recognize Web3 routes, such as .eth or .crypto domains. This
becomes especially concerning when considering that Web3 domains often map to
wallet addresses. Incorrect routing or redirection could result in financial losses.
Users are generally reliant on browser extensions or plugins to access these Web3
domains. [Emerging Problem]

4. Frictional Web3 - Decentralized applications (dApps) on Web3 necessitate wallets
for transaction approvals. Current browsers are not 'wallet-ready,' requiring users to
install multiple wallet extensions, in some cases even up to 5 wallets, in order to
interact effectively within the Web3 ecosystem. [Emerging Problem]

# Proposal
Muster is designed with a ground-breaking principle aimed at resolving the aforementioned
problems in the browser landscape. The solution's core revolves around a unique design
approach and methodology.

### Integration with Urbit: A Foundation for Data Sovereignty
Muster leverages Urbit's unique design for personal computing, allowing users complete
ownership and control over their data. Urbit's Sybil-resistant environment, fueled by scarce
Urbit IDs, serves as the foundational layer for Muster.

### Unified Urbit ID: Total Ownership of Browsing Data
Every Muster user is mapped to a unique Urbit ID. All data generated during browsing
sessions is stored within the user's Urbit ship, thereby providing complete data ownership.

### Domain Resolution: Bridging Web2 and Web3
- Web2 Domains: Muster resolves Web2 domains through ICANN's root servers.
- Web3 Domains: Muster accesses Web3 domain names natively from blockchains
like Ethereum (via ENS) or Solana (via Bonfida) etc.. For instance, typing john.eth in
the address bar would direct you to the designated landing page for that domain.
- Urbit IDs: Muster allows direct resolution of Urbit IDs from the address bar, bypassing
the need for Web2 sub-domains. As in the above example, typing ~tobrun-tomnet
would load the associated landing page directly.

### Native Web3 Capabilities
Beyond basic domain resolution, Muster equips users with native Web3 functionalities. It
serves as a decentralized clearing ledger for all accessed Web3 domains, essentially
becoming a unified cache that can be utilized by various blockchain communities.

### Scalability 
A Universal Web3 Cache - Muster's Web3 cache will be powered by integration with either  of these two blockchains—[Hedera Hashgraph](https://hedera.com/) and [Shardeum](https://shardeum.org/)—to ensure a free, fast, and  scalable solution. This cache serves as an organic lookup tool for blockchain communities. 

# Scope of Work
Muster will evolve as a full-fledged, ground up privacy-enabled Web3 browser with in-built
payment rails over Lightning Bitcoin network to incentivize the visitors in Sats by the website
owners.

SoW of Muster includes following major tasks (but not necessarily in that order):

1. Foundational hook to Urbit where details of complete browsing like sessions,
cookies, login, profiles etc. are stored on individual ships and data is written
and read from the ships – [note: this leads to a privacy by design]

2. Sessions of users are synchronized amongst various devices and/or platform

3. Native capabilities to allow users to type in Urbit IDs in the address bar and
load on the fly dynamic landing page of the Urbit ID in question – [note -this
will be independent of scry end points or independent of the sub-domains of
hosting providers. So, eventually, if Web2 DNS resolving capabilities is turned
off (for example – disable; resolve.conf) the dynamic page will still load] – a
giant step towards parallel Internet

4. Native capabilities to allow resolving of all kinds of Web3 domains coming
from many chains. Integration for ENS, UD, HNS (Handshake Name System),
and native naming systems of L1 chains. So that, if the user types in john.eth,
a dynamic page is loaded on the fly

5. Integrated wallets for the end users. Support for Bitcoin, Ethereum, Solana
and top L1 chains – [note- Muster intends to remove as many friction points
as possible and dozens of wallets in the form of Chrome extensions are
problematic]

6. Complete log of the Web3 transactions over Urbit ship of the individual users

7. Integrated payment rail over Bitcoin Lightning network – allowing website
admin/owners to incentivize the visitors in Sats based upon their
engagements with the web site [note – a giant step towards inclusive Web3
advertisement technology]

8. Availability in Mac & Windows and mobiles

# Milestones
1. 
    - Complete Figma design containing on boarding processes of the users; end to end with  multiple options like users  with existing Urbit IDs or  users without Urbit IDs (in  those scenarios, they  would be presented with  the temporary IDs)  
    - Complete documentation 
    - Timeline: 1 week

    _Reward: 1 Star_

2.
    - Structure of the landing  page for Urbit IDs accessed directly from  address bar of Muster – this format could be used  by other applications  building on Urbit – for  example, the Landscape  could be updated with the  structure of the landing  page 
    - Structure of the data to  be kept in the ships of the  Urbit ID containing 
        - Browsing history 
        - Cache 
        - Wallet’s histories 
        - Sensitive data in the  encrypted format 
        - Complete profile 
        - Mappings between  Web2 and Web3 worlds.
    This would be the one of  the most important data  structures for Muster as  well as Urbit community 
    - Structure of the Web3  cache – entire resolving  of Web3 domains would  be gradually cached and made available to other  L1 chains /applications. Urbit ID specific caching  will be local in Urbit’ ship  but overall caching would  be created in appropriate  fast & scalable L1 chain/s
    - Timeline: 2 weeks

    _Reward: 2 Stars_

3. MVP of Muster for Mac
    - Timeline: 2 weeks

    _Reward: 6 Stars_

4. MVP of Muster for Windows
    - Timeline: 2 weeks

    _Reward: 3 Stars_

5. Initial adoption. Proposed key factors for assessment of this milestone:
    - A total 500 downloads of 
      Muster – in either 
      of the two 
      versions: Mac & 
      Windows 
    - Configuration of Muster using Urbit IDs (300 users)
    - Buying of new Urbit IDs from within Muster (100)
    - Timeline: within one month of the pre-alpha launch.

    _Reward: 8 Stars_ 

# Overall Benefits
Muster as the ground up browser hooked to Urbit will bring following benefits: 
1. Accessibility of Urbit IDs & Web3 domains directly from the address bar – no  dependencies on the Web2 sub-domains 
2. Full control of the data by the end users  
3. Capturing of wallets’ transactions, cache, histories, profiles of the end-users and  writing it to users’ ships – this will allow users to login into Muster with their Urbit ID  and synchronize everything – across different devices/machines 
4. New use case of Urbit IDs – as Muster will require Urbit IDs to be configured e. Innovative browser for the entire industry hooked to Urbit – gradually, this will be  become mass product

# Why Us?
We are a dedicated and innovative team with a track-record in bridging the old web and the new — we previously built [Web23](https://web23.io/), a secure DNS platform that allows you to register and tokenize domain names on Hedera Hashgraph. 
1. Our core expertise & experience run in decades of man hours in the Unix/Linux &  domains, DNS at large 
2. Web23 is one of the grantees of Hedera Hashgraph - we have developed complete  naming system for .hbar and various project TLDs over Hedera
3. Web23 has collaborated with many ICANN registrars & registries to bring in the  Web2 domainers to the evolving webspace of Web3 
4. Web23 is working to transform any Web2 domain to a Web3 domain




