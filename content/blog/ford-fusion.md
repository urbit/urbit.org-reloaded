+++
title = "Ford Fusion"
date = 2020-07-10
description = "Ford Fusion was an overhaul of Urbit's over-the-air upgrade process and a rewrite of its build system. The new update system corrects a few long-standing bugs with the previous one, and the new build system is simpler, smaller (by around 5,000 lines), and easier to manage."
[extra]
author = "Ted Blackman"
ship = "~rovnys-ricfer"
image ="https://media.urbit.org/site/posts/essays/ford-fusion.png"
+++

<br>

<img class="ba" src="https://media.urbit.org/site/posts/essays/ford-fusion.png">

<br>

## Overview and Rationale

Ford Fusion was an overhaul of Urbit's over-the-air upgrade process and
a rewrite of its build system. The new update system corrects a few
long-standing bugs with the previous one, and the new build system is
simpler, smaller (by around 5,000 lines), and easier to manage.

Urbit has always been able to update itself over-the-air (OTA), but this
process has often been rocky. Updating an operating system kernel
on-the-fly is a difficult problem in general, like performing heart
replacement surgery on yourself while running a marathon. Code that
allows Linux to update its kernel in this way became a startup called
Ksplice, won multiple awards, and sold to Oracle. Even that, as
impressive as it is, and as brilliant as its [programmers](https://nelhage.com) are, 
can only perform certain limited kinds of patches to the kernel.

Urbit isn't exactly a traditional operating system, so the comparison is
somewhat unfair, but the purpose of better architecture is to create
unfair comparisons. In this case, because the Nock layer is frozen,
upgrading everything above that layer is easier. Upgrades are also
facilitated by pure-functional semantics, transactional event
processing, a type system oriented toward concrete data, and orthogonal
persistence. These features make it feasible for Urbit to upgrade
itself in the general case, not just some special cases.

While Urbit has always been able to upgrade itself, this process has
historically been fraught with issues. There have been many specific
bugs when upgrading, but they boil down to failure to achieve a few
properties that Ford Fusion does achieve:

- Atomic: the update should complete or fail in one transaction. If it
  fails, the system shouldn't get stuck.
- Self-contained: there must be no implicit dependencies or hysteresis
  (dependence on previous system states) when building the new software
  from source.
- Ordered: updates must be monotonically sequenced from the system's
  lowest layer to highest. 

Like much of Urbit, these requirements are obvious in retrospect, but
took many years and rewrites to identify.

In previous versions of Urbit, updates failed atomicity by deferring
parts of the update to later events, which are separate transactions
that can fail independently. Each deferral caused an exponential
increase in the number of failure states that needed to be handled.

We've learned that asynchronicity is an entropic state. A system will
tend toward more asynchronicity over time unless effort is put into
keeping it synchronous. As Jonathan Blow has noted, the language server
protocol has turned every editor plugin into a distributed system, since
now it has to communicate asynchronously with the main editor process.

[Steve Yegge's "platform
rant"](https://gist.github.com/chitchcock/1281611) describes a Bezosian
edict prohibiting synchronous communication among modules through direct
linking. This can be seen as an acknowledgment of the difficulty Amazon
was going to have when it needed to turn internal services external. If
your software needs to run in hell, build it that way from the start.

Urbit is not an industrial computing system; each Urbit instance exists
for just one person. Web-scale performance is not the primary goal.
Rather, the goal is a system a single person can understand, rely on,
and build on.

Before Ford Fusion, each commit to the Clay filesystem depended
implicitly on the previous commit to define this commit's filetypes
(called "marks"). This could cause bugs if the filetype definitions had
changed in a backward-incompatible manner, and it forced adding files of
new filetypes to be split into two commits: one to define the filetypes,
and a second to add files of that new type. More theoretically, it
caused history-dependence. It was possible for the validated contents
of files in a commit to vary based on the history of commits that led to
this one.

Another violation of the idea that source code is self-contained was
that the source code had access to symmetry-breaking information, namely
ship, desk (Urbit's answer to a git branch), and [faked] date. It also
had access to Urbit's immutable global namespace, which the kernel makes
available as an implicit argument to userspace Hoon code. This
namespace is called the "scry" namespace.

The scry namespace is immutable and referentially transparent, i.e. a
request must always yield the same result for all time. The kernel can
always decline to answer a namespace request, though, if you ask for a
resource, say, to which you don't have permission, or at a future date,
or that would need to be retrieved from another ship. 

If some code that runs during the build process makes a scry request and
is denied by the kernel, the build system has no choice but to treat it
as a nondeterministic error. Nondeterministic errors can never be fully
eradicated, if for no other reason than that the user always has the
option to defenestrate the machine—there's nothing deterministic
about that. But we should clearly strive to minimize them, and
especially to minimize uncertainty as to under what conditions they
might occur.

So, as of this update, user code can no longer scry at build time. Once
built, though, a Gall agent's scry requests work just fine using a
handler constructed by Gall, as has been the case for years.

The final kind of failure fixed by Ford Fusion was the lack of ordered
layering during a software update. The most common form of this failure
was that old Ford had a tendency to try to build userspace code using
the previous version's standard library. This didn't work too well,
unsurprisingly.

Emerging from this underworld required making a number of changes to the
Arvo kernel, Clay, Gall, and the procedure for kernel updates. To avoid
turning into a pillar of salt, I'll skip the details of how the old
system worked and instead describe the new update procedure.

## How Updates Work Now

These are the layers of the stack that update according to this process,
listed from lowest layer to highest:

+ hoon: the hoon language definition and compiler, defined in `/sys/hoon/hoon`
+ arvo: the arvo kernel proper and related type definitions, in `/sys/arvo/hoon`
+ zuse: the standard library, in `/sys/zuse/hoon`
+ vanes: arvo kernel modules, including clay itself, in folder `/sys/vane`
+ userspace: apps, marks, ancillary source code like libraries, and user data

Clay is responsible for enforcing the layering of updates. An update to
one layer necessitates a reload to all layers above it; e.g. a change to
Zuse should trigger updates to the vanes and userspace. Conversely, an
update to a higher layer should not cause a spurious reload of lower
layers, which should not be affected by the change; for example, an
update to just userspace should not cause any reloads of system code.

An update to a module is triggered when an attempt is made to commit a
change to Clay that affects one or more files needed to build the
module. For example, if the 'foo' agent's source, defined in
`/app/foo/hoon`, imports the 'bar' library from `/lib/bar/hoon`, then a
modification to `/lib/bar/hoon` triggers an update to the 'foo' agent.

The process of updating a layer varies by layer. The Hoon and Zuse
layers are stateless, so their newly rebuilt cores must be stored, but
they have no state that would need to be migrated. The Arvo kernel,
vanes, and userspace agents are all live, stateful programs, so in order
to update one of those, the system must extract the state from the old
program, pass that data into the newly built program, then discard the
old program and install the new one. Arvo and agent state injection
routines can emit effects, but vane updates cannot.

As an aside, future iterations of the upgrade system might change that
to allow vanes to emit effects on update. There are some difficulties
in maintaining the integrity of the duct stack if going down that route,
but they might be surmountable.

Clay determines which layers need to be updated based on which files
have changed in a proposed commit and which modules depend on those
files. If it needs to update kernelspace (there's a change to `/sys` on
the `%home` desk, which is the only "live" desk), it sends a sequence of
moves to Arvo to ask Arvo to perform any necessary updates to hoon, the
kernel, Zuse, and vanes. This sequence is terminated by an extra move
back to Clay itself, which will be received by the updated version of
Clay after migrating its state, so that the rebuilt Clay can use the
rebuilt version of Zuse to rebuild userspace and notify clients of the
update. One client is Gall, which reloads its agents when it hears that
Clay has updated Zuse.

Clay triggers updates, but the Arvo kernel is responsible for performing
updates to all kernelspace layers, and Gall is responsible for updating
userspace agents. Agents are stored in Gall's state, but all other
layers are stored directly in the Arvo core's state, so the kernel
contains the routines that reload Hoon, itself, Zuse, and its vanes.

The Arvo kernel reloads itself by receiving its new source code as a
`%lyra` move from Clay, compiling this source into a core with empty
state, then calling the gate produced by the new core's `+load` arm with
the relevant parts of the old state. This now includes not just the
vane cores and their states, but also the Arvo "duct" call stack, which
maintains a stack of queues of moves to be passed from one vane to
another, and a list of moves enqueued to be emitted to Unix as effects
at the end of the current Arvo event. This allows an Arvo update to
happen in the middle of a more complex event without disturbing other
sequences of processing steps happening concurrently in the vanes.

## How Clay Validates a Desk

A desk is Urbit's answer to a git branch. It's almost identical, except
every commit also has a semantically meaningful revision number, and all
files are typed and validated.

If Clay has been asked to perform a commit, after possibly updating
kernelspace, it needs to validate all the files in this desk and notify
all subscribers to live queries of this desk's data. Gall, for example,
maintains live queries on builds of its live agents. Validation uses
the Ford build system, which as of this update, is no longer a
standalone vane but a core within Clay.

A Clay commit, like a git commit, is specified as the current value of
all its changed files (and, separately, references its parent commits by
hash), not as the diff from a parent commit. Unlike git, Clay is typed,
and every file must be validated according to its "mark". A mark is
named like a file extension, e.g. `%txt`, `%png`, or `%noun`, and Clay
maintains a mapping from that name to behaviors of values of that type
under various operations. The last path segment of any Clay path
specifies the mark to use for operations on that file, including
validation.

Mark operations include conversion to and from other marks (such as
converting `%json` to `%txt`), revision control operations (diff, patch,
join, and merge), and validating an untyped noun. Operations for mark
`%foo-bar` are defined by a core built using the source code at
`/mar/foo-bar/hoon`, or if that doesn't exist, at `/mar/foo/bar/hoon`.

Consider a file at `/web/foo/json`. In order to validate this file,
Clay must load the mark definition core and use its validation routine
to ensure the untyped value of `/web/foo/json` is in fact valid JSON.
To obtain this core, Clay must build the file at `/mar/json/hoon` from
source and then process the resulting core using some mild
metaprogramming to get a standard interface core for dealing with marks,
called a `$dais`, whose type is defined in Zuse.

Since building a source file only makes sense if the file has been
validated as a valid `%hoon` file, but mark definitions themselves must
be built from source, there's a logical dependency cycle. To break this
cycle, Clay hard-codes the validation of `%hoon` files. This allows any
file to depend on any other file of any mark, as long as there are no
cyclic dependencies. The Ford build system, as of this update, now
verifies that there are no cyclic dependencies as it runs.

Since building a file is a pure function, Clay memoizes the results of
all builds, including builds of marks, mark conversions, and hoon source
files. These memoization results are stored along with the desk and are
used by later revisions of that desk. Future work should allow memoized
builds to be pulled from all parents in a merge commit, but for now only
the previous revision of the current desk is used. This is a major
simplification of previous Ford architectures, which maintained much
more complex caches with less clear eviction semantics. Now on every
commit, we just throw away any unused memoized builds from the previous
revision's Ford cache.

Once Clay has validated every file in this new revision of a desk, it
constructs and sends updates to any subscriptions that other vanes or
agents have requested. More Ford builds may be run to fulfill these
requests, including builds for any running agents whose dependencies
changed in this commit.

When Gall receives a newly rebuilt agent from Clay, it calls the gate
produced by the `+on-load` arm of the new agent with the state extracted
from the old agent. If there is a crash in any `+on-load` calls or in
the handling of any effects they emit (which can include more agent
activations), then the whole event crashes, canceling the commit. This
effectively gives any agent the ability to abort a commit by crashing.

It is a bit counterintuitive that an app reload failure could prevent a
kernel update. The reason is that we don't want the system to update itself
into a broken state. An Urbit can be rendered practically unusable by
the presence of broken agents, even if the kernel hasn't lost integrity,
so it's kinder to the user not to break their agents by installing an
incompatible kernel update. This also puts virtuous pressure on kernel
developers not to "break userspace", the importance of which has been
insisted on for decades by Linus Torvalds, among others.

## Ford Build Semantics

### The Three Types of Ford Builds: Files, Marks, and Casts

The Ford build semantics have been simplified. There are now three
kinds of builds that Ford can perform: files, marks, and casts, all of
which happen synchronously as function calls inside Clay and are
available (without memoization) as scry interfaces.

File builds are the most basic form of build. A file build takes in a
filepath containing Ford runes and Hoon source, runs the Ford runes to
perform imports, and then compiles the source, producing a `$vase`, a
noun tagged with its Hoon type. Clay exposes file builds into the scry
namespace with `%ca`: as an example, `.^(vase %ca
/~zod/home/3/lib/sole/hoon)` will build the `sole` library.

A mark build produces a `$dais` mark-interface core. It first performs
a file build on the Hoon file in `/mar` that defines the mark core, then
it does some metaprogramming to make the operations more convenient to
use, possibly loading another mark core that the raw mark core specified
as delegate for revision control operations. Clay exposes mark builds
into the scry namespace with `%cb`: as an example, `.^(dais:clay %cb
/~zod/home/3/mar/foo/hoon)` builds a `$dais` for the `%foo` mark.

A cast build produces a `$tube`: a gate that takes a value of one mark
as input and converts it to a valid value of another mark or crashes. A
mark can convert a value to another mark by providing an arm in its
`+grow` core named after the destination mark, and it can convert a
value from another mark using an arm in its `+grab` core. A mark can
also chain a conversion through an intermediary using an arm in its
`+jump` core or by having a `+grab` arm produce a delegate mark instead
of directly defining a conversion gate. Clay exposes cast builds into
the scry namespace with `%cc`: as an example, `.^(tube:clay %cc
/~zod/home/3/foo/bar)` builds a `$tube` conversion gate from `%foo` to
`%bar`.

### Ford Runes

There are now only four Ford runes. A file can contain zero, one, or
many of each, but each Ford expression can only be one line, and they
must be in the standard order of `/-`s, `/+`s, `/=`s, and then `/*`s.

```
/-  foo, *bar, baz=qux
```

The `/-` rune imports a structures file from `/sur`. You can import it
as just `foo`, in which case the build result of that file (usually a
core with mold definitions) will be pinned into the compilation subject
with the face `foo`. If you prefix it with a `*` as in `*bar`, the
result will be pinned into the subject with no face; if the structures
file compiled to a core, this exposes all the arms into the namespace of
the compilation subject. Finally, if you import it as `baz=qux`, the
`baz` face will be applied instead of `qux`. This is similar to "import
as" in other languages.

```
/+  foo, *bar, baz=qux
```

The `/+` rune imports a library file from `/lib`. Aside from the
different source folder, the syntax and semantics are the same as for
`/-`.

```
/=  clay-raw  /sys/vane/clay
```

The `/=` rune imports the result of building a hoon file from a
user-specified path (the second argument), wrapping it in a face
specified by the first argument. The final `/hoon` at the end of the
path must be omitted. This is mostly useful for importing a file for
testing. The file at the specified path will be built as a normal
userspace hoon file; i.e. its compilation subject will be Zuse augmented
with the results of any Ford runes it has at the top of the file.

```
/*  hello-gen  %hoon  /gen/hello/hoon
```

The `/*` rune imports the contents of a file in the desk, specified as
the third argument with the full path including the trailing mark,
converted to the mark specified by the second argument, and pinned into
the compilation subject wrapped in the face specified by the first
argument. This can be used to import static data at build-time, such as
a data file, a media file, or, in the case of this example, a hoon file
as source text rather than already built.

A valid userspace hoon file must contain a nonempty list of hoons (hoon
source expressions) below the Ford runes, separated by gap (more than
one space, or at least one newline). The system wraps this list of
hoons in a `=~` expression so that the result of the previous hoon is
used as the subject of the next hoon. The result of the Ford runes is
used as the compilation subject for this `=~` hoon; informally, the
shape of the compilation subject can be thought of as:
```
:*  fastar-2  fastar-1
    fastis-2  fastis-1
    faslus-2  faslus-1
    fashep-2  fashep-1
    <zuse>
==
```

## Conclusion

Since deployment of Ford Fusion to the livenet a week ago, over-the-air
updates (OTAs) have been much smoother. Instead of taking several
hours, frequently using too much memory, and sometimes leaving ships in
inconsistent states, multiple OTAs have been pushed out since, including
kernelspace changes, and most users didn't even notice.

Future work will entail making better use of desks other than `%home`
and improving the development process given the tighter coupling between
source code and kernel and tighter criteria for accepting an update.

This work also hopefully provides a good foundation of a package
management and software distribution system for Urbit. As
`~wicdev-wisryt` has said, a user should be able to run `|install
~norsyr-torryn/canvas` to load and build remote source. No one should
experience dependency hell on Urbit, but we're not there yet. At least
now, building a desk has no dependencies, other than a Ford with a
compatible Hoon compiler. No decisions have been made on this yet, but
Ford might get moved to inside the desk, possibly by making Zuse
callable. This could allow a desk to expose a Nock interface in
addition to a typed Hoon interface, which could even let a desk be used
as a "pill" bootloader.