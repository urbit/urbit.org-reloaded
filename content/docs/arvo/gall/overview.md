+++
title = "Overview"
weight = 1
template = "doc.html"
+++

**Gall** is the application-management [vane](/docs/glossary/vane). Userspace apps –⁠ daemons, really –⁠ are started, stopped, and sandboxed by Gall. Gall provides developers with a consistent interface for connecting their app to [Arvo](/docs/arvo/arvo). It allows applications and other vanes to send messages to applications and subscribe to data streams. Messages coming into Gall are routed to the intended application, and the response comes back along the same route. If the intended target is on another [ship](/docs/glossary/ship), Gall will route it behind the scenes through [Ames](/docs/arvo/ames/ames) to the other ship.

Gall is located at `/home/sys/vane/gall.hoon` within Arvo.

For more details, see the [userspace](/docs/userspace/gall/gall) section.
