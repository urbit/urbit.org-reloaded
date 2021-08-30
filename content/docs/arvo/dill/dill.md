+++
title = "Overview"
weight = 1
template = "doc.html"
aliases = ["/docs/learn/arvo/dill/"]
+++

The terminal driver vane.

Unix sends keyboard events and the like to Dill, and Dill produces terminal output. Other vanes interact with Dill by passing it [task](/docs/arvo/dill/tasks)s to do things like print error messages. For userspace applications on the other hand, one wouldn't typically deal with Dill directly. Rather, the `%hood` agent's `drum` module acts as an intermediary session handler for CLI applications in userspace. To help write CLI apps there's two convenient libraries, `shoe` and `sole`, and a [tutorial](/docs/hoon/guides/cli-tutorial) for how to use them.

## Sections

[API Reference](/docs/arvo/dill/tasks) - The `task`s Dill takes and the `gift`s it returns.

[Scry Reference](/docs/arvo/dill/scry) - The scry endpoints of Dill.

[Data Types](/docs/arvo/dill/data-types) - Reference documentation of the data types used by Jael.
