+++
title = "Sail (HTML)"
weight = 6
template = "doc.html"
+++

Sail is a domain-specific language for composing HTML structures in Hoon.
Front-ends for Urbit apps are often created and uploaded separately to the rest
of the code in the desk. Sail provides an alternative approach, where front-ends
can be composed directly inside agents.

This document will walk through the basics of Sail and its syntax.

## Basic example

It’s easy to see how Sail can directly translate to HTML:

#### Sail code

```hoon
;html
  ;head
    ;title: My page
    ;meta(charset "utf-8");
  ==
  ;body
    ;h1: Welcome!
    ;p
      ; Hello, world!
      ; Welcome to my page.
      ; Here is an image:
      ;br;
      ;img@"https://media.urbit.org/docs/userspace/dist/wut.svg";
    ==
  ==
==
```

#### HTML code

```html
&lt;html> &lt;head> &lt;title>My page&lt;/title> &lt;meta charset="utf-8" />
&lt;/head> &lt;body> &lt;h1>Welcome!&lt;/h1> &lt;p> Hello, world! Welcome to my
page. Here is an image: &lt;br /> &lt;img
src="https://media.urbit.org/docs/userspace/dist/wut.svg" /> &lt;/p> &lt;/body>
&lt;/html>
```

## Tags and Closing

In Sail, tag heads are written with the tag name prepended by `;`. Unlike in
HTML, there are different ways of closing tags, depending on the needs of the
tag. One of the nice things about Hoon is that you don’t have to be constantly
closing expressions; Sail inherits this convenience.

### Empty

Empty tags are closed with a `;` following the tag. For example, `;div;` will be
rendered as `&lt;div>&lt;/div>`. Non-container tags `;br;` and `;img@"some-url";` in
particular will be rendered as a single tag like `&lt;br />` and `&lt;img src="some-url" />`.

### Filled

Filled tags are closed via line-break. To fill text inside, add `:` after the
tag name, then insert your plain text following a space. Example:

```hoon
;h1: The title
```

Produces:

```html
&lt;h1>The title&lt;/h1>
```

### Nested

To nest tags, simply create a new line. Nested tags need to be closed with `==`,
because they expect a list of sub-tags. If we nest lines of plain text with no
tag, the text will be wrapped in a `&lt;p>` tag.

Example:

```hoon
;body
  ;h1: Blog title
  This is some good content.
==
```

Produces:

```html
&lt;body> &lt;h1>Blog title&lt;/h1> &lt;p>This is some good content.&lt;/p>
&lt;/body>
```

If we want to write a string with no tag at all, then we can prepend
those untagged lines with `;` and then a space:

```hoon
;body
  ;h1: Welcome!
  ; Hello, world!
  ; We’re on the web.
==
```

Produces:

```html
&lt;body> &lt;h1>Welcome!&lt;/h1> Hello, world. We’re on the web. &lt;/body>
```

## Attributes

Adding attributes is simple: just add the desired attribute between parentheses,
right after the tag name without a space. We separate different attributes of
the same node by using `,`.

Attributes can also be specified in tall form, with each key prefixed by `=`,
followed by two spaces, and then a tape with its value. These two styles are
shown below.

### Generic

Wide-form attributes:

```hoon
;div(title "a tooltip", style "color:red")
  ;h1: Foo
  foo bar baz
==
```

Tall-form attributes:

```hoon
;div
  =title  "a tooltip"
  =style  "color:red"
  ;h1: Foo
  foo bar baz
==
```

Produces:

```html
&lt;div title="a tooltip" style="color:red"> &lt;h1>Foo&lt;/h1> &lt;p>foo bar
baz &lt;/p> &lt;/div>
```

### IDs

Add `#` after tag name to add an ID:

```hoon
;nav#header: Menu
```

Produces:

```html
&lt;nav id="header">Menu&lt;/nav>
```

### Classes

Add `.` after tag name to add a class:

```hoon
;h1.text-blue: Title
```

Produces:

```html
&lt;h1 class="text-blue">Title&lt;/h1>
```

If you want a class name that contains a space, you will need to use use the
syntax of a generic attribute:

```hoon
;div(class "logo inverse");
```

Produces:

```html
&lt;div class="logo inverse">&lt;/div>
```

### Images

Add `@` after the tag name to link your source:

```hoon
;img@"example.png";
```

Produces:

```html
&lt;img src="example.png"/>
```

To add attributes to the image, like size specifications, add the desired
attribute after the `"` of the image name and before the final `;` of the `img`
tag:

```hoon
;img@"example.png"(width "100%");
```

### Links

Add `/` after tag name to start an `href`.

```hoon
;a/"urbit.org": A link to Urbit.org
```

Produces:

```html
&lt;a href="urbit.org">A link to Urbit.org&lt;/a>
```

## Interpolation

The textual content of tags, despite not being enclosed in double-quotes, are
actually tapes. This means they support interpolated Hoon expressions in the
usual manner. For example:

```hoon
=|  =time
;p: foo {<time>} bar
```

Produces:

```html
&lt;p>foo ~2000.1.1 baz&lt;/p>
```

Likewise:

```hoon
=/  txt=tape  " bananas"
;article
  ;b: {(a-co:co (mul 42 789))}
  ; {txt}
  {<our>} {<now>} {<`@ux`(end 6 eny)>}
==
```

Produces:

```html
&lt;article> &lt;b>33138&lt;/b> bananas &lt;p>~zod ~2022.2.21..09.54.21..5b63
0x9827.99c7.06f4.8ef9 &lt;/p> &lt;/article>
```

## A note on CSS

The CSS for a page is usually quite large. The typical approach is to include a
separate arm in your agent (`++style` or the like) and write out the CSS in a
fenced cord block. You can then call `++trip` on it and include it in a style
tag. For example:

```hoon
++  style
  ^~
  %-  trip
  '''
  main {
    width: 100%;
    color: red;
  }
  header {
    color: blue;
    font-family: monospace;
  }
  '''
```

And then your style tag might look like:

```hoon
;style: {style}
```

A cord is used rather than a tape so you don't need to escape double-quotes. The
[ketsig](/docs/hoon/reference/rune/ket#-ketsig) (`^~`) rune means `++trip` will
be run at compile time rather than call time.

## Types and marks

So far we've shown rendered HTML for demonstrative purposes, but Sail syntax
doesn't directly produce HTML text. Instead, it produces a
[$manx](/docs/hoon/reference/stdlib/5e#manx). This is a Hoon type used to
represent an XML hierarchical structure with a single root node. There are six
XML-related types defined in the standard library:

```hoon
+$  mane  $@(@tas [@tas @tas])                    ::  XML name+space
+$  manx  $~([[%$ ~] ~] [g=marx c=marl])          ::  dynamic XML node
+$  marl  (list manx)                             ::  XML node list
+$  mars  [t=[n=%$ a=[i=[n=%$ v=tape] t=~]] c=~]  ::  XML cdata
+$  mart  (list [n=mane v=tape])                  ::  XML attributes
+$  marx  $~([%$ ~] [n=mane a=mart])              ::  dynamic XML tag
```

More information about these can be found in [section 5e of the standard library
reference](/docs/hoon/reference/stdlib/5e).

You don't need to understand these types in order to write Sail. The main thing
to note is that a `$manx` is a node (a single tag) and its contents is a
[$marl](/docs/hoon/reference/stdlib/5e#marl), which is just a `(list manx)`.

### Rendering

A `$manx` can be rendered as HTML in a tape with the `++en-xml:html` function in
`zuse.hoon`. For example:

```
> ;p: foobar
[[%p ~] [[%$ [%$ "foobar"] ~] ~] ~]

> =x ;p: foobar

> (en-xml:html x)
"<p>foobar</p>"

> (crip (en-xml:html x))
'<p>foobar</p>'
```

You may wish to do this in your agent directly, but you can also leave mark
conversion to Eyre.

### Sanitization

The `++en-xml:html` function will sanitize the contents of both attributes and
elements, converting characters such as `>` to HTML entities. For example:

```
> =z ;p(class "\"><script src=\"example.com/xxx.js"): <h1>FOO</h1>

> (crip (en-xml:html z))
'<p class="&quot;&gt;&lt;script src=&quot;example.com/xxx.js">&lt;h1&gt;FOO&lt;/h1&gt;</p>'
```

### Marks

The mark for a raw `$manx` is a `%hymn`. This mark is included in the `%base`
desk. The mark for a rendered HTML cord is `%html`. The `%hymn` mark includes
conversion methods to both `%html` and `%mime`. The `%html` mark includes
conversion methods to `%mime` and `%hymn`.

If you want to produce an HTML document through Eyre's scry interface, for
example, you can either produce a `$manx` with a `%hymn` mark and let Eyre
convert it to `%html`, or else you can call `++en-xml:html` and then `++crip` on
the product of your Sail expressions and produce a cord with an `%html` mark
directly.

## Sail Runes

In addition to the syntax so far described, there are also a few Sail-specific
runes:

### `;+` Miclus

The [miclus rune](/docs/hoon/reference/rune/mic#-miclus) makes a `$marl` from a
complex hoon expression that produces a single `$manx`. Its main use is nesting
tall-form hoon logic in another Sail element. For example:

```hoon
;p
  ;b: {(a-co:co number)}
  ; is an
  ;+  ?:  =(0 (mod number 2))
        ;b: even
      ;b: odd
  ; number.
==
```

Produces one of these depending on the value of `number`:

```html
&lt;p> &lt;b>2 &lt;/b>is an &lt;b>even &lt;/b>number. &lt;/p>
```

```html
&lt;p> &lt;b>12345 &lt;/b>is an &lt;b>odd &lt;/b>number. &lt;/p>
```

### `;/` Micfas

The [micfas rune](/docs/hoon/reference/rune/mic#-micfas) turns an ordinary tape
into a `$manx`. For example:

```
> %-  en-xml:html  ;/  "foobar"
"foobar"
```

In order to nest it inside another Sail element, it must be preceeded with a
`;+` rune or similar, it cannot be used directly. For example:

```hoon
;p
  ;+  ;/  "foobar"
==
```

The argument for Micfas needn't directly be a tape, it may also be a hoon
expression that produces a tape.

### `;*` Mictar

The [mictar rune](/docs/hoon/reference/rune/mic#-mictar) makes a `$marl` (a list
of XML nodes) from a complex hoon expression. This rune lets you add many
elements inside another Sail element. For example:

```hoon
=/  nums=(list @ud)  (gulf 1 9)
;p
  ;*  %+  turn  nums
      |=  n=@ud
      ?:  =(0 (mod n 2))
        ;sup: {(a-co:co n)}
      ;sub: {(a-co:co n)}
==
```

Produces:

```html
&lt;p> &lt;sub>1&lt;/sub>&lt;sup>2&lt;/sup>&lt;sub>3&lt;/sub>
&lt;sup>4&lt;/sup>&lt;sub>5&lt;/sub>&lt;sup>6&lt;/sup>
&lt;sub>7&lt;/sub>&lt;sup>8&lt;/sup>&lt;sub>9&lt;/sub> &lt;/p>
```

### `;=` Mictis

The [mictis rune](/docs/hoon/reference/rune/mic#-mictis) makes a `$marl` (a list
of XML nodes) from a series of `$manx`es. This is mostly useful if you want to
make the list outside of an element and then be able to insert it afterwards.
For example:

```hoon
=/  paras=marl
  ;=  ;p: This is the first node.
      ;p: This is the second.
      ;p: Here is the last one.
  ==
;main
  ;*  paras
==
```

Produces:

```html
&lt;main> &lt;p>This is the first node.&lt;/p> &lt;p>This is the second.&lt;/p>
&lt;p>Here is the last one.&lt;/p> &lt;/main>
```
