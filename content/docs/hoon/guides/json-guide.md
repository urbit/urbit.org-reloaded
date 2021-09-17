+++
title = "JSON"
weight = 4
template = "doc.html"
+++

If one is working on a Gall agent with any kind of web interface, it's likely one will encounter the problem of converting Hoon data structures to JSON and vice versa. This is what we'll look at in this document.

Urbit represents JSON data with the `$json` structure (defined in `lull.hoon`). You can refer to the [json type](#the-json-type) section below for details.

JSON data on the web is encoded in text, so Urbit has two functions in `zuse.hoon` for dealing with this:

- [+en-json:html](/docs/hoon/reference/zuse/2e_2-3#en-jsonhtml) - For printing `$json` to a text-encoded form.
- [+de-json:html](/docs/hoon/reference/zuse/2e_2-3#de-jsonhtml) - For parsing text-encoded JSON to a `$json` structure.

One typically wants `$json` data converted to some other `noun` structure or vice versa, so Urbit has three collections of functions for this purpose, also in `zuse.hoon`:

- [+enjs:format](/docs/hoon/reference/zuse/2d_1-5#enjsformat) - Functions for converting various atoms and structures to `$json`.
- [+dejs:format](/docs/hoon/reference/zuse/2d_6#dejsformat) - Many "reparsers" for converting `$json` data to atoms and other structures.
- [+dejs-soft:format](/docs/hoon/reference/zuse/2d_7#dejs-softformat) - Largely the same as `+dejs:format` except its reparsers produce `unit`s which are null upon failure rather than simply crashing.

The relationship between these types and functions look like this:

![json diagram](https://media.urbit.org/docs/json-diagram.svg)

Note this diagram is a simplification - the `+dejs:format` and `+enjs:format` collections in particular are tools to be used in writing conversion functions rather than simply being used by themselves, but it demonstrates the basic relationships. Additionally, it is less common to do printing/parsing manually - this would typically be handled automatically by Eyre, though it may be necessary if one is retrieving JSON data via the web client vane Iris.

### In practice

A typical Gall agent will have a number of structures defined in a file in the `/sur` directory. These will define the type of data it expects to be `%poke`ed with, the type of data it will `%give` to subscribers, and the type of data its scry endpoints produce.

If the agent only interacts with other agents within Urbit (local or remote), it may just use a `%noun` `mark`. If, however, it needs to talk to a web interface of some kind, it usually must handle `$json` data with a `%json` mark.

Sometimes an agent's interactions with a web interface are totally distinct from its interactions with other agents. If so, the agent could just have separate scry endpoints, poke handlers, etc, that just directly deal with `$json` data with a `%json` mark. In such a case, one can include `$json` encoding/decoding functions directly in the agent or associated libraries, using the general techniques demonstrated in the [$json encoding and decoding example](#json-encoding-and-decoding-example) section below.

If, on the other hand, one wants a unified interface (whether interacting with a web client or within Urbit), a different approach is necessary. Rather than taking or producing either `%noun` or `%json` marked data, custom `mark` files can be created which specify conversion methods for both `%noun` and `%json` marked data.

With this approach, an agent would take and/or produce data with some `mark` like `%my-custom-mark`. Then, when the agent must interact with a web client, the webserver vane Eyre can automatically convert `%my-custom-mark` to `%json` or vice versa. This way the agent only ever has to handle the `%my-custom-mark` data. This approach is used by `%graph-store` with its `%graph-update-2` mark, for example, and a number of other agents.

For details of creating a `mark` file for this purpose, the [mark file example](#mark-file-example) section below walks through a practical example.

## The `$json` type

Urbit represents JSON data with the `$json` structure (defined in `/sys/lull.hoon`):

```hoon
+$  json                    ::  normal json value
  $@  ~                     ::  null
  $%  [%a p=(list json)]    ::  array
      [%b p=?]              ::  boolean
      [%o p=(map @t json)]  ::  object
      [%n p=@ta]            ::  number
      [%s p=@t]             ::  string
  ==                        ::
```

The correspondence of `$json` to JSON types is fairly self-evident, but here's a table comparing the two for additional clarity:

| JSON Type | `$json` Type           | JSON Example              | `$json` Example                                              |
| :-------- | :--------------------- | ------------------------- | :----------------------------------------------------------- |
| Null      | `~`                    | `null`                    | `~`                                                          |
| Boolean   | `[%b p=?]`             | `true`                    | `[%b p=%.y]`                                                 |
| Number    | `[%n p=@ta]`           | `123`                     | `[%n p=~.123]`                                               |
| String    | `[%s p=@t]`            | `"foo"`                   | `[%s p='foo']`                                               |
| Array     | `[%a p=(list json)]`   | `["foo",123]`             | `[%a p=~[[%s p='foo'] [%n p=~.123]]]`                        |
| Object    | `[%o p=(map @t json)]` | `{"foo":"xyz","bar":123}` | `[%o p={[p='bar' q=[%n p=~.123]] [p='foo' q=[%s p='xyz']]}]` |

Since the `$json` `%o` object and `%a` array types may themselves contain any `$json`, one can see how JSON structures of arbitrary complexity can be represented. Note the `%n` number type is a `@ta` rather than something like a `@ud` that one might expect. This is because JSON's number type may be either an integer or floating point, so it's left as a `knot` which can then be parsed to a `@ud` or `@rd` with the appropriate [+dejs:format](/docs/hoon/reference/zuse/2d_6) function.

## `$json` encoding and decoding example

Let's have a look at a practical example. Here's a core with three arms. It has the structure arm `$user`, and then two more: `+to-js` converts a `$user` structure to `$json`, and `+from-js` does the opposite. Usually we'd define the structure in a separate `/sur` file, but for simplicity it's all in the one core.

#### `json-test.hoon`

```hoon
|%
+$  user
  $:  username=@t
      name=[first=@t mid=@t last=@t]
      joined=@da
      email=@t
  ==
++  to-js
  |=  usr=user
  |^  ^-  json
  :-  %o
  %-  malt
  %-  limo
  :~
    ['username' s+username.usr]
    ['name' name]
    ['joined' (sect:enjs:format joined.usr)]
    ['email' s+email.usr]
  ==
  ++  name
    :-  %a
    :~
      [%s first.name.usr]
      [%s mid.name.usr]
      [%s last.name.usr]
    ==
  --
++  from-js
  =,  dejs:format
  |=  jon=json
  ^-  user
  %.  jon
  %-  ot
  :~
    [%username so]
    [%name (at ~[so so so])]
    [%joined du]
    [%email so]
  ==
--
```

### Try it out

First we'll try using our `$json` encoding/decoding library, and afterwards we'll take a closer look at its construction. To begin, save the code above in `/lib/json-test.hoon` and `|commit` it:

```
> |commit %home
>=
+ /~zod/home/5/lib/json-test/hoon
```

Then we need to build it so we can use it. We'll give it a face of `user-lib`:

```
> =user-lib -build-file %/lib/json-test/hoon
```

Let's now create an example of a `$user` structure:

```
> =usr `user:user-lib`['john456' ['John' 'William' 'Smith'] now 'john.smith@example.com']
> usr
[ username='john456'
  name=[first='John' mid='William' last='Smith']
  joined=~2021.9.12..09.47.58..1b65
  email='john.smith@example.com'
]
```

Now we can try calling the `+to-js` function with our data to convert it to `$json`:

```
> =usr-json (to-js:user-lib usr)
> usr-json
[ %o
    p
  { [p='email' q=[%s p='john.smith@example.com']]
    [p='name' q=[%a p=~[[%s p='John'] [%s p='William'] [%s p='Smith']]]]
    [p='username' q=[%s p='john456']]
    [p='joined' q=[%n p=~.1631440078]]
  }
]
```

Let's also see how that `$json` would look as real JSON encoded in text. We can do that with `+en-json:html`:

```
> (crip (en-json:html (to-js:user-lib usr)))
'{"joined":1631440078,"username":"john456","name":["John","William","Smith"],"email":"john.smith@example.com"}'
```

Finally, let's try converting the `$json` back to a `$user` again with our `+from-js` arm:

```
> (from-js:user-lib usr-json)
[ username='john456'
  name=[first='John' mid='William' last='Smith']
  joined=~2021.9.12..09.47.58
  email='john.smith@example.com'
]
```

### Analysis

#### Converting to `$json`

Here's our arm that converts a `$user` structure to `$json`:

```hoon
++  to-js
  |=  usr=user
  |^  ^-  json
  :-  %o
  %-  malt
  %-  limo
  :~
    ['username' s+username.usr]
    ['name' name]
    ['joined' (sect:enjs:format joined.usr)]
    ['email' s+email.usr]
  ==
  ++  name
    :-  %a
    :~
      [%s first.name.usr]
      [%s mid.name.usr]
      [%s last.name.usr]
    ==
  --
```

There are different ways we could represent our `$user` structure as JSON, but in this case we've opted to encapsulate it in an object and have the `name` as an array (since JSON arrays preserve order).

Since an object is represented as a `[%o p=(map @t json)]`, we can use `malt` to convert a `list` of key-value pairs to a `(map @t json)`.

For the `joined` field, we've used the [+sect](/docs/hoon/reference/zuse/2d_1-5#sectenjsformat) function from [+enjs:format](/docs/hoon/reference/zuse/2d_1-5#enjsformat) to convert the `@da` to a Unix seconds timestamp in a `$json` number. The `+sect` function, like others in `+enjs`, takes in a noun (in this case a `@da`) and produces `$json` (in this case a `[%n @ta]` number). `+enjs` contains a handful of useful functions like this, but for the rest we've just hand-made the `$json` structure. This is fairly typical when encoding `$json`, it's usually [decoding](#converting-from-json) that makes more extensive use of the `$json` utility functions in `+format`.

For the `name` field we've just formed a cell of `%a` and a list of `$json` strings, since a `$json` array is `[%a p=(list json)]`. Note we've separated this part into its own arm and wrapped the whole thing in a `|^` - a core with a `$` arm that's computed immediately. This is simply for readability - our structure here is quite simple but when dealing with deeply-nested `$json` structures or complex logic, having a single giant function can quickly become unwieldy.

#### Converting from `$json`

Here's our arm that converts `$json` to our `$user` structure:

```hoon
++  from-js
  =,  dejs:format
  |=  jon=json
  ^-  user
  %.  jon
  %-  ot
  :~
    [%username so]
    [%name (at ~[so so so])]
    [%joined du]
    [%email so]
  ==
```

This is the inverse of the [encoding](#converting-to-json) function described in the previous section.

We make extensive use of [+dejs:format](/docs/hoon/reference/zuse/2d_6) functions here, so we've used `=,` to expose the namespace and allow succinct `+dejs` function calls.

We use the [+ot](/docs/hoon/reference/zuse/2d_6#otdejsformat) function from `+dejs:format` to decode the `$json` object to a n-tuple. It's a wet gate that takes a list of pairs of keys and other `+dejs` functions and produces a new gate that takes the `$json` to be decoded (which we've given it in `jon`).

The [+so](/docs/hoon/reference/zuse/2d_6#sodejsformat) functions just decode `$json` strings to `cord`s. The [+at](/docs/hoon/reference/zuse/2d_6#atdejsformat) function converts a `$json` array to a tuple, decoding each element with the respective function given in its argument list. Like `+ot`, `+at` is also a wet gate that produces a gate that takes `$json`. In our case we've used `+so` for each element, since they're all strings.

For `joined`, we've used the [+du](/docs/hoon/reference/zuse/2d_6#dudejsformat) function, which converts a Unix seconds timestamp in a `$json` number to a `@da` (it's basically the inverse of the `+sect:enjs:format` we used earlier).

There are dozens of different functions in [+dejs:format](/docs/hoon/reference/zuse/2d_6) that will cover a great many use cases. If there isn't a `+dejs` function for a particular case, one can also just write a custom function - it just has to take `$json`. Note there's also the [+dejs-soft:format](/docs/hoon/reference/zuse/2d_7) functions - these are similar to `+dejs` functions except they produce `unit`s rather than simply crashing if decoding fails.

## `mark` file example

Here's a simple `mark` file for the `$user` structure we created in the [previous section](#json-encoding-and-decoding-example). It imports the [json-test.hoon](#json-testhoon) library we created and saved in our `%home` desk's `/lib` directory.

#### `user.hoon`

```hoon
/+  *json-test
|_  usr=user
++  grab
  |%
  ++  noun  user
  ++  json  from-js
  --
++  grow
  |%
  ++  noun  usr
  ++  json  (to-js usr)
  --
++  grad  %noun
--
```

The [Marks section](/docs/arvo/clay/marks/marks) of the Clay documentation covers `mark` files comprehensively and is worth reading through if one wants to write a mark file.

In brief, a mark file contains a `door` with three arms. The door's sample type is the type of the data in question - in our case the `$user` structure. The `+grab` arm contains methods for converting _to_ our mark, and the `+grow` arm contains methods for converting _from_ our mark. The `+noun` arms are mandatory, and then we've added `+json` arms which respectively call the `+from-js` and `+to-js` functions from our `json-test.hoon` library. The final `+grad` arm defines various revision control functions, in our case we've delegated these to the `%noun` mark.

From this mark file, Clay can build mark conversion gates between the `%json` mark and our `%user` mark, allowing the conversion of `$json` data to a `$user` structure and vice versa.

### Try it out

First, we'll save the code above as `user.hoon` in the `/mar` directory our of `%home` desk:

```
> |commit %home
>=
+ /~zod/home/9/mar/user/hoon
```

Let's quickly create a `$json` object to work with:

```
> =jon (need (de-json:html '{"joined":1631440078,"username":"john456","name":["John","William","Smith"],"email":"john.smith@example.com"}'))
> jon
[ %o
    p
  { [p='email' q=[%s p='john.smith@example.com']]
    [p='name' q=[%a p=~[[%s p='John'] [%s p='William'] [%s p='Smith']]]]
    [p='username' q=[%s p='john456']]
    [p='joined' q=[%n p=~.1631440078]]
  }
]
```

We'll also build our library so we can use its types from the dojo:

```
> =user-lib -build-file %/lib/json-test/hoon
```

Now we can ask Clay to build a mark conversion gate from a `%json` mark to our `%user` mark. We'll use a scry with a `%f` `care` which produces a static mark conversion gate:

```
> =json-to-user .^($-(json user:user-lib) %cf /===/json/user)
```

Let's try convert our `$json` to a `$user` structure with our new mark conversion gate:

```
> =usr (json-to-user jon)
> usr
[ username='john456'
  name=[first='John' mid='William' last='Smith']
  joined=~2021.9.12..09.47.58
  email='john.smith@example.com'
]
```

Now let's try the other direction. We'll again scry Clay to build a static mark conversion gate, this time _from_ `%user` _to_ `%json` rather than the reverse:

```
> =user-to-json .^($-(user:user-lib json) %cf /===/user/json)
```

Let's test it out by giving it our `$user` data:

```
> (user-to-json usr)
[ %o
    p
  { [p='email' q=[%s p='john.smith@example.com']]
    [p='name' q=[%a p=~[[%s p='John'] [%s p='William'] [%s p='Smith']]]]
    [p='username' q=[%s p='john456']]
    [p='joined' q=[%n p=~.1631440078]]
  }
]
```

Finally, let's see how that looks as JSON encoded in text:

```
> (crip (en-json:html (user-to-json usr)))
'{"joined":1631440078,"username":"john456","name":["John","William","Smith"],"email":"john.smith@example.com"}'
```

Usually (though not in all cases) these mark conversions will be performed implicitly by Gall or Eyre and you'd not deal with the mark conversion gates directly, but it's still informative to see them work explicitly.

## Further reading

[The Zuse library reference](/docs/hoon/reference/zuse/table-of-contents) - This includes documentation of the JSON parsing, printing, encoding and decoding functions.

[The Marks section of the Clay documentation](/docs/arvo/clay/marks/marks) - Comprehensive documentation of `mark`s.

[The External API Reference section of the Eyre documentation](/docs/arvo/eyre/external-api-ref) - Details of the webserver vane Eyre's external API.

[The Iris documentation](/docs/arvo/iris/iris) - Details of the web client vane Iris, which may be used to fetch external JSON data among other things.
