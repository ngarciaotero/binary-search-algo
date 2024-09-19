import { node } from "./node.js";

export function tree(array) {
  let root = setInitialRoot(array);

  function buildTree(arr) {
    const start = 0;
    const end = arr.length - 1;
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const rootNode = node(arr[mid]);

    rootNode.left = buildTree(arr.slice(start, mid));
    rootNode.right = buildTree(arr.slice(mid + 1, end + 1));

    return rootNode;
  }

  function sortArray(arr) {
    if (arr.length === 1 || arr.length === 0) return arr;

    const mid = Math.floor(arr.length / 2);
    const leftArr = sortArray(arr.slice(0, mid));
    const rightArr = sortArray(arr.slice(mid, arr.length));

    let sortedArr = [];
    let leftPointer = 0;
    let rightPointer = 0;

    while (leftPointer < leftArr.length && rightPointer < rightArr.length) {
      if (leftArr[leftPointer] <= rightArr[rightPointer]) {
        sortedArr.push(leftArr[leftPointer]);
        leftPointer++;
      } else {
        sortedArr.push(rightArr[rightPointer]);
        rightPointer++;
      }
    }

    if (rightPointer < rightArr.length) {
      sortedArr = sortedArr.concat(rightArr.slice(rightPointer));
    }
    if (leftPointer < leftArr.length) {
      sortedArr = sortedArr.concat(leftArr.slice(leftPointer));
    }

    return sortedArr;
  }

  function removeDuplicates(arr) {
    if (arr.length <= 1) return arr;

    let leftPointer = 0;

    for (let rightPointer = 1; rightPointer < arr.length; rightPointer++) {
      if (arr[leftPointer] !== arr[rightPointer]) {
        leftPointer++;
        arr[leftPointer] = arr[rightPointer];
      }
    }

    return arr.slice(0, leftPointer + 1);
  }

  function setInitialRoot(arr) {
    const sortedArr = sortArray(arr);
    const uniqueArr = removeDuplicates(sortedArr);
    return buildTree(uniqueArr);
  }

  function insert(value) {
    if (root === null) {
      root = node(value);
      return true;
    }

    let previous = null;
    let current = root;
    while (current !== null) {
      previous = current;
      if (current.data > value) {
        current = current.left;
      } else if (current.data < value) {
        current = current.right;
      } else {
        return false;
      }
    }

    if (previous.data > value) {
      previous.left = node(value);
    } else if (previous.data < value) {
      current.right = node(value);
    }
    return true;
  }

  function deleteItem(value) {
    const { parent, current } = findWithParent(value);

    // case 1: node does not exist
    if (current === null) {
      return false;
    }

    // case 2: node to be removed is leaf node or has 1 child
    if (current.left === null || current.right === null) {
      const child = current.left || current.right;
      if (parent === null) {
        root = child;
      } else if (parent.left === current) {
        parent.left = child;
      } else {
        parent.right = child;
      }
      // case 3: node to be removed has 2 child
    } else {
      // let successorParent = current;
      let successorParent = null;
      let successor = current.right;

      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }

      if (successorParent !== null) {
        successorParent.left = successor.right;
      } else {
        current.right = successor.right;
      }

      current.data = successor.data;
    }
    return true;
  }

  function findWithParent(value) {
    let parent = null;
    let current = root;

    while (current !== null) {
      if (current.data === value) {
        return { parent, current };
      }

      parent = current;
      current = value < current.data ? current.left : current.right;
    }
    return { parent: null, current: null };
  }

  function find(value) {
    let current = root;

    while (current !== null) {
      if (current.data === value) {
        return current;
      }
      current = value < current.data ? current.left : current.right;
    }

    return null;
  }

  function levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("No valid callback function provided");
    }

    let queue = [root];
    while (queue.length > 0) {
      let current = queue.shift();
      callback(current);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  function inOrder(callback, current = root) {
    if (typeof callback !== "function") {
      throw new Error("No valid callback function provided");
    }

    if (current === null) {
      return;
    }

    inOrder(callback, current.left);
    callback(current);
    inOrder(callback, current.right);
  }

  function preOrder(callback, current = root) {
    if (typeof callback !== "function") {
      throw new Error("No valid callback function provided");
    }

    if (current === null) {
      return;
    }

    callback(current);
    preOrder(callback, current.left);
    preOrder(callback, current.right);
  }

  function postOrder(callback, current = root) {
    if (typeof callback !== "function") {
      throw new Error("No valid callback function provided");
    }

    if (current === null) {
      return;
    }

    postOrder(callback, current.left);
    postOrder(callback, current.right);
    callback(current);
  }

  function logNode(node) {
    console.log(node.data);
  }

  return {
    get root() {
      return root;
    },
    insert,
    find,
    deleteItem,
    logNode,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
  };
}
