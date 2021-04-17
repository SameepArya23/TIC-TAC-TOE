const playBtn = document.querySelector(".play-btn");
const gameBoard = document.querySelector(".game-board");
const sound1 = document.querySelector(".sound1");
const sound2 = document.querySelector(".sound2");

playBtn.addEventListener("click", () => {
  playBtn.classList.add("press");
  gameBoard.classList.add("visible");
});

const X_CLASS = "x";
const O_CLASS = "o";
const win_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessage = document.getElementById("winningMessage");
const restartBtn = document.getElementById("restartBtn");
const winMessageTxt = document.querySelector("[data-winning-message-txt]");
let circleTurn;

startGame();

restartBtn.addEventListener("click", () => {
  gameBoard.classList.add("visible");
  startGame();
});

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessage.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? O_CLASS : X_CLASS;
  sound1.play();
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (circleTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return win_combinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  if (draw) {
    winMessageTxt.innerText = `draw!`;
  } else {
    winMessageTxt.innerText = `${circleTurn ? "o" : "x"} wins!`;
  }
  winningMessage.classList.add("show");
  gameBoard.classList.remove("visible");
  sound2.play();
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}
