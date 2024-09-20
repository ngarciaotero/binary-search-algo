# Binary Search Tree Algo

This project implements a binary search tree (BST) in JavaScript. Offering a set of operations for tree manipulation and traversal.

## Features

- **Insert**: add a new value to the tree
- **Delete**: remove a value from the tree
- **Find**: locate a node by its value
- **Traversals**:
  - **Level Order**: breadth-first traversal with a callback function
  - **In-order**: depth-first traversal (left, root, right) with a callback function
  - **Pre-order**: depth-first traversal (root, left, right) with a callback function
  - **Post-order**: depth-first traversal (left, right, root) with a callback function
- **Height Calculations**: determine the height of any node
- **Depth Calculations**: find the depth of any node relative to the root
- **Balance Check**: verify if the tree is balanced
- **Rebalancing**: rebalance the tree if it becomes unbalanced

## Getting Started

### Prerequisites

To use, you need to have Node.js installed

### Usage

1. Import the necessary modules in your project:

```bash
import {tree} from './src/tree.js'
```

2. Create a new binary search tree by providing an array of values:

```bash
const bst = tree([3, 1, 4, 2, 5]);
```

3. Perform operations on the tree:

- **Insert a value**:

```bash
bst.insert(6);
```

- **Delete a value**:

```bash
bst.deleteItem(4);
```

- **Find a node**:

```bash
const foundNode = bst.find(2);
```

- **Level-order traversal**:

```bash
bst.levelOrder(node => console.log(nod.data));
```

- **Check if tree is balanced**:

```bash
console.log(bst.isBalanced());
```

- **Rebalance tree**:

```bash
bst.rebalance();
```

### Methods

- **insert(value)**: inserts a new value into the tree
- **deleteItem(value)**: deletes a node with the specified value
- **find(value)**: returns the node with the given value, or null if not found
- **levelOrder(callback)**: traverses the tree in breadth-first order and calls the provided callback function on each node
- **inOrder(callback)**: traverses the tree in in-order (left, root, right) and calls the provided callback
- **preOrder(callback)**: traverses the tree in pre-order (root, left, right) and calls the provided callback
- **postOrder(callback)**: traverses the tree in post-order (left, right, root) and calls the provided callback
- **height(node)**: returns the height of the specified node
- **depth(node)**: returns the depth of the specified node
- **isBalanced()**: checks whether the tree is balanced
- **rebalance()**: rebalances the tree if necessary
