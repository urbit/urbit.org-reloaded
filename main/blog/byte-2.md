---
date: ~2016.7.14
type: post
title: Urbyte 2: The dojo
author: The Urbit Team
layout: urbit,post
comments: true
hide: true
navmode: navbar
navdpad: false
navselect: blog
navpath: /
navhome: /
navclass: urbit
---
<br /><br />
You're playing in the Urbit REPL/shell (`:dojo`).  (If you
accidentally press `^X`, it will put you into the other default
app, `:talk`; press `^X` again to switch back.)

The dojo actually has its own command language, which is a
superset of Hoon.  Any Hoon expression is a dojo command that
prints the product of the expression.  But there are other dojo
commands.

### Setting variables

Another command sets a dojo variable.  Type

```
> =a 42
```

You've set the dojo variable `a` to the value `42`.  The dojo
puts this binding in the Hoon subject for expressions to use.
(We'll see how this works in a later Urbyte.)  So you can write:

```
> a
42

> [4 a]
[4 42]
```

To unbind `a`, just omit the value:

```
> =a
```
