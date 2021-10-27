+++
title = "Graph Store - Reference"
weight = 5
template = "doc.html"
+++


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

The agent holds 
