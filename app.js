// app.js

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let board = Array(9).fill(null);

const checkWinner = () => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return board.every(cell => cell) ? 'Tie' : null;
};

const handleClick = (e) => {
  const index = e.target.dataset.index;

  if (!board[index] && !checkWinner()) {
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
      if (winner === 'Tie') {
        message.textContent = 'Empate!';
      } else {
        message.textContent = `${winner} ganhou!`;
      }
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
};

const resetGame = () => {
  board.fill(null);
  cells.forEach(cell => cell.textContent = '');
  message.textContent = '';
  currentPlayer = 'X';
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
