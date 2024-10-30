+++
title = "Calendar and Datetime Support"
date = "2024-05-24"

[taxonomies]
grant_type = ["Grant"]
grant_category = ["Dev: Tool", "Dev: Apps"]

[extra]
image = ""
description = "Create an Urbit-native calendar and a library to support working with dates and times."
reward = "7 stars"
assignee = ["~niblyx-malnus"]
champion = ["~tamlut-modnys"]
grant_id = "P0353"
completed = false
canceled = false
+++

## Overview

One of the most important abilities lacking for Urbit users at the moment is the ability to coordinate action across time with their peers.The primary difficulties with previous attempts at an Urbit calendar are timezones and recurrent events. Previous attempts have tried to integrate with Earth code by using legacy iCalendar data formats defined in RFC 5545, which are overcomplicated and not well-suited for Mars.

The better way to do this is to develop an Urbit-native system for representing calendar data. Recurrence rules should use as their fundamental building blocks the arguments to well established functions which are mappings from an index (a non-negative integer) to a (unit @da). Converting between Martian and Earth calendars can be done later when a robust and well-used Martian calendar exists. 

## Milestone 1 
ETA: June 2024
Reward: 2 stars

- Develop a robust system of Urbit-native recurrence rules.
- Store event data in a “materialized” state where all event instance dates are stored for efficient lookup.
- Allow for the transfer of event data in a compact “unmaterialized” state.
- Allow events to store arbitrary metadata.
- Allow events to store RSVPs.
- Documentation and robust testing for the above.


## Milestone 2
ETA: July 2024
Reward: 2 stars

Build a reactive HTMX frontend. This should include a day view, a week view and a month view. It should include the ability to switch between timezones and view events as if you were in a different timezone. It should include the ability to click and add recurrent events and to modify the details of a recurrent event. Google Calendar is the standard to emulate here.

## Milestone 3
ETA: August 2024
Reward: 3 stars

Develop an Urbit-native datetime library to handle timezones and to pretty print miscellaneous time-related information. 

- Implement parsing of ISO-8601 string data to Urbit-native @da and @dr formats, and back. This includes checking if the string represents valid data or not.
- Functions to convert @dr timespans to useful text descriptions, i.e. “a few seconds ago”, “an hour from now”, “next week”, “a year ago”. See here
- Return miscellaneous useful information, i.e., days in month, days left in year, whether it’s a leap year.
- Accurate conversion of the IANA timezone database to a usable library of Urbit native timezone functions. Note that timezones with their recurrent jumps between offsets are essentially recurrence rules themselves and leverage the same underlying recurrence rule format.
- Develop a simple and usable API for conversions between timezones.
- Document and robustly test the library so that it is solid enough to eventually be part of %base.