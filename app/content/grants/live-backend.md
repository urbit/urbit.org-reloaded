+++
title = "%live App - Backend"
date = "2024-09-22"

[taxonomies]
grant_type = ["Bounty"]
grant_category = ["Dev: Apps"]

[extra]
image = ""
description = "Backend for %live app to support Subassembly and future events"
reward = "2 stars"
assignee = ["~polrel-witter"]
champion = ["~tocwex"]
grant_id = "P0391"
completed = true
canceled = false
fund = "http://zyx.polrel-witter.xyz/apps/fund/project/~polrel-witter/xlive-backend-improvements-for-subassembly-2024"
+++

## Project Overview
*This campaign is for the backend element of the Subassembly App upgrades to %live, from ~mocbel. The project overview of these projects are identical, while milestones are oriented towards the specific deliverables for this campaign's project worker*

The UF is looking to further development of %live for use by the Subassembly event series and any event organizer. This grant is for the creation of the initial MVP for this product experience. It does not include everything possible in an event app, but instead starts with the core functionality that would be high leverage in an app for Subassembly PNW and its focus on identity, trust, and reputation.

This grant is one of three campaigns for:
1. the backend updates to %live, headed by `~polrel-witter`
2. the front end PWA interface, headed by `~widmes-hassen`
3. blended back and front end support, from `~bisnyx-mormyl`

Given that the %live application exists and has much of the necessary functionality already implemented, this grant scope will focus on extending the application functionality, as well as developing a react+PWA front end experience as an alternative to the existing Sail+HTMX front end. The app will include the following:

- An event that includes
	- event host
	- event title
	- event tag
	- event start time
	- event end time
	- event location
	- event details
		- ideally takes arbitrary markdown
- A schedule that includes talks
	- talk title
	- speaker
	- start time
	- end time
- a venue map
- an event details page
- Attendee list
	- Host of the event holds the full list
		- an attendee is a collection of:
			- @p (required)
			- %tlon nickname
			- %tlon avatar
			- ens domain
			- telegram
			- phone number
			- github
			- email
			- signal
			- twitter
		- but where non-@p/%tlon information is only revealed mutually
			- mutual matching will be done using %pals tags, where if both parties have tagged each other with the event tag

What is required of the grantees for this project—and the other two related projects—is to build a robust front end experience.

- The subassembly venue is not in a high internet connectivity location, so reloading content every time it is opened is untenable. The assumption is that the app needs to be a PWA with local storage of updated data, but if a grantee is a mobile app dev and would prefer to put out a mobile app, that is acceptable as well.
- It is assumed that the 'matching' activity will occur *after* the conclusion of the event.
- the Venue Map should be able to store an image in localstorage and support navigating it with pinch to zoom
- There should be a deeplink to the Tlon group for the event, ~sarlev-sarsen/subassembly

#### Future work
Future work opportunities for this grant includes implementing limited-access speaker sessions, where only a subset of attendees are permissioned to view and attend particular sessions.

## Milestones
### Milestone 1 - %live functionality updates - 1 Star

Milestone 1 for the backend updates on %live is focused on updating the core functionality of the application. The necessary changes should be made in order to support the below users stories. While this milestone doesn't have an explicit due date, it is a dependency for Milestones 1 and 2 of the %live Frontend Scope which needs to be completed prior to the Subassembly event in October.

#### User Stories
As an event host...
- I have a form that will help me construct a poke that will set the event, the schedule, and the attendee list.
- I can edit the event, schedule, and attendee list
- I can upload a venue map as an image (specific format TBD)

As an event attendee...
- I can run `|install ~mocbel %live` on my ship to install the app
- I can find a list of events to which I am invited (this can currently be a list of 1). If there are no events, I should see a message with a link out to the urbit.org events page
- I can select from the list of events to which I am invited and get into an event specific interface
- I can navigate around the app as a typical mobile experience with a nav experience for the following pages:
	- Venue Map
	- Event Details
	- Attendee List
	- Schedule
- On the attendee list page, I can...
	- see a list of @p, %tlon nickname, and %tlon avatar
	- an indicator of if we are a match
	- if i have already 'swiped' on them
	- a button to 'start swiping'
	- a button for "your matches" (alternatively this could be a filtering fuctionality)
- On the 'swiping page', I can...
	- See their avatar, nickname and @p
	- have an option to signal matching interest or non-matching interest
	- see some indicator of if I have already made a selection on this @p
- On the "your matches" page, I can...
	- see my list of matches, and click on them to see their full profile with any details they have chosen to share
	- have clickable links to:
		- deeplink into a DM in the tlon mobile app
		- open their Github
		- open a text message to them
		- open a phone call
		- etc.
### Milestone 2 - JSON Parsing & Generalized App Experience - 1 Star
Milestone 2 contains two primary elements: JSON Parsing, and the generalized app experience. The JSON parsing must be delivered in time for use in the version the the app that is delivered for use at Subassembly. This means close coordination with the project worker for the %live Frontend Scope campaign. Upon delivery of the JSON parsing functionality, the 'generalized app experience' element of this milestone is likely to be supported but will not be considered fully complete until the application is shipped and meets the expectations of the Trusted Oracle. Those expectations are considered to be met if:
- Three 3rd party events are hosted using %live, such as Urbit Meetups, Mars Review of Books parties, or additional Subassembly series occurrences.

Also a potential indicator of met expectations is the app supporting the following user stories:
#### User Stories
- As an event coordinator, I can smoothly:
	- Create a new event with an attendee list and draft schedule
	- Add additional attendees who are invited to the event
	- add additional schedule session entires
	- Remove attendees or sessions
	- Upload a venue map, or if no venue map exists this page is excluded from the user interface
- As an event attendee, I can:
	- either, install a single PWA that hosts all my events and stores local state for browsing event content while offline, or
	- Install each different event as a separate PWA