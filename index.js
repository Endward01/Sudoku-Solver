const sudokuBoard = document.querySelector(".sudoku-board");
const sudokuBtn = document.querySelector(".sudoku-solve-btn");
const alert = document.querySelector(".alert");
document.querySelector(".alert-btn").addEventListener("click", () => {
  alert.setAttribute("data-active", "false");
});
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

const sliceArr = (elem) => {
  const res = [];
  for (let i = 0; i < elem.length; i += 9) {
    const chunk = elem.slice(i, i + 9);
    res.push(chunk);
  }
  return res;
};

const joinArr = (elem) => {
  let res = [];
  elem.forEach((elem, i) => {
    res = elem[i].join(elem[i]);
  });

  return res;
};

const sudokuArray = () => {
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
  if (answer.length === 9) {
    finaleAnswer = answer.flat(1);
  } else {
    alert.setAttribute("data-active", "true");
  }
  populateValues(finaleAnswer);
};

const populateValues = (answer) => {
  const inputs = document.querySelectorAll("input");
  if (answer) {
    inputs.forEach((inputs, i) => {
      inputs.value = answer[i];
    });
  }
};

sudokuBtn.addEventListener("click", sudokuArray);

const solve = (elem) => {
  if (solved(elem)) {
    return elem;
  } else {
    const possib = nextBoards(elem);
    const valid = keepOnlyValid(possib);
    return searchForSolution(valid);
  }
};

const searchForSolution = (elem) => {
  if (elem.length < 1) {
    return false;
  } else {
    let first = elem.shift();
    const tryPath = solve(first);
    if (tryPath != false) {
      return tryPath;
    } else {
      return searchForSolution(elem);
    }
  }
};

const solved = (elem) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (elem[i][j] == 0) {
        return false;
      }
    }
  }
  return true;
};

const nextBoards = (elem) => {
  let res = [];
  const firstEmpty = findEmptySquare(elem);
  if (firstEmpty != undefined) {
    const y = firstEmpty[0];
    const x = firstEmpty[1];
    for (let i = 1; i <= 9; i++) {
      let newElem = [...elem];
      let row = [...newElem[y]];
      row[x] = i;
      newElem[y] = row;
      res.push(newElem);
    }
  }
  return res;
};

const findEmptySquare = (elem) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (elem[i][j] == 0) {
        return [i, j];
      }
    }
  }
};

const keepOnlyValid = (elem) => {
  let res = [];
  elem.forEach((elem) => {
    if (validBoard(elem)) {
      res.push(elem);
    }
  });
  return res;
};

const validBoard = (elem) => {
  return rowGood(elem) && columnGood(elem) && boxesGood(elem);
};

const rowGood = (elem) => {
  for (let i = 0; i < 9; i++) {
    let cur = [];
    for (let j = 0; j < 9; j++) {
      if (cur.includes(elem[i][j])) {
        return false;
      } else if (elem[i][j] != 0) {
        cur.push(elem[i][j]);
      }
    }
  }
  return true;
};

const columnGood = (elem) => {
  for (let i = 0; i < 9; i++) {
    let cur = [];
    for (let j = 0; j < 9; j++) {
      if (cur.includes(elem[j][i])) {
        return false;
      } else if (elem[j][i] != 0) {
        cur.push(elem[j][i]);
      }
    }
  }
  return true;
};

const boxesGood = (elem) => {
  const boxCoord = [
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
        let cord = [...boxCoord[i]];
        cord[0] += y;
        cord[1] += x;
        if (cur.includes(elem[cord[0]][cord[1]])) {
          return false;
        } else if (elem[cord[0]][cord[1]] != 0) {
          cur.push(elem[cord[0]][cord[1]]);
        }
      }
    }
  }
  return true;
};
