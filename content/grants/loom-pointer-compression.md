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

This project makes it possible to at least double the maximum addressable loom space. Use of an unused bit in loom offset references, which are currently 29 bits, can increase the addressable loom space from 2GB to 4GB, and aligning all allocations on an 8-byte boundary can further double the addressable loom space from 4GB to 8GB.

## Deliverables

- an updated allocator (`u3a_walloc()`) that ensures at 8-byte (2-word) alignment for all loom allocations
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
