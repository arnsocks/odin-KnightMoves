class Node {
  constructor(loc, parent = null) {
    this.loc = loc;
    this.parent = parent;
  }
}

function knightMoves(start, end) {
  // Takes a start and an end vertex
  // returns the shortest knight-move path between them as a list of intermediate vertices

  // Convert start from a set of coordinates to a node with no parent
  start = new Node(start);

  const moves = [
    [+2, +1],
    [+2, -1],
    [+1, +2],
    [+1, -2],
    [-1, +2],
    [-1, -2],
    [-2, +1],
    [-2, -2],
  ];

  let visited = [];
  let queue = [start];

  // BFS means that the first time we visit the end node, that was the fastest path to that node.
  while (queue.length > 0) {
    let current = queue.shift();

    // Check to see if we are at the destination
    if (nodeEqual(current.loc, end)) {
      let path = reportPath(current);
      console.log(
        `You made it in ${path.length - 1} moves. Here is your path:`
      );
      console.log(path);
      return;
    }

    // add any possible next moves to the queue
    for (let i = 0; i < moves.length; i++) {
      let next = [current.loc[0] + moves[i][0], current.loc[1] + moves[i][1]];
      let inQueue = false;
      let inVisited = false;

      // Do not include moves that are out of bounds
      if (next[0] < 0 || next[0] > 7 || next[1] < 0 || next[1] > 7) {
        continue;
      }

      // Do not include moves that are to nodes already visited
      for (let k = 0; k < visited.length; k++) {
        if (nodeEqual(next, visited[k].loc)) {
          inVisited = true;
          break;
        }
      }

      // Do not include moves that are already in the queue
      for (let k = 0; k < queue.length; k++) {
        if (nodeEqual(next, queue[k].loc)) {
          inQueue = true;
          break;
        }
      }
      if (!inVisited && !inQueue) {
        let nextNode = new Node(next, current);
        queue.push(nextNode);
      }
    }
  }
}

// utility function for checking node location equality
function nodeEqual(arrA, arrB) {
  if (arrA[0] != arrB[0]) return false;
  if (arrA[1] != arrB[1]) return false;
  return true;
}

// recursive function to report the path from start to end
function reportPath(node) {
  if (node === null) return [];
  let path = reportPath(node.parent);
  path.push(node.loc);
  return path;
}

// ==================
// DRIVER CODE
// ==================
knightMoves([0, 0], [7, 7]);
