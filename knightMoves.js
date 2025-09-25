class Node {
  constructor(loc, parent = null) {
    this.loc = loc;
    this.parent = parent;
  }
}

function knightMoves(start, end) {
  // Takes a start and an end vertex
  // returns the shortest knight-move path between them as a list of intermediate vertices

  if (start == end) {
    console.log("Congratulations, you're already there! No moves needed.");
  }

  start = new Node(start);

  let moves = [
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

  let maxMoves = 20000;
  let j = 1;
  while (queue.length > 0 && j < maxMoves) {
    console.log("Move #: " + j);
    console.log("Queue: ");
    console.log(queue);
    let current = queue.shift();
    console.log("Current: ");
    console.log(current);
    visited.push(current);

    console.log("testing if current = end");
    if (nodeEqual(current.loc, end)) {
      console.log("WE HAVE A MATCH");
      console.log(reportPath(current));
      return;
    }
    console.log("No match");

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
        // console.log("testing if next has already been visited");
        // console.log(`Visited[k] = ${visited[k]}. Next = ${next}`);
        if (nodeEqual(next, visited[k].loc)) {
          console.log(`Next (${next}) was already visited and is excluded`);
          inVisited = true;
          break;
        }
      }

      // Do not include moves that are already in the queue
      for (let k = 0; k < queue.length; k++) {
        if (nodeEqual(next, queue[k].loc)) {
          console.log(
            `Next (${next}) was already in the queue and is excluded`
          );
          inQueue = true;
          break;
        }
      }
      if (!inVisited && !inQueue) {
        let nextNode = new Node(next, current);
        queue.push(nextNode);
      }
    }
    console.log("Current: ");
    console.log(current);
    console.log(`visited: ${visited}`);
    j++;
  }
}

knightMoves([0, 0], [7, 7]);

function nodeEqual(arrA, arrB) {
  if (arrA[0] != arrB[0]) return false;
  if (arrA[1] != arrB[1]) return false;
  return true;
}

function reportPath(node) {
  if (node === null) return [];
  let path = reportPath(node.parent);
  path.push(node.loc);
  return path;
}
