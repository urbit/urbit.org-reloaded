+++
title = "Messaging"
template = "doc.html"
weight = 2
+++

Let’s get started using the `:chat-cli` application, also known more simply as
_Chat_. It's the simplest way to talk to people using the command line
interface.

### Quickstart

The most common use for `:chat-cli` right now is, of course, communicating in group chats.

### Joining a chat

In `:chat-cli`, any kind of medium for a message is called a _chat_. There are four "types" of chats, but for now we'll be dealing with the _channel_, a publicly accessible chatroom for general use. We'll discuss the other three kinds in the [chat management](#chat-management) section later on.

Join the Urbit Community from Dojo using `:group-view &group-view-action [%join [~bitbet-bolbel %urbit-community] ~bitbet-bolbel]`. Once you've joined, join the General chat from chat-cli. Use `ctrl-x` to switch from the Dojo prompt to the Chat prompt.

Then:

```
~sampel-palnet:chat-cli/ ;join ~darrux-landes/general
```

Now that you're in, try post a line to `~darrux-landes/general`:

```
~sampel-palnet:chat-cli= Hello, world!
```

You'll see your message printed below messages from others that came before it. You can always type `;chats` in the `chat-cli` prompt to list all the chats you're in:

```
~sampel-palnet:chat-cli= ;chats
~darrux-landes/general
```

Glyphs will be automatically assigned to channels, but have the option of binding a glyph (single non-alphanumeric character) to the channel you're joining; the syntax is in the form of `;join ~/~dopzod/books +`. The chosen glyph will be the symbol that ends your prompt, and it will be what you use as a shortcut to switch to this channel.

```
~sampel-palnet:chat-cli= ;+
~sampel-palnet:chat-cli+
```

Use `;leave` to unsubscribe from a channel:

```
~sampel-palnet:chat-cli= ;leave ~darrux-landes/general
```

Now, let's create a channel we can invite some friends to:

```
~sampel-palnet:chat-cli= ;create channel /my-channel
```

Now you can tell your friends to `;join ~your-urbit/my-channel`.

In order to see messages in `:chat-cli` you may need to do the following in Dojo:

```
:chat-cli %connect
```
 ### Creating and managing chats {#chat-management}

As mentioned before, any urbit can host any number of chats. Existing chats can be deleted or modified with various commands. All commands in this section should be sent from the `chat-cli>` prompt.

#### Create

Syntax: `;create [type] /name +`, where `+` represents an optional glyph.

Creates and joins a chat, where `[type]` is any of the following:
- `channel`: public chat. Has a blacklist for write control.
- `village`: invite-only chat.
- `journal`: publicly readable, invite-only for writing.
- `mailbox`: publicly writeable, invite-only for reading.

Let's create an example mailbox:

```
~sampel-palnet:chat-cli> ;create mailbox /coolbox ^
```

#### Delete

Syntax: `;delete /name`

Deletes a chat.

#### Permission management

You can permit and ban people from reading and/or writing to the chats you host, using `;invite` and `;banish` command respectively.

Syntax: `;invite [rw] /name ~ships`

Where `rw` is either `r`, `w`, or `rw`, representing "read" and "write" permissions.
And where `~ships` is a comma-seperated list of ships to invite.

For example, to grant two people full access to a `village` we created:

```
~sampel-palnet:chat-cli> ;invite rw /hidden-village ~ravmel-ropdyl, ~rapfyr-diglyt
```

Similarly, if we later want to revoke the writing permissions for one of them, but still allow them to read new messages, we can run:

```
~sampel-palnet:chat-cli> ;banish w /hidden-village ~rapfyr-diglyt
```

#### Chat glyphs

Glyphs are found at the end of your prompt, as a quick indicator of where
your messages will be sent.

Glyphs are assigned by chat hash out of the following list:

```
! @ # $ % ^ & ( ) - = _ + [ ] { } ; ' \ : " , . < > ?
```

Alphanumeric characters and `|#/*~` are reserved; all others can be manually assigned.

For example, `-` the glyph at the end of the prompt below might indicates that
messages sent from this prompt will go to some chat with that glyph:

```
~sampel-palnet:chat-cli-
```

To see what chat is bound to a glyph, use the `;what` command followed by the
glyph in question, or use `;what` without specifying a glyph to see all of your
subscriptions which are bound to glyphs. For example, to see `=`:

```
~sampel-palnet:chat-cli> ;what =
~dopzod/urbit-help
```

To see all of your glyph bindings:

```
~sampel-palnet:chat-cli> ;what
> ~paldev/numismatic-forum
. ~middev/ny-martians
= ~dopzod/urbit-help
```

When the messaging target doesn't have a glyph, we see their name at the end of
the prompt instead. Here we're talking into `~dannum-mitryl/homework`:

```
~sampel-palnet:chat-cli[~dannum-mitryl/homework]
```

#### Bind

Syntax: `;bind [glyph] ~host/chat-name`

Assigns the chosen glyph to a chat.

For example:

```
~sampel-palnet:chat-cli> ;bind + ~dopzod/urbit-help
```

#### Unbind

Syntax: `;unbind [glyph] ~host/chat-name`

Unassigns the chosen glyph from a chat owned by your ship.

For example:

```
~sampel-palnet:chat-cli> ;unbind + ~dopzod/urbit-help
```

If you don't specify a chat, all bindings for that glyph are removed.

#### Prefixes

Received posts are prefixed with a glyph to let you know what the
audience is. You can activate an individual post to see the full
audience.

There are a few special-purpose "glyphs":

- `|` - Informational messages
- `*` - Posts to a target you don't have a glyph binding for


### Configuration

#### Set audience

`;~ship/chat`

Set audience to `~ship/chat`.

#### Set audience by glyph

Syntax: `;[glyph]`

Set audience to the chat previously bound to the chosen glyph.

#### Set audience to own chat

Syntax: `;/chat`

Set audience to a chat on your own ship.

### Miscellaneous configuration

#### Change timezone

Syntax: `;set timezone [+/-][hours]`

Adjust the display of timestamps to a specific timezone. Relative to UTC.

#### Set width

Syntax: `;set width [number]`

Set the rendering width of `:chat-cli` to a specific number of characters.
(Minimum of 30.)

#### Show timestamps

Syntax: `;set showtime`

Show the timestamp for each message. This is set by default.

#### Hide timestamps

Syntax: `;unset showtime`

Stop showing the timestamp for each message.

#### Sound notification on

Syntax: `;set notify`

Emit a terminal bell sound if your six-syllable ship name is mentioned in
a message. This is set by default.

#### Sound notification off

Syntax `;unset notify`

Do not notify when your ship name is mentioned.
