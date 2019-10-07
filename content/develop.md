+++
title = "Develop"
template = "page_indiced.html"
+++

We recognize that not every developer wants to work on Urbit itself – there’s a lot of space for developers building their applications on Urbit. To help you get settled, we have information that distinguishes the goals for both core and application development:

- Core development: improving and extending Urbit itself
- Application development: building end-user peer-to-peer applications that run on Urbit

This guide will start by getting you set up to run an Urbit ship, and then tell you everything you need to now do to either.

### Setting up your environment

We assume you’ve gotten a basic introduction to Urbit. If you haven’t, read the [Understanding Urbit](@/understanding-urbit/_index.md) series, or just jump ahead to the [Technical Overview](@/understanding-urbit/technical-overview.md).

Once you’re ready, you can get started on the network right away and take some first steps, without acquiring an identity, by [creating a comet](@/operations.md#creating-a-comet).

When developing, however, we recommend [booting a development ship](#creating-a-development-ship) and working locally.

## Core development {#core}

Working on the core means improving the Urbit project itself, working with a global community of developers. 

Just arrived and unsure what to work on? An ideal way to get started is by experimenting with the system, talking to other developers, and reading (or [contributing to](https://github.com/urbit/docs)) the [documentation](/docs/).

Prefer learning with an instructor? We also offer an online course that covers the basics of Urbit development called [Hoon School](@/hoonschool.md). If course-based learning works well for you, we recommend you sign up.

The Urbit developer community congregates around [the urbit-dev mailing list](https://groups.google.com/a/urbit.org/forum/#!forum/dev), the `~dopzod/urbit-help channel` on Landscape, and [Urbit’s GitHub repository](https://github.com/urbit/urbit). It’s a good idea to sign up, see what people are talking about, and introduce yourself.

Once you’re comfortable working with Urbit, check out the [project’s issues on GitHub](https://github.com/urbit/urbit/issues) or some of our [contribution bounties](https://grants.urbit.org/).

If you’re looking for some guidance, need help, or would prefer direct communication for your ideas, you can also always reach out to us directly at [support@urbit.org](mailto:support@urbit.org).

## Application development {#application}

Building an application on Urbit provides a lot of features for you. It means being able to leverage its [personal key infrastructure](https://azimuth.network/), which verifies its scarce address space and associating that verification with other data; or the [global filesystem](@/docs/arvo/clay.md), enabling permissioned directories and social software. Building your application on Urbit could be building decentralized applications for your own groups. Building your application on Urbit could also just be building your ship’s access to the rest of the world.

The Arvo vane that manages user applications is called [Gall](@/docs/hoon/hoon-tutorial/gall.md). When writing your application, you will want to consult its documentation for information on its interface to the rest of your ship (or to other ships).

Gall applications don’t tie you to use any particular user interface. They can work without providing a response to the user; or by printing to the Dojo; or with an interface in Landscape, which uses [Eyre](@/docs/arvo/eyre.md), the Arvo vane that serves HTTP, to serve a React-based interface to the application through a web browser.

Landscape has both tile-specific and full-screen applications. For a Landscape template wizard, check out our [create-landscape-app](https://github.com/urbit/create-landscape-app) repository.

For examples of Gall applications, you can see the [Egg Timer example](@/docs/hoon/hoon-tutorial/egg-timer.md) in the documentation; Gall applications with a Landscape interface include the [Weather tile](https://github.com/urbit/urbit/blob/master/pkg/arvo/app/weather.hoon) (its Landscape interface code is located [here](https://github.com/urbit/urbit/blob/master/pkg/interface/weather/tile/tile.js) and compiled separately).

## Creating a development ship {#creating-a-development-ship}

To do work with Hoon and with the system, we recommended using a "fake" ship -- one not connected to the network.

Because such a ship has no presence on the network, you don't need an Azimuth identity for its purposes. You just need to have [installed our software](/install).

To create a fake ship named `~zod`, run the command below. You can replace `zod` with any valid Urbit ship-name.

```
urbit -F zod
```

Now you should see a block of boot messages, starting with the Urbit version number. Welcome!

## Community tutorials {#community-tutorials}

Here are some tutorials written by members of the Urbit community. Some are a little outdated, but they may still prove useful.

- [Generators](https://github.com/joemfb/mardev/tree/master/docs/gen) by `~master-morzod`
- [Urbit by Doing](https://github.com/Fang-/Urbit-By-Doing) by `~palfun-foslup`
- [Learning Hoon](https://github.com/knubie/learning-hoon) by `@knubie`
- [A Nock Interpreter](https://jtobin.io/nock) by `~nidsut-tomdun`
- [Basic Hoonery](https://jtobin.io/basic-hoonery) by `~nidsut-tomdun`

If you want to add something to the list, [shoot us an email](mailto:support@urbit.org) or make a pull request in the [docs repository](https://github.com/urbit/docs).