# Overview

Run your IPFS node on the same machine as your Urbit, so your Urbit can easily access the IPFS node to upload and serve media.

# Rationale

Sharing pictures, memes, music, videoclips constitutes a large part of interactions among web2 users, both within their group chats, social media profiles, and forum posts. Sharing media is a core aspect of being online, but Urbit isn’t yet capable of handling large media file storage. Not having media storage not only limits social interactions, but also is a key aspect of a fully encompassing decentralized OS. 

Meanwhile, IPFS is a more narrowly focused project that allows users to publish data in the cloud in a decentralized manner, specifically filling this gap in current Urbit’s file storing capabilities. IPFS does not have an identity model other than public keys, and routable identities such as Urbit ID could be useful to understand where the files live. Thus, IPFS and Urbit are complementary projects born out of a similar rationale which can make each other better by talking to each other. 

# Scope / Implementation

Users should be able to run one easy command or script to spin up an IPFS node that is automatically configured with TLS and an S3-compatible API (including the same credentials system i.e. endpoint, access key id and secret access key) that automatically pins files when they are uploaded through the S3 API. This should work whether it is running on the same machine as the Urbit ship or a different one. 

An excellent submission will include a script that sets up an Urbit ship with a user-provided key alongside the IPFS node and puts both behind the same user-provided domain name (i.e. urbit.domain.name and ipfs.domain.name) using a shared Apache or nginx web server and LetsEncrypt for TLS. Ideally this script can configure the S3 storage in the Urbit ship programmatically so that the user does not need to do it manually.

# Milestones & Compenstation

TBD

# Future work 

Layer Urbit’s own file system over IPFS and use it to routinely back-up piers

Run [Fleek](https://fleek.co/) on Urbit using a similar implementation to do website hosting on your Urbit
