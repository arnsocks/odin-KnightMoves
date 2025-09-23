function knightMoves(start, end) {
  // Takes a start and an end vertex
  // returns the shortest knight-move path between them as a list of intermediate vertices
  if (start == end) {
    console.log("Congratulations, you're already there! No moves needed.");
  }

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

  let maxMoves = 10;
  let j = 0;
  while (queue.length > 0 && j < maxMoves) {
    console.log(`Queue: ${queue}`);
    let current = queue.shift();
    visited.push([current]);

    let newMoves = [];

    // add any possible next moves to the queue
    for (let i = 0; i < moves.length; i++) {
      let next = [current[0] + moves[i][0], current[1] + moves[i][1]];
      if (next[0] < 0 || next[0] > 7 || next[1] < 0 || next[1] > 7) {
        continue;
      } else if (visited.includes(next)) {
        console.log(`Next (${next} was already visited and is excluded)`);
        continue;
      } else if (next == end) {
        console.log("We got to the end");
        return;
      } else {
        newMoves.push(next);
        queue.push(next);
      }
    }
    console.log(`Current: ${current}`);
    console.log(`visited: ${visited}`);
    console.log(newMoves);
    j++;
  }
}

knightMoves([0, 0], [7, 7]);
