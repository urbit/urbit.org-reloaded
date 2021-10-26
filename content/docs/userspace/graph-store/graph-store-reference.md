+++
title = "Graph Store - Reference"
weight = 3
template = "doc.html"
+++

## Data types

`graphs` is a map of `resource` to `marked-graph`

`resource` is a pair of ship and term which is where the graph is hosted and the name of the resource. Every graph is it's own resource.

`marked-graph` is a pair of `graph` and `(unit mark)`. The semantics of a graph are defined by the mark. This is just for validating the structure of the graph.

`graph` is a `mop`, a mold builder for order map, of an atom and a `node`.

`node` is a pair of `post` and `children`.

`post` is defined in `sur/post`. It contains:

```hoon
+$  post
  $:  author=ship
      =index
      time-sent=time
      contents=(list content)
      hash=(unit hash)
      =signatures
  ==
```

## Pokes

Graph Store can be poked with a `graph-update`, which can:

- add and remove a graph

`[%add-graph =resource =graph mark=(unit mark) overwrite=?]`

`[%remove-graph =resource]`

- add and remove a node to a graph

`[%add-nodes =resource nodes=(map index node)]`

`[%remove-posts =resource indices=(set index)]`

- add and remove signatures

`[%add-signatures =uid =signatures]`

`[%remove-signatures =uid =signatures]`

- add and remove tags

`[%add-tag =term =uid]`

`[%remove-tag =term =uid]`

- archive and unarchive a graph

`[%archive-graph =resource]`

`[%unarchive-graph =resource]`

- manually process an update log on a resource
  `[%run-updates =resource =update-log]`

## Scries

What follows is a summary of the scrys available in graph-store

<!-- enhancement: add examples -->

- Fetch keys
  `/x/keys`

- Fetch tag queries
  `/x/tag-queries`

- Fetch tags
  `/x/tag-queries/tags`

- Archive a specific graph by resource
  `/x/archive/[ship]/[name]`

- Fetch the update log by resource
  `/x/update-log/[ship]/[name]`

- Fetch the latest entry in the update log by resource
  `/x/update-log/[ship]/[name]/latest`

- Fetch a subset of the update log
  `/x/update-log/[ship]/[name]/subset/[start]/[end]`

- Fetch a specific graph by resource
  `/x/graph/[ship]/[name]`

- Request the mark of a graph
  `/x/graph/[ship]/[name]/mark`

- Request a subset of the graph
  `/x/graph/[ship]/[name]/subset/[mode]/[start]/[end]`

- Check if node exists
  `/x/graph/[ship]/[name]/node/exists/[index+]`

- Request a node
  `/x/graph/[ship]/[name]/node/index/[mode]/[index+]`

- Request a node's children
  `/x/graph/[ship]/[name]/node/children/[mode]/[start]/[end]/[index+]`

- Request a node's siblings
  `/x/graph/[ship]/[name]/node/siblings/[direction]/[mode]/[count]/[index+]`

- Request a node's firstborn child
  `/x/graph/[ship]/[name]/node/firstborn/[index+]`

- Request nodes, depth first
  `/x/graph/[ship]/[name]/node/depth-first/[count]/[start]`

## Agent State
