+++
title = "Development Docs"
weight = 1
template = "sections/docs.html"
+++

Welcome to the developer documentation for the Urbit project. This documentation
is maintained by [Tlon](https://tlon.io) and the Urbit community in a public
[Github repository](https://github.com/urbit/docs). Issues and contributions are
welcome.

This documentation provides a series of explainers, guides, tutorials and
reference material for assisting you in developing on the Urbit platform, or
contributing to the Urbit project. If you're looking for documentation on how to
_use_ your Urbit ship, see our [usage docs](/using/).

### [Development](/docs/development/)

The Development section is recommended reading for developers interested in
contributing to Urbit itself, or building apps on top of Urbit. It serves as a
high-level orientation to how to set up a development environment, the various
codebases the project comprises, our grants program, and the precepts that
drive the development of Urbit.

### [System Overview](/docs/system-overview/)

This section gives a high-level overview to all the major components of the
Urbit tech stack - namely, the operating system Arvo, the programming languages
Nock and Hoon, the runtime Vere, and the decentralized ID system Azimuth.

### [Arvo (Urbit OS)](/docs/arvo/)

This section covers the kernel of Urbit OS, called Arvo, as well as its kernel modules.

### [Hoon (High-level Language)](/docs/hoon/)

Here is contained all official documentation on Hoon, the high-level purely
functional programming language in which Arvo and much of userspace is written.

### [Nock (Low-level Language)](/docs/nock/)

Official guidance on Nock, the functional assembly-level language which serves
as the basis for Hoon.

### [Vere (Interpreter)](/docs/vere/)

Documentation on Vere, the Nock virtual machine which serves as the interface
between Urbit and Unix.

### [Azimuth (Urbit ID)](/docs/azimuth/)

The workings of Azimuth, the decentralized ID system utilized by Urbit.

### [Userspace](/docs/userspace/)

Developer guides for Gall (the vane for controlling userspace apps), Landscape (the web client by which most users interact with their ship), and Threads (transient apps for IO).
