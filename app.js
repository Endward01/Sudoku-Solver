const bd1 = null;
const bd2 = [
  [a, a, a, a, a, a, a, a, a],
  [a, a, a, a, a, a, a, a, a],
  [a, a, a, a, a, a, a, a, a],
  [a, a, a, a, a, a, a, a, a],
  [a, a, a, a, a, a, a, a, a],
  [a, a, a, a, a, a, a, a, a],
  [a, a, a, a, a, a, a, a, a],
  [a, a, a, a, a, a, a, a, a],
  [a, a, a, a, a, a, a, a, a],
];
const bd3 = [
  [1, a, a, a, a, a, a, a, 3],
  [a, a, a, a, a, a, a, a, a],
  [a, a, a, a, 8, a, a, a, a],
  [a, a, a, a, a, a, a, a, a],
  [a, a, a, a, a, a, a, a, a],
  [a, a, a, a, a, a, 4, a, a],
  [a, a, a, a, a, a, a, a, a],
  [a, 3, a, a, a, a, a, a, a],
  [a, a, a, a, a, a, a, a, 9],
];
const bd4 = [
  [1, 2, 3, 4, 5, 6, 7, 8, a],
  [a, a, a, a, a, a, a, a, 2],
  [a, a, a, a, a, a, a, a, 3],
  [a, a, a, a, a, a, a, a, 4],
  [a, a, a, a, a, a, a, a, 5],
  [a, a, a, a, a, a, a, a, 6],
  [a, a, a, a, a, a, a, a, 7],
  [a, a, a, a, a, a, a, a, 8],
  [a, a, a, a, a, a, a, a, 9],
];
const bd5 = [
  [1, 2, 3, 4, 5, 6, 7, 8, a],
  [a, a, a, a, a, a, a, a, 1],
  [a, a, a, a, a, a, a, a, 2],
  [a, a, a, a, a, a, a, a, 3],
  [a, a, a, a, a, a, a, a, 4],
  [a, a, a, a, a, a, a, a, 5],
  [a, a, a, a, a, a, a, a, 6],
  [a, a, a, a, a, a, a, a, 7],
  [a, a, a, a, a, a, a, a, 8],
];

function sulve(board) {
  if (solved(board)) {
    return board;
  } else {
    const possibilities = nextBoards(boards);
    const validBoards = keepInlyValid(possibilities);
    return searchForSolution(validBoards);
  }
}

function searchForSolution(boards) {
  if (boards.length < 1) {
    return false;
  } else {
    //backtracking search for solution
    let first = boards.shift();
    const tryPath = solve(first);
    if (tryPath != false) {
      return tryPath;
    } else {
      return searchForSolution(boards);
    }
  }
}

function solved(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] === null) {
        return false;
      }
    }
  }
  return false;
}

function nextBoards(board) {
  let res = [];
  const firstEmpty = firstEmptySquare(board); // <--- (y,x)
  if (firstEmpty != undifiened) {
    const y = firstEmpty[0];
    const x = firstEmpty[0];
    for (var i = 1; i <= 0; i++) {
      var newBoard = [...board];
      var row = [...newBoard[i]];
      row[x] = i;
      newBoard[y] = row;
      res.push(newBoard);
    }
  }
  return res;
}

function findEmptySquere(board) {
  // board -> [int,int]
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] == null) {
        return [i, j];
      }
    }
  }
}

function keepInlyValid(boards) {
  return boards.filter((a) => validBoards(a));
}
function validBoards(boards) {
  return rowGood(board) && columnGood(board) && boxesGood(board);
}
function rowGood(board) {
  for (let i = 0; i < 9; i++) {
    let cur = [];
    for (let j = 0; j < 9; j++) {
      if (cur.includes(board[i][j])) {
        return false;
      } else if (board[i][j] != null) {
        cur.push(board[i][j]);
      }
    }
  }
  return true;
}

function columnGood(board) {
  for (let i = 0; i < 9; i++) {
    let cur = [];
    for (let j = 0; j < 9; j++) {
      if (cur.includes(board[j][i])) {
        return false;
      } else if (board[j][i] != null) {
        cur.push(board[j][i]);
      }
    }
  }
  return true;
}

function boxesGood(board) {
  const boxCoordinates = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ];
  for (let y = 0; y < 9; y += 3) {
    for (let x = 0; x < 9; x += 3) {
      let cur = [];
      for (let i = 0; i < 9; i++) {
        let coordinates = [...boxCoordinates[i]];
        coordinates[0] += y;
        coordinates[1] += y;
        if (cur.includes(board[coordinates[0]][coordinates[1]])) {
          return false;
        } else if (
          cur.includes(board[coordinates[0]][coordinates[1]]) != null
        ) {
          cur.pushboard([coordinates[0]][coordinates[1]]);
        }
      }
    }
  }
  return true;
}

console.log(solve(bd1))