+++
title = "5. Cards"
weight = 25
template = "doc.html"
+++

As we previously discussed, most arms of an agent core produce a cell of
`[effects new-agent-core]`, and the type we use for this is typically `(quip card _this)`. We've covered `_this`, but we haven't yet looked at `card`s in
detail. That's what we'll do here. In explaining `card`s we'll touch on some
concepts relating to the mechanics of pokes, subscriptions and other things
we've not yet covered. Don't worry if you don't understand how it all fits
together yet, we just want to give you a basic idea of `card`s so we can then
dig into how they work in practice.

## `card` type

The `card:agent:gall` type (henceforth just `card`) has a slightly complex
structure, so we'll walk through it step-by-step.

`lull.hoon` defines a `card` like so:

```hoon
+$  card  (wind note gift)
```

A `wind` is defined in `arvo.hoon` as:

```hoon
++  wind
  |$  [a b]
  $%  [%pass p=path q=a]
      [%slip p=a]
      [%give p=b]
  ==
```

Gall will not accept a `%slip`, so we can ignore that. A `card`, then, is one
of:

```hoon
[%pass path note]
[%give gift]
```

We'll consider each separately.

## `%pass`

```hoon
[%pass path note]
```

The purpose of a `%pass` card is to send some kind of one-off request, action,
task, or what have you, to another agent or vane. A `%pass` card is a request
your agent _initiates_. This is in contrast to a [`%give`](#give) card, which is
sent in _response_ to another agent or vane.

The type of the first field in a `%pass` card is a `path`. A `path` is just a
list of `@ta`, with a syntax of `/foo/bar/baz`. When you `%pass` something to an
agent or vane, this field specifies the `wire` on which the response should
arrive. A `wire` has the exact same type as a `path` (`/foo/bar/baz`), the
`wire`/`path` distinction is merely to differentiate their uses. When the agent
or vane responds to your request, your agent will see the `wire` as well as the
response itself. Your agent can then check the `wire` and maybe do different
things depending on its content. Both the
[`wire`](/docs/userspace/gall-guide/types#wire) and
[`path`](/docs/userspace/gall-guide/types#path) types are are covered in the
[types reference](/docs/userspace/gall-guide/types). We'll show how `wire`s are
practically used later on.

The type of the next field is a `note:agent:gall` (henceforth just `note`), which
`lull.hoon` defines as:

```hoon
+$  note
  $%  [%agent [=ship name=term] =task]
      [%arvo note-arvo]
      [%pyre =tang]
  ==
```

- An `%agent` `note` is a request to another Gall agent, either local or on a
  remote ship. The `ship` and `name` fields are just the target ship and agent
  name. The `task` is the request itself, we'll discuss it separately
  [below](#task).
- An `%arvo` `note` is a request to a vane. We'll discuss such requests
  [below](#note-arvo).
- A `%pyre` `note` is XX TODO

### `task`

A `task:agent:gall` (henceforth just `task`) is defined in `lull.hoon` as:

```hoon
+$  task
  $%  [%watch =path]
      [%watch-as =mark =path]
      [%leave ~]
      [%poke =cage]
      [%poke-as =mark =cage]
  ==
```

These can be divided into two categories:

#### Subscriptions

`%watch`, `%watch-as` and `%leave` all pertain to subscriptions.

- `%watch`: A request to subscribe to the specified `path`. Once subscribed,
  your agent will receive any updates the other agent sends out on that `path`.
  You can subscribe more than once to the same `path`, but each subscription
  must have a separate `wire` specified at the beginning of the [`%pass`
  card](#pass).
- `%watch-as`: This is the same as `%watch`, except Gall will convert updates to
  the given `mark` before delivering them to your agent.
- `%leave`: Unsubscribe from something to which you previously subscribed. The
  subscription to cancel is determined by the `wire` at the beginning of the
  [`pass` card](#pass) rather than the subscription `path`, so its argument is
  just `~`.

**Examples**

```hoon
[%pass /some/wire %agent [~some-ship %some-agent] %watch /some/path]
[%pass /some/wire %agent [~some-ship %some-agent] %watch-as %some-mark /some/path]
[%pass /some/wire %agent [~some-ship %some-agent] %leave ~]
```

#### Pokes

Pokes are requests, actions, or just some data which you send to another agent.
Unlike subscriptions, these are just one-off messages.

A `%poke` contains a `cage` of some data. A `cage` is a cell of `[mark vase]`.
The `mark` is just a `@tas` like `%foo`, and corresponds to a mark file in the
`/mar` directory. We'll cover marks in detail later, but you can refer to the
[`mark`](/docs/userspace/gall-guide/types#mark) entry in the type reference for
further details. The `vase` contains the actual data you're sending.

The `%poke-as` task is the same as `%poke` except Gall will convert the `cage`
to the `mark` you specify before sending it off.

**Examples**

```hoon
[%pass /some/wire %agent [~some-ship %some-agent] %poke %some-mark !>('some data')]
[%pass /some/wire %agent [~some-ship %some-agent] %poke-as %mark-to-use %some-mark !>('some-data')]
```

### `note-arvo`

A `note-arvo` is defined in `lull.hoon` like so:

```hoon
+$  note-arvo
  $~  [%b %wake ~]
  $%  [%a task:ames]
      [%b task:behn]
      [%c task:clay]
      [%d task:dill]
      [%e task:eyre]
      [%g task:gall]
      [%i task:iris]
      [%j task:jael]
      [%$ %whiz ~]
      [@tas %meta vase]
  ==
```

The letter at the beginning corresponds to the vane - `%b` for Behn, `%c` for
Clay, etc. After then vane letter comes the task. Each vane has an API with a
set of tasks that it will accept, and are defined in each vane's section of
`lull.hoon`. Each vane's tasks are documented on the API Reference page of its
section in the [Arvo documentation](/docs/arvo/arvo).

#### Examples

```hoon
[%pass /some/wire %arvo %b %wait (add ~m1 now.bowl)]
[%pass /some/wire %arvo %e %connect /some/url/path %some-agent]
```

## `%give`

```hoon
[%give gift]
```

The purpose of a `%give` card is to respond to a request made by another agent
or vane. More specifically, it's either for acknowledging a request, or for
sending out updates to subscribers (which are technically in response to their
initial subscription request, however long ago it may have been). This is in
contrast to a [`%pass`](#give) card, which is essentially unsolicited.

A `%give` card contains a `gift:agent:gall` (henceforth just `gift`), which is
defined in `lull.hoon` as:

```hoon
+$  gift
  $%  [%fact paths=(list path) =cage]
      [%kick paths=(list path) ship=(unit ship)]
      [%watch-ack p=(unit tang)]
      [%poke-ack p=(unit tang)]
  ==
```

These can be divided into two categories:

### Acknowledgements

`%watch-ack` and `%poke-ack` are sent in response to a `%watch` or `%poke`
request respectively. If the `(unit tang)` is null, it's an ack - a positive
acknowledgement. If the `(unit tang)` is non-null, it's a nack - a negative
acknowledgement, and the `tang` contains an error message. Gall automatically
sends a nack with a traceback if your agent crashes while processing the
request, and automatically sends an ack if it does not. Therefore, you would not explicitly produce a `%watch-ack` or `%poke-ack` gift.

#### Examples

```hoon
[%give %watch-ack `~[leaf+"foo" leaf+"bar"]]
[%give %poke-ack `~[leaf+"foo" leaf+"bar"]]
```

### Subscriptions

`%fact` and `%kick` are both sent out to existing subscribers - entities that
have previously successfully `%watch`ed a path on your ship.

A `%kick` gift takes a list of `path`s, which are subscription paths, and a
`(unit ship)`, which is the ship to kick from those paths. If the `unit` is
null, all subscribers are kicked from the specified paths. Note that sometimes
Gall can produce `%kick` gifts without your agent explicitly sending a card, due
to networking conditions. Therefore, you should not assume `%kick`s you receive
are intentional, and should try resubscribing by default.

`%fact` gifts are how updates are sent out to subscribers. The `paths` field is
a list of subscription paths - all subscribers of the specified `path`s will
receive the `%fact`. The `cage` is the data itself - a cell of a `mark` and a
`vase`.

#### Examples

```hoon
[%give %fact ~[/some/path /another] %some-mark !>('some data')]
[%give %kick ~[/some/path /another] `~some-ship]
```

## Summary

Here's a diagram that summarizes the different kinds of `card`s:

[![card diagram](https://m.tinnus-napbus.xyz/pub/card-diagram.svg)](https://m.tinnus-napbus.xyz/pub/card-diagram.svg)

## Exercises

- Have a read of the [`wire`](/docs/userspace/gall-guide/types#wire) and
  [`path`](/docs/userspace/gall-guide/types#path) entries in the type reference.
