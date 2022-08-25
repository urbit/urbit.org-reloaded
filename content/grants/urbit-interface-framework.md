+++
title = "Urbit Interface Framework" 
date = "2022-08-24"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Other" ]

[extra]
image = ""
description = "Develop frameowrk for alternative urbit web browser interface"
reward = "5 stars"
mentor = "~nocsyx-lassul"
assignee = "~nortex-ramnyd"
grant_id = "P0100"
completed = false
canceled = false
+++

# Rationale

I'm proposing to write code for what could become an alternative urbit web browser interface alongside Landscape, Escape, Holium and maybe others I've yet to see.
This interface basically functions like website builder [Wix](https://www.wix.com/) but puts more emphasis on
1. Enabling creation of custom components as easy as using pre-fabricated ones - Wix has an option to create custom components with javascript but it's limited and impractical.
2. Implementing collaborative composing as an integral feature rather than an "add-on".
The interface would be composed together from components in similar way Wix does. The components are draggable around the screen and it will be possible to align a component into a grid with automatic alignment. In practice this enables composing (live) "dashboards" for reasoning about various data.
The interface will be accessed from browser and mobile browser. Future work includes a native iOS app and a desktop Electron app. Though it's the same codebase for web browser interface, the mobile browser interface components will be auto-aligned for mobile screen. iOS app will have support for native notifications and widgets.
The components will be written in Sail, an Urbit markup language. A trivial example of a component could be `;smiley` which renders on the screen as `:-)`.
The `;smiley` definition might look something like `;span: ":-)"`. It must be in valid HTML namespace, but can be written in Sail syntax or alternatively, defined in pure HTML itself.
If you try to add this `;smiley` component to your screen but it doesn't exist on your urbit yet, a prompt appears telling to either define this component or download component with this name from other urbit. By default, downloads happen from your parent star but can be configured to download from other indexers as well.
Alternatively, if you know that this `;smiley` component exists on some particular urbit, you can also download directly by just appending the name of urbit, e.g. if ~nortex-ramnyd has this component, you could `;smiley~nortex-ramnyd` and after that, this component is available on your ship as well (so next time you want to use this component, you can just `;smiley` without asking it from ~nortex-ramnyd).
For this project, I will implement an additional CSS abstraction layer into Sail. This makes styling components a little bit easier. So instead of `;smiley(style "color:blue")`, it would be `;smiley(color "blue")`. Or to make custom fonts easier `;p(font "custom-font"): Hello` or `;p(font "https://url-of/custom-font.woff2"): Hello`. To bypass CORS restrictions, I'll host a CORS relay (or can be configured to use a different host).
"Pages" of composed components are linked together like web pages and can be either pages composed by only you (only available on your urbit), e.g. your "home screen"/"dashboard", or group pages - pages that are composed together by group members.
Both types can have specified view and edit permissions.
The first time when the interface is installed (an Electron app), the "welcome" screen appears and this is also the "home screen" that appears when later reopening the application. The welcome screen walks through the functionality of the interface and subsequently prepares the user to start composing their home screen.
Some code I have already written, the repository is stored on github: https://github.com/h5gq3/wix.com
# Milestones and Compenstation
## Milestone 1: finish core features and polish UI
### 2 stars
The first milestone is to get the current functionality polished and usable with minimal bugs. It should be clear to the user how to edit and add blocks as well as how to switch back to rendering. The user should be able to install the freeform editor as an app and see the basic demo where state is only seen through the app itself.
- Implement basic fixed freeform positioning
- Implement component resizing logic
- Implement page routing
- Add some UI for showing editing vs rendered state
- Add UI helpers for rendering editor
- Add docket file and editor html + js so that it can be rendered as an app for ease of showing off
## Milestone 2: usability and component enhancements
### 1 star
In this milestone we're mostly just improving the usability of the editor and adding nice-to-have features like being able to make and use components.
- Implement component creation logic using React 18
- Download components from other ships
- Install and use React components straight from markup
- CSS abstraction
- Some "convenience" functions library in style of jQuery
## Milestone 3: collaborative editing
### 1 star
In this milestone we implement push and pull hooks similar to how groups works to allow for syncing of state between multiple editors and implement custom permissioning logic.
## Milestone 5: proof of concept custom component/app - DeepSpace meditation app
### 1 star
In this milestone we create an application on top of the interface builder. The design considerations for this application are as follows:

# Future Work
Future work involves expanding the functionality and writing custom components, aka "apps".
Potential expansions:
- Dragging various media onto the page and automatically storing it in your data store (possibly IPFS or S3)
- Sail and udon improvement - try improving syntax for more ergonomic use
- "Convenience" functions library expansion
- Codemirror integrations like indentation, syntax highlighting, and json previewing
- Component discovery from other ships