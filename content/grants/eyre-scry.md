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

Urbit is a personal server, but the webserving part of it is slow, which is a
problem for any use case that involves using your urbit as a regular webpage
server and handling requests at scale. However, it doesn't need to be slow. For
its HTTP I/O driver, Urbit uses a library called H2O, which is incredibly fast,
but unfortunately, Urbit cannot take advantage of that speed because every HTTP
request currently is routed through the slow Arvo event loop.

Since a large amount of HTTP requests are essentially just read requests, we can
treat many of them as cacheable scries, which would allow the Urbit runtime to
fulfill them without invoking the Arvo event loop.

This would enable Urbit users with large audiences to serve web pages to them
without worrying about making their Urbit slow and unusable. This would
eliminate the need for a pattern we've frequently seen of people putting an
nginx or caddy cache in front of their Urbit to mask its shortcomings.

## Implementation

### Milestone 1: Eyre

Eyre will store a map from URLs to clay scry paths. HTTP requests coming in to
eyre will first check this map, and if it matches, scries the file out of clay
and returns it immediately. It if doesn't match, it just goes through the
current normal path for HTTP requests.

This behavior will then be mirrored in the runtime, so that the behavior is the
same regardless of runtime behavior.

New %tasks will be created for eyre to add and remove from this map.

A %warp request to clay is maintained for each clay file in the map in order to
be notified about changes to them. When notified about said changes, Eyre will
give a %gift to the runtime.

reward: 5 stars

### Milestone 2: Vere

The machinery to scry into arvo will need to be set up for use with Eyre, and a
simple cache will need to be configured for H2O.

The cache will be filled/invalidated by the %gift pushed from Eyre, as specified
above. This gift contains a URL and the clay file correponding to it, which
allows the runtime to just put that in the cache directly.

Inbound GET requests should first try the cache, and if that fails, just invoke
eyre in the usual way. Cache misses should add negligible time to HTTP requests,
and cache hits will be extremely fast.

reward: 5 stars
