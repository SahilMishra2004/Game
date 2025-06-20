document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.querySelector('.status');
    const resetButton = document.getElementById('reset');
    
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    // Add this at the beginning of your existing JS
document.addEventListener('DOMContentLoaded', () => {
    // Check for dark mode and apply immediately
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDarkMode) {
        document.querySelector('.board').style.backgroundColor = '#000';
        document.querySelectorAll('.cell').forEach(cell => {
            cell.style.backgroundColor = '#000';
            cell.style.borderColor = '#fff';
        });
    }
    
    // Watch for theme changes
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'data-theme') {
                const isNowDark = document.documentElement.getAttribute('data-theme') === 'dark';
                const board = document.querySelector('.board');
                const cells = document.querySelectorAll('.cell');
                
                board.style.backgroundColor = isNowDark ? '#000' : '#f8f9fa';
                cells.forEach(cell => {
                    cell.style.backgroundColor = isNowDark ? '#000' : '#f8f9fa';
                    cell.style.borderColor = isNowDark ? '#fff' : '#343a40';
                });
            }
        });
    });
    
    observer.observe(document.documentElement, {
        attributes: true
    });
    
    // Rest of your existing tictactoe.js code...
});
    
    // Create board cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
    
    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        
        checkResult();
    }
    
    function checkResult() {
        let roundWon = false;
        
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            
            if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
                continue;
            }
            
            if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
                roundWon = true;
                highlightWinningCells([a, b, c]);
                break;
            }
        }
        
        if (roundWon) {
            status.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
        
        if (!gameState.includes('')) {
            status.textContent = "Game ended in a draw!";
            gameActive = false;
            return;
        }
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
    
    function highlightWinningCells(cells) {
        cells.forEach(index => {
            document.querySelector(`.cell[data-index="${index}"]`).classList.add('winning-cell');
        });
    }
    
    resetButton.addEventListener('click', resetGame);
    
    function resetGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.textContent = `Player ${currentPlayer}'s turn`;
        
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winning-cell');
        });
    }
});