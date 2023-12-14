+++

title = "%homunculus"
date = "2024-02-01"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev Tool"]

[extra]
image = ""
description = ""
reward = "3 Stars"
assignee = ["~sivrul-litsub"]
champion = ["~lagrev-nocfep"]
grant_id = "P0331"
completed = false
canceled = false

+++

## Description

Imagine a world where Urbit can be navigated through Midnight Commander style terminal menus — where app developers have an alternative to web interfaces.

Homunculus is an agent that serves as a framework for building TUI front-ends for your apps. Developers will be able to define their front-end in Sail, as if they were writing a normal web interface, and Homunculus will turn it into a text based display on the terminal. Homunculus' style attribute and semantic element system will make it intuitive to describe how your text display should look and operate. You will be able to specify color, size, position, borders, layering, and make use of elements with specific functionality like inputs, and much more.

Homunculus will send terminal events like keystrokes and clicks in a format that is easily interpreted by your agent, providing a simple API to make your text interface interactive. For example, instead of just telling you that a click happened at a certain coordinate, Homunculus will tell you which one of your elements was clicked.

This project will provide the necessary infrastructure to expand terminal interfaces beyond CLIs, which is currently not feasible with %drum. Homunculus will open up the possibility for apps like terminal text editors, or even games with interfaces like the original Dwarf Fortress.

TUIs are beautiful and I believe they are highly consistent with the aesthetic vision of Urbit. Homunculus will further Urbit as a creative medium and as a vessel for unique experiences using computers.

### Personal context

I recently released Mast, which is an easy to use framework for building dynamic and interactive Sail front-ends that work as SPAs rather than static pages. In many ways, Homunculus is an extension of the developments that I had made building Mast, and it deals with many of the same problems, so I already have quite a bit of familiarity with the task at hand.

## Milestone 1: Build Homunculus

Estimated time: 2 months

Payment: 2 stars

- A Sail attribute and semantic element system will be defined allowing developers to describe the style, positioning, and functionality of their interface in the manner of semantic HTML and CSS — but uniquely designed for Urbit terminal displays (the conceptual work for this has already been done). Developers should only need to write Sail elements with these attributes and tag names, and then render this Sail and send the $manx to Homunculus.

- The $manx received by Homunculus will then be parsed into output for the terminal.

- Homunculus will keep track of certain details about the current state of an app's display and use this information to parse terminal input into meaningful information for the app depending on the kinds of elements rendered.

- On the whole, Homunculus will serve as a terminal session manager that is analogous and alternative to %drum, but for apps that require interaction and display logic distinct from that of a CLI (which is not possible with %drum).

- Currently, the runtime does not support multiple terminal clients, and Dill is effectively locked in with %drum, so Homunculus will be built using Lick. The only difference that this should entail for the user is that a simple Bash script will need to be run to connect to a session with a Homunculus app. However, once the core limitations presented by Dill and the runtime are resolved, Homunculus should be able to use Dill sessions directly, which would remove the need to start the TUI with a script.

## Milestone 2: Proof of concept app implementation + Homunculus documentation

Estimated time: 1 month 

Payment: 1 star

- I will build a TUI file manager. It will serve as an example for how to build TUI front-ends with Homunculus. The construction of this app will follow a model where, as a front-end, it is primarily meant to be used from a locally run moon to allow for direct connection to the terminal, and it will communicate with your planet as its back-end.

- Documentation will be made to provide clear explanations and examples of how to write Sail for Homunculus and integrate it in your agent to make a dynamic and interactive text display.

## Total compensation

3 stars
