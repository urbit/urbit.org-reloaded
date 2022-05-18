+++
title = "Eyre Request Scry Cache"
date = "2022-05-18"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Core Dev" ]

[extra]
image = ""
description = "Speed up Urbit http server by implementing a scry mechanism and cache for requests"
reward = "10 stars"
assignee = ""
completed = false
canceled = false
link = ""
+++

## Rationale

Urbit is a personal server, but the webserving part of it is slow, which is a problem for any use case that involves using your urbit as a regular webpage server and handling requests at scale.

However, it doesn't need to be slow. For its HTTP I/O driver, Urbit uses a library called H2O, which is incredibly fast, but unfortunately, Urbit cannot take advantage of that speed because every HTTP request currently is routed through the slow Arvo event loop.

Since a large amount of HTTP requests are essentially just read requests, we can treat many of them as cacheable scries, which would allow the Urbit runtime to fulfill them without invoking the Arvo event loop.

## Implementation

### Vere

The machinery to peek arvo will need to be set up for use with Eyre, and a cache
will need to be configured for H2O.
The cache will be filled by polling a scry path in eyre that maps urls to clay paths,
then scrying each file in that map out of clay. This allows us to have a
two-layered naming system, where nice human-made, mutable, and non-referentially
transparent URL paths map to strict referentially transparent clay paths.

Inbound GET requests should first try the cache, and if that fails, just invoke
eyre in the usual way. Cache misses should add negligible time to HTTP requests,
and cache hits will be extremely fast.

### Eyre

Eyre will store a map from URLs to clay paths, and expose that map at a scry path.
New %tasks will be created for eyre to add and remove from this map
