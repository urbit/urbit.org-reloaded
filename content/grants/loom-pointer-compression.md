+++
title = "Loom Pointer Compression" 
date = "2022-08-11"

[taxonomies]
grant_type = [ "Apprenticeship" ]
grant_category = [ "Core Dev", "Runtime" ]

[extra]
image = ""
description = "Expand the maximum addressable loom size"
reward = "1 star"
mentor = "~fanfun-mocbud"
assignee = "~barter-simsum"
grant_id = "A0173"
completed = false
canceled = false
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=A0173&prefill_Grant+Name=Loom%20Pointer%20Compression"
+++

# Loom Pointer Compression Apprenticeship

This project makes it possible to at least double the maximum addressible loom size, taking advantage of object allocation alignment to make use of one-or-more additional bits in our 29-bit (30-bits possible) loom-offset references.

## Deliverables

- an updated allocator (`u3a_walloc()`) that ensures at least 8-byte (2-word) alignment for all allocations
- an updated de/reference api that compresses pointer-to-offset (`u3a_to_off()`) and decompresses offset-to-pointer (`u3a_to_ptr()`)
- a migration from the old to new heap layout (`u3m_pack()`, but enforcing new alignment invariants)

## User Stories

- moar nouns

## Prequisites

- proficiency in C
- familiarity with custom allocators, bit-twiddling, &c

## Educational Outcomes for the Apprentice

The apprentice will learn about:

- vere/u3
- the loom and road system
- our allocator

## Responsibilities of the Mentor

- technical direction
- code review
- release plan

## Duration and Compensation

Expected duration is two months. Compensation is 1 star upon successful completion of the apprenticeship.
