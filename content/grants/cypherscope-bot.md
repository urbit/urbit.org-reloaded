+++
title = "Cypherscope Bot"
date = "2021-09-13"
[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev: Other"]
[extra]
image = ""
description = "On-demand financial charts chat bot"
reward = 1
assignee = "~mitten-dapper, ~ristyc-ridwyx"
grant_id = "P0068"
completed = false
canceled = false
link = ""
+++

## Cyperscope Bot - an on-demand financial charts chat bot

Urbit chat bot that provides on-demand financial charts based on [this bot](https://www.alphabotsystem.com/guide/charting)

We expect to have a Ship or a Moon for our bot that answers incoming commands by replying with a chart image queried from the TradingView API.

## User flow

- User queries our bot by typing a command into chat like “chart btcusd 1h”.

  -- Command parameters include ticker, timeframe (optional), candle type (optional), indicators (optional).
  -- We’ll attempt to match AlphaBot’s available parameters (at the bottom of [this page](https://www.alphabotsystem.com/guide/charting).
  -- More command parameters will potentially be added based on time constraints and feasibility.

- Chatbot framework relays message to our bot (Cypherscope ship).

  -- [Chatbot framework](https://github.com/robkorn/urbit-chatbot-framework)

  -- Our bot is ideally a chat participant.

  -- If our bot does not understand the command, return a helpful error message.

- Bot parses the command and queries TradingView API for a chart.

- Bot sends a message in chat with the chart image.

  -- The images may be hosted on our ship. This part is a little unclear as of now.

  -- The chart should have a consistent and unobtrusive size every time. TradingView API might already handle this.

  -- Users should be able to delete the chart from the chat to avoid disrupting the flow of conversation.

## Risks

For transparency we have the following open questions and will dive deeper to resolve them:

- Where are images hosted and for what time period?

- How should the hardware running the ship be paid for?

  -- If this project catches on we could add a paid tier with more features, accepting payment in crypto to our bot’s ship.

- How should the TradingView chart API be paid for?

## Milestones

### Milestone 1 - Bot designed, tested and deployed

Expected completion:

Payment: 1 star

[Federated Learning](https://ai.googleblog.com/2017/04/federated-learning-collaborative.html) capability for Urbit. Applications of machine learning in social media suffer from the downside that a centralized entity owns your data. Federated Learning allows machine learning models to be trained on each individual's data, while striving to preserve the privacy of their data: an individual trains the model locally and shares the trained model with others in the network, such that their personal data never leaves their own server. Multiple individuals can collaborate to train a model on their own personal datasets, producing a model with better predictive power than if just one individual had trained it. As a machine learning strategy, Federated Learning is already gaining popularity as a way to train machine learning models on medical data, where each individual's personal metadata is PII or protected and cannot be directly shared with a centralized entity. For Urbit, which is attempting to supplant existing centralized and exploitative social media organizations, it is only logical to want a way to do ML that is privacy-preserving while still leveraging the value of many participants' data to attain performance. Thus the goal of this deliverable is to make a first-pass at a way to do Federated Learning by passing a machine learning model between two or more planets, progressively training it at each hop, before returning the trained model to the originator.

Because Federated Learning intersects with privacy and security concerns, I feel compelled to go a bit more in-depth on just this particular deliverable: as with anything involving privacy and security, expectation-setting is in order. This Federated Learning capability would be provided as-is, essentially as a "prototype" of how Federated Learning on Urbit _could_ work, making no warrantees of safety, security or reliability for a particular use-case, because I am not in the proper position as a freelance programmer with business insurance and 100% of my time to spend writing software which makes any such guarantees :) For users seriously considering Federated Machine Learning, there are a number of important considerations such as:

(1) How do you ensure that individual participants are not tampering with the ML training process locally, i.e. that a training computation was completed honestly?

(2) Do you need to encrypt the model in transit as it moves from participant to participant?

(3) Does training a model on a dataset leak information about that dataset to the originator of the request?

(4) From an IP perspective, are you alright with participants having access to your ML model in a partially-trained state?

I will absolutely not address any of the above questions in this work, though I am happy to suggest avenues of inquiry for how one might address them :) But nonetheless, no one in the Urbit community seems to have broached the topic of Federated Learning yet, so I think there is a strong value proposition in having me produce essentially a "prototype" of a Federated Learning capability, which can be extended later to address the above concerns, and which will help to start the conversation about privacy-preserving ML on Urbit.

### Milestone 2 - A prototypical example of privacy-preserving ML with Federated Learning on Urbit

Expected completion: Feb 2022

Payment: 1 star

A demonstration blog post showing an example of Federated ML. This serves three purposes: (1) help users to envision the future of Urbit as a privacy-friendly platform, while the tech is still in its infancy, (2) drive users to consume the ML library for their own projects, and (3) drive interest in augmenting or improving the ML library and the Federated ML capability.
