+++
title = "Goals 2"
date = "2023-02-10"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev"]

[extra]
image = ""
description = "Goals 2"
reward = "3 stars"
assignee = ["~niblyx-malnus, ~sidlup-havwen"]
grant_id = "P0227"
champion = ["~datder-sonnet"]
completed = false
canceled = false
+++

# Main Objectives

## Groups Integration

- Full association of a pool with a group.
  - The pool is public or private in correspondence with the group.
  - The pool has the same set of banned/allowed ships as the group.
  - All group admins are automatically admins on the pool.
  - Members who leave or are kicked from the group are automatically removed from the pool.
  - Members who join the group are automatically added to the pool.
- Each pool and goal will have an associated note. A note is a piece of markdown used to flesh out the pool or goal in greater detail.
- Each pool and goal will have an associated comment section where pool members can comment on the specific details of the goal.
- Both notes and comments will be able to link to existing nodes in Groups which will render appropriately. This includes chats, notes, channels, comments, entire groups, and applications.
- Both notes and comments will be able to link to existing pools and goals which will render similarly to Groups nodes.
- Significant events trigger notifications to be sent via %hark. These include:
  - Being assigned to be chief of a goal.
  - Being assigned to be in the spawn set of a goal.
  - New goals spawned under goals you own.
  - Non-actionable goals with no subgoals being left childless for an extended period of time.
  - Other events as they emerge and are deemed appropriate.

## Sorting/Filtering and Tags/Fields

- Tags
  - Each goal within a pool can be tagged.
  - Everyone can maintain private tags associated with a goal which only they can view.
  - Harvested goals can be sorted by tags.
  - Tags can be viewed so that all goals associated with them can be seen and explored.
- Sorting/Context-based Ordering
  - Goals can be sorted by the date of their deadline or kickoff.
  - Goals can be re-ordered in the context of their subgoals with a simple dragging mechanism.

## Calendar

- Incorporate a calendar view which draws from a separate agent allowing for the possibility that it could grow into a full blown calendar application.
  - A frontend calendar view can scry this agent for events within a particular range (initially corresponding only to goals).
  - If a goal has both a kickoff and a deadline, it will display in the calendar with this datetime range showing. If either only the kickoff or deadline exists, the kickoff or deadline of that goal will display as an instantaneous event.
  - Goals which span many days will be displayed differently than goals which or on the order of a few hours.

## Improved UX

- Shortcuts and quick actions using ctrl
- Improved mobile experience 
- Navigating the tree (zooming/isolation) with a breadcrumb element (clickable links) for navigating back (possibly incorporating notes and comment section)
- Incorporate tagging system into a Kanban view
- Working poke relays on the frontend

# Compensation

Reward: 3 stars
