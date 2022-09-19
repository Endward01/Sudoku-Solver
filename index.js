const sudokuBoard = document.querySelector("#sudoku-board");
const sudokuBtn = document.querySelector("#sudoku-solve-btn");
const sudokuInput = [];
const squers = 81;

// for (let i = 0; i < squers; i++) {
//   const inputElement = document.createElement("input");
//   // inputElement.setAttribute('id', 'input');
//   inputElement.setAttribute("maxlength", "1");
//   inputElement.setAttribute(
//     "oninput",
//     "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
//   );
//   inputElement.setAttribute("type", "number");
//   inputElement.setAttribute("min", "1");
//   inputElement.setAttribute("max", "9");

//   sudokuBoard.appendChild(inputElement);
// }

const sudokuArray = function () {
  const inputs = document.querySelectorAll("input");
  inputs.forEach(function (input) {
    if (input.value) {
      sudokuInput.push(input.valueAsNumber);
    } else {
      sudokuInput.push(0);
    }
  });
};

const populateValues = function (answer) {
  const inputs = document.querySelectorAll("input");
  if (answer) {
    inputs.forEach(function (inputs, i) {
      inputs.value = answer[i];
    });
  }
};
const solve = function () {
  sudokuArray();

  const options = {
    method: "POST",
    url: "https://sudoku-solver3.p.rapidapi.com/sudokusolver/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "e56f1ec189msh892d5ec47b9713fp125442jsn07548bf08b15",
      "X-RapidAPI-Host": "sudoku-solver3.p.rapidapi.com",
    },
    data: { input: sudokuInput },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response)
      populateValues(response.data.answer);
    })
    .catch(function (error) {
      console.error(error);
    });
};

sudokuBtn.addEventListener("click", solve);
