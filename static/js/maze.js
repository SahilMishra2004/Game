document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('mazeCanvas');
    const ctx = canvas.getContext('2d');
    const resetButton = document.getElementById('reset');
    const timeDisplay = document.getElementById('time');
    const movesDisplay = document.getElementById('moves');
    const won=document.getElementById("won")
    const cellSize = 20;
    const rows = 25;
    const cols = 25;
    let maze = [];
    let player = { x: 1, y: 1 };
    let exit = { x: cols - 2, y: rows - 2 };
    let moves = 0;
    let seconds = 0;
    let timer;
    let gameWon = false;
    
    // Maze generation using recursive backtracking
    function generateMaze() {
        // Initialize maze with all walls
        maze = Array(rows).fill().map(() => Array(cols).fill(1));
        
        // Start carving from the player position
        carvePath(player.x, player.y);
        
        // Ensure exit is reachable
        maze[exit.y][exit.x] = 0;
        maze[exit.y-1][exit.x] = 0;
        maze[exit.y][exit.x-1] = 0;
    }
    
    function carvePath(x, y) {
        maze[y][x] = 0; // Carve current cell
        
        // Define directions in random order
        const directions = [
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 }
        ].sort(() => Math.random() - 0.5);
        
        for (const dir of directions) {
            const nx = x + dir.dx * 2;
            const ny = y + dir.dy * 2;
            
            if (nx > 0 && nx < cols - 1 && ny > 0 && ny < rows - 1 && maze[ny][nx] === 1) {
                maze[y + dir.dy][x + dir.dx] = 0; // Carve path between cells
                carvePath(nx, ny);
            }
        }
    }
    
    // Draw the maze
    function drawMaze() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw walls
        ctx.fillStyle = '#343a40';
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (maze[y][x] === 1) {
                    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                }
            }
        }
        
        // Draw exit
        ctx.fillStyle = '#28a745';
        ctx.fillRect(exit.x * cellSize, exit.y * cellSize, cellSize, cellSize);
        
        // Draw player
        ctx.fillStyle = '#dc3545';
        ctx.beginPath();
        ctx.arc(
            player.x * cellSize + cellSize/2,
            player.y * cellSize + cellSize/2,
            cellSize/2 - 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
    
    // Move player
    function movePlayer(dx, dy) {
        if (gameWon) return;
        
        const newX = player.x + dx;
        const newY = player.y + dy;
        
        // Check boundaries and walls
        if (newX >= 0 && newX < cols && newY >= 0 && newY < rows && maze[newY][newX] === 0) {
            player.x = newX;
            player.y = newY;
            moves++;
            movesDisplay.textContent = moves;
            
            // Check if reached exit
            if (player.x === exit.x && player.y === exit.y) {
                gameWon = true;
                
                clearInterval(timer);
                setTimeout(() => {
                
                }, 100);
                won.textContent=("You won")
            }
            
            drawMaze();
        }
    }
    
    // Start timer
    function startTimer() {
        clearInterval(timer);
        seconds = 0;
        timeDisplay.textContent = seconds;
        timer = setInterval(() => {
            seconds++;
            timeDisplay.textContent = seconds;
        }, 1000);
    }
    
    // Reset game
    function resetGame() {
        clearInterval(timer);
        generateMaze();
        player = { x: 1, y: 1 };
        moves = 0;
        movesDisplay.textContent = moves;
        gameWon = false;
        startTimer();
        drawMaze();
    }
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp':
                movePlayer(0, -1);
                break;
            case 'ArrowDown':
                movePlayer(0, 1);
                break;
            case 'ArrowLeft':
                movePlayer(-1, 0);
                break;
            case 'ArrowRight':
                movePlayer(1, 0);
                break;
        }
    });
    
    resetButton.addEventListener('click', resetGame);
    
    // Initialize game
    resetGame();
});