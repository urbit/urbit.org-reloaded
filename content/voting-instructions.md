+++
title = "Voting Instructions"
template = "page_indiced.html"
[extra]
hidetitle = "true"
+++

# Arvo Stability Vote

As a galaxy owner, you have the opportunity to participate in one of the first votes conducted on the Azimuth network – a vote on whether Tlon has designated Arvo as stable, the second component in the [roadmap](https://github.com/urbit/azimuth/blob/master/proposals/0xcb1f81e42b5e75f000f94fc71a3ea70cab4bfc6f236b91e717f1b9516e5596b5.txt) embedded in Azimuth.

You can read more about this milestone [here](/blog/stable-arvo/).

Below are instructions on how to support this document proposal.

## Vote using Bridge

- Log into https://bridge.urbit.org with your Voting Proxy (you can use your Ownership Key as well, but that is probably harder to access)
- If you're presented with a list of assets, click on your galaxy.
- On the asset's overview screen, click Senate
- The page will show a list of the documents that have previously achieved majority, as well as currently open polls. Tlon's latest proposal has the hash of `0x00000000000000000000000000000000000000000000000000000000000000a0.`
- For more information on the text of this proposal, see [here](https://github.com/urbit/azimuth/blob/master/proposals/0xcb1f81e42b5e75f000f94fc71a3ea70cab4bfc6f236b91e717f1b9516e5596b5.txt)
- Click "support" or "reject" under the hash, then "generate & sign transaction", then "send transaction", to vote on the proposal.
- If this proposal achieves majority support, you can see the result by coming back to this page.

## Vote using Etherscan or similar

- Read the document being proposed [here](https://raw.githubusercontent.com/urbit/azimuth/edf68b8da04806dd5b95994daf14cf1e7e226829/proposals/0xcb1f81e42b5e75f000f94fc71a3ea70cab4bfc6f236b91e717f1b9516e5596b5.txt)
- If you're going to use Etherscan, you need to have Metamask installed and authenticate with either your Voting Proxy or your Ownership Key
- Create and sign a transaction using your Galaxy Ownership or Voting Proxy on the [Polls contract](https://etherscan.io/address/0x7fecab617c868bb5996d99d95200d2fa708218e4#writeContract) in castDocumentVote with your galaxy number, the document hash from the above document (`0x00000000000000000000000000000000000000000000000000000000000000a0`) and vote as "true" for yes and "false" for no
- Submit the transaction

## Verify that this proposal has passed:

- Execute the keccak-256 hash of the text. For example, copy into [this](https://emn178.github.io/online-tools/keccak_256.html) (removing any trailing newlines) and get the output hash.
- This hash should be `cb1f81e42b5e75f000f94fc71a3ea70cab4bfc6f236b91e717f1b9516e5596b5`
- The Polls contract is [here](https://etherscan.io/dapp/0x7fecab617c868bb5996d99d95200d2fa708218e4#readContract). Put that hash preceded by "0x" into "documentHasAchievedMajority" and that should indicate "true". This means it was passed by the galactic senate.
- If desired, you can verify the above is in fact the real Polls contract by checking "polls" [here](https://etherscan.io/dapp/ecliptic.eth#readContract).
