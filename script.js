let board = Array(9).fill(null); 
let currentPlayer = "X"; 
let gameMode = "2players"; 
let gameActive = true; 


function startGame(mode) {
  gameMode = mode;
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  createBoard();
}


function createBoard() {
  const boardDiv = document.getElementById("board");
  boardDiv.innerHTML = ""; 
  board.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.addEventListener("click", () => handleCellClick(index));
    boardDiv.appendChild(cell);
  });
}


function handleCellClick(index) {
  if (!gameActive || board[index]) return; 
  board[index] = currentPlayer; 
  document.querySelectorAll(".cell")[index].textContent = currentPlayer;

  if (checkWinner()) {
    document.getElementById("status").textContent = `${currentPlayer} játékos nyert!`;
    gameActive = false;
  } else if (board.every(cell => cell)) {
    document.getElementById("status").textContent = "A játék döntetlen!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (gameMode === "vsComputer" && currentPlayer === "O") computerMove();
  }
}


function computerMove() {
  const emptyCells = board.map((v, i) => (v === null ? i : null)).filter(v => v !== null);
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  handleCellClick(randomIndex);
}


function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]           
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === currentPlayer)
  );
}


function restartGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  gameActive = true;
  document.getElementById("status").textContent = "";
  createBoard();
}
