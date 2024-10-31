// Game variables
const cells = Array.from(document.querySelectorAll('.cell'));
const gameStatus = document.getElementById('gameStatus');
const resetButton = document.getElementById('resetButton');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Event listener for each cell
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Event listener for reset button
resetButton.addEventListener('click', resetGame);

// Function to handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    // Check if the cell is already occupied or if game is inactive
    if (board[cellIndex] !== '' || !gameActive) return;

    // Update board data and UI
    board[cellIndex] = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');
    cell.textContent = currentPlayer;

    // Check for win or tie
    if (checkWin()) {
        gameStatus.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        gameStatus.textContent = "It's a Tie!";
        gameActive = false;
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Function to check for a win
function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;

    // Clear cells
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}
