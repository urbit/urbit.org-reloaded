+++
title = "Software Distribution FAQ"
template = "doc.html"
weight = 9
+++

This document concerns the September 2021 release of the software distribution OTA, codenamed "Grid." It is current as of 2021-09-30 at 01:03 AM EST.

## Changes

**How do I know the OTA succeeded?`**

Run `+trouble`.
You should see entries for five desks: `%bitcoin`, `%base`, `%landscape`, `%webterm`, and `%garden`.

**How do I get back to Landscape to see my DMs?**

What was formerly called "Landscape" is now the Groups app. You can access DMs and groups via the "Groups" tile.

**Where did my app tiles in Landscape go?**

For apps ported to software distribution, tiles will be shown in the home screen.

If you're already running non-Tlon apps, those apps will stop running, but the state will be preserved.

If the developer provides a version of the app over software distribution and you install it, the new app will migrate the old state.

**What's the base hash?**

After this OTA there is a base hash _per app desk_:

However, this may differ from ship to ship for now, so instead check the %cz hash.
The table lists the suffixes (last 5 characters) of the %cz hashes.

| Software     | Desk       | %cz Hash  |
| ------------ | ---------- | --------- |
| Arvo/OS      | %base      | `36cdn`   |
| Home Screen  | %garden    | `7ai82`   |
| Groups       | %landscape | `e4jfn`   |
| BTC Wallet   | %bitcoin   | `8kkfo`   |
| Web Terminal | %webterm   | `b2pme`   |

Run `+trouble` to see these hashes.

**How do I see the base hashes for my ship?**

The `+trouble` generator is now an alias for `+vats`.
Running either one will show the base hashes for every installed app desk.

Clicking the settings icon on the top left of the home screen provides an 'About' choice.
Selecting this will bring up an app info widget for the system app, which will show the base hash of the `%garden` desk.

Selecting the menu icon in the top right of an application tile provides an 'App Info' choice.
Selecting this will bring up an app info widget for the selected application, which will show its desk name and the base hash of its desk.

Groups (formerly Landscape) will no longer show a base hash within the app.

## Troubleshooting

**The OTA is taking a long time.**

This is expected and unfortunately unavoidable.
Your ship will be unresponsive for several minutes, possibly up to half an hour.
This is normal.

Technical note: this is because OTAs are run as a single Arvo event which must compile the OTA and run migrations.

**I saw crashes and stack traces during the OTA.**

Some stack traces are expected. The `%goad` and `%publish` apps will not be present in the OTA,
and Clay will complain about not being able to build them. You will also see some Clay `read-at-aeon-fail` errors.

**I haven't gotten the OTA yet and I can't post in some groups or DM some people.**

This OTA includes breaking changes to `%graph-store` which stores and shares messages, notebooks, and collections.
Ships with the OTA will not be able to communicate over graph store with ships without the OTA.

**I have gotten the OTA and I can't post in some groups or DM some people.**

See above. Once your peers receive the OTA, you will be able to communicate again.

**Can I still `|hi` between pre and post OTA ships?**

`|hi` will continue to work between pre and post OTA ships.

**Can I still use `|ota` to select my OTA provider?**

`|ota` will continue to work on ships without the OTA, even if their OTA provider is running the OTA.
After the OTA, the `|ota` command is removed and is replaced by the `|install` command.

**The OTA failed for me with `%error-validating`.**

Tlon is aware of [this issue](https://github.com/urbit/urbit/issues/5271) and is working on a fix.

The error will print near the bottom of the output from the failed OTA, and will be similar to:

```
[ %error-validating
  /backup/ship/~littel-wolfur/vim/~2020.12.11..06.50.27..c12d/graph-update
]
[ %validate-page-fail
  /backup/ship/~littel-wolfur/vim/~2020.12.11..06.50.27..c12d/graph-update
  %from
  %graph-update
]
```

This is caused by some leftover backup files from a previous migration for which Clay no longer has marks.

As a workaround: you can remove these files and retry the OTA:

dojo:

```
|unmount %home
|mount /=home=
```

bash:

```bash
rm -r your-ship/home/backup
```

dojo:

```
|commit %home
|ota (sein:title our now our) %kids
```

**The OTA failed for me with `%mate-conflict`**

You can instruct Clay to simply override the contents of the relevant files with the version from your sponsor:

dojo:

```
|merge %home (sein:title our now our) %kids, =gem %take-that
```

This will start the upgrade. Note that on a galaxy, star, or planet, you should run

```
|merge %kids (sein:title our now our) %kids, =gem %only-that
```

to make sure OTAs go our to your sponsored ships (stars, planets, or moons).
