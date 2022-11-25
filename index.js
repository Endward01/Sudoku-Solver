const sudokuBoard = document.querySelector(".sudoku-board");
const sudokuBtn = document.querySelector(".sudoku-solve-btn");
const squers = 81;
let finaleAnswer = [];

for (let i = 0; i < squers; i++) {
  const inputElement = document.createElement("input");
  inputElement.classList.add("number-input");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("maxlength", "1");
  inputElement.setAttribute(
    "oninput",
    "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
  );
  sudokuBoard.appendChild(inputElement);
  inputElement.addEventListener("keypress", (elem) => {
    if (!(elem.charCode > 48 && elem.charCode < 58)) {
      elem.preventDefault();
    }
  });
}

function sliceArr(elem) {
  const res = [];
  for (let i = 0; i < elem.length; i += 9) {
    const chunk = elem.slice(i, i + 9);
    res.push(chunk);
  }
  return res;
}
function joinArr(elem) {
  let res = [];
  for (let i = 0; i < elem.length; i++) {
    res = elem[i].join(elem[i]);
  }
  return res;
}

const sudokuArray = function () {
  const inputs = document.querySelectorAll(".number-input");
  const sudokuInput = [];
  inputs.forEach((elem) => {
    if (isNaN(elem.valueAsNumber)) {
      sudokuInput.push(0);
    } else {
      sudokuInput.push(elem.valueAsNumber);
    }
  });
  const slicedArr = sliceArr(sudokuInput);
  const answer = solve(slicedArr);
  finaleAnswer = answer.flat(1);
  populateValues(finaleAnswer);
};
const populateValues = function (answer) {
  const inputs = document.querySelectorAll("input");
  if (answer) {
    inputs.forEach(function (inputs, i) {
      inputs.value = answer[i];
    });
  }
};

sudokuBtn.addEventListener("click", sudokuArray);

const solve = (board) => {
  if (solved(board)) {
    return board;
  } else {
    const possibilities = nextBoards(board);
    const validBoards = keepOnlyValid(possibilities);
    return searchForSolution(validBoards);
  }
};

const searchForSolution = (boards) => {
  if (boards.length < 1) {
    return false;
  } else {
    let first = boards.shift();
    const tryPath = solve(first);
    if (tryPath != false) {
      return tryPath;
    } else {
      return searchForSolution(boards);
    }
  }
};

const solved = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == 0) {
        return false;
      }
    }
  }
  return true;
};

const nextBoards = (board) => {
  let res = [];
  const firstEmpty = findEmptySquare(board);
  if (firstEmpty != undefined) {
    const y = firstEmpty[0];
    const x = firstEmpty[1];
    for (let i = 1; i <= 9; i++) {
      let newBoard = [...board];
      let row = [...newBoard[y]];
      row[x] = i;
      newBoard[y] = row;
      res.push(newBoard);
    }
  }
  return res;
};

const findEmptySquare = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == 0) {
        return [i, j];
      }
    }
  }
};

const keepOnlyValid = (boards) => {
  var res = [];
  for (let i = 0; i < boards.length; i++) {
    if (validBoard(boards[i])) {
      res.push(boards[i]);
    }
  }
  return res;
};
const validBoard = (board) => {
  return rowGood(board) && columnGood(board) && boxesGood(board);
};

const rowGood = (board) => {
  for (let i = 0; i < 9; i++) {
    let cur = [];
    for (let j = 0; j < 9; j++) {
      if (cur.includes(board[i][j])) {
        return false;
      } else if (board[i][j] != 0) {
        cur.push(board[i][j]);
      }
    }
  }
  return true;
};

const columnGood = (board) => {
  for (let i = 0; i < 9; i++) {
    let cur = [];
    for (let j = 0; j < 9; j++) {
      if (cur.includes(board[j][i])) {
        return false;
      } else if (board[j][i] != 0) {
        cur.push(board[j][i]);
      }
    }
  }
  return true;
};

const boxesGood = (board) => {
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
        coordinates[1] += x;
        if (cur.includes(board[coordinates[0]][coordinates[1]])) {
          return false;
        } else if (board[coordinates[0]][coordinates[1]] != 0) {
          cur.push(board[coordinates[0]][coordinates[1]]);
        }
      }
    }
  }
  return true;
};
