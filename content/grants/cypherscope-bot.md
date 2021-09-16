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
