+++
title = "Develop"
template = "page_indiced.html"
+++

## Creating a Development Ship {#creating-a-development-ship}

To do work with Hoon and with the system, we recommended using a "fake" ship -- one not connected to the network.

Because such a ship has no presence on the network, you don't need an Azimuth identity for its purposes. You just need to have [installed our software](/install).

To create a fake ship named `~zod`, run the command below. You can replace `zod` with any valid Urbit ship-name.

```
urbit -F zod
```

Now you should see a block of boot messages, starting with the Urbit version number. Welcome!

### Basic Operations

Welcome to your ship! There's a few things you should do to become oriented.

#### The Dojo

Let's try out the Dojo, the Arvo command line and Hoon REPL:

```
~sample-planet:dojo> (add 2 2)
```

Should produce:

```
> (add 2 2)
4
```

Good.

#### Mounting

Your ship's filesystem being "mounted" means that its filesystem can be interacted with through Unix. This makes things much easier for you.

The Arvo filesystem isn't mounted to Unix by default. Switch to the Dojo prompt and run:

```
~sample-planet:dojo> |mount %
```

This should produce:

```
> |mount %
>=
```

which indicates that the command was processed.

`|mount %` will cause a `home/` directory to appear inside your _pier_ folder in Unix (the "pier" is our shorthand for the directory whose name corresponds to your Azimuth point). Changes to these files can be committed to your pier by running `|commit %home` once you're done.

#### Shutting Down and Restarting

You can turn your ship off with `ctrl-d` from the Talk or Dojo prompts.

To restart your ship, simply pass the name of your pier:

```
urbit some-planet
```

## Community Tutorials {#community-tutorials}

Here are some tutorials written by members of the Urbit community. Some are a little outdated, but they may still prove useful.

- [Generators](https://github.com/joemfb/mardev/tree/master/docs/gen) by `~master-morzod`
- [Urbit by Doing](https://github.com/Fang-/Urbit-By-Doing) by `~palfun-foslup`
- [Learning Hoon](https://github.com/knubie/learning-hoon) by `@knubie`
- [A Nock Interpreter](https://jtobin.io/nock) by `~nidsut-tomdun`
- [Basic Hoonery](https://jtobin.io/basic-hoonery) by `~nidsut-tomdun`

If you want to add something to the list, [shoot us an email](mailto:support@urbit.org) or make a pull request in the [docs repository](https://github.com/urbit/docs).