+++
title = "Appendix: Types"
weight = 65
template = "doc.html"
+++

This document explains a few of the types commonly used in Gall agents. In
addition to these, the [Data Types](/docs/arvo/gall/data-types) section of the
Gall vane documentation is a useful reference. In particular, the
[`bitt`](/docs/arvo/gall/data-types#bitt),
[`boat`](/docs/arvo/gall/data-types#boat) and
[`bowl`](/docs/arvo/gall/data-types#bowl) entries, as well as the whole
[`agent`](/docs/arvo/gall/data-types#agent) subsection.

## `vase`

Urbit needs to be able to send typed data between vanes and agents, as well as
over the network to other ships. While cell structures can easily be validated,
atom auras cannot. To solve this problem, Urbit wraps such data in a vase before
sending it. Vases are used extensively - almost all data your agent will send
and received is wrapped in a vase.

A vase is just a cell with data in the tail and the type of the data in the
head. Its formal definition is:

```hoon
+$  vase  [p=type q=*]
```

Here's what it looks like if we bunt a vase in the dojo:

```
> *vase
[#t/* q=0]
```

There are two simple runes used to create and unpack vases. We'll look at each
of these next.

### Create a `vase`

The [zapgar](https://urbit.org/docs/hoon/reference/rune/zap#-zapgar) rune (`!>`)
takes a single argument of any noun, and wraps it in a vase. For example, in the
dojo:

```
> !>([1 2 3])
[#t/[@ud @ud @ud] q=[1 2 3]]

> !>('foo')
[#t/@t q=7.303.014]

> !>([[0xdead 0xb33f] 'foo'])
[#t/[[@ux @ux] @t] q=[[57.005 45.887] 7.303.014]]

> !>(foo='bar')
[#t/foo=@t q=7.496.034]
```

You would typically use `!>` as part of a [`cage`](#cage) when you're
constructing a `card` like a poke or a `%fact` gift to be sent off.

### Extract data from `vase`

The [zapgal](https://urbit.org/docs/hoon/reference/rune/zap#-zapgal) rune (`!<`)
takes two arguments: A mold specifying the type to try and extract the data as,
and the vase to be extracted.

Let's look at an example in the dojo. First, let's create a vase of `[@t @ux @ud]`:

```
> =myvase !>(['foo' 0xabcd 123])
> myvase
[#t/[@t @ux @ud] q=[7.303.014 43.981 123]]
```

Next, let's try extracting our vase:

```
> !<  [@t @ux @ud]  myvase
['foo' 0xabcd 123]
```

Now let's try asking for a `@p` rather than `@t`:

```
> !<  [@p @ux @ud]  myvase
-need.@p
-have.@t
nest-fail
```

As you can see, it will crash if the type does not exactly match. Note that
rather than using `!<`, you can also just clam the tail of the vase like:

```
> ((trel @t @ux @ud) +.myvase)
[p='foo' q=0xabcd r=123]
```

The only problem is that you can't tell if the auras were wrong:

```
> ((trel @p @ud @ux) +.myvase)
[p=~sibtel-tallyd q=43.981 r=0x7b]
```

You'd typically use `!<` on the data in `card`s that come in from other ships,
agents, etc.

## `mark`

The `mark` type is just a `@tas` like `%foo`, and specifies the Clay filetype of
some data. The `mark` corresponds to a mark file in the `/mar` directory, so a
`mark` of `%foo` corresponds to `/mar/foo/hoon`. Mark files are used for saving
data in Clay, validating data sent between agents or over the network, and
converting between different data types. For more information about mark files,
you can refer to the [Marks section of the Clay
documentation](/docs/arvo/clay/marks/marks).

## `cage`

A `cage` is a cell of a [`mark`](#mark) and a [`vase`](#vase), like `[%foo !>('bar')]`. The data in the vase should match the data type of the specified
mark.

Most data sent between agents, either locally or over the network, will be in a
cage. When data comes in, Gall will validate the data in the vase with the given
mark. Additionally, the data may be converted to a different mark if appropriate
conversion routines exist in the mark file. This is most commonly done when
talking to a web front-end via Eyre's channel system - outgoing data will be
automatically converted to a `%json` mark and incoming data will be converted
from `%json` to the mark your agent expects.

## `quip`

`(quip a b)` is equivalent to `[(list a) b]`, it's just a more convenient way to
specify it. Most arms of an agent return a `(quip card _this)`, which is a list
of effects and a new state.

## `path`

The `path` type is formally defined as:

```hoon
+$  path  (list knot)
```

A knot is a `@ta` text atom (see the [Strings guide](/docs/hoon/guides/strings)
for details), so a `path` is just a list of text. Rather than having to write
`[~.foo ~.bar ~.baz ~]` though, it has its own syntax which looks like
`/foo/bar/baz`.

A `path` is just a general type used for several different purposes throughout
Arvo. Its elements have no inherent significance, it depends on the context. In
a Gall agent, a `path` is most commonly a subscription path - you might
subscribe for updates to `/foo/bar` on another agent, or another agent might
subscribe to `/baz` on your agent.

A `path` might just be a series of fixed elements like `/foo/bar`, but some
elements might also be variable and encode atom auras, or some other format. For
example, you might like to include a date in the path like
`/updates/~2021.10.31..07.24.27..db68`. Other agents might create the path by
doing something like:

```hoon
/update/(scot %da now.bowl)
```

Then, when you get a subscription request, you might do something like:

```hoon
?+    path  (on-watch:def path)
    [%updates @ ~]
  =/  date=@da  (slav %da i.t.path)
  ...(rest of code)...
```

See the [Encoding in text](/docs/hoon/guides/strings#encoding-in-text) and
[Decoding from text](/docs/hoon/guides/strings#decoding-from-text) sections of
the Strings guide for more information on dealing with atoms encoded in strings.

Aside from using function calls when constructing a `path` as demonstrated
above, you can also insert text you're previously stored with `=/` or what have
you, simply by enclosing them in brackets. For example, in the dojo:

```
> =const 'bar'
> `path`/foo/[const]/baz
/foo/bar/baz
```

## `wire`

The type of a wire is formally defined as:

```hoon
+$  wire  path
```

So, a `wire` is just a [`path`](#path), type-wise they're exactly the same. The
reason there's a separate `wire` type is just to differentiate their purpose. A
`wire` is a path for responses to requests an agent initiates. If you subscribe
to the `path` `/some/path` on another agent, you also specify `/some/wire`.
Then, when that agent sends out updates to subscribers of `/some/path`, your
agent receives them on `/some/wire`.

The `wire` is specified in the second argument of a `%pass` `card`. It's used
for anything you can `%pass`, such as `%poke`s, `%watch`es, and `%arvo` notes.
For example:

```hoon
[%pass /this/is/wire %agent [~zod %foobar] %watch /this/is/path]
::
[%pass /this/is/wire %agent [~zod %foobar] %poke %foo !>('hello')]
::
[%pass /this/is/wire %arvo %b %wait (add now.bowl ~m1)]
```

The `on-agent` and `on-arvo` arms of the agent core include a `wire` in their
respective sample. Responses from agents come in to the former, and responses
from vanes come in to the latter.
