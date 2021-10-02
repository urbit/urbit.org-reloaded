+++
title = "Dojo Tools"
weight = 5
template = "doc.html"
+++

A number of generators are included for managing and viewing the status of desks and their agents. Each of these are documented below.

Note that some old generators have been replaced:

- `|start` - Replaced with [`|rein`](#rein).
- `|ota` - Replaced with [`|install`](#install), [`|uninstall`](#uninstall), [`|pause`](#pause) and [`|resume`](#resume).
- `|fade` - Replaced with [`|nuke`](#nuke).
- `|doze` - Replaced with [`|rein`](#rein) or [`|suspend`](#suspend).
- `|wake` - Replaced with [`|rein`](#rein) or [`|revive`](#revive).
- `+trouble` - This still exists but is deprecated by [`+vats`](#vats).

---

## `+vats`

Print out the status of each installed desk.

Desks in Clay which aren't installed will be omitted.

Fields:

- `/sys/kelvin` - The version of `%zuse` the desk is compatible with.
- `base hash` - The merge base (common ancestor) between the desk and its upstream source.
- `%cz hash` - The hash of the desk.
- `app status` - May be `suspended` or `running`.
- `force on` - Whether the desk has been force-started.
- `force off` - Whether the desk has been force-stopped.
- `publishing ship` - The original publisher if the source ship is republishing the desk.
- `updates` - May be `local`, `tracking` or `paused`. Local means it will receive updates via commits on the local ship. Tracking means it will receive updates from the `source ship`. Paused means it will not receive updates.
- `source desk` - The desk on the `source ship`.
- `source aeon` - The revision number of the desk on the `source ship`.
- `pending updates` - Updates waiting to be applied due to incompatibility.

#### Arguments

None.

#### Examples

```
> +vats
%base
  /sys/kelvin:      [%zuse 420]
  base hash:        ~
  %cz hash:         0v6.2nqmu.oqm24.ighl6.n0gp9.s8res.feql1.dl8ap.isli3.jk0hu.acrd2
  app status:       running
  force on:         ~
  force off:        ~
  publishing ship:  ~
  updates:          tracking
  source ship:      ~zod
  source desk:      %base
  source aeon:      3
  pending updates:  ~
::
%garden
  /sys/kelvin:      [%zuse 420]
  base hash:        ~
  %cz hash:         0v1e.2h7hs.elq3g.1sdt7.qfga6.ganga.7p95j.aog44.8p5fe.kpr6v.7ai82
  app status:       running
  force on:         ~
  force off:        ~
  publishing ship:  ~
  updates:          tracking
  source ship:      ~zod
  source desk:      %garden
  source aeon:      3
  pending updates:  ~
```

---

## `+agents`

Print out the status of Gall agents on a desk.

Agents may either be `archived` or `running`. Nuked or unstarted agents which are not on the manifest are omitted.

#### Arguments

```
desk
```

#### Example

```
> +agents %landscape
status: running   %notify
status: running   %group-store
status: running   %metadata-store
status: running   %graph-push-hook
status: running   %group-view
status: running   %hark-graph-hook
status: running   %hark-group-hook
status: archived  %chat-cli
status: running   %metadata-pull-hook
status: running   %contact-pull-hook
status: running   %contact-push-hook
status: running   %invite-hook
status: running   %contact-view
status: running   %invite-view
status: running   %s3-store
status: running   %contact-store
status: running   %clock
status: running   %group-pull-hook
status: running   %launch
status: running   %metadata-push-hook
status: running   %group-push-hook
status: running   %graph-pull-hook
status: running   %weather
status: running   %dm-hook
status: running   %sane
status: running   %contact-hook
status: running   %invite-store
status: running   %graph-store
status: running   %metadata-hook
status: running   %chat-view
status: running   %observe-hook
status: running   %hark-invite-hook
status: running   %chat-hook
status: running   %hark-chat-hook
status: running   %chat-store
```

---

## `|suspend`

Shut down all agents on a desk, archiving their states.

The tile in the homescreen (if it has one) will turn gray and say "Suspended" in the top-left corner. This generator does the same thing as selecting "Suspend" from an app tile's hamburger menu.

#### Arguments

```
desk
```

#### Examples

```
|suspend %bitcoin
```

---

## `|revive`

Revive all agents on a desk, migrating archived states.

All agents specified in `desk.bill` which are suspended will be restarted. If updates to the agents have occurred since their states were archived, they'll be migrated with the state transition functions in the agent. This generator does the same thing as selecting "Resume App" from the app tile's hamburger menu.

#### Arguments

```
desk
```

#### Examples

```
|revive %bitcoin
```

---

## `|install`

Install a desk, starting its agents and listening for updates.

If it's a remote desk we don't already have, it will be fetched. The agents started will be those specified in the `desk.bill` manifest. If it has a docket file, its tile will be added to the homescreen and its glob fetched.

It takes a `ship` and `desk` as its mandatory arguments. The desk may be installed with a different name specified in the optional `local` argument.

#### Arguments

```
ship desk, =local desk
```

#### Examples

```
|install ~zod %bitcoin
```

```
|install our %webterm
```

```
|install ~zod %bitcoin, =local %foo
```

---

## `|uninstall`

Uninstall a desk, suspending its agents and ignoring updates.

The specified desk will be retained in Clay, but its agents will all be stopped and have their states archived like [`|suspend`](#suspend).

Note that this will not remove the tile or glob from the homescreen, so if the desk has a tile it should be uninstalled with the "Remove App" button in the tile's hamburger menu.

#### Arguments

```
desk
```

#### Examples

```
|uninstall %bitcoin
```

---

## `|pause`

Pause updates on a desk.

The specified desk will stop tracking updates from its upstream source.

#### Arguments

```
desk
```

#### Examples

```
|pause %bitcoin
```

---

## `|resume`

Resume updates on a desk.

Start tracking previously [`|pause`](#pause)d updates from a desk's upstream source.

#### Arguments

```
desk
```

#### Examples

```
|resume %bitcoin
```

---

## `|nuke`

Shut down an agent and permanently delete its state.

The default behaviour is to shut down the specified Gall agent and discard its state, similar to the now-deprecated `|fade` generator. **Note this irreversibly wipes the app's state**. Additionally, if the optional `desk` argument is `%.y`, it takes a desk rather than an agent name and nukes every agent on the specified desk.

#### Arguments

```
@tas, =desk ?
```

#### Examples

Nuke a single agent:

```
|nuke %btc-wallet
```

Nuke every agent on a desk:

```
|nuke %bitcoin, =desk &
```

---

## `|bump`

Try to apply a kernel update.

If `%zuse`'s kelvin version has decreased, try to apply the update. If any desks are incompatible with the new `%zuse` version, the update will fail. The update can be forced with the optional `force` argument, in which case incompatible desks will be `|suspend`ed. The `set` of desks to omit (and therefore suspend) can also be explicitly specified with the optional `except` argument.

#### Arguments

All optional:

```
, =force ?, =except (set desk)
```

#### Examples

Try to apply update, failing if blocked by any desks:

```
|bump
```

Force the update, suspending incompatible desks:

```
|bump, =force &
```

Apply kernel update, omitting and suspending the specified desks:

```
|bump, =except (silt ~[%bitcoin %webterm])
```

---

## `|rein`

Adjust the state of a desk.

This allows you to stop and start agents on a desk, regardless of whether they're on the manifest. Stopped agents have their states archived. It can also suspend and revive the whole desk with the optional `liv` argument.

#### Arguments

```
desk (list [? dude:gall]), =liv ?
```

#### Examples

Start an agent:

```
|rein %bitcoin [& %btc-provider]
```

Stop an agent, archiving its state:

```
|rein %bitcoin [| %btc-wallet]
```

Stop one agent, start another:

```
|rein %bitcoin [| %btc-wallet] [& %btc-provider]
```

Suspend a desk:

```
|rein %bitcoin, =liv |
```

Revive a desk:

```
|rein %bitcoin
```
