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

  return { root };
}
