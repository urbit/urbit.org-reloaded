+++

title = "%gather"
date = "2022-08-22"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev"]

[extra]
image = ""
description = "An Urbit native meetup tool for subculture gatherings"
reward = "3 stars"
assignee = "~polrel-witter, ~pontus-fadpun"
champion = "~dolweb-donfun, ~dinleb-rambep"
grant_id = "P0166"
completed = false
canceled = false
link = ""

+++

# Rationale
Meatspace interaction and synchronous, virtual discussions are core values many people on Urbit share. Currently, this need is facilitated through Meetup.com, which is a good intermediate solution, but for those who are in the slow (but increasingly faster) transition to using Urbit full-time, it's clear a native meet up tool is needed. Meetup falls into the typical web2 trap of siloing functions that should integrate seamlessly with other applications. Gather tackles this problem by leveraging Urbit ID for invite and RSVP permissining, Groups to section-off contexts and make it easier for sub-cultures on Urbit to spin up gatherings (something we don't see much of on Meetup right now), and native messaging to reduce context-switching. Future integrations and features could include: connection to the Bitcoin wallet for event payment walling, beaming event pages to the Clearweb to market events outside of Urbit, QR code entrance gating, event-specific attendee profiles, and other, unforseen possibilities as applications continue to percolate from the underground.
# User Stories
- User is planning a get-together and would like to send an invite out to their friends and members of a group they're a part of.
- User is in a foreign city and is curious to know who (ships they interact with regularly or members of a Group they're a part of) is in the area and open to meeting up.
- User has a core group of people they meet up with reguarly.
- User is curious to know if they have mutual, Urbit acquaintances in their area.
# Two Main Features and a Settings Page
## Gathering: for organized meet ups
- Functionality example: `~sampel-palnet` is hosting a poker night and wants to invite people he regularly interacts with on Urbit, and members of a specific Group. He has 9 seats so will take the first 9 to accept his invite. He writes the details in the invite note, marks the address where the game will take place, and sends the invite to these ships. He can see who has accepted/declined the invite and finalize it (removing any pending invites from the Invitee's pending queue) when 9 have accepted it.
- Send and receive invites
- Search field for ships
- Dropdown menu to select groups user is a part of
- Accept/Decline an invite
- Write an invite note (dummed down for Hackathon; will eventually be a full page - see below)
- Host can view the note they sent for a gathering (dummed down for Hackathon)
- If ship accepts an invite they can view the invite list
- Host ship can cancel a gathering
- Host ship can finalize a gathering (meaning they won't take any more attendees)
- Distinguish between Pending and Accepted invites for the Invitee
- Invitee can accept, decline, or ignore an invite
- Invitee can ghost a host ship
- Invitee or Host can click a button to start a Groups message thread between each other
- Host can create a group message thread with all attendees
- Attendee can RSVP to a public gathering via a button on the Gathering page
- Attendee can un-RSVP to a Gathering
- Host can establish a Gathering page with a title, link, description, photo, address, venue name, date, and time
- Host can toggle a gathering's settings: public or private (if so, select who's invited; no link generated to restrict access to the Gathering page), meatspace (if so, enter address) or virtual, display attendees or not
- A potential Attendee can access a Gathering page if they have the link and the gathering is public
- Attendee can see who else is attending (if enabled by host)
- Host can see list of gatherings they're hosting in a dashboard
- Attendee can see list of gatherings they're attending in a dashboard
- Host can archive or delete gatherings that have passed
## Status: for chance encounters and finding nearby friends
- Functionality example:
    - Among other select ships, the user (e.g. `~sampel-palnet`) has specified that `~polrel-witter` is a part of their Gang (i.e. someone they would be willing to share their location with when they turn the Status feature on). `~polrel-witter` has also added `~sampel-palnet` to their Gang. Given this mutual affinity, a small tile with each ship's @p, the brief status note, and distance between them will appear on each others' dashboard if the following extra two conditions are met:
        - Both ships have Status turned on
        - Both ship's radiuses overlap
    - A non-Gang ship can add sampel-palnet to their Gang, but because it's not mutual, when both ships have the Status feature turned on sampel-palnet will receive the non-Gang member's status note and city/country and can decide to add them to their Gang (making it mutual), message them, ignore their note, or ghost them (banning future notes from that ship).
    - Additionally, the user can choose to share their status with members of one or more Groups they're a part of. The user's status will appear in the members' Foreign Ships queue where they'll then have the same options listed in the bullet point above.
- Toggle on and off
- Edit and set status note
- Send and receive statuses
- See list of Gang and Foreign ship statuses
- Auto-calculate distance between mutual Gang members and display distance
- DM button
- Share status with members of a group or attendess of a gathering the user is attending
- Ignore Status tiles
- Ghost Foreign ships
- Add Foreign ships to Gang
- Display city, state, and country of Foreign ships
- Can see list of ships (with status notes and distance) within radius that are mutual Gang members and also have the Status feature turned on
- Can see list of Foreign ships (with status notes and their city, state, and country)
## Settings
Set "My Location": enter an address
Set a radius within which they're willing to receive status notes
Add any ship to Gang
Remove ships from Gang
See list of Ghosted ships
Unghost ships
Toggle how user wants to receive Gathering Invites: from anyone or only from Gang
Toggle how user wants to receive Statuses: from anyone, only from Gang, only from ships within radius
Toggle notification for new status notes and invites received
# Milestones
## Milestone 1
Expected Completion: August 28, 2022
Compensation: 1 star
### Gathering
- Can send and receive invites
- Can search for ships
- Can accept/decline/ignore invites
- Can edit and set an invite note
- Host can view note sent
- Invitee can distinguish Pending and Accepted invites
- Invitee can ghost a ship from Pending queue
- Invitee can unaccept an invite
- Host can see who accepted/declined their invite
### Status
- Can toggle this feature on and off
- Can edit and set status note
- Can send and receive statuses
- Can ignore status notes
- Can see list of Gang and Foreign Ship statuses
- Can ghost Foreign Ships
- Can add Foreign Ships to Gang
### Settings
- Can add any ship to Gang
- Can remove ships from Gang
- Can see list of Ghosted Ships
- Can unghost ships
- Can toggle notification for new status notes and invites received
## Milestone 2
Expected Completion: September 16, 2022
Compensation: 1 star
- Connect to an open source map API so the app can retreive Longitude and Latitude and calculate the distance between two ships (the address input is left up to the user for privacy control)
- The map API query would work as follows:
- Ship obtains latitude and longitude coordinates from a free, open source map API such as Nominatim address search
- Since Nominatim has a strict use policy, ship obtains the Lat and Lon once, each time the address field is updated, and stores it locally
- Whenever two ships are trying to find the distance between each other, the locally stored coordinates are passed to each other and calculated on-ship.
### Gathering
- Host can select one or more Groups the user is a part of from a dropdown menu
- Invitee can view invite list
- Host can cancel and finalize a gathering
- Host or Invitee can create a message thread (in Groups) between each other
### Status
- Auto-calculate distance between mutual Gang members and display distance on each others' tiles
- Message button on tiles to open up message thread in Groups
- Can see city, state, and country of Foreign Ships
### Settings
- Can set street, city, state, country, and zip to determine coordinates
- Can set radius
- Can toggle how user wants to receive Gathering Invites: from anyone or only from Gang
- Can toggle how user wants to receive Statuses: from anyone, only from Gang, only from ships within radius
## Milestone 3
Expected Completion: November 2022
Compensation: 1 star
### Gathering
- Host can establish a Gathering page with a title, link, description, photo, address, venue name, date, and time
- Host can toggle a gathering's settings: public or private (if so, select who's invited; no link generated to restrict access to the Gathering page), meatspace (if so, enter address) or virtual, display attendees or not
- Anyone with a ship can access a Gathering page if they have the link and the gathering is public
- Attendee can see who else is attending (if enabled by host)
- Attendee can RSVP to a public gathering via a button on the Gathering page
- Host can see list of gatherings they're hosting in a dashboard
- Attendee can see list of gatherings they're attending in a dashboard
- Host and Attendee can archive or delete gatherings that have passed
- Host can create a group message thread with all attendees
### Status
- User can easily select a group and/or attendees of a gathering they're attending to which to share their status

# About Us
`~polrel-witter`
Over the past few years, I've worked in various operation roles at a film festival in Austin. My most relevant development experience includes designing and managing (though not coding) the festival's reader software rebuild, which is used to manage a team of 400 readers. Additionally, I served as the general IT support person for festival staff and have been around Urbit, managing a star and experimenting with optimal ways to host ships, for nearly a year now. I completed Hoon School Live back in May, have reviewed the Gall Guide and Walkthrough, and am participating in App School Live July through August.
`~pontus-fadpun`
In the last three year I've worked as a software engineer, developing frontend and backend solutions for various clients. My area of expertise was Hyperledger Fabric, where I've created software that generates smart contracts from bpmn/workflow diagrams. I've learned Hoon recently and worked on the eth-provider grant to enable urbit ships to customize their ethereum connection.