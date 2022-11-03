+++
title = "Submit a Proposal"
date = "2022-10-26"
weight = 1
description = "A comprehensive guide to creating a grant proposal"
+++

If you've got an idea to build on or improve Urbit, the Urbit Foundation will likely fund it as a proposal.

We have a track record of funding many different kinds of different projects: new apps, developer libraries and documentation, open-ended research, community formation, written and video content, and lots more.

Ready to get started? Here's how the process works:

1. [Create your proposal](#create-your-proposal) as a group on Urbit
2. Submit your proposal using [this form](https://airtable.com/shrCi54rEDxgSZr3z)
3. Obtain [approval](#community-approval) from a member of our community and finalize your proposal
4. Sign our [grant agreement](#paperwork)
5. [Submit invoices](#getting-paid) after obtaining community signoff

## Create your proposal

Submitting a proposal starts by clearly articulating your idea and the value it will bring to the Urbit network. Getting the Urbit Foundation's signoff requires [approval from an established member of our community](#community-approval) and a compelling reason for receiving the requested amount of funding.

### Create a group

The first step is to create a group in Landscape's Groups app &mdash; this will be installed by default on your ship. If you don't have a ship running, check out our [Getting Started](https://urbit.org/getting-started) guide.

Your group should:

- Be **named** after your proposal
- Be **public** so our community can join
- Contain **a notebook** called `proposal`
- Contain **a chat channel** called `discussion`

You'll write your proposal in markdown into the notebook, and engage with community members that would approve your proposal in the discussion channel.

After writing up your proposal, [fill out this form](https://airtable.com/shrCi54rEDxgSZr3z), including the name of your group. The group name can be found in the URL of your browser. For example, in the URL `https://your.ship.domain/apps/landscape/~landscape/ship/~wolref-podlex/foundation` the group name is `~wolref-podlex/foundation`.

### Elements of a proposal

Good proposals all include the following:

- A **detailed and clear description of the proposal**. If you're proposing something technical, user stories are a good idea.
- An overview of **why you are the right person for the job**. A description of your background, familiarity with the project, and professional/education experience are all good starts.
- Your estimate for **date of completion**.
- The **amount of funding** you'd like for the project, denominated in stars.
- What **specific deliverables** will look like.

It's recommended to break your project into _milestones_, each of which must have its own completion dates, funding amounts and deliverables. In general, proposals should target a first deliverable within two months of the start of the project. Proposals should have a maximum of five milestones as scoping a project beyond that is impractical, and each milestone should constitute significant enough work to warrant the reward of a full star.

Here are some examples of exceptional proposals for reference:

- [Urbit Forms](https://urbit.org/grants/urbit-forms) has great demonstration of thinking around technical architecture
- [Bitcoin Lightning Development](https://urbit.org/grants/lightning-development) shows well defined user stories and future development opportunities that can inspire potential collaborators
- [%pony](https://urbit.org/grants/pony-bounty) contains detailed thinking of current affordances of existing software if trying to build analogs to the traditional software stack
- [App Store](https://urbit.org/grants/app-store) blends the above with a nearly ideal balance of user stories mapped to milestones for clarity of completion, initial architectural thinking, and thinking around unique affordances and challenges of building on a distributed p2p system

### Funding

The Urbit Foundation will provide funding of up to five stars for any one grant.

Our formula for determining how much to value a particular grant is a function of time spent on the project, value to the Urbit universe, and track record of the contributor (either via past work within the grants program, or a relevant external background).

Further funding may be available for continued development pending the successful completion of your grant. Additionally, contributors of exceptionally well completed grant proposals become eligible to mentor apprentices which can support continued development of their application for maintenence and feature additions.

### Abandonment

A proposal is considered abandoned when a milestone is more than a month behind schedule and preemptive action is not taken to inform The Urbit Foundation of an adjusted timeline that has been approved by your Champion. When a proposal is considered abandoned, the Urbit Foundation may choose to compensate the work differently upon completion, or not at all.

The intent of this policy is to:

- Reduce the support burden on the Urbit Foundation and community when contributors go silent
- Keep grants current: what's important today might not be important a year later

We try to use this rule in good faith. Reasonable delays due to unforseen life circumstances or project complexity will be tolerated, so long as the contributor is communicative with their champion and/or the Urbit Foundation. In these cases we'll encourage the contributor to modify the timelines and/or scope of their proposals to accommodate new information.

## Community approval

Your proposal will be considered approved when an established member of our community decides to _champion_ it. Only those that have made substantial past contributions to the project, generally through their own grants, are eligible to provide such a seal of approval.

Approval from the community goes beyond simply clearing the project for funding. The community member that approves your project, called the _Champion_, will meet with you regularly to provide mentorship and support, help onboard you to the rest of the community, and ultimately be responsible for approving your work.

### How it works

After creating your group and [submitting it](https://airtable.com/shrCi54rEDxgSZr3z), the Urbit Foundation team will post your group to the community members that are approved for Championing proposals.

The contents of your submission will be available to prospective champions, and if they're interested, they'll join your group and dive into the details with you (that's why that **discussion channel** is important).

When someone is sufficiently interested, they'll say so and ask to champion your project. If multiple people are interested in championing, you'll need to choose who to go with! This is, in our view, a good problem to have.

### Working with your Champion

Your champion is invested in the success of your project &mdash; if they successfully assist you in completing your project, they'll get a small reward as well &mdash; so don't hesitate to utilize them.

Here are some guidelines for how to engage with your champion:

- **Meet regularly:** Those that can champion projects are chosen for their past contributions. This means that they're able to provide hands-on support. This structure works best if you set up a regular check-in, either once a week or every other week. If nothing else, having an accountability buddy is really helpful.
- **Stay in touch:** Leverage the Urbit network for keeping in touch about your project. Don't hesitate to ask questions! The `[battery payload]` group (~dister-dozzod-lapdeg/battery-payload) is a great place to hang out with other developers, ask questions, and share your experiences. 
- **Ask for connections:** Champions are well-connected throughout the network and know who's who. If you need support in a particular area that is beyond your Champion's expertise, they should be able to put you in touch with someone that can help.
- **Get your work reviewed:** Part of your Champion's job is to review your work and get others' eyes on it as well. Let them know when you need something reviewed by making a post in your proposal groups. Particularly, this is required for getting review and signoff that you have completed a milestone, but can be helpful for other complex asks as well.

If your Champion becomes unresponsive or is unhelpful, let someone at the Urbit Foundation know and we'll take care of it.

## Paperwork

After your proposal is Championed the Urbit Foundation will need to get a **signed contributor agreement** and **collect a small amount of personal information** from you as part of our KYC process.

The Urbit Foundation must comply with international law when distributing address space. We try to keep this process as minimal as we can, but there's no way to avoid it entirely without legally jeopardizing the Foundation's operations.

## Getting Paid

After you've finished your work on a given milestone, you will need to get signoff from your champion. To do this, make a notebook post in your proposal group with the details of the milestone completed, any relevant instructions, github repos, or app download links, and solicit review from your champion. Their reply  of `approved` in the notebook post comments will constitute signoff and you'll need a link to that milestone post when you [submit an invoice](https://airtable.com/shrXXCs1uaxtNSBcg). Upon successful review of this notebook post by the Urbit Foundation and an invoice recieved for the amount agreed upon in your grant or milestone, the Foundation will pay your star allocation to the Ethereum address you have provided.

We approve and issue payments within 30 days of invoice receipt and approval, although often payment is made more quickly as transactions are batched with other grantees who have recently completed milestones. If you are having any issues accepting stars through [Bridge](https://bridge.urbit.org) please contact `~taller-ravnut` for assistance.
