+++
title = "Urbit OS¹ -> OSⁿ"
description = "A quick tour of the technology"
weight = 3
[extra]
flatten_pagination = "true"
hide_next_title = "true"
hide_previous_title = "true"
+++

# Urbit Interface

We started at the bottom of the stack, years ago, with the VM. We’re just now getting to the top: the interface. Urbit ID and Urbit OS are great tools — but technology on its own isn’t enough. As far as we’re concerned, if people don’t actually use this thing, it doesn’t matter.

Urbit, VM to UI, is meant to feel like the a desktop OS for a networked world: a single, unified system where you can interact with, update and archive all of your personal data; communicate with your friends and family; and collaborate with the people you work with. 

One way to imagine Urbit is as the Western answer to WeChat: a seamless, multi-purpose, vastly extensible social network, but without the surveillance. As a platform anyone can extend, we see Urbit as the ultimate productivity tool: no more frankenstack of apps and services needed for companies and collaborators, because everything lives in one interface. With the power to build whatever you want on top of Urbit, you can bring everything together in one place.

In early 2020, we’ll release what we’re calling OS 1 — the first minimal but complete user experience for Urbit. OS 1 brings together the whole Urbit stack into a single interface. OS 1 is simple in the extreme. It’s a calm, ad-free, privacy-respecting environment to homestead new digital communities. 

We’ve got a pretty clear picture of OS 1, 2 and 3 which we’ll explain in [the roadmap](/understanding-urbit/roadmap). Here, we’ll focus on the vision for Urbit as a user experience.

<img class="full w-100 mv4" src="https://media.urbit.org/site/understanding-urbit/project-history/uu-osn-1.svg"/>

In the current world of apps and services, there’s no operating system in any meaningful sense. Our laptops and phones just let us switch between services. Our communities, co-workers and lives are spread between these services — and the work of combining them is left to the user. You have to remember all your passwords, who sent what message where, what files are on which platform, and so on. 

The most severely lacking thing about our digital lives today is that they lack a sense of place or a sense of home. 

It’s annoying and confusing to switch between interfaces, you can’t extend or build on top, and privacy and security are out of your hands. This fragmented, siloed, closely surveilled experience is simply a byproduct of having other people run and control your software. The result, for the ordinary user, is restrictive and boring. The possibility for everyday creativity with the tools we’re stuck with is close to zero. Wasn’t the computer supposed to be a bicycle for the mind?

Operating systems for the PC took the desk of the 1970s and made it digital. Paper, drawers and envelopes became ‘files’ and ‘folders’. It’s a great abstraction, but it’s ancient. We live in a multiplayer, connected world; we need an operating system that knows that.

The ‘desk’ of today is cluttered with apps and services, data structures and interfaces. Refactoring this, unifying it, is the most important problem that a platform like Urbit can solve. We want Urbit, as a user experience, to be a single system for bringing together a group of people to do many things together.

![](https://media.urbit.org/site/understanding-urbit/your-last-computer/your-last-computer-waves%402x.png)

What exactly does this look like? In the long run, we’re not 100% sure. There’s a lot to be invented — but we have a first pass that we think is quite good. At least, good enough that we like using it quite a lot.

In Urbit, there are two building blocks: groups and modules. A group is exactly what it sounds like: 1 or more people. A module is sort of like an app without the data lock-in. It’s just a tool for getting something done, like ‘chat’, ‘publish’, or ‘links’ that’s shared by a group. Any group on Urbit can combine modules, or build their own. 

Think of a module like a particular way of communicating. Usually, groups have a few different ways they want to communicate. Urbit makes this simple and straightforward. With one group, you may decide to chat and share photos. Another might share annotated research, watch the markets, and manage payments on a blockchain.

Creating a group and customizing the modules it shares is easy. Building a new module is pretty straightforward as well, no more difficult than building an iOS app — although you do have to learn about the Urbit stack.

<img class="full w-100 mv4" src="https://media.urbit.org/site/understanding-urbit/uu-osn-3.svg"/>

We think this basic metaphor can scale, over time, to be useful in many different contexts. 

For example, parents might give their young children an Urbit that’s locked, at first, to only two groups: family and friends from school. It might also be limited to one module: chat. 

A broader group of siblings, parents and grandparents might create a group with a few more modules to share photos, chat and coordinate events. 

A new tenant in a building could use an Urbit workspace to lock and unlock doors, pay their utilities and rent, and communicate with the landlord. The building owner could use an urbit workspace to keep up with all her tenants, accept rent payments, check on critical building systems and communicate with subcontractors.

This model provides for unending possible combinations for ordinary users, without increasing complexity for developers. It’s clear to us what this can look like in the short term. What the zoomers will do with it is beyond our imagination.

<img class="full w-100 mv4" src="https://media.urbit.org/site/understanding-urbit/uu-osn-4.svg"/>

Centralized services are great at replacing broadcast media: distributing content from a producer to a bunch of followers. 

Urbit is for everything else. That is, Urbit is for actual two-way communication: keeping a group of friends connected, staying in touch with your family, or working with a group of collaborators. 

We designed Urbit to become the best tool for communicating with friends and family, or collaborating with peers. It’s a social network, but much calmer and more purposeful. It’s a productivity tool, but much more secure and powerful.

How do we get to this future? By staying focussed, writing code, and iterating through design. We have a rough outline of this process — let’s walk through it.